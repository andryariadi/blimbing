import { Request, Response } from "express";
import prisma from "../config/dababase";
import { Decimal } from "@prisma/client/runtime/client";
import { Prisma } from "../generated/prisma/client";
import { existingTransaction } from "../utils";

class Controller {
  static async getTransactions(req: Request, res: Response) {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: transactions,
      message: "Success fetching transactions",
    });
  }

  static async getTransaction(req: Request, res: Response) {
    const { id } = req.params;

    await existingTransaction(res, id);

    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        account: {
          include: {
            customer: true,
            packet: true,
          },
        },
      },
    });

    return res.status(200).json({
      data: transaction,
      message: "Success fetching transaction",
    });
  }

  static async createDeposit(req: Request, res: Response) {
    const data: Prisma.TransactionUncheckedCreateInput = req.body;

    const { accountId, amount, transactionDate } = data;

    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    const balanceBefore = Number(account.balance);
    const balanceAfter = balanceBefore + Number(amount);

    const transaction = await prisma.$transaction(async (tx) => {
      // Create transaction record
      const newTransaction = await tx.transaction.create({
        data: {
          accountId,
          type: "DEPOSIT",
          amount,
          transactionDate: new Date(transactionDate),
          balanceBefore,
          balanceAfter,
          interestEarned: 0,
        },
      });

      // Update account balance
      await tx.account.update({
        where: {
          id: accountId,
        },
        data: {
          balance: balanceAfter,
        },
      });

      return newTransaction;
    });

    if (!transaction) {
      return res.status(500).json({
        message: "Error creating transaction",
      });
    }

    const transactionCreated = await prisma.transaction.findUnique({
      where: {
        id: transaction.id,
      },
    });

    return res.status(200).json({
      data: transactionCreated,
      message: "Success creating transaction",
    });
  }

  static async createWithdraw(req: Request, res: Response) {
    const data: Prisma.TransactionUncheckedCreateInput = req.body;

    const { accountId, amount, transactionDate } = data;

    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
      include: {
        packet: true,
        customer: true,
        transactions: {
          where: {
            type: "DEPOSIT",
          },
          orderBy: {
            transactionDate: "asc",
          },
          take: 1,
        },
      },
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (account.transactions.length === 0) {
      return res.status(400).json({
        message: "No deposit found. Please make a deposit first.",
      });
    }

    const firstDeposit = account.transactions[0];
    const withdrawDate = new Date(transactionDate);
    const depositDate = new Date(firstDeposit.transactionDate);

    const months = Controller.calculateMonthsDifference(depositDate, withdrawDate);

    if (months < 0) {
      return res.status(400).json({
        message: "Withdraw date cannot be before deposit date",
      });
    }

    // Calculate interest:
    const yearlyReturn = Number(account.packet.yearlyReturn);
    const monthlyReturn = yearlyReturn / 12 / 100;
    const startingBalance = Number(account.balance);
    const interestEarned = startingBalance * monthlyReturn * months;
    const amountNum = Number(amount);
    const totalAmount = amountNum + interestEarned;

    if (amountNum > totalAmount) {
      return res.status(400).json({
        message: `Insufficient balance. Available: ${totalAmount.toFixed(2)} (Balance: ${startingBalance.toFixed(2)} + Interest: ${interestEarned.toFixed(2)})`,
      });
    }

    const balanceBefore = account.balance;
    const balanceAfter = new Decimal(totalAmount).minus(amountNum);

    const transaction = await prisma.$transaction(async (tx) => {
      // Create transaction record
      const newTransaction = await tx.transaction.create({
        data: {
          accountId,
          type: "WITHDRAW",
          amount,
          transactionDate: withdrawDate,
          balanceBefore,
          balanceAfter,
          interestEarned,
        },
      });

      // Update account balance
      await tx.account.update({
        where: {
          id: accountId,
        },
        data: {
          balance: balanceAfter,
        },
      });

      return newTransaction;
    });

    if (!transaction) {
      return res.status(500).json({
        message: "Error creating transaction",
      });
    }

    const transactionCreated = await prisma.transaction.findUnique({
      where: { id: transaction.id },
      include: {
        account: {
          include: {
            customer: true,
            packet: true,
          },
        },
      },
    });

    return res.status(200).json({
      data: transactionCreated,
      message: "Success creating transaction",
    });
  }

  static async calculateInterest(req: Request, res: Response) {
    const { accountId, withdrawDate } = req.body;

    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: {
        packet: true,
        transactions: {
          where: {
            type: "DEPOSIT",
          },
          orderBy: {
            transactionDate: "asc",
          },
          take: 1,
        },
      },
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (account.transactions.length === 0) {
      return res.status(400).json({
        message: "No deposit found. Please make a deposit first.",
      });
    }

    const firstDeposit = account.transactions[0];
    const withdrawDt = new Date(withdrawDate);
    const depositDt = new Date(firstDeposit.transactionDate);

    const months = Controller.calculateMonthsDifference(depositDt, withdrawDt);

    if (months < 0) {
      return res.status(400).json({
        message: "Withdraw date cannot be before deposit date",
      });
    }

    // Calculate interest:
    const yearlyReturn = Number(account.packet.yearlyReturn);
    const monthlyReturn = yearlyReturn / 12 / 100;
    const startingBalance = Number(account.balance);
    const interestEarned = startingBalance * monthlyReturn * months;
    const endingBalance = startingBalance + interestEarned;

    const interestInfo = {
      accountId: accountId,
      startingBalance,
      depositDate: depositDt.toISOString().split("T")[0],
      withdrawDate: withdrawDate,
      months,
      depositoType: account.packet.name,
      yearlyReturn: Number(account.packet.yearlyReturn),
      monthlyReturn: monthlyReturn * 100,
      interestEarned,
      endingBalance,
    };

    return res.status(200).json({
      data: interestInfo,
      message: "Success calculating interest",
    });
  }

  static calculateMonthsDifference(startDate: Date, endDate: Date): number {
    const yearDiff = endDate.getFullYear() - startDate.getFullYear();
    const monthDiff = endDate.getMonth() - startDate.getMonth();
    return yearDiff * 12 + monthDiff;
  }
}

export default Controller;

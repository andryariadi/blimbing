import prisma from "../config/dababase";
import { Response } from "express";

export const existingCustomer = async (res: Response, id: string) => {
  const existingCustomer = await prisma.customer.findUnique({
    where: {
      id,
    },
  });

  if (!existingCustomer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }
};

export const existingAccount = async (res: Response, id: string) => {
  const existingAccount = await prisma.account.findUnique({
    where: {
      id,
    },
  });

  if (!existingAccount) {
    return res.status(404).json({
      message: "Account not found",
    });
  }
};

export const existingDepositType = async (res: Response, id: string) => {
  const existingDepositType = await prisma.depositoType.findUnique({
    where: {
      id,
    },
  });

  if (!existingDepositType) {
    return res.status(404).json({
      message: "Deposit type not found",
    });
  }
};

export const existingTransaction = async (res: Response, id: string) => {
  const existingTransaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });

  if (!existingTransaction) {
    return res.status(404).json({
      message: "Transaction not found",
    });
  }
};

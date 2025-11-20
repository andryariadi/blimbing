import { Request, Response } from "express";
import prisma from "../config/dababase";

class Controller {
  static async getAccounts(req: Request, res: Response) {
    const accounts = await prisma.account.findMany({
      include: {
        customer: true,
        packet: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: accounts,
      message: "Success fetching accounts",
    });
  }

  static async getAccount(req: Request, res: Response) {
    const { id } = req.params;

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

    const account = await prisma.account.findUnique({
      where: { id },
      include: {
        customer: true,
        packet: true,
        transactions: {
          orderBy: {
            transactionDate: "desc",
          },
        },
      },
    });

    return res.status(200).json({
      data: account,
      message: "Success fetching account",
    });
  }

  static async createAccount(req: Request, res: Response) {
    const { customerId, packetId, balance } = req.body;

    const existingCustomer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!existingCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const existingPacket = await prisma.depositoType.findUnique({
      where: {
        id: packetId,
      },
    });

    if (!existingPacket) {
      return res.status(404).json({
        message: "Packet not found",
      });
    }

    const account = await prisma.account.create({
      data: {
        customerId,
        packetId,
        balance,
      },
    });

    return res.status(200).json({
      data: account,
      message: "Success creating account",
    });
  }

  static async updateAccount(req: Request, res: Response) {
    const { id } = req.params;
    const { balance } = req.body;

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

    const account = await prisma.account.update({
      where: {
        id,
      },
      data: {
        balance,
      },
    });

    return res.status(200).json({
      data: account,
      message: "Success updating account",
    });
  }

  static async deleteAccount(req: Request, res: Response) {
    const { id } = req.params;

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

    const account = await prisma.account.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      data: account,
      message: "Success deleting account",
    });
  }
}

export default Controller;

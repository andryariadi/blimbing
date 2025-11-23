import { Request, Response } from "express";
import prisma from "../config/dababase";
import { Prisma } from "../generated/prisma/client";
import { existingDepositType } from "../utils";

class Controller {
  static async getDepositTypes(req: Request, res: Response) {
    const depositoTypes = await prisma.depositoType.findMany({
      orderBy: {
        yearlyReturn: "asc",
      },
    });

    return res.status(200).json({
      data: depositoTypes,
      message: "Success fetching deposit types",
    });
  }

  static async getDepositType(req: Request, res: Response) {
    const { id } = req.params;

    await existingDepositType(res, id);

    const depositoType = await prisma.depositoType.findUnique({
      where: { id },
      include: {
        accounts: {
          include: {
            customer: true,
          },
        },
      },
    });

    return res.status(200).json({
      data: depositoType,
      message: "Success fetching deposit type",
    });
  }

  static async createDepositType(req: Request, res: Response) {
    const data: Prisma.DepositoTypeCreateInput = req.body;

    const { name, yearlyReturn } = data;

    const existingDepositType = await prisma.depositoType.findUnique({
      where: {
        name,
      },
    });

    if (existingDepositType) {
      return res.status(400).json({
        message: "Deposit type already exists",
      });
    }

    const depositoType = await prisma.depositoType.create({
      data: {
        name,
        yearlyReturn,
      },
    });

    return res.status(200).json({
      data: depositoType,
      message: "Success creating deposit type",
    });
  }

  static async updateDepositType(req: Request, res: Response) {
    const { id } = req.params;

    const data: Prisma.DepositoTypeUpdateInput = req.body;

    const { name, yearlyReturn } = data;

    await existingDepositType(res, id);

    if (name) {
      const nameValue = typeof name === "string" ? name : (name as any).set;

      const existing = await prisma.depositoType.findFirst({
        where: {
          name: nameValue,
          id: { not: id },
        },
      });

      if (existing) {
        return res.status(400).json({
          message: "Deposit type already exists",
        });
      }
    }

    const depositoType = await prisma.depositoType.update({
      where: {
        id,
      },
      data: {
        name,
        yearlyReturn,
      },
    });

    return res.status(200).json({
      data: depositoType,
      message: "Success updating deposit type",
    });
  }

  static async deleteDepositType(req: Request, res: Response) {
    const { id } = req.params;

    await existingDepositType(res, id);

    const depositoType = await prisma.depositoType.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      data: depositoType,
      message: "Success deleting deposit type",
    });
  }
}

export default Controller;

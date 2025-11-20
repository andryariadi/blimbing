import { Request, Response } from "express";
import prisma from "../config/dababase";

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

  static async createDepositType(req: Request, res: Response) {
    const { name, yearlyReturn } = req.body;

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
}

export default Controller;

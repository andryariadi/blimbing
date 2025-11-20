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
}

export default Controller;

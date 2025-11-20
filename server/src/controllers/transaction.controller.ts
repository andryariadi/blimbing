import { Request, Response } from "express";
import prisma from "../config/dababase";

class Controller {
  static async getTransactions(req: Request, res: Response) {
    const depositoTypes = await prisma.transaction.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: depositoTypes,
      message: "Success fetching deposit types",
    });
  }
}

export default Controller;

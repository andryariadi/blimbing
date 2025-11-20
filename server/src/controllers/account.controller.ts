import { Request, Response } from "express";
import prisma from "../config/dababase";

class Controller {
  static async getAccounts(req: Request, res: Response) {
    const accounts = await prisma.account.findMany({
      include: {
        customer: true,
        depositoType: true,
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
}

export default Controller;

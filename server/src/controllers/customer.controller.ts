import { Request, Response } from "express";
import prisma from "../config/dababase";

class Controller {
  static async getCustomers(req: Request, res: Response) {
    const customers = await prisma.customer.findMany({
      include: {
        accounts: {
          include: {
            depositoType: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: customers,
      message: "Success fetching customers",
    });
  }
}

export default Controller;

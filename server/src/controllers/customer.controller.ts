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

  static async getCustomer(req: Request, res: Response) {
    const { id } = req.params;

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

    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        accounts: {
          include: {
            depositoType: true,
          },
        },
      },
    });

    return res.status(200).json({
      data: customer,
      message: "Success fetching customer",
    });
  }

  static async createCustomer(req: Request, res: Response) {
    const { name } = req.body;

    const customer = await prisma.customer.create({
      data: {
        name,
      },
    });

    return res.status(200).json({
      data: customer,
      message: "Success creating customer",
    });
  }

  static async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

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

    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return res.status(200).json({
      data: customer,
      message: "Success updating customer",
    });
  }

  static async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;

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

    const customer = await prisma.customer.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      data: customer,
      message: "Success deleting customer",
    });
  }
}

export default Controller;

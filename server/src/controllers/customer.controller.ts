import { Request, Response } from "express";
import prisma from "../config/dababase";
import { Prisma } from "../generated/prisma/client";
import { existingCustomer } from "../utils";

class Controller {
  static async getCustomers(req: Request, res: Response) {
    const customers = await prisma.customer.findMany({
      include: {
        accounts: {
          include: {
            packet: true,
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

    await existingCustomer(res, id);

    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        accounts: {
          include: {
            packet: true,
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
    const data: Prisma.CustomerCreateInput = req.body;

    const { name } = data;

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

    const data: Prisma.CustomerUpdateInput = req.body;

    const { name } = data;

    await existingCustomer(res, id);

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

    await existingCustomer(res, id);

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

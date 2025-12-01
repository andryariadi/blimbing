import { Request, Response } from "express";
import prisma from "../config/dababase";
import { Prisma } from "../generated/prisma/client";
import { existingCustomer } from "../utils";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiry, verifyRefreshToken } from "../utils/generateToken";

class Controller {
  static async register(req: Request, res: Response) {
    const data: Prisma.CustomerCreateInput = req.body;

    const { userName, email, password, role } = data;

    if (!userName || !email || !password)
      return res.status(400).json({
        message: "Username, email, and password are required!",
      });

    const existingUser = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return res.status(409).json({
        message: "Email already in use!",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const customer = await prisma.customer.create({
      data: {
        userName,
        email,
        password: hashPassword,
        role,
      },
    });

    return res.status(201).json({
      data: customer,
      message: "Customer registered successfully",
    });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    const customer = await prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Generate tokens:
    const payload = {
      customerId: customer.id,
      email: customer.email,
      role: customer.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        customerId: customer.id,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      data: {
        accessToken,
      },
      message: "Customer logged in successfully",
    });
  }

  static async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "Refresh token required!" });

    // Verify JWT:
    const decoded = verifyRefreshToken(refreshToken);

    // Check if refresh token is valid:
    const storedToken = await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
      include: { customer: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return res.status(401).json({ message: "Invalid or expired refresh token!" });
    }

    const payload = {
      customerId: decoded.customerId,
      email: decoded.email,
      role: decoded.role,
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // Update refresh token in database:
    await prisma.$transaction([
      // Delete old token:
      prisma.refreshToken.delete({
        where: { token: refreshToken },
      }),

      // Create new token:
      prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          customerId: storedToken.customer.id,
          expiresAt: getRefreshTokenExpiry(),
        },
      }),
    ]);

    // Set new refresh token in HTTP-only cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      data: {
        accessToken: newAccessToken,
      },
      message: "Refresh token refreshed successfully",
    });
  }

  static async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "Refresh token required!" });

    await prisma.refreshToken.deleteMany({
      where: {
        token: refreshToken,
      },
    });

    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Logged out successfully" });
  }

  static async logoutAll(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "Refresh token required!" });

    const decoded = verifyRefreshToken(refreshToken);

    await prisma.refreshToken.deleteMany({
      where: {
        customerId: decoded.customerId,
      },
    });

    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Logged out successfully" });
  }

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

  static async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;

    const data: Prisma.CustomerUpdateInput = req.body;

    const { userName, email, password, role } = data;

    await existingCustomer(res, id);

    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        userName,
        email,
        password,
        role,
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

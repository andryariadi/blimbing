import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/generateToken";
import { Role } from "../generated/prisma/enums";

export const autheticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token required!" });

  const decoded = verifyAccessToken(token);

  req.customer = decoded;

  next();
};

export const authorizeRoles = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.customer) {
      return res.status(401).json({ message: "Unauthorized - Authentication required!" });
    }

    if (!allowedRoles.includes(req.customer.role)) {
      return res.status(403).json({ message: `Forbidden - Access denied. Required role: ${allowedRoles.join(" or ")}` });
    }

    next();
  };
};

export const requireRole = (...roles: Role[]) => {
  return [autheticateToken, authorizeRoles(...roles)];
};

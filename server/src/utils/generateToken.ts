import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwt";
import { Role } from "../generated/prisma/enums";

interface TokenPayload {
  customerId: string;
  email: string;
  role: Role;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_CONFIG.accessTokenSecret, {
    expiresIn: JWT_CONFIG.accessTokenExpiresIn,
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_CONFIG.refreshTokenSecret, {
    expiresIn: JWT_CONFIG.refreshTokenExpiresIn,
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_CONFIG.accessTokenSecret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_CONFIG.refreshTokenSecret) as TokenPayload;
};

export const getRefreshTokenExpiry = (): Date => {
  const now = new Date();
  return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
};

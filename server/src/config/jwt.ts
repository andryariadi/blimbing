export const JWT_CONFIG = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "rahasia-access-token-23",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "rahasia-refresh-token-23",
  accessTokenExpiresIn: "15m",
  refreshTokenExpiresIn: "7d",
} as const;

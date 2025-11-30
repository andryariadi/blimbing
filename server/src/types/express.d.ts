import { Role } from "../generated/prisma/enums";

declare global {
  namespace Express {
    interface Request {
      customer?: {
        customerId: string;
        email: string;
        role: Role;
      };
    }
  }
}

export {};

import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
});

export const updateCustomerSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
});

export const createDepositoTypeSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  yearlyReturn: z.number().min(0, "Return must be positive").max(100, "Return too high"),
});

export const updateDepositoTypeSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long").optional(),
  yearlyReturn: z.number().min(0, "Return must be positive").max(100, "Return too high").optional(),
});

export const createAccountSchema = z.object({
  customerId: z.string().uuid("Invalid customer ID"),
  depositoTypeId: z.string().uuid("Invalid deposito type ID"),
});

export const updateAccountSchema = z.object({
  depositoTypeId: z.string().uuid("Invalid deposito type ID").optional(),
});

export const createDepositSchema = z.object({
  accountId: z.string().uuid("Invalid account ID"),
  amount: z.number().positive("Amount must be positive"),
  transactionDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export const createWithdrawSchema = z.object({
  accountId: z.string().uuid("Invalid account ID"),
  amount: z.number().positive("Amount must be positive"),
  transactionDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export const calculateInterestSchema = z.object({
  accountId: z.string().uuid("Invalid account ID"),
  withdrawDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type CreateDepositoTypeInput = z.infer<typeof createDepositoTypeSchema>;
export type UpdateDepositoTypeInput = z.infer<typeof updateDepositoTypeSchema>;
export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
export type CreateDepositInput = z.infer<typeof createDepositSchema>;
export type CreateWithdrawInput = z.infer<typeof createWithdrawSchema>;
export type CalculateInterestInput = z.infer<typeof calculateInterestSchema>;

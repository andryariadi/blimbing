import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
});

export const depositoTypeSchema = z.object({
  name: z.string().min(1, "Deposito type name is required").max(100, "Deposito type name is too long"),
  yearlyReturn: z.number({ error: "Yearly return must be a number" }).min(0, "Yearly return must be positive").max(100, "Yearly return cannot exceed 100%"),
});

export const accountSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  packetId: z.string().min(1, "Deposito type is required"),
  balance: z.number({ error: "Balance must be a number" }).min(0, "Balance must be positive").optional(),
});

export const transactionSchema = z.object({
  accountId: z.string().min(1, "Account is required"),
  amount: z.number({ error: "Amount must be a number" }).positive("Amount must be positive"),
  transactionDate: z.date({ error: "Transaction date is required" }),
});

export const withdrawSchema = z.object({
  accountId: z.string().min(1, "Account is required"),
  amount: z.number({ error: "Amount must be a number" }).positive("Amount must be positive"),
  transactionDate: z.string().min(1, "Transaction date is required"),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
export type DepositoTypeFormData = z.infer<typeof depositoTypeSchema>;
export type AccountFormData = z.infer<typeof accountSchema>;
export type TransactionFormData = z.infer<typeof transactionSchema>;
export type WithdrawFormData = z.infer<typeof withdrawSchema>;

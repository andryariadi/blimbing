import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
});

export const depositoTypeSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  yearlyReturn: z.number({ error: "Yearly return must be a number" }).min(0, "Yearly return must be positive").max(100, "Yearly return cannot exceed 100%"),
});

export const accountSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  depositoTypeId: z.string().min(1, "Deposito type is required"),
});

export const depositSchema = z.object({
  accountId: z.string().min(1, "Account is required"),
  amount: z.number({ error: "Amount must be a number" }).positive("Amount must be positive"),
  transactionDate: z.string().min(1, "Transaction date is required"),
});

export const withdrawSchema = z.object({
  accountId: z.string().min(1, "Account is required"),
  amount: z.number({ error: "Amount must be a number" }).positive("Amount must be positive"),
  transactionDate: z.string().min(1, "Transaction date is required"),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
export type DepositoTypeFormData = z.infer<typeof depositoTypeSchema>;
export type AccountFormData = z.infer<typeof accountSchema>;
export type DepositFormData = z.infer<typeof depositSchema>;
export type WithdrawFormData = z.infer<typeof withdrawSchema>;

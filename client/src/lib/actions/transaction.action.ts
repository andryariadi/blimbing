"use server";

import { revalidatePath } from "next/cache";
import { TransactionFormData } from "../validations";
import { normalizeDate } from "../utils";

export const createDeposit = async (formData: TransactionFormData) => {
  try {
    const normalizedDate = normalizeDate(formData.transactionDate);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: formData.accountId,
        amount: formData.amount,
        transactionDate: normalizedDate,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create deposit transaction");
    }

    const data = await res.json();

    revalidatePath(`/account/${formData.accountId}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createWithdraw = async (formData: TransactionFormData) => {
  try {
    const normalizedDate = normalizeDate(formData.transactionDate);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: formData.accountId,
        amount: formData.amount,
        transactionDate: normalizedDate,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create withdraw transaction");
    }

    const data = await res.json();

    revalidatePath(`/account/${formData.accountId}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

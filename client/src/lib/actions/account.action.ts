"use server";

import { revalidatePath } from "next/cache";
import { CustomerFormData } from "../validations";

export const getAccounts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`);

    if (!res.ok) {
      throw new Error("Failed to fetch accounts");
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAccount = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch account");
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAccount = async (formData: CustomerFormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: formData.name }),
    });

    if (!res.ok) {
      throw new Error("Failed to create account");
    }

    const data = await res.json();

    revalidatePath("/account");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAccount = async (id: string, name: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      throw new Error("Failed to update account");
    }

    const data = await res.json();

    revalidatePath("/account");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccount = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete account");
    }

    revalidatePath("/account");

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

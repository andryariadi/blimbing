"use server";

import { revalidatePath } from "next/cache";
import { DepositoTypeFormData } from "../validations";

export const getDepositoTypes = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deposito-types`);

    if (!res.ok) {
      throw new Error("Failed to fetch deposito types");
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDepositoType = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deposito-types/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch deposito type");
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createDepositoType = async (formData: DepositoTypeFormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deposito-types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: formData.name, yearlyReturn: formData.yearlyReturn }),
    });

    if (!res.ok) {
      throw new Error("Failed to create account");
    }

    const data = await res.json();

    revalidatePath("/deposito-type");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDepositoType = async (id: string, formData: DepositoTypeFormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deposito-types/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: formData.name, yearlyReturn: formData.yearlyReturn }),
    });

    if (!res.ok) {
      throw new Error("Failed to update deposito type");
    }

    const data = await res.json();

    revalidatePath("/deposito-type");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDepositoType = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deposito-types/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete deposito type");
    }

    revalidatePath("/deposito-type");

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

"use server";

import { revalidatePath } from "next/cache";
import { CustomerFormData } from "../validations";

export const getCustomers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`);

    if (!res.ok) {
      throw new Error("Failed to fetch customers");
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCustomer = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch customer");
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCustomer = async (formData: CustomerFormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: formData.name }),
    });

    if (!res.ok) {
      throw new Error("Failed to create customer");
    }

    const data = await res.json();

    revalidatePath("/customer");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomer = async (id: string, name: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      throw new Error("Failed to update customer");
    }

    const data = await res.json();

    revalidatePath("/customer");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete customer");
    }

    revalidatePath("/customer");

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function normalizeDate(date: string | Date): string {
  if (!date) {
    return format(new Date(), "yyyy-MM-dd");
  }

  const d = typeof date === "string" ? parseISO(date) : new Date(date);

  if (!isValid(d)) {
    throw new Error("Invalid date provided");
  }

  return format(d, "yyyy-MM-dd");
}

export function formatDisplayDate(date: string | Date): string {
  if (!date) return "";

  const d = typeof date === "string" ? parseISO(date) : new Date(date);

  if (!isValid(d)) {
    return "";
  }

  return format(d, "dd MMMM yyyy");
}

export function parseServerDate(dateString: string): Date {
  return parseISO(dateString);
}

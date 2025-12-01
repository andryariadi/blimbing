import { cookies } from "next/headers";
import { Customer } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const getServerUser = async (): Promise<Customer | null> => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) return null;

    // Get access token:
    const refreshTokenRes = await fetch(`${API_BASE_URL}/customers/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    });

    if (!refreshTokenRes.ok) return null;

    const { accessToken } = await refreshTokenRes.json();

    // Get profile customer:
    const profileRes = await fetch(`${API_BASE_URL}/customers/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!profileRes.ok) return null;

    const user = await profileRes.json();

    return user;
  } catch (error) {
    console.log(error, "<---getServerUser");
    return null;
  }
};

export const fetchWithServerAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  // Get access token:
  const refreshTokenRes = await fetch(`${API_BASE_URL}/customers/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
    cache: "no-store",
  });

  if (!refreshTokenRes.ok) {
    throw new Error("Failed to refresh token");
  }

  const { accessToken } = await refreshTokenRes.json();

  // Fetch with access token:
  const fetchRes = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return fetchRes;
};

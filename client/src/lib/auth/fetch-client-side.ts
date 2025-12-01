const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface LoginResponse {
  data: {
    accessToken: string;
  };
  message: string;
}

let accessToken: string | null = null;
let refreshPromise: Promise<string> | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
}

export const register = async (email: string, password: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/customers/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  const data = await response.json();

  return data;
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/customers/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data: LoginResponse = await response.json();
  setAccessToken(data.data.accessToken);

  return data;
};

export const refreshAccessToken = async (): Promise<string> => {
  // Check if a refresh token request is already in progress to avoid making multiple requests:
  if (refreshPromise) return refreshPromise;

  // Start a new refresh token request:
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Refresh failed");
      }

      const data = await response.json();

      setAccessToken(data.accessToken);

      return data.accessToken;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const logout = async (): Promise<void> => {
  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  clearAccessToken();
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  let accessToken = getAccessToken();

  // If no access token is available, try to refresh it:
  if (!accessToken) {
    try {
      accessToken = await refreshAccessToken();
    } catch (error) {
      console.log(error);
      throw new Error("No access token available");
    }
  }

  const fetchRes = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If the response status is 401 or 403, try to refresh the access token:
  if (fetchRes.status === 401 || fetchRes.status === 403) {
    try {
      const newToken = await refreshAccessToken();

      const fetchRes = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });

      return fetchRes;
    } catch (error) {
      console.log(error);
      clearAccessToken();
      throw new Error("Session expired");
    }
  }

  return fetchRes;
};

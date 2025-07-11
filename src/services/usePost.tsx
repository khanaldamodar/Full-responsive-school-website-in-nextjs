// hooks/usePost.ts
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
interface PostState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function usePost<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (url: string, payload: any) => {
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("token"); // Sanctum token stored in cookies

      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      })

      const res = await axios.post<T>(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        withCredentials: true, // important for Sanctum
      });

      setData(res.data);
      return res.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        (axiosError.response?.data as { message?: string })?.message ||
          axiosError.message
      );

      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { post, data, loading, error };
}

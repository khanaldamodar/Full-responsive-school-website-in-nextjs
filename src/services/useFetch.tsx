// hooks/useFetch.ts
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<T>(url);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        if (isMounted) {
          setError(axiosError.message || "An error occurred");
          setData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

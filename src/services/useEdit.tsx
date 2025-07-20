import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface UseEditOptions<T> {
  endpoint: string;
  initialData?: T;
}

interface EditResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  updateData: (updatedData: Partial<T> | FormData, isFormData?: boolean) => Promise<void>;
}

function useEdit<T>({ endpoint, initialData }: UseEditOptions<T>): EditResponse<T> {
  const [data, setData] = useState<T | null>(initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = async (updatedData: Partial<T> | FormData, isFormData = false) => {
    const token = Cookies.get("token");

    if (!token) {
      setError("No authentication token found.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await axios.post<T>(
        `${endpoint}?_method=PUT`,
        updatedData,
        { headers }
      );

      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, updateData };
}

export default useEdit;

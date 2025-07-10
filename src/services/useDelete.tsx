// hooks/useDelete.ts
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface UseDeleteResponse {
  loading: boolean;
  error: string | null;
  deleteItem: () => Promise<void>;
}

function useDelete(endpoint: string): UseDeleteResponse {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItem = async () => {
    const token = Cookies.get("token");

    if (!token) {
      setError("No authentication token found.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred while deleting.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteItem };
}

export default useDelete;

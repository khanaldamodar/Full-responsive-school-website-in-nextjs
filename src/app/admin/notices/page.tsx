"use client";

import { useFetch } from "@/services/useFetch";
import { Edit, Eye, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Notice {
  id: number;
  title: string;
  description: string;
  notice_date: string;
  created_at: string;
  updated_at: string;
}

interface NoticeResponse {
  status: boolean;
  data: Notice[]; // assuming an array, update if needed
}

export default function NoticesPage() {
  const [localNotices, setLocalNotices] = useState<Notice[] | null>(null);
  const { data, loading, error } = useFetch<NoticeResponse>(
    "http://127.0.0.1:8000/api/notices"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotices = localNotices?.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (data?.data && !localNotices) {
      setLocalNotices(data.data);
    }
  }, [data]);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this notice?"
    );
    if (!confirmDelete) return;

    try {
      const token = Cookies.get("token");

      await axios.delete(`http://127.0.0.1:8000/api/notices/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLocalNotices(
        (prev) => prev?.filter((notice) => notice.id !== id) || []
      );
    } catch (err) {
      console.error("Failed to delete notice:", err);
      alert("Failed to delete notice. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-poppins">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0949A3]">Notices</h1>
            <p className="text-gray-600">All school notices in one place</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center hover:bg-blue-700 transition">
            <Plus className="w-4 h-4 mr-2" />
            Add Notice
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search notice..."
            className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-blue-600">
              Loading notices...
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-6">{error}</div>
          ) : filteredNotices && filteredNotices.length > 0 ? (
            <table className="min-w-full">
              <thead className="bg-[#0949A3] text-white text-left text-sm">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Notice Date</th>
                  <th className="px-6 py-3">Created At</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotices.map((notice, index) => (
                  <tr
                    key={notice.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{notice.title}</td>
                    <td className="px-6 py-3 truncate max-w-xs">
                      {notice.description}
                    </td>
                    <td className="px-6 py-3">{notice.notice_date}</td>
                    <td className="px-6 py-3">
                      {new Date(notice.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(notice.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No notices found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

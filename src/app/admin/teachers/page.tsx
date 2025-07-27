"use client";

import { useFetch } from "@/services/useFetch";
import axios from "axios";
import { Eye, Edit, Trash2, Plus, Search, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Subject {
  id: number;
  name: string;
  code: string;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  qualification: string;
  bio: string;
  profile_picture: string | null;
  subjects: Subject[];
}

interface TeacherResponse {
  status: boolean;
  data: Teacher[];
}

export default function TeachersPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [localData, setLocalData] = useState<Teacher[] | null>(null);
  const { data, loading, error } = useFetch<TeacherResponse>(
    `${apiUrl}teachers`
  );
  const router = useRouter();

  // On first load, sync fetched data into local state
  useEffect(() => {
    if (data?.data && !localData) {
      setLocalData(data.data);
    }
  }, [data]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked && data?.data) {
      setSelectedItems(data.data.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    setSelectedItems(
      checked ? [...selectedItems, id] : selectedItems.filter((i) => i !== id)
    );
  };

  const filteredData = localData?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subjects.some((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      const token = Cookies.get("token");

      await axios.delete(`${apiUrl}teachers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove deleted teacher from local state
      if (data) {
        const updated = data.data.filter((t) => t.id !== id);
        setSelectedItems((prev) => prev.filter((item) => item !== id));
        setLocalData({ ...data, data: updated }); // Update local state
      }
    } catch (err) {
      console.error("Failed to delete teacher:", err);
      alert("Failed to delete teacher. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Teachers</h1>
            <p className="text-gray-600">
              List of all teachers with assigned subjects
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => router.push("/admin/teachers/add")}
          >
            <Plus className="w-5 h-5" />
            Add Teacher
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 flex gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button className="bg-gray-200 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-300">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-600">
              Loading teachers...
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">Error: {error}</div>
          ) : filteredData && filteredData.length > 0 ? (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredData.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Profile</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Qualification</th>
                  <th className="px-4 py-3">Subjects</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((teacher, index) => (
                  <tr
                    key={teacher.id}
                    className={`hover:bg-gray-50 ${
                      selectedItems.includes(teacher.id) ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(teacher.id)}
                        onChange={(e) =>
                          handleSelectItem(teacher.id, e.target.checked)
                        }
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={
                          teacher.profile_picture
                            ? `${imageUrl}public/storage/${teacher.profile_picture}`
                            : ""
                        }
                        alt={teacher.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3">{teacher.name}</td>
                    <td className="px-4 py-3">{teacher.email}</td>
                    <td className="px-4 py-3">{teacher.phone}</td>
                    <td className="px-4 py-3">{teacher.address}</td>
                    <td className="px-4 py-3">{teacher.qualification}</td>
                    <td className="px-4 py-3">
                      <ul className="list-disc list-inside space-y-1">
                        {teacher.subjects.map((sub) => (
                          <li key={sub.id} className="text-gray-800 text-sm">
                            {sub.name} {sub.code}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          className="text-green-600 hover:text-green-800"
                          title="Edit"
                          onClick={() =>
                            router.push(`/admin/teachers/add?id=${teacher.id}`)
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                          onClick={() => handleDelete(teacher.id)}
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
            <div className="p-6 text-center text-gray-500">
              No teachers found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useFetch } from "@/services/useFetch";
import Image from "next/image";
import { Eye, Edit, Trash2, Plus, Search, Filter } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
}

interface GalleryResponse {
  status: boolean;
  data: GalleryItem[];
}

const page = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL
  const { data, loading, error } = useFetch<GalleryResponse>(
    `${apiUrl}gallery`
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);


  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const token = Cookies.get("token");
      const res = await axios.delete(
        `${apiUrl}gallery/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status) {
        alert("Item deleted successfully.");
        window.location.reload(); // Optional: update UI instead of reload
      } else {
        console.error("Delete failed:", res.data);
        alert(res.data.message || "Failed to delete the item.");
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      alert(
        error?.response?.data?.message ||
          "An error occurred while deleting the item."
      );
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && data?.data) {
      setSelectedItems(data.data.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  const filteredData = data?.data?.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Gallery Collection
              </h1>
              <p className="text-gray-600">
                Manage your gallery items and media content
              </p>
            </div>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Plus className="w-5 h-5 mr-2" />
              Add New Item
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="inline-flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-lg text-gray-600">
                Loading gallery items...
              </span>
            </div>
          )}

          {error && (
            <div className="p-8 text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-600 font-semibold">
                  Error loading gallery items
                </p>
                <p className="text-red-500 mt-2">{error}</p>
              </div>
            </div>
          )}

          {!loading && filteredData && filteredData.length > 0 ? (
            <>
              {/* Bulk Actions */}
              {selectedItems.length > 0 && (
                <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-800 font-medium">
                      {selectedItems.length} item
                      {selectedItems.length > 1 ? "s" : ""} selected
                    </span>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Bulk Edit
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete Selected
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="overflow-x-auto font-poppins">
                <table className="min-w-full">
                  <thead className="bg-[#0949A3] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedItems.length === filteredData.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">#</th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Created At
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${
                          selectedItems.includes(item.id) ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) =>
                              handleSelectItem(item.id, e.target.checked)
                            }
                          />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4">
                          <div className="relative group">
                            <img
                              src={`${imageUrl}public/storage/gallery/images/${item.image.replace(
                                /^.*[\\/]/,
                                ""
                              )}`}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
                            />
                            <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className="text-sm text-gray-600 max-w-xs truncate"
                            title={item.description}
                          >
                            {item.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">{filteredData.length}</span>{" "}
                      of{" "}
                      <span className="font-medium">{filteredData.length}</span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-600 text-sm font-medium text-white">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </>
          ) : (
            !loading && (
              <div className="text-center py-16">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No gallery items found
                </h3>
                <p className="mt-2 text-gray-500">
                  {searchTerm
                    ? "Try adjusting your search criteria"
                    : "Get started by adding your first gallery item"}
                </p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Gallery Item
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

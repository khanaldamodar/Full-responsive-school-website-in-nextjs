"use client";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { Eye, Trash2 } from "lucide-react";
import { Dialog } from "@headlessui/react";
import Cookies from "js-cookie";

// ✅ Type definition for Admission
interface Admission {
  id: number;
  student_name: string;
  class: string;
  dob: string;
  gender?: string;
  address?: string;
  phone?: string;
  email?: string;
  guardian_name?: string;
  profile?: string;
  created_at: string;
  updated_at: string;
}
interface AdmissionApiResponse {
  status: boolean;
  message: string;
  data: Admission[];
}


export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [filtered, setFiltered] = useState<Admission[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ✅ Fetch admissions
  const fetchAdmissions = async () => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get<AdmissionApiResponse>("http://127.0.0.1:8000/api/admission", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched admissions:", res.data);
      setAdmissions(res.data.data);
      setFiltered(res.data.data);
    } catch (err) {
      console.error("Failed to fetch admissions", err);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // ✅ Handle delete
  const handleDelete = async (id: number) => {
    try {
        const token = Cookies.get("token");
      await axios.delete(`http://localhost:8000/api/admission/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAdmissions();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ✅ Open modal with selected data
  const handleView = (admission: Admission) => {
    setSelectedAdmission(admission);
    setIsOpen(true);
  };

  // ✅ Search handler
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setFiltered(
      admissions.filter((item) =>
        item.student_name.toLowerCase().includes(keyword)
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admissions</h1>

      <input
        type="text"
        placeholder="Search by student name"
        value={search}
        onChange={handleSearch}
        className="border px-4 py-2 rounded mb-4 w-full"
      />

      <table className="w-full border text-left">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-2">Name</th>
      <th className="p-2">Class</th>
      <th className="p-2">DOB</th>
      <th className="p-2">Gender</th>
      <th className="p-2">Phone</th>
      <th className="p-2">Email</th>
      <th className="p-2">Address</th>
      <th className="p-2">Guardian</th>
      <th className="p-2">Profile</th>
      <th className="p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filtered.length > 0 ? (
      filtered.map((item) => (
        <tr key={item.id} className="border-b">
          <td className="p-2">{item.student_name || "null"}</td>
          <td className="p-2">{item.class || "null"}</td>
          <td className="p-2">{item.dob || "null"}</td>
          <td className="p-2">{item.gender || "null"}</td>
          <td className="p-2">{item.phone || "null"}</td>
          <td className="p-2">{item.email || "null"}</td>
          <td className="p-2">{item.address || "null"}</td>
          <td className="p-2">{item.guardian_name || "null"}</td>
          <td className="p-2">
            {item.profile ? (
              <img
                src={`http://localhost:8000/storage/${item.profile}`}
                alt="Profile"
                className="w-10 h-10 object-cover rounded"
              />
            ) : (
              "null"
            )}
          </td>
          <td className="p-2 space-x-2">
            <button
              onClick={() => handleView(item)}
              className="text-blue-600 hover:underline"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:underline"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={10} className="p-4 text-center text-gray-500">
          No admissions found.
        </td>
      </tr>
    )}
  </tbody>
</table>


      {/* ✅ Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">Student Details</Dialog.Title>
            {selectedAdmission && (
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedAdmission.student_name}</p>
                <p><strong>Class:</strong> {selectedAdmission.class}</p>
                <p><strong>DOB:</strong> {selectedAdmission.dob}</p>
                <p><strong>Phone:</strong> {selectedAdmission.phone}</p>
                <p><strong>Email:</strong> {selectedAdmission.email}</p>
                <p><strong>Gender:</strong> {selectedAdmission.gender}</p>
                <p><strong>Address:</strong> {selectedAdmission.address}</p>
                <p><strong>Guardian:</strong> {selectedAdmission.guardian_name}</p>
                {selectedAdmission.profile && (
                  <img
                    src={`http://localhost:8000/storage/${selectedAdmission.profile}`}
                    alt="Profile"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>
            )}
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

"use client";

import { usePost } from "@/services/usePost";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams, useRouter } from "next/navigation";
import {Bounce, toast, ToastContainer} from "react-toastify"

export default function AddTeacherPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const teacherId = searchParams.get("id");
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([]);
  const { post, loading, error } = usePost();
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    phone: "",
    email: "",
    address: "",
    about: "",
    subject_ids: [] as number[],
  });
  // Fetching the subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}subjects`);
        setSubjects(response.data.data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    if (teacherId) {
      const fetchTeacher = async () => {
        try {
          const res = await axios.get(`${apiUrl}teachers/${teacherId}`);
          const teacher = res.data.data;

          setFormData({
            name: teacher.name,
            qualification: teacher.qualification,
            phone: teacher.phone,
            email: teacher.email,
            address: teacher.address,
            about: teacher.bio,
            subject_ids: teacher.subjects.map((s: any) => s.id),
          });

          if (teacher.profile_picture) {
            setPreview(`${imageUrl}public/storage/${teacher.profile_picture}`);
          }
        } catch (err) {
          console.error("Error fetching teacher data:", err);
        }
      };

      fetchTeacher();
    }
  }, [teacherId]);

  const handleCheckboxChange = (subjectId: number) => {
    setFormData((prev) => {
      const alreadySelected = prev.subject_ids.includes(subjectId);
      const updated = alreadySelected
        ? prev.subject_ids.filter((id) => id !== subjectId)
        : [...prev.subject_ids, subjectId];
      return { ...prev, subject_ids: updated };
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((o) =>
      parseInt(o.value)
    );
    setFormData((prev) => ({ ...prev, subject_ids: selectedOptions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("qualification", formData.qualification);
    payload.append("bio", formData.about);
    payload.append("address", formData.address);

    formData.subject_ids.forEach((id, index) => {
      payload.append(`subject_ids[${index}]`, id.toString());
    });

    if (photo) {
      payload.append("profile_picture", photo);
    }

    const token = Cookies.get("token");

    try {
      if (teacherId) {
        payload.append("_method", "PUT");
        await axios.post(`${apiUrl}teachers/${teacherId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // alert("Teacher updated successfully!");
        toast.success("Teacher updated successfully!")
        
      } else {
        await axios.post(`${apiUrl}teachers`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // alert("Teacher created successfully!");
        toast.success("Teacher Created successfully!")
      }

      router.push("/admin/teachers");
    } catch (err: any) {
      console.error("Error saving teacher:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md font-poppins">
      <h1 className="text-3xl font-bold text-[#0949A3] mb-6">
        Add New Teacher
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Qualification
          </label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photo (optional)
          </label>
          <div className="flex items-center gap-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <p className="text-center">No Photo</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About Teacher
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Subjects
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {subjects.map((subject) => (
              <label
                key={subject.id}
                className="flex items-center gap-2 p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  value={subject.id}
                  checked={formData.subject_ids.includes(subject.id)}
                  onChange={() => handleCheckboxChange(subject.id)}
                />
                <span>{subject.name}</span>
              </label>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            You can select multiple subjects
          </p>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0949A3] text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
          >
            {loading ? "Saving..." : "Save Teacher"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

       <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
    </div>
  );
}

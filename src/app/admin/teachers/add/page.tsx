'use client'

import React, { useState } from 'react'

export default function AddTeacherPage() {
  const [photo, setPhoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    phone: '',
    email: '',
    about: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ ...formData, photo })
    alert('Teacher added (data logged in console)')
    // Replace this with your API call to save data
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md font-poppins">
      <h1 className="text-3xl font-bold text-[#0949A3] mb-6">Add New Teacher</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. John Doe"
          />
        </div>

        {/* Qualification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. M.Sc. Mathematics"
          />
        </div>

        {/* Photo (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo (optional)</label>
          <div className="flex items-center gap-4">
            {preview ? (
              <img src={preview} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Photo
              </div>
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. +977-98XXXXXXXX"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. teacher@school.edu.np"
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">About Teacher</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Short biography or experience"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#0949A3] text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Save Teacher
          </button>
        </div>
      </form>
    </div>
  )
}

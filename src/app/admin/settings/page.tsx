'use client'

import React, { useState } from 'react'

export default function SettingsPage() {
  const [logo, setLogo] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    schoolName: '',
    address: '',
    email: '',
    phone: '',
    about: '',
    openingTime: '',
  })

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ ...formData, logo })
    alert('Settings saved (console logged)')
    // You can call an API or upload logic here
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md p-6 mt-8 rounded-lg font-poppins">
      <h1 className="text-3xl font-bold mb-6 text-[#0949A3]">School Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">School Logo</label>
          <div className="mt-2 flex items-center gap-4">
            {preview ? (
              <img src={preview} alt="Logo preview" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                No Logo
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleLogoChange} className="text-sm" />
          </div>
        </div>

        {/* School Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">School Name</label>
          <input
            type="text"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2"
            required
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-sm font-medium text-gray-700">About School</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full border rounded-md p-2"
            required
          ></textarea>
        </div>

        {/* Opening Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Opening Time</label>
          <input
            type="time"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#0949A3] text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  )
}

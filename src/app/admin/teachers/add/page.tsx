'use client'

import { usePost } from '@/services/usePost'
import React, { useState } from 'react'


export default function AddTeacherPage() {
  const { post, loading, error } = usePost()
  const [photo, setPhoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    phone: '',
    email: '',
    address: '',
    about: '',
    subject_ids: [] as number[],
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

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((o) => parseInt(o.value))
    setFormData((prev) => ({ ...prev, subject_ids: selectedOptions }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = new FormData()
    payload.append('name', formData.name)
    payload.append('email', formData.email)
    payload.append('phone', formData.phone)
    payload.append('qualification', formData.qualification)
    payload.append('bio', formData.about)
    payload.append('address', formData.address)

    formData.subject_ids.forEach((id, index) => {
      payload.append(`subject_ids[${index}]`, id.toString())
    })

    if (photo) {
      payload.append('profile_picture', photo)
    }

    try {
      const response = await post('http://127.0.0.1:8000/api/teachers', payload)
      alert('Teacher created successfully!')
      console.log(response)
    } catch (err: any) {
  if (err.response?.status === 422) {
    console.error("Validation errors:", err.response.data.errors)
    alert("Validation failed. Check console.")
  } else {
    console.error("Error creating teacher", err)
    alert("An error occurred while creating teacher")
  }
}
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md font-poppins">
      <h1 className="text-3xl font-bold text-[#0949A3] mb-6">Add New Teacher</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo (optional)</label>
          <div className="flex items-center gap-4">
            {preview ? (
              <img src={preview} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <p className='text-center'>No Photo</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">About Teacher</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Subjects</label>
          <select
            multiple
            onChange={handleSubjectChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            {/* These options should be fetched dynamically from your backend or be hardcoded for now */}
            <option value="1">Math</option>
            <option value="2">Science</option>
            <option value="3">English</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">Hold CTRL to select multiple subjects</p>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0949A3] text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
          >
            {loading ? 'Saving...' : 'Save Teacher'}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { UploadCloud } from 'lucide-react'
import axios from 'axios'
import Cookies from 'js-cookie'

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    dob: '',
    gender: '',
    address: '',
    parentName: '',
    contact: '',
    email: '',
  })
  const [photo, setPhoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      setPreview(URL.createObjectURL(file))
    }
  }
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const data = new FormData();

  // Match backend field names
  data.append('student_name', formData.name);
  data.append('class', formData.class);
  data.append('dob', formData.dob);
  data.append('gender', formData.gender);
  data.append('address', formData.address);
  data.append('guardian_name', formData.parentName);
  data.append('phone', formData.contact);
  data.append('email', formData.email);

  if (photo) data.append('profile', photo);

  try {
    const res = await axios.post('http://localhost:8000/api/admission', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Authorization': `Bearer ${Cookies.get('token')}` // ← only if using auth
      },
    });

    if (res.data.status) {
      setSubmitted(true);
      setFormData({
        name: '',
        class: '',
        dob: '',
        gender: '',
        address: '',
        parentName: '',
        contact: '',
        email: '',
      });
      setPhoto(null);
      setPreview(null);
    }
  } catch (error: any) {
    console.error('Error submitting form:', error.response?.data || error);
  }
};


  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-30 font-poppins lg:my-40">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Student Admission Form
      </h1>

      {submitted && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
          ✅ Admission form submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Student Name" name="name" value={formData.name} onChange={handleChange} required />
          <Select
            label="Class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            options={Array.from({ length: 10 }, (_, i) => ({
              value: `${i + 1}`,
              label: `Class ${i + 1}`,
            }))}
            required
          />
          <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
            required
          />
          <Input label="Address" name="address" value={formData.address} onChange={handleChange} required />
          <Input label="Parent/Guardian Name" name="parentName" value={formData.parentName} onChange={handleChange} required />
          <Input label="Contact Number" name="contact" value={formData.contact} onChange={handleChange} required />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {preview && <img src={preview} alt="Preview" className="mt-2 max-h-40 rounded border" />}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center justify-center gap-2"
        >
          <UploadCloud className="w-5 h-5" />
          Submit
        </button>
      </form>
    </div>
  )
}

export default AdmissionForm

const Input = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
    />
  </div>
)

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  required?: boolean
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

'use client'

import React, { useState } from 'react'

export default function AddCoursePage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    curriculum: '',
    teachers: '',
    admissionInfo: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Course Data:', form)
    alert('Course added (logged in console)')
    // You can send this data to your backend via API here
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md font-poppins">
      <h1 className="text-3xl font-bold text-[#0949A3] mb-6">Add New Course</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. Web Development Bootcamp"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Brief overview of the course..."
          ></textarea>
        </div>

        {/* Curriculum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curriculum
          </label>
          <textarea
            name="curriculum"
            value={form.curriculum}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Detailed syllabus, module breakdowns..."
          ></textarea>
        </div>

        {/* Teachers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned Teachers
          </label>
          <input
            type="text"
            name="teachers"
            value={form.teachers}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. John Doe, Jane Smith"
          />
        </div>

        {/* Admission Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admission Information
          </label>
          <textarea
            name="admissionInfo"
            value={form.admissionInfo}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Admission process, fees, requirements..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#0949A3] text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Save Course
          </button>
        </div>
      </form>
    </div>
  )
}

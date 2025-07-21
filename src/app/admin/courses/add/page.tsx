'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

interface Teacher {
  id: number
  name: string
}

export default function AddCoursePage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    curriculum: '',
    addmission_info: '',
    teacher_ids: [] as number[],
  })

  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  // Fetch all teachers
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/teachers')
      .then((res) => {
        setTeachers(res.data.data || res.data) // adapt if needed
      })
      .catch((err) => console.error('Error loading teachers', err))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTeacherToggle = (teacherId: number) => {
    setForm((prev) => {
      const exists = prev.teacher_ids.includes(teacherId)
      return {
        ...prev,
        teacher_ids: exists
          ? prev.teacher_ids.filter((id) => id !== teacherId)
          : [...prev.teacher_ids, teacherId],
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      const token = Cookies.get("token")
      const res = await axios.post('http://localhost:8000/api/courses', form, {
        headers:{
          Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        }
      })
      alert('Course created successfully!')
      console.log('Response:', res.data)
    } catch (err: any) {
      console.error(err.response)
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else {
        alert('Failed to create course.')
      }
    }
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
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. Web Development Bootcamp"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
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

        {/* Assigned Teachers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned Teachers
          </label>
          <div className="border border-gray-300 rounded-md p-3 max-h-60 overflow-y-auto space-y-2">
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`teacher-${teacher.id}`}
                    checked={form.teacher_ids.includes(teacher.id)}
                    onChange={() => handleTeacherToggle(teacher.id)}
                  />
                  <label htmlFor={`teacher-${teacher.id}`}>
                    {teacher.name} (ID: {teacher.id})
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Loading teachers...</p>
            )}
          </div>
          {errors['teacher_ids.0'] && (
            <p className="text-red-500 text-sm">{errors['teacher_ids.0'][0]}</p>
          )}
        </div>

        {/* Admission Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admission Information
          </label>
          <textarea
            name="addmission_info"
            value={form.addmission_info}
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

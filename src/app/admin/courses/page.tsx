'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Course {
  id: number
  name: string
  description: string
  curriculum: string
  addmission_info: string
  duration?: string
  teachers?: { id: number; name: string }[]
  created_at: string
}

export default function CourseListPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/courses')
        setCourses(res.data.data || res.data)
      } catch (err: any) {
        setError('Failed to fetch courses.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md font-poppins">
      <h1 className="text-3xl font-bold text-[#0949A3] mb-6">All Courses</h1>

      {loading ? (
        <p className="text-gray-500">Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Teachers</th>
                <th className="p-3 text-left">Admission Info</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-semibold text-[#0949A3]">{course.name}</td>
                  <td className="p-3 text-sm text-gray-700 max-w-xs truncate">{course.description}</td>
                  <td className="p-3 text-sm">
                    {course.teachers?.map((t) => t.name).join(', ') || '—'}
                  </td>
                  <td className="p-3 text-sm text-gray-700">{course.addmission_info || '—'}</td>
                  <td className="p-3 text-sm text-gray-500">{new Date(course.created_at).toLocaleDateString()}</td>
                  <td className="p-3 text-sm">
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs">
                        Edit
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

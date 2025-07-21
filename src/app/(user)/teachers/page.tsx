'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { BookOpen } from 'lucide-react'
import Banner from '@/components/widgets/Banner'

// Type definitions based on your API response
interface Subject {
  id: number
  name: string
  code: string | null
  created_at: string
  updated_at: string
  pivot: {
    teacher_id: number
    subject_id: number
  }
}

interface Teacher {
  id: number
  name: string
  email: string
  phone: string
  address: string
  qualification: string
  bio: string
  profile_picture: string
  subjects: Subject[]
}

interface ApiResponse {
  status: boolean
  data: Teacher[]
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Fetch teachers data
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true)
        const response = await axios.get<ApiResponse>('http://localhost:8000/api/teachers')
        
        if (response.data.status) {
          setTeachers(response.data.data)
        } else {
          setError('Failed to fetch teachers data')
        }
      } catch (err) {
        console.error('Error fetching teachers:', err)
        setError('An error occurred while fetching teachers')
      } finally {
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [])

  // Helper function to get profile picture URL
  const getProfilePictureUrl = (profilePicture: string | null): string => {
    if (!profilePicture) {
      return '/default-avatar.png' // Fallback image
    }
    return `http://localhost:8000/storage/${profilePicture}`
  }

  // Create slug from teacher name
  const createSlug = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
  }

  // Handle teacher card click
  const handleTeacherClick = (teacher: Teacher) => {
    const slug = createSlug(teacher.name)
    router.push(`/teachers/${slug}?id=${teacher.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-poppins">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading teachers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-poppins">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-0 font-poppins">
        <Banner title='Teachers'/>
      <div className="max-w-7xl mx-auto py-30">
        {/* Teachers Grid */}
        {teachers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No teachers found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                onClick={() => handleTeacherClick(teacher)}
                className=" rounded-lg  hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 p-4"
              >
                {/* Circular Profile Picture */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <img
                      src={getProfilePictureUrl(teacher.profile_picture)}
                      alt={teacher.name}
                      className="md:w-40 md:h-40 w-20 h-20 rounded-full object-cover border-4 border-gray-100"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/default-avatar.png'
                      }}
                    />
                    {/* Online indicator or subject count badge */}
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                      {teacher.subjects.length}
                    </div>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="text-center">
                  {/* Name */}
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 leading-tight">
                    {teacher.name}
                  </h3>
                  
                  {/* Qualification */}
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {teacher.qualification}
                  </p>

                  {/* Subjects Preview */}
                  <div className="flex items-center justify-center text-xs text-blue-600">
                    <BookOpen className="h-3 w-3 mr-1" />
                    <span className="truncate">
                      {teacher.subjects.slice(0, 2).map(s => s.name).join(', ')}
                      {teacher.subjects.length > 2 && `...`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
           
        )}
      </div>
    </div>
  )
}
'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  ArrowLeft,
  User,
  Calendar
} from 'lucide-react'

// Type definitions
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
  data: Teacher
}

export default function TeacherDetailPage() {
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const teacherId = searchParams.get('id')
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL

  // Fetch individual teacher data
  useEffect(() => {
    if (!teacherId) {
      setError('Teacher ID is required')
      setLoading(false)
      return
    }

    const fetchTeacher = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setLoading(true)
        const response = await axios.get<ApiResponse>(`${apiUrl}teachers/${teacherId}`)
        
        if (response.data.status) {
          setTeacher(response.data.data)
        } else {
          setError('Teacher not found')
        }
      } catch (err: any) {
        console.error('Error fetching teacher:', err)
        if (err.response?.status === 404) {
          setError('Teacher not found')
        } else {
          setError('An error occurred while fetching teacher details')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTeacher()
  }, [teacherId])

  // Helper function to get profile picture URL
  const getProfilePictureUrl = (profilePicture: string | null): string => {
    if (!profilePicture) {
      return '/default-avatar.png'
    }
    return `${imageUrl}${profilePicture}`
  }

  // Format date helper
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Handle back navigation
  const handleBackClick = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading teacher details...</p>
        </div>
      </div>
    )
  }

  if (error || !teacher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <p className="text-lg font-medium">{error || 'Teacher not found'}</p>
            <button
              onClick={handleBackClick}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins md:py-30">
    

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <img
                  src={getProfilePictureUrl(teacher.profile_picture)}
                  alt={teacher.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/default-avatar.png'
                  }}
                />
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{teacher.name}</h1>
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  <span className="text-lg">{teacher.qualification}</span>
                </div>
                <p className="text-blue-100 text-lg max-w-2xl">
                  {teacher.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-2 text-blue-600" />
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <Mail className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-700">Email</span>
                    </div>
                    <a 
                      href={`mailto:${teacher.email}`}
                      className="text-blue-600 hover:text-blue-800 break-all"
                    >
                      {teacher.email}
                    </a>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-700">Phone</span>
                    </div>
                    <a 
                      href={`tel:${teacher.phone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {teacher.phone}
                    </a>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 md:col-span-2">
                    <div className="flex items-center mb-3">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-700">Address</span>
                    </div>
                    <p className="text-gray-600">{teacher.address}</p>
                  </div>
                </div>
              </div>

              {/* Subjects Sidebar */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                  Subjects
                </h2>
                
                <div className="space-y-4">
                  {teacher.subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                        {subject.code && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {subject.code}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Since {formatDate(subject.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-8 bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Statistics</h3>
                  <div className="text-sm text-blue-700">
                    <p>Total Subjects: <span className="font-medium">{teacher.subjects.length}</span></p>
                    <p>Teacher ID: <span className="font-medium">#{teacher.id}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
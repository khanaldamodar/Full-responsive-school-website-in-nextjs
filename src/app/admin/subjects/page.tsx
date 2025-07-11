'use client'

import { useFetch } from '@/services/useFetch'
import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

interface Subject {
  id: number
  name: string
  code?: string
  created_at: string
}

interface SubjectResponse {
  status: boolean
  data: Subject[]
}

export default function SubjectListPage() {
  const { data, loading, error } = useFetch<SubjectResponse>('http://127.0.0.1:8000/api/subjects')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSubjects = data?.data.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Subjects</h1>
            <p className="text-gray-500">Manage all available subjects</p>
          </div>
          <button className="mt-4 md:mt-0 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Subject
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or code..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-blue-600">Loading...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : filteredSubjects && filteredSubjects.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#0949A3] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">#</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Created At</th>
                  <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredSubjects.map((subject, index) => (
                  <tr key={subject.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{subject.name}</td>
                    <td className="px-6 py-4">{subject.code || 'N/A'}</td>
                    <td className="px-6 py-4">
                      {new Date(subject.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 rounded hover:bg-blue-100 text-blue-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded hover:bg-green-100 text-green-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded hover:bg-red-100 text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10 text-gray-500">No subjects found.</div>
          )}
        </div>
      </div>
    </div>
  )
}

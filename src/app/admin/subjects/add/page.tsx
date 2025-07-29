'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { usePost } from '@/services/usePost'


export default function AddSubjectPage() {
  const [subject, setSubject] = useState({ name: '', code: '' })
  const [success, setSuccess] = useState('')
  const { post, loading, error } = usePost()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject({ ...subject, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess('')

    if (!subject.name.trim()) {
      return
    }

    try {
       const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await post(`${apiUrl}subjects`, subject)
      
      if(response?.status !== 201) {
        throw new Error('Failed to add subject')
      }
      if(response.status ===201 && response.data) {
        setSuccess('Subject added successfully!')
        setSubject({ name: '', code: '' }) // Reset form on success
      }
      
    } catch {
      // error is handled inside the hook
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 font-poppins">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-6">
          <PlusCircle className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Add New Subject</h2>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Subject Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Computer Science"
              value={subject.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Subject Code */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Subject Code (optional)
            </label>
            <input
              id="code"
              name="code"
              type="text"
              placeholder="e.g. CSC101"
              value={subject.code}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Subject'}
          </button>
        </form>
      </div>
    </div>
  )
}

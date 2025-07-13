'use client'

import { usePost } from '@/services/usePost'
import React, { useState } from 'react'


export default function AddImagePage() {
  const { post, loading, error } = usePost()
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      alert('Please select an image')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', image)

    try {
      const res = await post('http://127.0.0.1:8000/api/gallery', formData)
      alert('Image uploaded successfully!')
      console.log(res)
    } catch (err: any) {
      if (err.response?.status === 422) {
        console.error('Validation errors:', err.response.data.errors)
        alert('Validation failed. Check console for details.')
      } else {
        console.error('Upload error:', err)
        alert('Something went wrong. Check console.')
      }
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md font-poppins">
      <h1 className="text-3xl font-bold text-[#0949A3] mb-6">Add Image to Gallery</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. Annual Function 2025"
          />
        </div>

        {/* Description (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Short description"
            rows={3}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Image</label>
          <div className="flex items-center gap-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded border"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 text-gray-400 rounded border">
                No Image
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0949A3] text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  )
}

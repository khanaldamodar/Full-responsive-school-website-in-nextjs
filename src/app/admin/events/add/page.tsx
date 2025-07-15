'use client'

import React, { useState } from 'react'
import { usePost } from '@/services/usePost'
import { UploadCloud } from 'lucide-react'

export default function AddEventPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [location, setLocation] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [aboutEvent, setAboutEvent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { post, loading, error } = usePost()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !eventDate) {
      alert('Title and Event Date are required.')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    if (description) formData.append('description', description)
    formData.append('event_date', eventDate)
    if (location) formData.append('location', location)
    if (organizer) formData.append('organizer', organizer)
    if (aboutEvent) formData.append('about_event', aboutEvent)
    if (image) formData.append('image', image)

    try {
      const result = await post('http://localhost:8000/api/events', formData)
      console.log('Posted:', result)
      setSuccess(true)
      setTitle('')
      setDescription('')
      setEventDate('')
      setLocation('')
      setOrganizer('')
      setAboutEvent('')
      setImage(null)
      setPreview(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-xl mt-10 font-poppins">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Add New Event</h1>

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          ✅ Event submitted successfully!
        </div> 
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Title" value={title} setValue={setTitle} required />
          <Input label="Event Date" type="date" value={eventDate} setValue={setEventDate} required />
        </div>

        {/* Grid Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Location" value={location} setValue={setLocation} />
          <Input label="Organizer" value={organizer} setValue={setOrganizer} />
        </div>

        {/* Textareas in Full Width */}
        <Textarea label="Description" value={description} setValue={setDescription} />
        <Textarea label="About Event" value={aboutEvent} setValue={setAboutEvent} />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
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
          {preview && (
            <img src={preview} alt="Preview" className="mt-3 max-h-40 rounded border" />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white font-semibold py-2 px-4 rounded shadow`}
        >
          {loading ? 'Submitting...' : (
            <>
              <UploadCloud className="inline mr-2 w-5 h-5" />
              Submit Event
            </>
          )}
        </button>
      </form>
    </div>
  )
}

// Reusable Input Component
const Input = ({
  label,
  value,
  setValue,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  setValue: (v: string) => void
  type?: string
  required?: boolean
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
    />
  </div>
)

// Reusable Textarea Component
const Textarea = ({
  label,
  value,
  setValue,
}: {
  label: string
  value: string
  setValue: (v: string) => void
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      rows={4}
      className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Optional..."
    />
  </div>
)

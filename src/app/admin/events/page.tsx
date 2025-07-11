'use client'

import { useFetch } from '@/services/useFetch'
import { Eye, Edit, Trash2, Plus, Search, Filter } from 'lucide-react'
import { useState } from 'react'

interface EventItem {
  id: number
  title: string
  description: string
  event_date: string
  location: string
  organizer: string
  about_event: string
  image: string
  created_at: string
}

interface EventResponse {
  status: boolean
  data: EventItem[]
}

export default function EventsPage() {
  const { data, loading, error } = useFetch<EventResponse>('http://127.0.0.1:8000/api/events')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked && data?.data) {
      setSelectedItems(data.data.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    setSelectedItems(checked ? [...selectedItems, id] : selectedItems.filter(i => i !== id))
  }

  const filteredData = data?.data?.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-poppins">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">School Events</h1>
            <p className="text-gray-600">List of all school events</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>

        <div className="mb-6">
          <div className="flex gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button className="bg-gray-200 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-300">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-600">Loading events...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">Error: {error}</div>
          ) : filteredData && filteredData.length > 0 ? (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredData.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Organizer</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((event, index) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(event.id)}
                        onChange={(e) => handleSelectItem(event.id, e.target.checked)}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={`http://127.0.0.1:8000/storage/${event.image.replace(/^.*[\\/]/, '')}`}
                        alt={event.title}
                        className="w-14 h-14 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = '/default.jpg'
                        }}
                      />
                    </td>
                    <td className="px-4 py-3">{event.title}</td>
                    <td className="px-4 py-3">
                      {new Date(event.event_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{event.location}</td>
                    <td className="px-4 py-3">{event.organizer}</td>
                    <td className="px-4 py-3 truncate max-w-xs" title={event.description}>
                      {event.description}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                          onClick={() => console.log('View', event.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800"
                          title="Edit"
                          onClick={() => console.log('Edit', event.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                          onClick={() => console.log('Delete', event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-500">No events found.</div>
          )}
        </div>
      </div>
    </div>
  )
}

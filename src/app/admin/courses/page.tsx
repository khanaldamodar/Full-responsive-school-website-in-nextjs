'use client'
import { useFetch } from '@/services/useFetch'
import Image from 'next/image'
interface GalleryItem {
  id: number
  title: string
  description: string
  image: string
  created_at: string
}

interface GalleryResponse {
  status: boolean
  data: GalleryItem[]
}

const page = () => {
  const { data, loading, error } = useFetch<GalleryResponse>('http://127.0.0.1:8000/api/gallery')

  return (
    <div className="p-6">
      <h2 className="tex font-poppinst-2xl font-bold mb-4">Gallery Items</h2>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && data?.data && data.data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item, index) => (
                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">
                    <img
                      src={`http://127.0.0.1:8000/storage/${item.image.replace(/^.*[\\/]/, '')}`}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = '/default.jpg'
                      }}
                    />
                  </td>
                  <td className="px-4 py-2">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-500">No gallery items found.</p>
      )}
    </div>
  )
}

export default page

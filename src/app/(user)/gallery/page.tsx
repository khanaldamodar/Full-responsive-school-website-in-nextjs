'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

interface GalleryItem {
  id: number
  title: string
  image: string
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/gallery')
        if (response.data.status && response.data.data) {
          setGalleryItems(response.data.data)
        } else {
          setError('Failed to load gallery images')
        }
      } catch (err: any) {
        setError('Error loading gallery: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const handleImageClick = (image: GalleryItem) => {
    setSelectedImage(image)
  }

  const closePopup = () => {
    setSelectedImage(null)
  }

  const getImageUrl = (imagePath: string) => {
    // Assumes public storage access is enabled via `php artisan storage:link`
    return `/`
  }

  return (
    <div className="px-4 md:px-20 lg:px-60 py-10 md:py-20 font-poppins">
      {loading ? (
        <div className="text-center text-lg">Loading gallery...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer group"
              onClick={() => handleImageClick(item)}
            >
              <div className="relative h-60 w-full overflow-hidden rounded-lg shadow-md">
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-2 text-center font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      )}

      {/* Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-lg p-4 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-black text-xl font-bold hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-3 text-center">
              {selectedImage.title}
            </h2>
            <div className="relative w-full h-[60vh]">
              <Image
                src={getImageUrl(selectedImage.image)}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery

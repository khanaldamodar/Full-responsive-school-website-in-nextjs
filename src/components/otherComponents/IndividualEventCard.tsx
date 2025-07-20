'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface IndividualEventCardProps {
  title: string
  date: string
  description: string
  location?: string
  image: string
}

const generateSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

const IndividualEventCard = ({
  title,
  date,
  description,
  location,
  image,
}: IndividualEventCardProps) => {
  const router = useRouter()
  const slug = generateSlug(title)

  console.log(image)

  const handleClick = () => {
    router.push(`/events/${slug}`)
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 w-full max-w-sm bg-white"
    >
      <div className="relative w-full h-60">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300"
        />
      </div>
      <div className="p-4 font-poppins">
        <h3 className="text-lg font-semibold text-center mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-1 text-left">{date}</p>
        <p className="text-sm text-gray-800 line-clamp-2">{description}</p>
        {location && (
          <p className="text-sm text-gray-500 mt-2 italic">📍 {location}</p>
        )}
      </div>
    </div>
  )
}

export default IndividualEventCard

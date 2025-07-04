'use client'

import { CalendarDays } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface NoticeCardProps {
  image: string
  title: string
  date: string
}

const IndividualNoticeCard: React.FC<NoticeCardProps> = ({ image, title, date }) => {
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <Link href={`/notices/${slug}`}>
      <div className="cursor-pointer bg-white rounded  overflow-hidden transition-transform hover:shadow-lg group font-poppins">
        {/* Image */}
        <div className="relative w-80 h-50 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-center text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm  mt-2 text-left flex items-center gap-3"><CalendarDays size={20} className='text-[#0949A3]' />{date}</p>
        </div>
      </div>
    </Link>
  )
}

export default IndividualNoticeCard

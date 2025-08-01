'use client'

import Image from 'next/image'
import React from 'react'

const newsData = [
  {
    id: 1,
    title: '1st International Conference 2025 Successfully Complete',
    subtitle: 'पहिलो अन्तर्राष्ट्रिय सम्मेलन सफलतापूर्वक सम्पन्न...',
    image: '/images/widgets/baner.jpg',
    date: 'Jan 23, 2025',
  },
  {
    id: 3,
    title: 'Parents Day',
    image: '/images/widgets/baner.jpg',
    date: 'Feb 16, 2023',
  },
  {
    id: 4,
    title: 'Annual Function',
    image: '/images/widgets/baner.jpg',
    date: 'Feb 16, 2023',
  },
  {
    id: 5,
    title: 'College Day',
    image: '/images/widgets/baner.jpg',
    date: 'Feb 16, 2023',
  },
]

const RecentNews = () => {
  return (
    <div className="bg-white rounded shadow-md overflow-hidden">
      <div className="bg-[#0949A3] px-4 py-3">
        <h2 className="text-white font-bold text-lg font-poppins">
          Recent News
        </h2>
      </div>
      <div className="divide-y px-4 py-2">
        {newsData.map((item) => (
          <div key={item.id} className="flex gap-4 py-3">
            <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm font-poppins leading-snug">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-xs text-gray-700 truncate font-poppins">
                  {item.subtitle}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1 font-poppins">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentNews

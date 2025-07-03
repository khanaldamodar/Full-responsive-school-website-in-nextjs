import Image from 'next/image'
import React from 'react'

interface BannerType {
  title: string
}

const Banner = ({ title }: BannerType) => {
  return (
    <div className="relative w-full h-[30vh]">
      {/* Background Image */}
      <Image
        src="/images/widgets/baner.jpg"
        alt="Banner Image"
        fill
        className="object-cover"
      />

      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-blue-600 opacity-20"></div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="z-10 text-white font-bold text-4xl font-poppins text-center">
          {title}
        </h1>
      </div>
    </div>
  )
}
export default Banner
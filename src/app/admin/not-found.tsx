import { MoveLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const notFound = () => {
  return (
    <div className='bg-[#F7F2D6] font-poppins text-gray-800 dark:bg-gray-900 dark:text-gray-200'>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        {/* <h1 className='text-6xl font-bold text-gray-800'>404</h1> */}
        <div className='relative w-64 h-64 md:w-150 md:h-150 overflow-hidden'>
          <Image
          src={"/images/error/error.png"}
          fill
          alt='404 Not Found'
          className='object-contain'
          />
        </div>
        <p className='text-2xl text-gray-600 mt-4 font-bold'>Page Not Found</p>
        <Link href='/admin/dashboard' className='mt-6 text-white  flex items-center gap-2 font-medium bg-blue-500 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-600'>
         <MoveLeft />
         Dashboard
        </Link>
      </div>



    </div>
  )
}

export default notFound
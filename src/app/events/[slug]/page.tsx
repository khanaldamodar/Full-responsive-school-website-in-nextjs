import React from 'react'
import { events } from '../page';
import Image from 'next/image';
import RecentBlogs from '@/components/widgets/RecentBlogs';
interface ParamsType {
    params: {
        slug: string;
    };
}
const page = ({params}: ParamsType) => {
      const event = events.find(
        (course) =>
            course.title.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "") ===
            params.slug.toLowerCase()
    );
  return (
     <div className='font-poppins py-40 flex items-center justify-center gap-60'>
            {/* titlee/ Content / Image  */}
            <div className='flex flex-col'>
                {/* Heading and date  */}
                <div className='flex flex-col gap-2 mb-10'>
                    <h1 className='text-[#0949A3] text-2xl font-bold'>{event?.title}</h1>
                    <p className='text-gray-500 text-sm mt-2 self-start'>{event?.date}</p>
                </div>
                {/* Image  */}
                <div className='relative w-full h-64 mb-10'>
                    <Image
                    fill
                    src={event.image}
                    alt={event.title}
                    className='object-cover rounded-lg'
                    />
                </div>
            </div>
            <div>
                <RecentBlogs/>
    
            </div>
        </div>
  )
}

export default page
import React from 'react'
import { DummyNotices } from '../page'
import RecentBlogs from '@/components/widgets/RecentBlogs';
import Image from 'next/image';
interface ParamsType {
    params: {
        slug: string;
    };
}
const page = ({params}:ParamsType) => {
const notice = DummyNotices.find(
        (course) =>
            course.title.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "") ===
            params.slug.toLowerCase()
    );

    if (!notice) {
        return <div className="text-center py-20">Notice not found</div>;
    }

  return (
    <div className='font-poppins py-40 flex items-center justify-center gap-60'>
        
        {/* titlee/ Content / Image  */}
        <div className='flex flex-col'>
            {/* Heading and date  */}

            <div className='flex flex-col gap-2 mb-10'>
                <h1 className='text-[#0949A3] text-2xl font-bold'>{notice.title}</h1>
                <p className='text-gray-500 text-sm mt-2 self-start'>{notice.date}</p>
            </div>


            {/* Image  */}
            <div className='relative w-full h-64 mb-10'>
                <Image
                fill
                src={notice.image}
                alt={notice.title}
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
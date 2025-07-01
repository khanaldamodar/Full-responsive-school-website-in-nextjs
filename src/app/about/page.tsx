import About from '@/components/aboutpage-components/About'
import RecentBlogs from '@/components/widgets/RecentBlogs'
import RecentNews from '@/components/widgets/RecentNews'
import React from 'react'

const page = () => {
  return (
    <div className='flex  justify-between px-40 py-40'>

        <About/>
        <div className='flex flex-col gap-20'>
        <RecentNews/>
        <RecentBlogs/>
        </div>

    </div>
  )
}

export default page
import About from '@/components/aboutpage-components/About'
import Banner from '@/components/widgets/Banner'
import RecentBlogs from '@/components/widgets/RecentBlogs'
import RecentNews from '@/components/widgets/RecentNews'
import React from 'react'

const page = () => {
  return (

  <>
  <Banner title="About Us" />
    <div className='flex flex-col lg:flex-row justify-between px-5 lg:px-40 lg:py-40'>
        <About/>
        <div className='flex flex-col gap-20'>
        <RecentNews/>
        <RecentBlogs/>
        </div>

    </div>
  </>
  )
}

export default page
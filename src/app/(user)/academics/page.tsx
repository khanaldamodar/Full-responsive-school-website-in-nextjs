import IndividualCourseCard from '@/components/otherComponents/IndividualCourseCard'
import Banner from '@/components/widgets/Banner'
import React from 'react'

const page = () => {
  return (
    <div>
        <Banner
          title="All Courses"
          />

          <div className='flex flex-col items-center justify-center font-poppins pt-10 bg-[#F7F8F9]'>

            {/* Heading */}
            <h1 className='text-3xl font-bold '>Our School Offers</h1>
            {/* Course List */}
          <IndividualCourseCard/>

          </div>
    </div>
  )
}

export default page

import IndividualNoticeCard from '@/components/otherComponents/IndividualNoticeCard'
import Banner from '@/components/widgets/Banner'
import React from 'react'

const DummyNotices = [
    {
        id: 1,
        title: 'Notice 1',
        date: 'Jan 23, 2025',
        image: '/images/widgets/baner.jpg',
    },
    {
        id: 2,
        title: 'Notice 2',
        date: 'Feb 16, 2023',
        image: '/images/widgets/baner.jpg',
    },
    ]

const page = () => {
  return (
    <div>
        <Banner title="Notices" />
        <div  className='flex items-center justify-center gap-10 max-w-6xl mx-auto py-20 px-4 md:px-0'>
            {
                DummyNotices.map((notice) => (
                   <IndividualNoticeCard title={notice.title} image={notice.image} date={notice.date} key={notice.id} />
                ))
            }
            
        </div>
    </div>
  )
}

export default page
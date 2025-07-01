import React from 'react'

interface ContactType{
    title: string
    detail: string
    icon: React.ReactNode
}

const ContactCard = ({title, detail, icon}: ContactType) => {
  return (
    <div className='font-poppins  hover:bg-[#0949A3] shadow-xl hover:text-white flex flex-col items-center justify-center gap-4 p-6 rounded-lg transition-colors duration-300'>
        <div className='text-3xl text-white bg-[#0949A3]  w-20 h-20 rounded-full hover:text-[#0949A3] hover:bg-white flex items-center justify-center'>
            {icon}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
        <p className='text-center '>{detail}</p>

    </div>
  )
}

export default ContactCard
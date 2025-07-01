import { Icon } from 'lucide-react';
import React from 'react'

type HeadingProps = {
  title: string;
  icon: React.ReactNode; // Optional icon prop if needed
};
const Heading = ({ title, icon }: HeadingProps) => {
  return (
    <div className="text-center my-10 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500">
        {title}
      </h1>
      <div className='flex items-center justify-center gap-4 mt-4'>

        <div>
            <div className='w-30 h-[2px] bg-blue-500'></div>
        </div>
        <div className='text-blue-500 text-2xl' >
            {icon}
        </div>
        <div>
            <div className='w-30 h-[2px] bg-blue-500'></div>
        </div>

      </div>
    </div>
  )
}

export default Heading
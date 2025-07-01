import React from "react";
import Heading from "../global/Heading";
import { FaGoogleScholar } from "react-icons/fa6";
import { BookOpenCheck, CalendarCheck, Coffee, Medal } from "lucide-react";

const OurFacilities = () => {

    const facilities = [
        {
            title: "Library",
            description: "A well-stocked library with a wide range of books and resources.",
            // icon: <FaGoogleScholar className="text-4xl text-blue-500" />
            icon: <CalendarCheck className="text-4xl" size={60}/>
        },
        {
            title: "Science Lab",
            description: "State-of-the-art science laboratories for practical learning.",
            icon: <BookOpenCheck size={60} />
        },
        {
            title: "Sports Facilities",
            description: "Modern sports facilities to promote physical education.",
            icon: <Medal size={60} />
        },
        {
            title: "Canteen",
            description: "Effective Student support system",
            icon: <Coffee  size={60} />
        }
    ]
  return (
    <div className="bg-[#F7F2D6] py-10">

    <div className="font-poppins container mx-auto mt-60 ">
        {/* Heading */}
      <Heading title="Our Facilities" icon={<FaGoogleScholar />} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-20">
          {facilities.map((facility, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center  text-blue-500 mb-4">
                {facility.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>
          ))}
        </div>
    </div>
    </div>

  );
};

export default OurFacilities;

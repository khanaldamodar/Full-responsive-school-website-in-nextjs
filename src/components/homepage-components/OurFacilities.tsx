import React from "react";
import Heading from "../global/Heading";
import { FaGoogleScholar } from "react-icons/fa6";
import { BookOpenCheck, CalendarCheck, Coffee, Medal } from "lucide-react";

const OurFacilities = () => {
  const facilities = [
    {
      title: "Library",
      description: "A well-stocked library with a wide range of books and resources.",
      icon: <CalendarCheck className="text-blue-500" size={60} />,
    },
    {
      title: "Science Lab",
      description: "State-of-the-art science laboratories for practical learning.",
      icon: <BookOpenCheck className="text-blue-500" size={60} />,
    },
    {
      title: "Sports Facilities",
      description: "Modern sports facilities to promote physical education.",
      icon: <Medal className="text-blue-500" size={60} />,
    },
    {
      title: "Canteen",
      description: "Effective Student support system",
      icon: <Coffee className="text-blue-500" size={60} />,
    },
  ];

  return (
    <div className="bg-[#F7F2D6] py-20 px-4 sm:px-6 lg:px-0">
      <div className="font-poppins container mx-auto">
        {/* Heading */}
        <Heading title="Our Facilities" icon={<FaGoogleScholar />} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{facility.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold text-center mb-2">
                {facility.title}
              </h3>
              <p className="text-gray-600 text-center text-sm md:text-base">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurFacilities;

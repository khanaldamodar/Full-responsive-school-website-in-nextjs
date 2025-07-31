"use client"
import Image from "next/image";
import React from "react";
import { GiSchoolBag } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { SiSemanticscholar } from "react-icons/si";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const features = [
    {
      title: "Quality Education",
      description: "We provide top-notch education with experienced teachers.",
      icon: <SiSemanticscholar />,
    },
    {
      title: "Extracurricular Activities",
      description: "We encourage students to participate in various extracurricular activities.",
      icon: <GiSchoolBag />,
    },
    {
      title: "Modern Facilities",
      description: "Our school is equipped with modern facilities to enhance learning.",
      icon: <IoBookSharp />,
    },
  ];

  return (
    <div className="font-poppins bg-[#fafafa] pt-20">
      {/* Top section */}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-4 sm:px-6 lg:px-30">
        {/* Left Text Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 lg:gap-8 w-full lg:w-1/2">
          <h2 className="text-blue-500 font-semibold text-sm sm:text-base">JOIN US</h2>

          <h1 className="text-blue-500 font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            25K+ STUDENTS TRUST US
          </h1>

          <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium max-w-xl">
            Every day brings with it a fresh set of learning possibilities.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="bg-[#0070f3] text-white px-6 py-2 rounded-lg hover:bg-[#005bb5] transition duration-300" onClick={() => router.push('/admission')}>
              Get Started
            </button>
            <button className="bg-transparent border border-[#0070f3] text-[#0070f3] px-6 py-2 rounded-lg hover:bg-[#0070f3] hover:text-white transition duration-300" onClick={() => router.push('/about')}>
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] lg:w-1/2">
          <Image
            src="/images/heropage/placeholder.png"
            alt="Hero Image"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Bottom Features Section */}
      <div className="container mx-auto mt-16 lg:mt-24 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="flex items-center justify-center mb-4 w-20 h-20 rounded-full bg-blue-500 text-white text-4xl mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

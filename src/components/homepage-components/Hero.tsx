import Image from "next/image";
import React from "react";
import { GiSchoolBag } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { SiSemanticscholar } from "react-icons/si";

const Hero = () => {

    const features= [
        {
            title: "Quality Education",
            description: "We provide top-notch education with experienced teachers.",
            icon: <SiSemanticscholar />

        },
        {
            title: "Extracurricular Activities",
            description: "We encourage students to participate in various extracurricular activities.",
            icon: <GiSchoolBag />

        },
        {
            title: "Modern Facilities",
            description: "Our school is equipped with modern facilities to enhance learning.",
            icon: <IoBookSharp />

        }
    ]
  return (
    <div className="font-poppins h-[100vh] bg-[#fafafa] py-20">

        {/* Top section  */}
      <div className="container mx-auto flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center text-center gap-10">
          {/* For small Head  */}
          <div className="self-start">
            <h1 className="text-blue-500 font-semibold">JOIN US</h1>
          </div>

          {/* Main Heading */}
          <div>
            <h1 className="text-blue-500 font-bold text-4xl md:text-5xl text-nowrap ">
              25K+ STUDENTS TRUST US
            </h1>
          </div>
          <div>
            <p className="text-gray-600 mt-4 text-lg md:text-xl lg:text-2xl xl:text-2xl max-w-2xl font-semibold">
              Every day brings with it a fresh set of learning possibilities.
            </p>
          </div>

          {/* Buttons  */}
          <div className="flex gap-4 mt-8">
            <button className="bg-[#0070f3] text-white px-6 py-2 rounded-lg hover:bg-[#005bb5] transition duration-300">
              Get Started
            </button>
            <button className="bg-transparent border border-[#0070f3] text-[#0070f3] px-6 py-2 rounded-lg hover:bg-[#0070f3] hover:text-white transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT SIDE WITH THE IMAGE */}
        <div className="relative h-full w-full">
            <Image
            fill
            alt="Hero Image"
            src="/images/heropage/placeholder.png"
            className="object-contain "
            />

        </div>
      </div>

      {/* Bottom Sectio With School Features */}

      <div className="relative -top-20 container mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-xl transition-shadow duration-300">
              {feature.icon && (
                <div className="flex items-center justify-center text-4xl text-white bg-blue-500 mb-4 w-20 h-20 rounded-full">
                  {feature.icon}
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

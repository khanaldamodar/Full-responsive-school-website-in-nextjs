import { GraduationCap } from "lucide-react";
import React from "react";
import Heading from "../global/Heading";

const OurProgramme = () => {
  const courses = [
    {
      title: "Bachelor of Business Studies (BBS)",
      category: "Management",
      image:
        "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
      duration: "4 Years",
      semesters: 8,
    },
    {
      title: "Bachelor of Science (B.Sc.)",
      category: "Science",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      duration: "4 Years",
      semesters: 8,
    },
    {
      title: "Bachelor of Education (B.Ed.)",
      category: "Education",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      duration: "4 Years",
      semesters: 8,
    },
  ];

  return (
    <div className="bg-[#fafafa] py-20 font-poppins">
      <Heading title="Our Programme" icon={<GraduationCap />} />
      <div className="container mx-auto my-20 text-xl px-6 md:px-60 text-center font-medium text-gray-600">
        <p>
          In addition to the School's common benefits, we recommend people-friendly extracurricular activities,
          sports, a convenient and quiet place to study, as well as a conducive academic environment for learning.
        </p>
      </div>

      {/* Responsive container with dynamic layout */}
      <div
        className={`flex flex-wrap justify-center gap-6 px-6 md:px-20`}
      >
        {courses.map((course, idx) => {
          const match = course.title.match(/\(([^)]+)\)/);
          const shortForm = match ? match[1] : course.title;

          return (
            <div
              key={idx}
              className="relative w-[90%] sm:w-[45%] lg:w-[22%] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col items-center p-0 group h-60"
              style={{ minHeight: "15rem" }}
            >
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 hover:opacity-80"
                style={{ backgroundImage: `url(${course.image})` }}
              />
              <div className="absolute inset-0  bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                <div className="text-white text-center mb-50">
                  <p className="text-base font-medium">
                    {course.duration} | {course.semesters} Semesters
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0  bg-opacity-60 py-2 px-4 flex justify-center">
                <h1 className="text-white text-xl font-bold tracking-wide uppercase">
                  {shortForm}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurProgramme;

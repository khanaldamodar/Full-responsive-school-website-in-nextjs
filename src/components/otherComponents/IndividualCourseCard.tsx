
import React from "react";
import courses from "@/dummy-data/data";
import Link from "next/link";

const IndividualCourseCard = () => {

  return (
    <div className="bg-[#fafafa] pb-20 font-poppins">

      <div className="container mx-auto my-20 text-xl px-6 md:px-60 text-center font-medium text-gray-600">
        <p>
          In addition to the School's common benefits, we recommend people-friendly extracurricular activities,
          sports, a convenient and quiet place to study, as well as a conducive academic environment for learning.
        </p>
      </div>

      {/* Responsive container with dynamic layout */}
      <div
        className={`flex flex-wrap justify-center gap-6 px-6 md:px-40`}
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
                <Link
                  href={`/academics/${course.category.toLowerCase()}`}>
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 hover:opacity-80"
                style={{ backgroundImage: `url(${course.image})` }}
              />
              <div className="absolute inset-0  bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                <div className="text-white text-center mb-50">
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0  bg-opacity-60 py-2 px-4 flex justify-center">
                <h1 className="text-white text-xl font-bold tracking-wide uppercase">
                  {shortForm}
                </h1>
              </div>
              </Link>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default IndividualCourseCard;

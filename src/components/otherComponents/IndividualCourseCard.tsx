"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";

const IndividualCourseCard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        setLoading(true);
        const response = await fetch(`${apiUrl}courses`);

        
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#fafafa] pb-20 font-poppins">
        <div className="container mx-auto my-20 text-xl px-6 md:px-60 text-center font-medium text-gray-600">
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#fafafa] pb-20 font-poppins">
        <div className="container mx-auto my-20 text-xl px-6 md:px-60 text-center font-medium text-red-600">
          <p>Error loading courses: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] pb-20 font-poppins">

      <div className="container mx-auto my-10 md:my-20 md:text-xl px-6 lg:px-60 text-justify md:text-center font-medium text-gray-600">
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
          // Extract short form from course name if it has parentheses, otherwise use the full name
            const match = course.name.match(/\(([^)]+)\)/);
            const shortForm = match ? match[1] : course.name;
            const slug = `${course.id}-${course.name.toLowerCase().replace(/\s+/g, '-')}`;

          return (
            <div
              key={course.id || idx}
              className="relative w-[90%] sm:w-[45%] lg:w-[22%] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col items-center p-0 group h-60"
              style={{ minHeight: "15rem" }}
            >
              <Link
                href={`/academics/${slug}`}>
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 hover:opacity-80"
                  style={{ 
                    backgroundImage: course.image ? `url(${course.image})` : `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    backgroundColor: course.image ? 'transparent' : '#667eea'
                  }}
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
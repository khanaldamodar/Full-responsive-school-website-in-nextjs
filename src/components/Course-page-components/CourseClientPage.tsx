// src/components/CourseClientPage.tsx
"use client";


import ApplyNow from "@/components/widgets/ApplyNow";
import Banner from "@/components/widgets/Banner";
import CourseOverview from "@/components/widgets/CourseOverview";
import SimilarCourses from "@/components/widgets/SimilarCourses";
import React, { useState, useEffect } from "react";
// (include your existing UI code here with only one change:)
interface Course {
    id: number;
    name: string;
    description: string;
    curriculum: string;
    duration: string;
    addmission_info: string;
    teachers: Array<{
        id: number;
        name: string;
        email: string;
        phone: string;
        address: string;
        qualification: string;
        bio: string;
        profile_picture: string;
    }>;
}

export default function CourseClientPage({ slug }: { slug: string }) {
  // 👇 replace `params.slug` with just `slug`
     const [course, setCourse] = useState<Course | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [activeTab, setActiveTab] = useState("Description");
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/courses/${slug}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

 if (loading) {
        return (
            <div className="font-poppins py-20">
                <div className="text-center py-20">Loading course...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="font-poppins py-20">
                <div className="text-center py-20 text-red-600">Error: {error}</div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="font-poppins py-20">
                <div className="text-center py-20">Course not found</div>
            </div>
        );
    }

    const tabs = ["Description", "Curriculum", "Teachers", "Admission"];

    // Parse curriculum string into array if it's a string
    const curriculumArray = typeof course.curriculum === 'string' 
        ? course.curriculum.split(',').map(item => item.trim())
        : course.curriculum || [];

    return (
        <div className="font-poppins py-20">
            <Banner title={`Course / ${course.name}`} />

            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mt-10 gap-20 px-4 md:px-0">
                {/* Main Content */}
                <div className="flex-1 mb-4">
                    {/* Tab Buttons */}
                    <div className="flex justify-center lg:justify-start space-x-5 flex-wrap mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                    activeTab === tab
                                        ? "bg-[#0949A3] text-white shadow-lg"
                                        : "bg-gray-200 text-gray-700 hover:bg-[#0949A3]/80 hover:text-white"
                                }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white shadow-md rounded-lg py-8 px-4 mb-8">
                        {activeTab === "Description" && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-[#0949A3]">Course Overview</h2>
                                <p className="text-gray-700 leading-relaxed">{course.description}</p>
                            </div>
                        )}

                        {activeTab === "Curriculum" && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-[#0949A3]">Curriculum</h2>
                                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                    {curriculumArray.length > 0 
                                        ? curriculumArray.map((item: string, idx: number) => (
                                            <li key={idx}>{item}</li>
                                        ))
                                        : <p>No curriculum data available.</p>
                                    }
                                </ul>
                            </div>
                        )}

                        {activeTab === "Teachers" && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-[#0949A3]">Teachers</h2>
                                <div className="text-gray-700 space-y-4">
                                    {course.teachers && course.teachers.length > 0 
                                        ? course.teachers.map((teacher, idx) => (
                                            <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="flex-shrink-0">
                                                    {teacher.profile_picture ? (
                                                        <img 
                                                            src={`http://localhost:8000/storage/${teacher.profile_picture}`}
                                                            alt={teacher.name}
                                                            className="w-12 h-12 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-2xl">👨‍🏫</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{teacher.name}</h3>
                                                    <p className="text-sm text-gray-600">{teacher.qualification}</p>
                                                    {teacher.bio && <p className="text-sm mt-2">{teacher.bio}</p>}
                                                </div>
                                            </div>
                                        ))
                                        : <p>No teacher data available.</p>
                                    }
                                </div>
                            </div>
                        )}

                        {activeTab === "Admission" && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-[#0949A3]">Admission Info</h2>
                                <p className="text-gray-700">
                                    {course.addmission_info || "Admission information will be updated soon."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-80  flex flex-col gap-10  ">
                    <CourseOverview level={course.name} duration={course.duration} />
                    <SimilarCourses />
                    <ApplyNow/>
                </div>
            </div>
        </div>
    );
}

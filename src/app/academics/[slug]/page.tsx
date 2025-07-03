"use client";

import ApplyNow from "@/components/widgets/ApplyNow";
import Banner from "@/components/widgets/Banner";
import CourseOverview from "@/components/widgets/CourseOverview";
import SimilarCourses from "@/components/widgets/SimilarCourses";
import courses from "@/dummy-data/data";
import React, { useState } from "react";

interface ParamsType {
    params: {
        slug: string;
    };
}

const Page = ({ params }: ParamsType) => {
    const course = courses.find(
        (course) =>
            course.title.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "") ===
            params.slug.toLowerCase()
    );

    const [activeTab, setActiveTab] = useState("Description");

    if (!course) {
        return <div className="text-center py-20">Course not found</div>;
    }

    const tabs = ["Description", "Curriculum", "Teachers", "Admission"];

    return (
        <div className="font-poppins py-20">
            <Banner title={`Course / ${course.title}`} />

            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mt-10 gap-20 px-4 md:px-0">
                {/* Main Content */}
                <div className="flex-1 mb-4">
                    {/* Tab Buttons */}
                    <div className="flex justify-center lg:justify-start space-x-5 flex-wrap mb-8"></div>
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

                    {/* Tab Content */}
                    <div className="bg-white shadow-md rounded-lg py-8 px-4 mb-8">
                        {activeTab === "Description" && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-[#0949A3]">Course Overview</h2>
                                <p className="text-gray-700 leading-relaxed">{course.content}</p>
                            </div>
                        )}

                        {activeTab === "Curriculum" && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-[#0949A3]">Curriculum</h2>
                                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                    {course.curriculum?.map((item: string, idx: number) => (
                                        <li key={idx}>{item}</li>
                                    )) || <p>No curriculum data available.</p>}
                                </ul>
                            </div>
                        )}

                        {activeTab === "Teachers" && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-[#0949A3]">Teachers</h2>
                                <ul className="text-gray-700 space-y-3">
                                    {course.teachers?.map((teacher: string, idx: number) => (
                                        <li key={idx} className="flex items-center space-x-2">
                                            <span>👨‍🏫</span>
                                            <span>{teacher}</span>
                                        </li>
                                    )) || <p>No teacher data available.</p>}
                                </ul>
                            </div>
                        )}

                        {activeTab === "Admission" && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-[#0949A3]">Admission Info</h2>
                                <p className="text-gray-700">
                                    {course.admission || "Admission information will be updated soon."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-80  flex flex-col gap-10  ">
                    <CourseOverview level={course.category} duration={course.duration} />
                    <SimilarCourses />
                    <ApplyNow/>
                </div>
            </div>
        </div>
    );
};

export default Page;

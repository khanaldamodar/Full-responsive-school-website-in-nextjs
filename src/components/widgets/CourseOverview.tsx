import React from "react";

interface CourseOverviewProps {
  level: string;
  duration: string;
}

const CourseOverview = ({ level, duration }: CourseOverviewProps) => {
  return (
    <div className="bg-white rounded shadow-md overflow-hidden w-full">
      <div className="bg-[#0949A3] px-4 py-3">
        <h2 className="text-white font-bold text-lg font-poppins">
          Course Overview
        </h2>
      </div>
      <div className="divide-y px-4 py-2">
        <div className="flex gap-4 py-3">
          <div>
            <h3 className="font-semibold text-lg font-poppins leading-snug flex items-center justify-center gap-20 text-left">
             <span className="font-normal ">Level:</span>  <span className="font-semibold">{level}</span>
            </h3>
            <h3 className="font-semibold text-lg font-poppins leading-snug flex items-center justify-center gap-20 text-left ">
             <span className="font-normal">Duration: </span> <span className="font-semibold">{duration}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;

"use client"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Heading from "../global/Heading";
import { Newspaper } from "lucide-react";

const newsData = [
  {
    title: "College Hosts Annual Tech Fest",
    description: "A 3-day event showcasing student projects, workshops, and guest talks from industry experts.",
    image: "https://source.unsplash.com/400x300/?technology,event",
  },
  {
    title: "New Courses Introduced",
    description: "Our curriculum expands with AI, Data Science, and Cybersecurity starting this semester.",
    image: "https://source.unsplash.com/400x300/?education,books",
  },
  {
    title: "Scholarship Applications Open",
    description: "Apply now for merit-based scholarships for the upcoming academic year.",
    image: "https://source.unsplash.com/400x300/?scholarship,money",
  },
  {
    title: "Alumni Meet 2025 Announced",
    description: "Reconnect with classmates and share your success stories in our annual alumni gathering.",
    image: "https://source.unsplash.com/400x300/?alumni,university",
  },
  {
    title: "Research Paper Published",
    description: "Our faculty's paper on renewable energy was recently published in a global journal.",
    image: "https://source.unsplash.com/400x300/?research,science",
  },
];

const NewsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-12 bg-gray-100 font-poppins">
      {/* <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2> */}
      <Heading title="Latest News" icon={<Newspaper />} />
      <div className="container mx-auto my-20 text-xl px-6 md:px-60 text-center font-medium text-gray-600">
        <p>
          In addition to the School's common benefits, we recommend people-friendly extracurricular activities,
          sports, a convenient and quiet place to study, as well as a conducive academic environment for learning.
        </p>
      </div>
      <div className="px-6 max-w-7xl mx-auto">
        <Slider {...settings}>
          {newsData.map((news, index) => (
            <div key={index} className="px-3">
              <div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-600">{news.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewsSlider;

"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../global/Heading";
import { Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
}

const generateSlug = (text: string) =>
  text.toLowerCase().replace


const NewsSlider = () => {

  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([]);
  

  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${apiUrl}events`);
        // Assuming response.data is an array of events sorted by newest first
        
        setEvents(response.data.data.slice(0, 6)); 
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="py-12 bg-gray-100 font-poppins">
      <Heading title="Latest News" icon={<Newspaper />} />
      <div className="container mx-auto my-20 text-xl px-6 md:px-60 text-center font-medium text-gray-600">
        <p>
          In addition to the School's common benefits, we recommend people-friendly extracurricular activities,
          sports, a convenient and quiet place to study, as well as a conducive academic environment for learning.
        </p>
      </div>
      
      {/* Grid Layout for Events in Rows */}
      <div className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden h-full"
              onClick={() => {
              const slug = event.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
              window.location.href = `/events/${slug}`;
              }}
            >
              <img
              src={`${imageUrl}public/storage/${event.image}`}
              alt={event.title}
              className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {event.description.length > 150
                  ? `${event.description.slice(0, 150)}...`
                  : event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSlider;
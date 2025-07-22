"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description?: string;
  event_date: string;
  image: string;
}

const RecentBlogs = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/events");
        if (res.data.status && Array.isArray(res.data.data)) {
          const sortedEvents = res.data.data
            .sort(
              (a: Event, b: Event) =>
                new Date(b.event_date).getTime() -
                new Date(a.event_date).getTime()
            )
            .slice(0, 5);
          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-white rounded shadow-md overflow-hidden w-full">
      <div className="bg-[#0949A3] px-4 py-3">
        <h2 className="text-white font-bold text-lg font-poppins">
          Recent Events
        </h2>
      </div>
      <div className="divide-y px-4 py-2">
        {events.map((item) => (
          <Link
            key={item.id}
            href={`/events/${generateSlug(item.title)}`}
            className="block hover:bg-gray-50 rounded"
          >
            <div className="flex gap-4 py-3">
              <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={`http://localhost:8000/storage/${item.image}`}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm font-poppins leading-snug">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-gray-700 truncate font-poppins">
                    {item.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1 font-poppins">
                  {new Date(item.event_date).toDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import RecentBlogs from '@/components/widgets/RecentBlogs';
import dayjs from 'dayjs';

// Types
interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  event_date: string;
}

// Slug generator
const generateSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const IndividualEventPage = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const slug = params.slug?.toString();
  const imageUrl =process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const result = await axios.get(`${apiUrl}events`);
        const allEvents: Event[] = result.data.data;

        const found = allEvents.find(
          (event) => generateSlug(event.title) === slug
        );

        if (found) {
          setEvent(found);
        } else {
          setError('Event not found');
        }
      } catch (err: any) {
        setError('Failed to load event: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading) {
    return <div className="py-20 text-center text-xl">Loading event...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  if (!event) {
    return <div className="py-20 text-center text-gray-500">No event found</div>;
  }

  return (
    <div className="font-poppins py-40 flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-20 px-6 max-w-7xl mx-auto">
      {/* Content Area */}
      <div className="flex flex-col w-full lg:w-2/3">
        <h1 className="text-[#0949A3] text-3xl font-bold mb-2">{event.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {dayjs(event.event_date).format('YYYY-MM-DD')}
        </p>

        <div className="relative w-full md:h-96 mb-8 aspect-square">
          <Image
            src={`${imageUrl}${event.image}`}
            alt={event.title}
            fill
            unoptimized
            className="object-contain rounded-lg"
          />
        </div>

        <p className="text-gray-800 text-lg leading-relaxed mb-4">
          {event.description}
        </p>

        {event.location && (
          <p className="text-gray-600 italic">📍 {event.location}</p>
        )}
      </div>

      {/* Sidebar or Blog Suggestions */}
      <div className="w-full lg:w-1/3">
        <RecentBlogs />
      </div>
    </div>
  );
};

export default IndividualEventPage;

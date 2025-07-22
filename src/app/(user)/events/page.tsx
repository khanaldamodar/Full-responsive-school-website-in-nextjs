'use client';
import IndividualEventCard from "@/components/otherComponents/IndividualEventCard";
import Banner from "@/components/widgets/Banner";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

// Define the structure of an individual event
interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  event_date: string;
}

// Define the expected response from the API
interface EventApiResponse {
  status: boolean;
  data: Event[];
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await axios.get<EventApiResponse>("http://127.0.0.1:8000/api/events");

        if (result.data.status && result.data.data) {
          setEvents(result.data.data);
        } else {
          setError("Failed to fetch events");
        }
      } catch (err: any) {
        setError("Error fetching events: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-10 font-poppins">
        <Banner title="Events" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-30">
          <div className="text-center">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 font-poppins">
        <Banner title="Events" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-30">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 font-poppins">
      <Banner title="Events" />
      <div className="max-w-7xl mx-auto px-10  sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-30 ">
        {events.length > 0 ? (
          events.map((event) => (
            <IndividualEventCard
              key={event.id}
              title={event.title}
              date={dayjs(event.event_date).format("YYYY-MM-DD")}
              description={event.description}
              location={event.location}
              image={`http://127.0.0.1:8000/storage/${event.image}`}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No events available
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;

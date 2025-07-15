'use client'
import IndividualEventCard from "@/components/otherComponents/IndividualEventCard";
import Banner from "@/components/widgets/Banner";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs'

const page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:8000/api/events'); // Replace with your actual API endpoint
        
        if (result.data.status && result.data) {
          setEvents(result.data.data);
          console.log(result.data.data)
          console.log(dayjs(result.data.data.event_date).format('YYYY-MM-DD'))
        } else {
          setError('Failed to fetch events');
        }
      } catch (err) {
        setError('Error fetching events: ' + err.message);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-30">
        {events && events.length > 0 ? (
          events.map((event) => (
            <IndividualEventCard
              title={event.title}
              date={dayjs(event.event_date).format('YYYY-MM-DD')}
              description={event.description}
              location={event.location}
              image={`/`}
              key={event.id}
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

export default page;
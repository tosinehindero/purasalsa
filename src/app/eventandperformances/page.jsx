'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

export default function EventsAndPerformances() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from the API
  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-white to-custom-bluegreen text-white py-16 px-6 md:px-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Events & Performances</h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto">
          Experience the passion and energy of live Latin dance performances and events. Join us for an unforgettable experience!
        </p>
      </section>

      {/* Events List Section */}
      <section className="py-12 px-6 md:px-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            image={event.image}
            description={event.description}
            date={event.date}
            location={event.location}
          />
        ))}
      </section>
    </div>
  );
}

// Reusable Event Card Component
function EventCard({ title, image, description, date, location }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Image
        src={image}
        alt={`${title} image`}
        width={500}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-1">{date}</p>
        <p className="text-sm text-gray-500 mb-4">{location}</p>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
    </div>
  );
}


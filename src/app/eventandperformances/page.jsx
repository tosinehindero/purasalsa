'use client'
import Image from 'next/image';
import { useState } from 'react';

export default function EventsAndPerformances() {
   // Sample data array for events
   const events = [
      { title: "Salsa Night Extravaganza", image: "/event1.svg", description: "An evening of salsa performances by top dancers. Join us for an unforgettable salsa experience!", date: "April 15, 2024", location: "Dance Studio, NY" },
      { title: "Bachata Social Dance", image: "/event2.svg", description: "An evening dedicated to Bachata! Open for all skill levels with live DJ and dance floor.", date: "May 20, 2024", location: "Latin Club, CA" },
      { title: "Latin Dance Festival", image: "/event4.svg", description: "A weekend festival celebrating all Latin dance styles. Enjoy workshops, performances, and more.", date: "June 10-12, 2024", location: "Convention Center, FL" },
      { title: "Cha Cha Performance Night", image: "/event5.svg", description: "Showcase of Cha Cha routines and open dance floor. All levels are welcome.", date: "July 5, 2024", location: "The Grand Ballroom, TX" },
      { title: "Puerto Rican Salsa Festival", image: "/event6.svg", description: "Celebrating Puerto Rican culture with salsa performances and traditional music.", date: "August 18, 2024", location: "Cultural Center, NJ" },
      { title: "Merengue Celebration", image: "/event1.svg", description: "Come and dance to Merengue rhythms all night! Featuring special guest performances.", date: "September 25, 2024", location: "Dance Hall, IL" },
   ];

   const [selectedEvent, setSelectedEvent] = useState(null);

   // Function to open modal with selected event details
   const openModal = (event) => setSelectedEvent(event);

   // Function to close the modal
   const closeModal = () => setSelectedEvent(null);

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
                  onLearnMore={() => openModal(event)}
               />
            ))}
         </section>

         {/* Modal for Event Details */}
         {selectedEvent && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
               <div className="relative max-w-md w-full mx-4 bg-white rounded-lg overflow-hidden shadow-lg">
                  {/* Close Button */}
                  <button
                     onClick={closeModal}
                     className="absolute top-2 right-2 text-gray-700 text-2xl hover:text-gray-900"
                     aria-label="Close Modal"
                  >
                     &times;
                  </button>
                  <div className="p-6 text-center">
                     <Image
                        src={selectedEvent.image}
                        alt={selectedEvent.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover rounded-md"
                     />
                     <h3 className="text-2xl font-semibold mt-4">{selectedEvent.title}</h3>
                     <p className="text-sm text-gray-500 mt-2">{selectedEvent.date} - {selectedEvent.location}</p>
                     <p className="text-gray-600 mt-4">{selectedEvent.description}</p>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

// Reusable Event Card Component
function EventCard({ title, image, description, date, location, onLearnMore }) {
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
            <button
               onClick={onLearnMore}
               className="text-custom-bluegreen font-semibold hover:underline"
            >
               Learn More
            </button>
         </div>
      </div>
   );
}

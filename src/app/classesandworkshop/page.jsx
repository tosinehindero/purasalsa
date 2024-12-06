"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ClassesAndWorkshops() {
   const [classes, setClasses] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      async function fetchClasses() {
         try {
            const res = await fetch("/api/classes");
            if (!res.ok) throw new Error("Failed to fetch classes");
            const data = await res.json();
            setClasses(data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      }
      fetchClasses();
   }, []);

   return (
      <div className="bg-gray-100 text-gray-800">
         {/* Header Section */}
         <section className="relative bg-gradient-to-r from-white to-custom-bluegreen text-gray-600 py-16 px-6 md:px-16 text-center">
            <h1 className="font-parisienne text-4xl md:text-7xl font-bold mb-4">
               Classes & Workshops
            </h1>
            <p className="text-lg md:text-lg max-w-xl mx-auto">
               Discover a variety of Latin dance classes and workshops tailored for all
               skill levels. Dive into the rhythm and learn from the best.
            </p>
         </section>

         {/* Class Section */}
         <section className="py-12 px-6 md:px-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading && <p>Loading classes...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading &&
               !error &&
               classes.map((classItem) => (
                  <ClassCard
                     key={classItem._id}
                     title={classItem.title}
                     image={classItem.image}
                     description={classItem.description}
                     duration={classItem.duration}
                  />
               ))}
         </section>
      </div>
   );
}

function ClassCard({ title, image, description, duration }) {
   return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
         {image ? (
            <Image
               src={image}
               alt={`${title} image`}
               width={500}
               height={300}
               className="w-full h-48 object-cover"
            />
         ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
               <p>No Image Available</p>
            </div>
         )}
         <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-sm text-gray-500">Duration: {duration}</p>
            <Link
               href={`/contactme?title=${encodeURIComponent(
                  title
               )}&description=${encodeURIComponent(
                  description
               )}&duration=${encodeURIComponent(duration)}`}
            >
               <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">
                  Join Now
               </button>
            </Link>
         </div>
      </div>
   );
}

import Image from "next/image";
import Link from "next/link";

export default function ClassesAndWorkshop() {
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
            {/* Sample Class Card */}
            <ClassCard
               title="Exclusive One-on-One Dance Coaching"
               image=""
               description="Unlock your potential with personalized, one-on-one dance instruction tailored to your skill level and goals. Whether you’re preparing for a special event, looking to improve your technique, or simply wanting a private space to hone your skills, these sessions are designed to meet your needs."
               duration="60 minutes"
            />
            <ClassCard
               title="Group Lessons"
               image=""
               description="Take your Bachata skills to the next level with advanced footwork and spins."
               duration="75 minutes"
            />
            <ClassCard
               title="Choreography for Events"
               image=""
               description="Join our Merengue workshop to master the foundational steps and styling."
               duration="90 minutes"
            />
            <ClassCard
               title="Event Classes"
               image=""
               description="A fun and engaging class to learn the vibrant Cha Cha, suitable for all levels."
               duration="60 minutes"
            />
            <ClassCard
               title="Performance Salsa"
               image=""
               description="Build confidence on the stage with performance-focused Salsa routines."
               duration="120 minutes"
            />
            <ClassCard
               title="Private Lessons"
               image=""
               description="Get one-on-one personalized guidance to improve your dance technique."
               duration="Custom Duration"
            />
         </section>

         {/* Call-to-Action Section */}
         <section className="bg-gradient-to-r from-white to-custom-bluegreen text-gray-600 py-12 text-center px-6 md:px-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to Join?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
               Whether you're a beginner or an advanced dancer, we have classes and
               workshops tailored for you. Step onto the dance floor and let’s move!
            </p>
            <Link href="/contactme">
               <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg">
                  Sign Up Today
               </button>
            </Link>
         </section>
      </div>
   );
}

// Reusable Class Card Component
function ClassCard({ title, image, description, duration }) {
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
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-sm text-gray-500">Duration: {duration}</p>
         </div>
      </div>
   );
}

// classesandworkshop

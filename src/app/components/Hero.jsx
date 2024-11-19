"use client"; // This marks the component as a Client Component
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      >
        <source src="/herovideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-55 space-y-1">
        <Image
          src="/PURASALSAred2.svg"
          alt="Purasalsa Logo"
          width={300}
          height={300}
          priority
          className="animate-slideInRight mb-0" // Image slides in from the right
        />
        <h1 className="animate-slideInLeft text-xl md:text-3xl lg:text-5xl font-bold -mt-4">
          Welcome to PurasalsaMargieColon.com
        </h1>
        <p className="mt-4 mb-4 text-xl">Dance. Connect. Learn.</p>
        <Link href="/classesandworkshop" className="bg-green-700 hover:bg-red-700 text-white py-2 px-8 rounded-full shadow-lg mt-4">
          Book Here
        </Link>
      </div>

      {/* Dark Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-40 z-15"></div>
    </section>
  );
};

export default Hero;

"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function Gallery() {
   const [selectedImage, setSelectedImage] = useState(null);

   const images = [
      { src: '/danceg.svg', alt: 'Dance Performance 1' },
      { src: '/danceg.svg', alt: 'Dance Performance 2' },
      { src: '/danceg.svg', alt: 'Dance Performance 3' },
      { src: '/danceg.svg', alt: 'Dance Performance 4' },
      { src: '/danceg.svg', alt: 'Dance Performance 5' },
      { src: '/danceg.svg', alt: 'Dance Performance 6' },
      // Add more images as needed
   ];

   const openModal = (image) => setSelectedImage(image);
   const closeModal = () => setSelectedImage(null);

   return (
      <div className="bg-gray-100 text-gray-800">
         {/* Header Section */}
         <section className="bg-gradient-to-r from-white to-custom-bluegreen text-white py-16 px-6 md:px-16 text-center">
            <h1 className="font-parisienne text-4xl md:text-7xl font-bold mb-4">Gallery</h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto">
               Explore some of our best moments captured through the lens. Enjoy the energy, passion, and elegance of dance performances.
            </p>
         </section>

         {/* Gallery Grid */}
         <section className="py-12 px-6 md:px-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image, index) => (
               <div key={index} className="relative cursor-pointer" onClick={() => openModal(image)}>
                  <Image
                     src={image.src}
                     alt={image.alt}
                     width={200}
                     height={200}
                     className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
               </div>
            ))}
         </section>

         {/* Modal for Larger Image View */}
         {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
               <div className="relative max-w-lg w-full mx-4 bg-white rounded-lg overflow-hidden">
                  {/* Close Button */}
                  <button
                     onClick={closeModal}
                     className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300"
                     aria-label="Close"
                  >
                     &times;
                  </button>
                  <Image
                     src={selectedImage.src}
                     alt={selectedImage.alt}
                     width={600}
                     height={600}
                     className="w-full h-full object-cover rounded-lg"
                  />
                  <p className="text-center text-lg font-semibold py-4">{selectedImage.alt}</p>
               </div>
            </div>
         )}
      </div>
   );
}


"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Gallery() {
   const [images, setImages] = useState([]); // Dynamic images state
   const [loading, setLoading] = useState(true); // Loading state
   const [error, setError] = useState(null); // Error state
   const [selectedImage, setSelectedImage] = useState(null); // Selected image for modal

   // Fetch images from the API
   useEffect(() => {
      const fetchImages = async () => {
         try {
            const res = await fetch("/api/gallery");
            if (!res.ok) throw new Error("Failed to fetch images");
            const data = await res.json();
            setImages(data); // Set fetched images
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };
      fetchImages();
   }, []);

   const openModal = (image) => setSelectedImage(image);
   const closeModal = () => setSelectedImage(null);

   return (
      <div className="bg-gray-100 text-gray-800">
         {/* Header Section */}
         <section className="bg-gradient-to-r from-white to-custom-bluegreen text-white py-16 px-6 md:px-16 text-center">
            <h1 className="font-parisienne text-4xl md:text-7xl font-bold mb-4">
               Gallery
            </h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto">
               Explore some of our best moments captured through the lens. Enjoy the
               energy, passion, and elegance of dance performances.
            </p>
         </section>

         {/* Content */}
         <section className="py-12 px-6 md:px-16">
            {/* Loading State */}
            {loading && <p className="text-center text-lg">Loading images...</p>}

            {/* Error State */}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Gallery Grid */}
            {!loading && !error && images.length > 0 ? (
               <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                  {images.map((image, index) => (
                     <div
                        key={index}
                        className="relative cursor-pointer"
                        onClick={() => openModal(image)}
                     >
                        <div className="w-32 h-32">
                           {" "}
                           {/* Fixed container size */}
                           <Image
                              src={image.url} // Use the URL fetched from the API
                              alt={image.alt || `Image ${index + 1}`}
                              width={128} // Width of 128px
                              height={128} // Height of 128px
                              className="object-cover w-full h-full rounded-lg shadow-md"
                           />
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               !loading && <p className="text-center text-lg">No images found.</p>
            )}
         </section>

         {/* Modal for Larger Image View */}
         {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
               <div className="relative w-96 h-96 bg-white rounded-lg overflow-hidden mx-4">
                  {/* Close Button */}
                  <button
                     onClick={closeModal}
                     className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-green-500 hover:text-white focus:bg-red-500 focus:outline-none text-2xl font-bold px-4 py-2 rounded-full shadow-lg"
                     aria-label="Close"
                  >
                     &times;
                  </button>

                  {/* Modal Image */}
                  <div className="w-full h-full">
                     <Image
                        src={selectedImage.url}
                        alt={selectedImage.alt}
                        width={384} // Medium size (matches container width)
                        height={384} // Medium size (matches container height)
                        className="w-full h-full object-cover"
                     />
                  </div>

                  {/* Caption */}
                  <p className="text-center text-lg font-semibold py-4">
                     {selectedImage.alt || "Gallery Image"}
                  </p>
               </div>
            </div>
         )}
      </div>
   );
}

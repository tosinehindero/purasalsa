import React from "react";
import Image from "next/image";

function ImageModal({ isOpen, selectedMedia, onClose }) {
   if (!isOpen || !selectedMedia) return null;

   return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
         <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm md:max-w-md w-full mx-4 relative">
            {/* Close Button */}
            <button
               onClick={onClose}
               className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
               aria-label="Close Modal"
            >
               &times;
            </button>

            {/* Modal Content */}
            {selectedMedia.isVideo ? (
               <video
                  controls
                  src={selectedMedia.mediaSrc}
                  alt={selectedMedia.altText}
                  className="rounded-md mx-auto w-full h-auto"
               />
            ) : (
               <Image
                  src={selectedMedia.mediaSrc}
                  alt={selectedMedia.altText}
                  width={250}
                  height={250}
                  className="rounded-md mx-auto"
               />
            )}
            <h3 className="mt-4 text-gray-700 text-center text-xl font-semibold">
               {selectedMedia.altText}
            </h3>
            <p className="mt-2 text-center text-gray-600">
               {selectedMedia.origin}
            </p>
            <p className="mt-2 text-center text-gray-600">
               {selectedMedia.characteristics}
            </p>
            <p className="mt-2 text-center text-gray-600">
               {selectedMedia.music}
            </p>
         </div>
      </div>
   );
}

export default ImageModal;

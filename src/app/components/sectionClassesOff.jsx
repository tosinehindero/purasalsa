// "use client"
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import imagesData from "./classImages";
// import ImageModal from "./ImageModal";

// const SectionClassesOff = () => {
//   // State to manage modal visibility and selected image details
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Function to open the modal with selected image data
//   const openModal = (imageSrc, altText, origin, characteristics, music) => {
//     setSelectedImage({ imageSrc, altText, origin, characteristics, music });
//     setIsModalOpen(true);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImage(null);
//   };


//   return (
//     <div className="flex flex-col bg-orange-500 ">
//       <h2 className="font-parisienne mt-8 mb-10 text-center text-white text-5xl md:text-7xl">
//         Classes we offer
//       </h2>

//       {/* Image Grid */}
//       <section id="classesoffered" className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
//         {imagesData.map((image, index) => (
//           <div key={index} className="mb-4">
//             <Image
//               src={image.src}
//               alt={image.alt}
//               width={250}
//               height={250}
//               priority
//               className="mx-auto rounded-xl shadow-2xl cursor-pointer"
//               onClick={() => openModal(image.src, image.alt, image.origin, image.characteristics, image.music)}
//             />
//           </div>
//         ))}
//       </section>

//       {/* Button Below the Image Grid */}
//       <div className="flex justify-center mt-4">
//         <Link
//           href="/classesandworkshop"
//           className="bg-green-700 hover:bg-red-700 text-white py-2 px-8 rounded-full shadow-lg mt-4 mb-16"
//         >
//           Let us find you a class
//         </Link>
//       </div>

//       {/* Modal */}
//       <ImageModal isOpen={isModalOpen} selectedImage={selectedImage} onClose={closeModal}/>
//     </div>
//   );
// };

// export default SectionClassesOff;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import imagesData from "./classImages";
import ImageModal from "./ImageModal";

const SectionClassesOff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const openModal = (mediaSrc, altText, origin, characteristics, music, isVideo) => {
    setSelectedMedia({ mediaSrc, altText, origin, characteristics, music, isVideo });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
  };

  return (
    <div className="flex flex-col bg-orange-500">
      <h2 className="font-parisienne mt-8 mb-10 text-center text-white text-5xl md:text-7xl">
        Classes we offer
      </h2>

      {/* Image Grid */}
      <section id="classesoffered" className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
        {imagesData.map((item, index) => (
          <div key={index} className="mb-4">
            <Image
              src={item.src} // Thumbnail image
              alt={item.alt}
              width={250}
              height={250}
              priority
              className="mx-auto rounded-xl shadow-2xl cursor-pointer"
              onClick={() =>
                openModal(item.mediaSrc, item.alt, item.origin, item.characteristics, item.music, item.isVideo)
              }
            />
          </div>
        ))}
      </section>

      {/* Button Below the Image Grid */}
      <div className="flex justify-center mt-4">
        <Link
          href="/classesandworkshop"
          className="bg-green-700 hover:bg-red-700 text-white py-2 px-8 rounded-full shadow-lg mt-4 mb-16"
        >
          Let us find you a class
        </Link>
      </div>

      {/* Modal */}
      <ImageModal isOpen={isModalOpen} selectedMedia={selectedMedia} onClose={closeModal} />
    </div>
  );
};

export default SectionClassesOff;

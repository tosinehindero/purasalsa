import React from "react";
import Image from "next/image";
import {imageUrl7,imageUrl8,imageUrl9,imageUrl10,imageUrl11} from "./mediaUrls";

const SectionReviews = () => {
   return (
      <section id="reviews" className="">
        <h1 className="font-parisienne text-gray-500 text-center text-5xl mt-4 p-2 md:text-7xl">Testimonials</h1>
         <div className="mx-auto max-w-7xl p-2 md:p-10">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-4 md:grid-row-2">
               <div className="p-10 rounded-xl bg-white border-2 border-gray text-gray-500 md:col-span-2">
                  <div className="flex space-x-4 ">
                     <Image
                        src={imageUrl9}
                        alt="profile picture"
                        width={70}
                        height={70}
                        priority
                        className="rounded-full ring-2 ring-green-300"
                     />
                     <div className="text-sm">
                        <h4 className="opacity-90">Tasha Lee</h4>
                        <p className="opacity-50">verified client</p>
                     </div>
                  </div>
                  <p className="mt-6 text-xl">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                     itaque, mollitia laboriosam officiis enim excepturi et magnam
                     iusto neque tenetur praesentium asperiores veniam soluta
                     cupiditate.
                  </p>
               </div>
               <div className="p-10 rounded-xl bg-custom-bluegreen border-2 border-orange text-white">
                  <div className="flex space-x-4">
                     <Image
                        src={imageUrl7}
                        alt="profile picture"
                        width={70}
                        height={70}
                        priority
                        className="rounded-full ring-2 ring-green-300"
                     />
                     <div className="text-sm">
                        <h4 className="opacity-95">Samson Ehindero</h4>
                        <p className="opacity-60">verified client</p>
                     </div>
                  </div>
                  <p className="mt-6 text-xl">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ad
                     aliquid commodi perferendis quas soluta exercitationem labore! Ea,
                     non quaerat?
                  </p>
               </div>
               <div className="hidden p-10 rounded-xl bg-orange-500 border-2 text-white md:block md:row-span-2">
                  <div className="flex space-x-4">
                     <Image
                        src={imageUrl7}
                        alt="profile picture"
                        width={70}
                        height={70}
                        priority
                        className="rounded-full ring-2 ring-green-300"
                     />
                     <div className="text-sm">
                        <h4 className="opacity-95">Cesar Colon</h4>
                        <p className="opacity-60">verified client</p>
                     </div>
                  </div>
                  <p className="mt-6 text-xl">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
                     ab voluptas reprehenderit a explicabo nostrum eligendi sed libero
                     esse! Nihil soluta enim ducimus nostrum sit, eaque accusamus eius
                     consequuntur odit quam sapiente dicta vel magnam unde, rerum ut
                     quis. Deserunt quia harum expedita vero pariatur eius officia
                     quasi error, fugit quibusdam nostrum cum nulla repellat qui
                     facilis cumque sint saepe.
                  </p>
               </div>
               <div className="p-10 rounded-xl bg-gray-500 border-2 text-white">
                  <div className="flex space-x-4">
                     <Image
                        src={imageUrl8}
                        alt="profile picture"
                        width={70}
                        height={70}
                        priority
                        className="rounded-full ring-2 ring-green-300"
                     />
                     <div className="text-sm">
                        <h4 className="opacity-95">Tosin Ehindero</h4>
                        <p className="opacity-60">verified client</p>
                     </div>
                  </div>
                  <p className="mt-6 text-xl">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ad
                     aliquid commodi perferendis quas soluta exercitationem labore! Ea,
                     non quaerat?
                  </p>
               </div>
               <div className="p-10 rounded-xl bg-black border-2 text-white md:col-span-2">
                  <div className="flex space-x-4 ">
                     <Image
                        src={imageUrl10}
                        alt="profile picture"
                        width={70}
                        height={70}
                        priority
                        className="rounded-full ring-green-300"
                     />
                     <div className="text-sm">
                        <h4 className="opacity-90">Josiah Ehindero</h4>
                        <p className="opacity-50">verified client</p>
                     </div>
                  </div>
                  <p className="mt-6 text-xl">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ad
                     aliquid commodi perferendis quas soluta exercitationem labore! Ea,
                     non quaerat?
                  </p>
               </div>
               <div className="p-10 rounded-xl bg-orange-500 border-2 text-white md:hidden">
                  <div className="flex space-x-4">
                     <Image
                        src={imageUrl11}
                        alt="profile picture"
                        width={70}
                        height={70}
                        priority
                        className="rounded-full ring-2 ring-green-300"
                     />
                     <div className="text-sm">
                        <h4 className="opacity-95">malachi Ehindero</h4>
                        <p className="opacity-60">verified client</p>
                     </div>
                  </div>
                  <p className="mt-6 text-xl">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
                     ab voluptas reprehenderit a explicabo nostrum eligendi sed libero
                     esse! Nihil soluta enim ducimus nostrum sit, eaque accusamus eius
                     consequuntur odit quam sapiente dicta vel magnam unde, rerum ut
                     quis. Deserunt quia harum expedita vero pariatur eius officia
                     quasi error, fugit quibusdam nostrum cum nulla repellat qui
                     facilis cumque sint saepe.
                  </p>
               </div>
            </div>
         </div>
         {/* Add more content here */}
      </section>
   );
};

export default SectionReviews;

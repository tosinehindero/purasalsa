import React from "react";
import Image from "next/image";
import Link from "next/link";

const SectionClassesOff = () => {
   return (
      <div className="flex flex-col bg-orange-500 ">
         <h2 className="mt-8 mb-10 text-center text-white-500 text-2xl md:text-5xl text-center">
            Classes we offer
         </h2>
         <section
            id="classesoffered"
            className="md:flex justify-around items-center gap-x-4"
         >
            <div className="mb-4">
               {" "}
               <Image
                  src="/1.png"
                  alt="dancer1 logo"
                  width={250}
                  height={250}
                  priority
                  className="mx-auto rounded-xl shadow-2xl" // Remove any additional margin
               />
            </div>
            <div className="mb-4">
               <Image
                  src="/2.png"
                  alt="dancer2 logo"
                  width={250}
                  height={250}
                  priority
                  className="mx-auto rounded-xl shadow-2xl" // Remove any additional margin
               />
            </div>
            <div className="mb-4">
               <Image
                  src="/3.png"
                  alt="dancer3 logo"
                  width={250}
                  height={250}
                  priority
                  className="mx-auto rounded-xl shadow-2xl" // Remove any additional margin
               />
            </div>
         </section>
         <section className="md:flex justify-around items-center gap-x-2">
            <div className="mb-4">
               <Image
                  src="/4.png"
                  alt="dancer4 logo"
                  width={250}
                  height={250}
                  priority
                  className="mx-auto rounded-xl shadow-2xl" // Remove any additional margin
               />
            </div>
            <div className="mb-4">
               <Image
                  src="/5.png"
                  alt="dancer5 logo"
                  width={250}
                  height={250}
                  priority
                  className="mx-auto rounded-xl shadow-2xl" // Remove any additional margin
               />
            </div>
            <div className="mb-4">
               <Image
                  src="/6.png"
                  alt="dancer6 logo"
                  width={250}
                  height={250}
                  priority
                  className="mx-auto rounded-xl shadow-2xl" // Remove any additional margin
               />
            </div>
         </section>
         <div className="flex justify-center mt-4">
            <Link
               href="/classesandworkshop"
               className="bg-green-700 hover:bg-red-700 text-white py-2 px-8 rounded-full shadow-lg mt-4 mb-16"
            >
               Let us find you a class
            </Link>
         </div>
      </div>
   );
};

export default SectionClassesOff;

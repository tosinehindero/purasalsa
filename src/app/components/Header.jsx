"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function Header() {
   const [isOpen, setIsOpen] = useState(false);
   const [isVisible, setIsVisible] = useState(true);
   const [prevScrollPos, setPrevScrollPos] = useState(0);

   const toggleMenu = () => {
      setIsOpen((prev) => !prev);
   };

   useEffect(() => {
      const handleScroll = () => {
         const currentScrollPos = window.scrollY;
         const isScrollingUp = prevScrollPos > currentScrollPos;

         if (window.innerWidth >= 768) {
            setIsVisible(isScrollingUp || currentScrollPos < 100);
         } else {
            setIsVisible(true);
         }

         setPrevScrollPos(currentScrollPos);
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
   }, [prevScrollPos]);

   return (
      <header
         className={`fixed top-0 left-0 w-full flex items-center justify-between p-4 text-white z-30 transition-transform duration-300 ${
            isVisible ? "translate-y-0" : "-translate-y-full"
         }`}
      >
         <button
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
            onClick={toggleMenu}
         >
            {isOpen ? (
               <FaX className="w-6 h-6 text-gray-400" />
            ) : (
               <FaBars className="w-6 h-6 text-gray-400" />
            )}
         </button>

         <nav className="hidden md:flex ml-auto">
            <ul className="flex space-x-4">
               <li>
                  <Link href="/" className="hover:underline">
                     Home
                  </Link>
               </li>
               <li>
                  <Link href="/aboutme" className="hover:underline">
                     About Me
                  </Link>
               </li>
               <li>
                  <Link href="/contactme" className="hover:underline">
                     Contact Me
                  </Link>
               </li>
               <li>
                  <Link href="/classesandworkshop" className="hover:underline">
                     Classes and Workshop
                  </Link>
               </li>
               <li>
                  <Link href="/eventandperformances" className="hover:underline">
                     Events and Performance
                  </Link>
               </li>
               <li>
                  <Link href="/gallery" className="hover:underline">
                     Gallery
                  </Link>
               </li>
               <li>
                  <Link href="/merchandise" className="hover:underline">
                     Merchandise
                  </Link>
               </li>
            </ul>
         </nav>

         {isOpen && (
            <nav className="absolute top-16 left-0 w-full bg-orange-500 p-4 flex flex-col items-center md:hidden space-y-4">
               <Link href="/" onClick={toggleMenu} className="hover:underline">
                  Home
               </Link>
               <Link href="/aboutme" onClick={toggleMenu} className="hover:underline">
                  About Me
               </Link>
               <Link href="/contactme" onClick={toggleMenu} className="hover:underline">
                  Contact Me
               </Link>
               <Link href="/classesandworkshop" onClick={toggleMenu} className="hover:underline">
                  Classes and Workshop
               </Link>
               <Link href="/eventandperformances" onClick={toggleMenu} className="hover:underline">
                  Events and Performance
               </Link>
               <Link href="/gallery" onClick={toggleMenu} className="hover:underline">
                  Gallery
               </Link>
               <Link href="/merchandise" onClick={toggleMenu} className="hover:underline">
                  Merchandise
               </Link>
            </nav>
         )}
      </header>
   );
}


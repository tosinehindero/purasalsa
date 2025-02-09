"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
   const { data: session, status } = useSession();

   return (
      <footer className="bg-custom-bluegreen text-white py-8 px-4">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between">
            {/* Logo / Brand */}
            <div className="mb-6 md:mb-0">
               <h2 className="text-2xl font-bold">Purasalsa Margie Colon</h2>
               <p className="mt-2 text-gray-300 text-sm">
                  Dance. Connect. Learn. Discover the joy of dance with our expert-led
                  classes.
               </p>
               <Link href="/admin/dashboard" className="hover:text-gray-300">
                  Admin Dashboard
               </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex justify-around md:space-x-8 mb-6 md:mb-0">
               <div>
                  <h3 className="text-lg font-semibold">Explore</h3>
                  <ul className="mt-2 space-y-2 text-gray-300">
                     <li>
                        <Link href="/" className="hover:text-white">
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link href="/aboutme" className="hover:text-white">
                           About Me
                        </Link>
                     </li>
                     <li>
                        <Link href="/classesandworkshop" className="hover:text-white">
                           Classes
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/eventandperformances"
                           className="hover:text-white"
                        >
                           Events
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-lg font-semibold">Resources</h3>
                  <ul className="mt-2 space-y-2 text-gray-300">
                     <li>
                        <Link href="/gallery" className="hover:text-white">
                           Gallery
                        </Link>
                     </li>
                     <li>
                        <Link href="/contactme" className="hover:text-white">
                           Contact
                        </Link>
                     </li>
                     <li>
                        <Link href="/faq" className="hover:text-white">
                           FAQ
                        </Link>
                     </li>
                     <li>
                        <Link href="/merchandise" className="hover:text-white">
                           Merchandise
                        </Link>
                     </li>
                     <li>
                        {status === "authenticated" ? (
                           <button
                              onClick={() => signOut()}
                              className="hover:text-white focus:outline-none text-left"
                           >
                              Admin Logout
                           </button>
                        ) : (
                           <Link href="/login" className="hover:text-white">
                              Admin Login
                           </Link>
                        )}
                     </li>
                  </ul>
               </div>
            </div>

            {/* Social Media & Contact */}
            <div className="text-center md:text-left">
               <h3 className="text-lg font-semibold">Follow Us</h3>
               <div className="flex justify-center md:justify-start mt-2 space-x-4">
                  <Link
                     href="https://facebook.com"
                     target="_blank"
                     aria-label="Facebook"
                  >
                     <FaFacebookF className="text-gray-300 hover:text-white w-5 h-5" />
                  </Link>
                  <Link
                     href="https://twitter.com"
                     target="_blank"
                     aria-label="Twitter"
                  >
                     <FaTwitter className="text-gray-300 hover:text-white w-5 h-5" />
                  </Link>
                  <Link
                     href="https://instagram.com"
                     target="_blank"
                     aria-label="Instagram"
                  >
                     <FaInstagram className="text-gray-300 hover:text-white w-5 h-5" />
                  </Link>
               </div>
               <p className="mt-4 text-gray-400 text-sm">
                  © {new Date().getFullYear()} PurasalsaMargiecolo.com. All rights
                  reserved.
               </p>
               <p className="mt-4 text-gray-400 text-sm">
                  Website designed by Ijumu-CyberSoft LLC
               </p>
            </div>
         </div>
      </footer>
   );
}

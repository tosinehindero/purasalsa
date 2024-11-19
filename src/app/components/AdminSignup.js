// src/app/components/AdminSignup.js
import { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";

export default function AdminSignup() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const handleSignup = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post("/api/auth/signup", {
            username,
            password,
            role: "admin",
         });

         if (response.status === 201) {
            signIn("credentials", { username, password });
         } else {
            setError("Failed to create admin account");
         }
      } catch (err) {
         setError("Signup error. Please try again.");
      }
   };

   return (
      <div className="bg-white p-6 rounded-lg shadow-md w-1/2 max-w-md md:w-full ">
         <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Admin Signup
         </h2>
         {error && <p className="text-red-500 mb-4">{error}</p>}
         <form onSubmit={handleSignup} className="space-y-4">
            <div>
               <label className="block text-gray-700">Username</label>
               <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-2 mt-1 border rounded-md border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
               />
            </div>
            <div>
               <label className="block text-gray-700">Password</label>
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 mt-1 border rounded-md border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
               />
            </div>
            <button
               type="submit"
               className="w-full bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
            >
               Sign up as Admin
            </button>
         </form>
      </div>
   );
}

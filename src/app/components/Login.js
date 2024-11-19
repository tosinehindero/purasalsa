// src/app/components/Login.js
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (!result.ok) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-4">Welcome, {session.user.name}</p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-1/2 max-w-md md:w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Sign In
          </button>
        </form>
      </div>
    );
  }
}




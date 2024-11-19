// src/app/admin/dashboard.jsx
"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EventsAndPerformances from "@@/app/components/EventsAndPerformances";
import ClassesAndWorkshops from "@@/app/components/ClassesAndWorkshops";
import GalleryManagement from "@@/app/components/GalleryManagement";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (status === "unauthenticated") {
    return (
      <div className="p-6 bg-custom-bluegreen min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-xl font-semibold mb-4">Access Denied: Admins only</p>
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Sign In
        </button>
        <Link href="/" className="text-blue-300 underline mt-4">
          Return to Home Page
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-custom-bluegreen min-h-screen">
      <h1 className="ml-8 text-xl font-semibold mb-6 md:text-3xl">Admin Dashboard</h1>
      <div className="space-y-8">
        <EventsAndPerformances />
        <ClassesAndWorkshops />
        <GalleryManagement />
      </div>
    </div>
  );
}


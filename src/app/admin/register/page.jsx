// src/app/adminregisterPage.jsx
"use client";

import AdminSignup from "@@/app/components/AdminSignup";

export default function AdminRegisterPage() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-custom-bluegreen">
         <AdminSignup />
      </div>
   );
}

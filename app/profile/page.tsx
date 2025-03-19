import { CompleteProfile } from "@/components/CompleteProfile";
import { Profile } from "@/components/Profile";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Profile />
      </div>
    </main>
  );
};

export default page;

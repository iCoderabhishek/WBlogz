import { CompleteProfile } from "@/components/CompleteProfile";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <CompleteProfile />
      </div>
    </main>
  );
};

export default page;

"use client";

import ImageUpload from "@/components/ImageUpload";

const page = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <ImageUpload />
      </div>
    </main>
  );
};

export default page;

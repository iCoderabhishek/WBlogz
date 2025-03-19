import Feed from "@/components/Feed";
import NFeed from "@/components/NFeed";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/lib/constrants/data";
import React from "react";

const page = () => {
  return (
    <div>
      <main className="min-h-screen text-white bg-gradient-to-b  from-gray-900 to-black">
        {/* <Feed /> */}
        <FloatingNav navItems={navItems} />
        <NFeed />
      </main>
    </div>
  );
};

export default page;

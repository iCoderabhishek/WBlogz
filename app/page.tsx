"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (session) {
      router.push("/feed"); // Redirect logged-in users
    } else {
      router.push("/login"); // Redirect guests
    }
  }, [session, status, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A1F2C]">
      <p className="text-white">A Banger is Loding...</p>
    </div>
  );
}

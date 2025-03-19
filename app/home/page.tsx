"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/lib/constrants/data";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login"); // Use `replace` to prevent going back to a protected page
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  function Navbar({ className }: { className?: string }) {
    return (
      <div
        className={cn(
          "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
          className
        )}
      ></div>
    );
  }

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {session?.user?.email && <p>Email: {session.user.email}</p>}

      <button
        className="bg-amber-200 text-black rounded-sm p-2 mt-2"
        onClick={() => signOut({ callbackUrl: "/login" })}
        // issue is signOut is not working properly, it redirects to " GET /api/auth/signin?callbackUrl=%2Faut....."
      >
        Sign Out
      </button>

      {!session && (
        <div>
          <button onClick={() => router.push("/register")}>Register</button>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold">Try uploading your no*es</h1>
        <button
          onClick={() => router.push("/test-upload")}
          className="bg-blue-300 px-2  py-1 rounded-4xl"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default HomePage;

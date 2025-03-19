"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();

  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {}
  };

  return (
    <div>
      <button onClick={handleSignout}>Sign out</button>

      {session ? <div>welcome</div> : <Link href="/login">Login</Link>}
    </div>
  );
};

export default Header;

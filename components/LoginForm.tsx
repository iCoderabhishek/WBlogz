"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    // Wait for the session to be established
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Fetch profile status
    const response = await fetch("/api/user/profile-status");
    const data = await response.json();

    if (data.isProfileComplete) {
      router.push("/feed");
    } else {
      router.push("/complete-profile");
    }

    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);

    try {
      // Sign in with Google
      const result = await signIn("google", { callbackUrl: "/profile" });

      if (result?.error) {
        console.error("Google Sign-In Error:", result.error);
        setIsGoogleLoading(false);
        return;
      }

      // Wait for the session to be established
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Fetch profile completion status
      const profileStatusResponse = await fetch("/api/user/profile-status");
      const profileStatusData = await profileStatusResponse.json();

      if (profileStatusData.isProfileComplete) {
        router.push("/feed");
      } else {
        router.push("/complete-profile");
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error.message);
      setIsGoogleLoading(false);
    }
  };

  return (
    <Card className="border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">
          Welcome back
        </CardTitle>
        <CardDescription className="text-gray-400">
          Enter your info to access your account
        </CardDescription>
      </CardHeader>
      <button
        onClick={handleGoogleSignIn}
        className="font-normal text-white bg-purple-500/20 p-3.5 m-6 flex items-center justify-center rounded-sm mt-2"
      >
        {isGoogleLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          <>
            <Image
              src="/google-logo.png"
              alt="Google logo"
              width={30}
              height={30}
              className="pr-2"
            />{" "}
            Login with Google
          </>
        )}
      </button>
      <CardDescription className="text-center text-gray-400">
        or
      </CardDescription>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-700 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-700 text-white"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div className="text-white pt-2">
          Don't have your account?
          <Link href={"/register"} className="pl-[1px] text-blue-500">
            {" "}
            Signup
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

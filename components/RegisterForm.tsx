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
import { Mail, Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    // Handle signup logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Card className="border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">
          Create account
        </CardTitle>
        <CardDescription className=" text-gray-400">
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <button
        onClick={async () => {
          try {
            await signIn("google", { callbackUrl: "/profile" });
          } catch (error: any) {
            console.error("Google Sign-In Error:", error.message);
          }
        }}
        className="font-normal text-white bg-purple-500/20 p-3.5 m-6 flex items-center justify-center rounded-sm mt-2"
      >
        <Image
          src="/google-logo.png"
          alt="Google logo"
          width={30}
          height={30}
          className="pr-2 text-center"
        />{" "}
        Register with Google
      </button>
      <CardDescription className=" text-center text-gray-400">
        or
      </CardDescription>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 bg-gray-900/50 border-gray-700 text-white"
                required
              />
            </div>
          </div>

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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="pl-10 bg-gray-900/50 border-gray-700 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
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
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <div className="text-white pt-2">
          Already have your account?
          <Link href={"/login"} className="pl-[1px] text-blue-500">
            {" "}
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;

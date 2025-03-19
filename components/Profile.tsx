"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Camera, ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios"; // For making HTTP requests to your backend
import { FloatingNav } from "./ui/floating-navbar";
import { navItems } from "@/lib/constrants/data";

interface ProfileData {
  username: string;
  bio: string;
  avatar: string;
  cover: string;
}

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [profile, setProfile] = useState<ProfileData>({
    username: "Mollika",
    bio: "Member of ABC Industry",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop",
  });

  const [formData, setFormData] = useState(profile);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      // Upload to your backend
      const { data } = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prev) => ({
        ...prev,
        [e.target.name]: data.url, // Assuming your backend returns the URL of the uploaded file
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update profile in your backend
      const { data } = await axios.put("/api/profile", formData);

      setProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const posts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <FloatingNav navItems={navItems} />

      <Card className="border-none overflow-hidden bg-transparent">
        {/* Cover Image */}
        <div className="relative h-18 md:h-40 sm:h-40">
          <img
            src={profile.cover}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 backdrop-blur-sm border-[1px] border-white text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 rounded-full bg-black/50 backdrop-blur-sm border-2 border-white text-white"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black/90 border-2 border-blue-500/20 text-white">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-gray-900/50 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="bg-gray-900/50 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="relative">
                    <Input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("avatar")?.click()}
                      className="w-full bg-gray-900/50 border-gray-700 text-white"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Avatar
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover">Cover Image</Label>
                  <div className="relative">
                    <Input
                      id="cover"
                      name="cover"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("cover")?.click()}
                      className="w-full bg-gray-900/50 border-gray-700 text-white"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Cover
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-700 hover:bg-gray-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <CardContent className="relative px-6 pb-6">
          {/* Profile Info */}
          <div className="flex flex-col items-center -mt-12">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.username[0]}</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-2xl font-bold text-white">
              {profile.username}
            </h2>
            <p className="text-gray-400">{profile.bio}</p>

            <div className="flex gap-8 mt-4 text-center">
              <div>
                <p className="text-xl font-bold text-white">110</p>
                <p className="text-sm text-gray-400">Posts</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">800</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">500</p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 w-full">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Follow
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-white hover:bg-gray-800"
              >
                Message
              </Button>
            </div>
          </div>

          {/* Tabs and Posts */}
          <div className="mt-8">
            <Tabs
              defaultValue="all"
              className="w-full"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="w-full bg-gray-900/50">
                <TabsTrigger
                  value="all"
                  className="flex-1 data-[state=active]:bg-blue-600 text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="photo"
                  className="flex-1 data-[state=active]:bg-blue-600 text-white"
                >
                  Photo
                </TabsTrigger>
                <TabsTrigger
                  value="video"
                  className="flex-1 data-[state=active]:bg-blue-600 text-white"
                >
                  Video
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="photo" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {posts.slice(0, 2).map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="video" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {posts.slice(2, 4).map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
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
import { Upload as UploadIcon, Loader2 } from "lucide-react";
import FileUpload from "./FileUpload";
import { apiClient } from "@/lib/api-client";
import { imageFormData } from "@/lib/api-client";

const ImageUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter(); // Initialize router

  const handleUploadSuccess = (response: any) => {
    console.log("Upload success response:", response);
    setImageUrl(response.url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    setIsLoading(true);

    const imageData: imageFormData = {
      title,
      description,
      imgUrl: imageUrl,
      type: "other",
      controls: true,
    };

    try {
      const response = await apiClient.createImage(imageData);
      if (response) {
        console.log("Image uploaded successfully:", response);
        setImageUrl(null);
        setTitle("");
        setDescription("");

        // Redirect user after successful upload
        router.push("/feed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-2 border-blue-500/20 bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Upload Image
        </CardTitle>
        <CardDescription className="text-gray-400">
          Share your amazing photos with the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your image a title"
              className="bg-gray-900/50 border-gray-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description"
              className="bg-gray-900/50 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Image</Label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
              {imageUrl ? (
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    X
                  </button>
                </div>
              ) : (
                <FileUpload onSuccess={handleUploadSuccess} />
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading || !imageUrl}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;

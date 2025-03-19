import { NextResponse } from "next/server";
import Image from "@/models/Image.model";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body = await req.json();
    const { title, description, tags, imgUrl } = body;

    // Validate required fields
    if (!title || !imgUrl) {
      return NextResponse.json(
        { error: "Title and image URL are required fields." },
        { status: 400 }
      );
    }

    // Ensure tags is a string before calling split
    // const tagsArray = tags ? tags.split(",").map((tag: string) => tag.trim()) : [];

    // Create a new image document
    const newImage = new Image({
      title,
      description: description || "",
      // tags: tagsArray, // Use the processed tags array
      imgUrl,
      type: "other",
      controls: true,
    });

    // Save the image to the database
    await newImage.save();

    // Return the created image
    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error("Error creating image:", error);
    return NextResponse.json(
      { error: "Failed to create image.", details: error }, // Include error details
      { status: 500 }
    );
  }
}
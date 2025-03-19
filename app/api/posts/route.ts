import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Image from "@/models/Image.model";
import User from "@/models/User.model";

export async function GET(req: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "5");
    const lastId = searchParams.get("lastId") || null; // Get the last fetched post's ID

    // Fetch images with cursor-based pagination
    let images;
    if (lastId) {
      // Fetch posts older than the lastId
      images = await Image.find({ _id: { $lt: lastId } })
        .sort({ createdAt: -1 }) // Sort by latest first
        .limit(limit)
        .exec();
    } else {
      // Fetch the latest posts
      images = await Image.find()
        .sort({ createdAt: -1 }) // Sort by latest first
        .limit(limit)
        .exec();
    }

    // If no more posts are found, restart from the beginning
    if (images.length === 0) {
      images = await Image.find()
        .sort({ createdAt: -1 }) // Sort by latest first
        .limit(limit)
        .exec();
    }

    // Fetch user details for each image
    const posts = await Promise.all(
      images.map(async (image) => {
        const user = await User.findById(image.userId).exec();
        return {
          _id: image._id.toString(),
          title: image.title,
          description: image.description,
          imgUrl: image.imgUrl,
          createdAt: image.createdAt,
          user: {
            name: user?.username || "Anonymous",
            image: user?.avatar,
          },
        };
      })
    );

    // Return the posts
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts.", details: error },
      { status: 500 }
    );
  }
}

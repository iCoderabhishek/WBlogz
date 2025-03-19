import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User.model"; // Adjust the import path as needed
import { connectToDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Get session (use `getServerSession` in App Router)
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to DB
    await connectToDatabase();

    // Find user
    const user = await User.findOne({ email: session.user.email }).select("isProfileComplete");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ isProfileComplete: user.isProfileComplete }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile status:", error);
    return NextResponse.json({ error: "Failed to fetch profile status" }, { status: 500 });
  }
}

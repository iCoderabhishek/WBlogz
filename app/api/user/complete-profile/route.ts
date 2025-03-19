import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { getServerSession } from "next-auth";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username, phoneNumber, interests } = await req.json();

    await User.findOneAndUpdate(
      { email: session.user.email },
      {
        username,
        phoneNumber,
        interests,
        isProfileComplete: true, // Set profile completion to true
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

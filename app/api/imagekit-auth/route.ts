import { NextResponse } from "next/server";
import ImageKit from "imagekit";

export async function GET() {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
    });

    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("Error initializing ImageKit:", error);
    return NextResponse.json(
      { error: "Failed to initialize ImageKit" },
      { status: 500 }
    );
  }
}
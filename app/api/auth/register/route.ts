import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and Password are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();
        console.log("Connected to DB");

        const existingUser = await User.findOne({ email });
        console.log("Existing user:", existingUser);

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword });

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        );
    }
}


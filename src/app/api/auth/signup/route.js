// src/app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "@@/app/utils/mongo";

export async function POST(request) {
  try {
    const { username, password, role } = await request.json();
    
    // Connect to MongoDB and get the 'admins' collection
    const adminsCollection = await connectMongoDB("admin", "admins");

    // Check if user already exists
    const existingUser = await adminsCollection.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user document
    const newUser = { username, password: hashedPassword, role };
    await adminsCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "Admin user created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Signup error. Please try again." },
      { status: 500 }
    );
  }
}


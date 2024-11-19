// src/app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

let users = []; // Mock user database (for demonstration purposes)

export async function POST(request) {
  try {
    const { username, password, role } = await request.json();

    // Check if user already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = { username, password: hashedPassword, role };
    users.push(newUser); // Add user to the mock database

    return NextResponse.json(
      { message: "Admin user created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Signup error. Please try again." },
      { status: 500 }
    );
  }
}


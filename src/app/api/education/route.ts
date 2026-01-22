import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";
import { getAuthUser } from "@/lib/auth";

// GET - Fetch all education entries (Admin only)
export async function GET(request: NextRequest) {
  try {
    // Check authentication for admin access
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const educations = await Education.find().sort({ createdAt: -1 });
    return NextResponse.json({ educations }, { status: 200 });
  } catch (error) {
    console.error("Error fetching educations:", error);
    return NextResponse.json(
      { error: "Failed to fetch educations" },
      { status: 500 }
    );
  }
}

// POST - Create new education entry (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { degree, institution, period, description } = body;

    if (!degree || !institution || !period || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const education = new Education({
      degree,
      institution,
      period,
      description,
    });

    await education.save();
    return NextResponse.json(
      { message: "Education added successfully", education },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating education:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 }
    );
  }
}

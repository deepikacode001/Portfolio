import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";

// GET - Fetch all education entries for public display
export async function GET() {
  try {
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

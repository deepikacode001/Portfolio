import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";

// GET - Fetch all education entries for public display
export async function GET() {
  try {
    // Connect to database
    const db = await connectDB();
    if (!db) {
      console.error("❌ Database connection failed - MONGODB_URI not set");
      // Return empty array instead of error for public route
      return NextResponse.json({ educations: [] }, { status: 200 });
    }

    // Check if connection is ready
    if (db.connection.readyState !== 1) {
      console.warn("⚠️ Database connection not ready, state:", db.connection.readyState);
      return NextResponse.json({ educations: [] }, { status: 200 });
    }

    // Fetch educations
    const educations = await Education.find().sort({ createdAt: -1 }).lean();
    
    return NextResponse.json({ educations }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching educations:", error);
    console.error("Error details:", {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    });
    
    // Return empty array for public route to prevent page crash
    return NextResponse.json(
      { 
        educations: [],
        error: "Failed to fetch educations",
        message: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 200 } // Return 200 with empty array for public route
    );
  }
}

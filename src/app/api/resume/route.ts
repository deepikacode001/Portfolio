import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Resume from "@/models/Resume";
import { getAuthUser } from "@/lib/auth";

// GET - Fetch resume data (Admin only)
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

    // Get the resume document (should be only one)
    let resume = await Resume.findOne();
    
    // If no resume exists, create a default one
    if (!resume) {
      resume = new Resume({
        name: "Deepika Rajpurohit",
        email: "deepikaraj01999@gmail.com",
        title: "Full Stack Developer",
        location: "Rajasthan, India",
        profilePhoto: "",
        resumeFile: "",
      });
      await resume.save();
    }

    return NextResponse.json({ resume }, { status: 200 });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

// PUT - Update resume data (Admin only)
export async function PUT(request: NextRequest) {
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
    const { profilePhoto, resumeFile, name, email, title, location } = body;

    if (!name || !email || !title || !location) {
      return NextResponse.json(
        { error: "Name, email, title, and location are required" },
        { status: 400 }
      );
    }

    // Find existing resume or create new one
    let resume = await Resume.findOne();
    
    if (resume) {
      // Update existing resume
      resume.name = name;
      resume.email = email;
      resume.title = title;
      resume.location = location;
      if (profilePhoto !== undefined) resume.profilePhoto = profilePhoto;
      if (resumeFile !== undefined) resume.resumeFile = resumeFile;
      await resume.save();
    } else {
      // Create new resume
      resume = new Resume({
        name,
        email,
        title,
        location,
        profilePhoto: profilePhoto || "",
        resumeFile: resumeFile || "",
      });
      await resume.save();
    }

    console.log("Resume saved to database:", resume._id);
    
    return NextResponse.json(
      { 
        message: "Resume updated successfully", 
        resume 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { 
        error: "Failed to update resume",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

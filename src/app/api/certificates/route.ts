import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
import { getAuthUser } from "@/lib/auth";

// GET - Fetch all certificates (Admin only)
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

    const certificates = await Certificate.find().sort({ createdAt: -1 });
    return NextResponse.json({ certificates }, { status: 200 });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

// POST - Create new certificate (Admin only)
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
    const { title, companyName, internshipDuration, imageUrl } = body;

    if (!title || !companyName || !internshipDuration) {
      return NextResponse.json(
        { error: "Title, company name, and internship duration are required" },
        { status: 400 }
      );
    }

    const certificate = new Certificate({
      title,
      companyName,
      internshipDuration,
      imageUrl: imageUrl || "",
    });

    const savedCertificate = await certificate.save();
    console.log("Certificate saved to database:", savedCertificate._id);
    
    return NextResponse.json(
      { 
        message: "Certificate added successfully", 
        certificate: savedCertificate 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating certificate:", error);
    return NextResponse.json(
      { 
        error: "Failed to create certificate",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";
import { getAuthUser } from "@/lib/auth";

// PUT - Update education entry (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();
    const { degree, institution, period, description } = body;

    if (!degree || !institution || !period || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const education = await Education.findByIdAndUpdate(
      id,
      { degree, institution, period, description },
      { new: true, runValidators: true }
    );

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Education updated successfully", education },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating education:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}

// DELETE - Delete education entry (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const education = await Education.findByIdAndDelete(id);

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Education deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting education:", error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}

import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
  profilePhoto: string; // Base64 image
  resumeFile: string; // Base64 PDF or file URL
  name: string;
  email: string;
  title: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    profilePhoto: {
      type: String,
      default: "",
    },
    resumeFile: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Note: We'll handle single document in the API route (using findOne)

const Resume = mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);

export default Resume;

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";
import Certificate from "@/models/Certificate";
import Project from "@/models/Project";
import Resume from "@/models/Resume";
import { getAuthUser } from "@/lib/auth";

// POST - Seed database with sample data (Admin only)
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

    // Sample Education Data
    const educationData = [
      {
        degree: "Bachelor of Technology (B.Tech)",
        institution: "Rajasthan Technical University",
        period: "2020 - 2024",
        description: "Computer Science Engineering with focus on software development, algorithms, and database management. Active participation in coding competitions and technical workshops."
      },
      {
        degree: "Higher Secondary (12th)",
        institution: "CBSE Board",
        period: "2018 - 2020",
        description: "Science stream with Mathematics, Physics, and Chemistry. Achieved excellent academic performance."
      }
    ];

    // Sample Certificate Data
    const certificateData = [
      {
        title: "Full Stack Web Development Internship",
        companyName: "Tech Solutions Pvt. Ltd.",
        internshipDuration: "3 Months (June 2023 - August 2023)",
        imageUrl: ""
      },
      {
        title: "React.js & Node.js Certification",
        companyName: "Online Learning Platform",
        internshipDuration: "2 Months (April 2023 - May 2023)",
        imageUrl: ""
      },
      {
        title: "MongoDB Database Design",
        companyName: "MongoDB University",
        internshipDuration: "1 Month (March 2023)",
        imageUrl: ""
      }
    ];

    // Sample Project Data
    const projectData = [
      {
        name: "E-Commerce Platform",
        link: "https://github.com/deepikaraj01999/ecommerce-platform",
        summary: "Full-stack e-commerce application with user authentication, product management, and payment integration.",
        languages: "React, Node.js, MongoDB, Express, Stripe API",
        description: "A comprehensive e-commerce platform built with modern web technologies. Features include user registration and authentication, product catalog with search and filtering, shopping cart functionality, secure payment processing via Stripe, order management system, and admin dashboard for inventory management. The application uses JWT for authentication and MongoDB for data storage."
      },
      {
        name: "Task Management App",
        link: "https://github.com/deepikaraj01999/task-manager",
        summary: "Collaborative task management application with real-time updates and team collaboration features.",
        languages: "Next.js, TypeScript, MongoDB, Socket.io",
        description: "A real-time task management application that allows teams to collaborate effectively. Features include task creation and assignment, priority levels and due dates, real-time notifications, team member management, progress tracking with visual charts, and drag-and-drop task organization. Built with Next.js for server-side rendering and Socket.io for real-time communication."
      },
      {
        name: "Portfolio Website",
        link: "https://deepika-rajpurohit.vercel.app",
        summary: "Personal portfolio website showcasing projects, skills, education, and contact information.",
        languages: "Next.js, React, TypeScript, Tailwind CSS, MongoDB",
        description: "A responsive and modern portfolio website built with Next.js and TypeScript. Features include dark/light theme toggle, animated sections, project showcase with live demos, contact form with email integration, admin dashboard for content management, and fully responsive design for all devices. The website uses MongoDB for storing portfolio data and Resend API for email functionality."
      },
      {
        name: "Weather Dashboard",
        link: "https://github.com/deepikaraj01999/weather-dashboard",
        summary: "Real-time weather information application with location-based forecasts and interactive maps.",
        languages: "React, OpenWeatherMap API, Chart.js, Leaflet",
        description: "A weather dashboard application that provides real-time weather information for any location. Features include current weather conditions, 7-day weather forecast, interactive map with weather overlays, location search with autocomplete, weather charts and graphs, and responsive design for mobile and desktop. Uses OpenWeatherMap API for weather data and Leaflet for map visualization."
      },
      {
        name: "Blog Platform",
        link: "https://github.com/deepikaraj01999/blog-platform",
        summary: "Content management system for creating and managing blog posts with rich text editor.",
        languages: "Next.js, Sanity CMS, Tailwind CSS, Vercel",
        description: "A modern blog platform built with Next.js and Sanity CMS. Features include rich text editor for content creation, image upload and optimization, SEO-friendly URLs and meta tags, category and tag system, comment functionality, search and filter capabilities, and admin panel for content management. The platform uses Sanity for headless CMS and Vercel for deployment."
      },
      {
        name: "WordPress Custom Theme",
        link: "https://github.com/deepikaraj01999/wordpress-theme",
        summary: "Custom WordPress theme development with modern design and responsive layout.",
        languages: "PHP, WordPress, JavaScript, CSS, MySQL",
        description: "A custom WordPress theme developed from scratch with modern design principles. Features include fully responsive design, custom post types and taxonomies, widget-ready sidebar and footer areas, theme customization options, SEO optimization, fast loading times, and cross-browser compatibility. The theme follows WordPress coding standards and best practices."
      }
    ];

    // Sample Resume Data
    const resumeData = {
      name: "Deepika Rajpurohit",
      email: "deepikaraj01999@gmail.com",
      title: "Full Stack Developer",
      location: "Rajasthan, India",
      profilePhoto: "",
      resumeFile: ""
    };

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await Education.deleteMany({});
    // await Certificate.deleteMany({});
    // await Project.deleteMany({});
    // await Resume.deleteMany({});

    // Insert Education Data (only if empty, preserve existing)
    const existingEducation = await Education.countDocuments();
    let educationAdded = 0;
    if (existingEducation === 0) {
      await Education.insertMany(educationData);
      educationAdded = educationData.length;
      console.log(`✅ Added ${educationData.length} education entries`);
    } else {
      console.log(`ℹ️  Education entries already exist (${existingEducation} entries) - preserved`);
      educationAdded = existingEducation;
    }

    // Insert Certificate Data (only if empty, preserve existing)
    const existingCertificates = await Certificate.countDocuments();
    let certificatesAdded = 0;
    if (existingCertificates === 0) {
      await Certificate.insertMany(certificateData);
      certificatesAdded = certificateData.length;
      console.log(`✅ Added ${certificateData.length} certificates`);
    } else {
      console.log(`ℹ️  Certificates already exist (${existingCertificates} entries) - preserved`);
      certificatesAdded = existingCertificates;
    }

    // Insert Project Data (only if empty, preserve existing)
    const existingProjects = await Project.countDocuments();
    let projectsAdded = 0;
    if (existingProjects === 0) {
      await Project.insertMany(projectData);
      projectsAdded = projectData.length;
      console.log(`✅ Added ${projectData.length} projects`);
    } else {
      console.log(`ℹ️  Projects already exist (${existingProjects} entries) - preserved`);
      projectsAdded = existingProjects;
    }

    // Insert/Update Resume Data (only if empty, preserve existing)
    const existingResume = await Resume.findOne();
    let resumeStatus = "exists";
    if (!existingResume) {
      await Resume.create(resumeData);
      resumeStatus = "added";
      console.log(`✅ Added resume data`);
    } else {
      console.log(`ℹ️  Resume data already exists - preserved`);
    }

    return NextResponse.json(
      {
        message: "Database seeded successfully! Existing data preserved.",
        summary: {
          education: { total: educationAdded, action: existingEducation === 0 ? "added" : "preserved" },
          certificates: { total: certificatesAdded, action: existingCertificates === 0 ? "added" : "preserved" },
          projects: { total: projectsAdded, action: existingProjects === 0 ? "added" : "preserved" },
          resume: { status: resumeStatus }
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      {
        error: "Failed to seed database",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { FaFileUpload, FaTrash, FaEdit, FaUser } from "react-icons/fa";

function ResumePageContent() {
  const { isOpen } = useSidebar();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "Deepika Rajpurohit",
    title: "Full Stack Developer",
    email: "deepikaraj01999@gmail.com",
    phone: "",
    location: "Rajasthan, India",
    summary: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setAuthenticated(true);
          fetchResumeData();
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  const fetchResumeData = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/resume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.resume) {
        const resume = data.resume;
        setFormData({
          name: resume.name || "Deepika Rajpurohit",
          title: resume.title || "Full Stack Developer",
          email: resume.email || "deepikaraj01999@gmail.com",
          phone: "",
          location: resume.location || "Rajasthan, India",
          summary: "",
        });
        setProfilePhoto(resume.profilePhoto || null);
        setResumeFile(resume.resumeFile || null);
        console.log("Resume data loaded from database");
      }
    } catch (error) {
      console.error("Error fetching resume data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("admin_token");
    router.push("/login");
  };

  const handleFileUpload = (type: "resume" | "photo") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "photo" ? "image/*" : "application/pdf";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file size (max 5MB for images, 10MB for PDFs)
      const maxSize = type === "photo" ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`File size too large. Maximum size: ${type === "photo" ? "5MB" : "10MB"}`);
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        
        if (type === "photo") {
          setProfilePhoto(base64);
          await saveResumeData({ profilePhoto: base64 });
        } else {
          setResumeFile(base64);
          await saveResumeData({ resumeFile: base64 });
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const saveResumeData = async (updates: { profilePhoto?: string; resumeFile?: string; name?: string; email?: string; title?: string; location?: string }) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/resume", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          profilePhoto: updates.profilePhoto !== undefined ? updates.profilePhoto : profilePhoto || "",
          resumeFile: updates.resumeFile !== undefined ? updates.resumeFile : resumeFile || "",
          name: updates.name || formData.name,
          email: updates.email || formData.email,
          title: updates.title || formData.title,
          location: updates.location || formData.location,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Resume updated successfully!");
        await fetchResumeData();
      } else {
        alert(data.error || "Failed to save resume");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveResumeData({
      name: formData.name,
      email: formData.email,
      title: formData.title,
      location: formData.location,
    });
    setShowForm(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5682B1] dark:border-[#739EC9] mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white flex flex-col">
      <AdminSidebar onLogout={handleLogout} />

      {/* Top Header with Logo */}
      <header className={`sticky top-0 z-30 backdrop-blur bg-white/80 dark:bg-[#0a0a0a]/80 border-b border-gray-200 dark:border-white/5 transition-all duration-300 ${isOpen ? "lg:ml-64" : "lg:ml-0"}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/images/logo.png" 
                alt="Deepika Rajpurohit Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
              />
              <div>
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white/90">
                  <span className="text-[#5682B1] dark:text-[#739EC9]">Deepika Rajpurohit</span>
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Admin Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`flex-1 transition-all duration-300 ${isOpen ? "lg:ml-64" : "lg:ml-0"}`}>
        <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Resume <span className="text-[#5682B1] dark:text-[#739EC9]">Management</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your resume and profile information</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-[#5682B1] dark:bg-[#739EC9] text-white rounded-lg hover:opacity-90 transition"
            >
              <FaEdit className="inline mr-2" />
              Edit Profile
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Photo Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Profile Photo</h2>
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="text-5xl text-gray-500 dark:text-gray-400" />
                  )}
                </div>
                <label className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center gap-2 cursor-pointer">
                  <FaFileUpload />
                  {isSubmitting ? "Uploading..." : profilePhoto ? "Change Photo" : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 5 * 1024 * 1024) {
                        alert("File size too large. Maximum size: 5MB");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        const base64 = reader.result as string;
                        setProfilePhoto(base64);
                        await saveResumeData({ profilePhoto: base64 });
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </label>
              </div>
            </motion.div>

            {/* Resume File Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Resume File</h2>
              <div className="flex flex-col items-center gap-4">
                {resumeFile ? (
                  <div className="w-full p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-white/5">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Resume:</p>
                    <a
                      href={resumeFile}
                      download="DEEPIKA_RAJPUROHIT.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5682B1] dark:text-[#739EC9] hover:underline flex items-center gap-2"
                    >
                      <FaFileUpload className="inline" />
                      DEEPIKA RAJPUROHIT.pdf (Click to download)
                    </a>
                  </div>
                ) : (
                  <div className="w-full p-8 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
                    <FaFileUpload className="text-4xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No resume file uploaded</p>
                  </div>
                )}
                <label className="w-full px-4 py-2 bg-[#5682B1] dark:bg-[#739EC9] text-white rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  <FaFileUpload />
                  {isSubmitting ? "Uploading..." : resumeFile ? "Update Resume" : "Upload Resume"}
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 10 * 1024 * 1024) {
                        alert("File size too large. Maximum size: 10MB");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        const base64 = reader.result as string;
                        setResumeFile(base64);
                        await saveResumeData({ resumeFile: base64 });
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </label>
              </div>
            </motion.div>

            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Name</p>
                  <p className="text-gray-900 dark:text-white font-medium">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Title</p>
                  <p className="text-gray-900 dark:text-white font-medium">{formData.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                  <p className="text-gray-900 dark:text-white font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
                  <p className="text-gray-900 dark:text-white font-medium">{formData.location}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Edit Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#FFE8DB]">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Summary
                    </label>
                    <textarea
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      rows={4}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9] resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-[#5682B1] to-[#739EC9] text-white font-medium py-2 px-6 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-2 bg-gray-100 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition text-gray-900 dark:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <SidebarProvider>
      <ResumePageContent />
    </SidebarProvider>
  );
}

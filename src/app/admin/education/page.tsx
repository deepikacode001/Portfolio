"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { FaGraduationCap, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { GraduationCap } from "lucide-react";

interface Education {
  _id?: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

function EducationPageContent() {
  const { isOpen } = useSidebar();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [educations, setEducations] = useState<Education[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Education>({
    degree: "",
    institution: "",
    period: "",
    description: "",
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
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.authenticated) {
          setAuthenticated(true);
          fetchEducations();
        } else {
          localStorage.removeItem("admin_token");
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const fetchEducations = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/education", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEducations(data.educations || []);
      } else {
        console.error("Failed to fetch educations:", data.error);
      }
    } catch (error) {
      console.error("Error fetching educations:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("admin_token");
      router.push("/login");
    } catch (err) {
      localStorage.removeItem("admin_token");
      router.push("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/education/${editingId}` : "/api/education";
      const method = editingId ? "PUT" : "POST";

      const token = localStorage.getItem("admin_token");
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh the list
        await fetchEducations();
        resetForm();
      } else {
        alert(data.error || "Failed to save education");
      }
    } catch (error) {
      console.error("Error saving education:", error);
      alert("Network error. Please try again.");
    }
  };

  const handleEdit = (education: Education) => {
    setFormData(education);
    setEditingId(education._id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education?")) {
      return;
    }

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/education/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh the list
        await fetchEducations();
      } else {
        alert(data.error || "Failed to delete education");
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      alert("Network error. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({ degree: "", institution: "", period: "", description: "" });
    setEditingId(null);
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
                <FaGraduationCap className="inline mr-2 text-[#5682B1] dark:text-[#739EC9]" />
                Education
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your education details</p>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                setFormData({ degree: "", institution: "", period: "", description: "" });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#739EC9] to-[#5682B1] rounded-lg hover:opacity-90 transition"
            >
              <FaPlus />
              Add Education
            </button>
          </motion.div>

          {/* Education Cards Section - Same as home page */}
          {educations.length > 0 && (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
              {educations.map((edu, index) => (
                <motion.div
                  key={edu._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-6 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/5 hover:border-[#5682B1]/30 transition-all duration-300"
                >
                  <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 flex items-center justify-center group-hover:bg-[#5682B1]/20 transition-colors">
                    <GraduationCap className="h-6 w-6 text-[#5682B1] dark:text-[#739EC9]" />
                  </div>
                  <div className="ml-10">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-[#FFE8DB] mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-[#5682B1] dark:text-[#739EC9] text-sm mb-3">
                      {edu.institution} • {edu.period}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{edu.description}</p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(edu)}
                        className="p-2 hover:bg-[#5682B1]/20 dark:hover:bg-[#739EC9]/20 rounded-lg transition"
                        title="Edit"
                      >
                        <FaEdit className="text-[#5682B1] dark:text-[#739EC9]" />
                      </button>
                      <button
                        onClick={() => handleDelete(edu._id!)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition"
                        title="Delete"
                      >
                        <FaTrash className="text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {educations.length === 0 && !showForm && (
            <div className="text-center py-12">
              <FaGraduationCap className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No education entries found</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Click "Add Education" to get started</p>
            </div>
          )}

          {/* Add/Edit Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#FFE8DB]">
                  {editingId ? "Edit Education" : "Add Education"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={formData.degree}
                      onChange={(e) =>
                        setFormData({ ...formData, degree: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) =>
                        setFormData({ ...formData, institution: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Period
                    </label>
                    <input
                      type="text"
                      value={formData.period}
                      onChange={(e) =>
                        setFormData({ ...formData, period: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      placeholder="e.g., 2024 — 2026"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={4}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9] resize-none"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#5682B1] to-[#739EC9] text-white font-medium py-2 px-6 rounded-lg hover:opacity-90 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
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

export default function EducationPage() {
  return (
    <SidebarProvider>
      <EducationPageContent />
    </SidebarProvider>
  );
}

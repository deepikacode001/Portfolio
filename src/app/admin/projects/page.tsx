"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { FaCode, FaPlus, FaEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  _id?: string;
  name: string;
  link: string;
  summary: string;
  languages: string;
  description: string;
}

export default function ProjectsPage() {
  return (
    <SidebarProvider>
      <ProjectsPageContent />
    </SidebarProvider>
  );
}

function ProjectsPageContent() {
  const { isOpen } = useSidebar();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({
    name: "",
    link: "",
    summary: "",
    languages: "",
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
          fetchProjects();
        } else {
          localStorage.removeItem("admin_token");
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

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch("/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setProjects(data.projects || []);
        console.log("Projects fetched successfully:", data.projects?.length || 0, "projects");
      } else {
        console.error("Failed to fetch projects:", data.error);
        if (response.status === 401) {
          alert("Session expired. Please login again.");
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const token = localStorage.getItem("admin_token");
      if (!token) {
        alert("Authentication required. Please login again.");
        router.push("/login");
        return;
      }

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
        // Show success message
        alert(editingId ? "Project updated successfully!" : "Project added successfully!");
        // Refresh the list
        await fetchProjects();
        setShowForm(false);
        resetForm();
      } else {
        console.error("API Error:", data);
        alert(data.error || "Failed to save project. Please check console for details.");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Network error. Please check your connection and try again.");
    }
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project._id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh the list
        await fetchProjects();
      } else {
        alert(data.error || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Network error. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      link: "",
      summary: "",
      languages: "",
      description: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem("admin_token");
    router.push("/login");
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
                <FaCode className="inline mr-2 text-[#5682B1] dark:text-[#739EC9]" />
                My Projects
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your projects and portfolio</p>
            </div>
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  link: "",
                  summary: "",
                  languages: "",
                  description: "",
                });
                setShowForm(true);
              }}
              className="px-4 py-2 bg-[#5682B1] dark:bg-[#739EC9] text-white rounded-lg hover:opacity-90 transition flex items-center gap-2"
            >
              <FaPlus />
              Add Project
            </button>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-[#FFE8DB] mb-2">
                      {project.name}
                    </h3>
                    <p className="text-[#5682B1] dark:text-[#739EC9] text-sm mb-2">{project.summary}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 hover:bg-[#5682B1]/20 dark:hover:bg-[#739EC9]/20 rounded-lg transition"
                    >
                      <FaEdit className="text-[#5682B1] dark:text-[#739EC9]" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id!)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition"
                    >
                      <FaTrash className="text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Technologies Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.languages.split(",").map((lang, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#5682B1]/20 dark:bg-[#739EC9]/20 text-[#5682B1] dark:text-[#739EC9] rounded-full text-xs"
                      >
                        {lang.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#5682B1] dark:text-[#739EC9] hover:underline"
                  >
                    <FaExternalLinkAlt />
                    View Project
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl">
              <FaCode className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No projects added yet</p>
            </div>
          )}

          {/* Add/Edit Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#FFE8DB]">
                  {editingId ? "Edit Project" : "Add Project"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Name
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
                      Project Link
                    </label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Summary
                    </label>
                    <input
                      type="text"
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      placeholder="Brief summary of the project"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Technologies/Languages Used
                    </label>
                    <input
                      type="text"
                      value={formData.languages}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      placeholder="e.g., React, Node.js, MongoDB"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Separate multiple technologies with commas
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9] resize-none"
                      placeholder="Detailed description about the project..."
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

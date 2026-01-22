"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { FaCertificate, FaPlus, FaEdit, FaTrash, FaEye, FaImage } from "react-icons/fa";

interface Certificate {
  _id?: string;
  title: string;
  companyName: string;
  internshipDuration: string;
  imageUrl: string;
}

function CertificatesPageContent() {
  const { isOpen } = useSidebar();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Certificate>({
    title: "",
    companyName: "",
    internshipDuration: "",
    imageUrl: "",
  });
  const [viewingImage, setViewingImage] = useState<string | null>(null);

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
          fetchCertificates();
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

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/certificates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCertificates(data.certificates || []);
        console.log("Certificates fetched successfully:", data.certificates?.length || 0, "certificates");
      } else {
        console.error("Failed to fetch certificates:", data.error);
        if (response.status === 401) {
          alert("Session expired. Please login again.");
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
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
    
    // Prevent double submission
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const url = editingId ? `/api/certificates/${editingId}` : "/api/certificates";
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
        alert(editingId ? "Certificate updated successfully!" : "Certificate added successfully!");
        await fetchCertificates();
        setShowForm(false);
        resetForm();
      } else {
        console.error("API Error:", data);
        alert(data.error || "Failed to save certificate. Please check console for details.");
      }
    } catch (error) {
      console.error("Error saving certificate:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setFormData(certificate);
    setEditingId(certificate._id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) {
      return;
    }

    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        await fetchCertificates();
      } else {
        alert(data.error || "Failed to delete certificate");
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
      alert("Network error. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      companyName: "",
      internshipDuration: "",
      imageUrl: "",
    });
    setEditingId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert to base64 for preview and storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
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
                <FaCertificate className="inline mr-2 text-[#5682B1] dark:text-[#739EC9]" />
                Certificates
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your certificates and achievements</p>
            </div>
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: "",
                  companyName: "",
                  internshipDuration: "",
                  imageUrl: "",
                });
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#739EC9] to-[#5682B1] rounded-lg hover:opacity-90 transition"
            >
              <FaPlus />
              Add Certificate
            </button>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl p-6 hover:shadow-lg transition"
              >
                {cert.imageUrl && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => setViewingImage(cert.imageUrl)}
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-[#FFE8DB] mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-[#5682B1] dark:text-[#739EC9] mb-1">{cert.companyName}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Duration: {cert.internshipDuration}</p>
                  </div>
                  <div className="flex gap-2">
                    {cert.imageUrl && (
                      <button
                        onClick={() => setViewingImage(cert.imageUrl)}
                        className="p-2 hover:bg-[#5682B1]/20 dark:hover:bg-[#739EC9]/20 rounded-lg transition"
                        title="View Image"
                      >
                        <FaEye className="text-[#5682B1] dark:text-[#739EC9]" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(cert)}
                      className="p-2 hover:bg-[#5682B1]/20 dark:hover:bg-[#739EC9]/20 rounded-lg transition"
                    >
                      <FaEdit className="text-[#5682B1] dark:text-[#739EC9]" />
                    </button>
                    <button
                      onClick={() => handleDelete(cert._id!)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition"
                    >
                      <FaTrash className="text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add/Edit Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#FFE8DB]">
                  {editingId ? "Edit Certificate" : "Add Certificate"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      placeholder="e.g., Full Stack Developer Internship"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      placeholder="e.g., Codake Softwares Pvt. Ltd."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Internship Duration
                    </label>
                    <input
                      type="text"
                      value={formData.internshipDuration}
                      onChange={(e) =>
                        setFormData({ ...formData, internshipDuration: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                      placeholder="e.g., 3 months (Jan 2024 - Mar 2024)"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Certificate Image
                    </label>
                    <div className="space-y-2">
                      {formData.imageUrl && (
                        <div className="relative">
                          <img
                            src={formData.imageUrl}
                            alt="Certificate preview"
                            className="w-full h-48 object-contain rounded-lg border border-gray-300 dark:border-white/5"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, imageUrl: "" })}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded"
                          >
                            ×
                          </button>
                        </div>
                      )}
                      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-white/5 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                        <div className="text-center">
                          <FaImage className="mx-auto text-2xl text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formData.imageUrl ? "Change Image" : "Upload Certificate Image"}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Upload certificate image (JPG, PNG, etc.)
                      </p>
                    </div>
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
                      onClick={() => {
                        resetForm();
                        setShowForm(false);
                      }}
                      className="px-6 py-2 bg-gray-100 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition text-gray-900 dark:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Image View Modal */}
          {viewingImage && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setViewingImage(null)}
            >
              <div className="relative max-w-4xl w-full">
                <button
                  onClick={() => setViewingImage(null)}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                >
                  <FaEye className="w-5 h-5" />
                </button>
                <img
                  src={viewingImage}
                  alt="Certificate"
                  className="w-full h-auto rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  return (
    <SidebarProvider>
      <CertificatesPageContent />
    </SidebarProvider>
  );
}
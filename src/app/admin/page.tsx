"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import {
  FaEnvelope,
  FaTrash,
  FaCheck,
  FaTimes,
  FaReply,
  FaSearch,
  FaChevronDown,
  FaComment,
  FaWhatsapp,
} from "react-icons/fa";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Stats {
  total: number;
  open: number;
  closed: number;
  today: number;
}

function AdminPageContent() {
  const { isOpen } = useSidebar();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, open: 0, closed: 0, today: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      });
      const response = await fetch(`/api/contact/get?${params}`);
      const data = await response.json();

      if (data.success) {
        setContacts(data.data);
        setStats(data.stats || { total: 0, open: 0, closed: 0, today: 0 });
        setTotalPages(data.pagination.pages);
      } else {
        setError("Failed to fetch contacts");
      }
    } catch (err) {
      setError("Error loading contacts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication on mount
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

        const data = await response.json();

        if (data.authenticated) {
          setAuthenticated(true);
          fetchContacts();
        } else {
          localStorage.removeItem("admin_token");
          router.push("/login");
        }
      } catch (err) {
        console.error("Auth check error:", err);
        router.push("/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchContacts();
    }
  }, [page, search, statusFilter, authenticated]);

  const handleMarkAsRead = async (id: string, read: boolean) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ read: !read }),
      });

      if (response.ok) {
        fetchContacts();
      }
    } catch (err) {
      console.error("Error updating contact:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchContacts();
      }
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  const handleReplyClick = (contact: Contact) => {
    setSelectedContact(contact);
    setReplySubject(`Re: Your message from Portfolio`);
    setReplyMessage(`Hi ${contact.name},\n\nThank you for reaching out!\n\n`);
    setShowReplyDialog(true);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("admin_token");
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("admin_token");
      router.push("/login");
    }
  };

  const handleSendReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return;

    setSendingReply(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/contact/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: selectedContact.email,
          subject: replySubject,
          message: replyMessage,
          replyToMessage: selectedContact.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Reply sent successfully!");
        setShowReplyDialog(false);
        setSelectedContact(null);
        setReplySubject("");
        setReplyMessage("");
        // Mark as read after replying
        if (!selectedContact.read) {
          handleMarkAsRead(selectedContact._id, false);
        }
      } else {
        alert(data.error || "Failed to send reply");
      }
    } catch (err) {
      alert("Error sending reply");
      console.error(err);
    } finally {
      setSendingReply(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getStatusBadge = (read: boolean) => {
    if (read) {
      return (
        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
          Closed
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-full border border-green-300 dark:border-green-500/30">
        Open
      </span>
    );
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#739EC9] mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white flex flex-col">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? "lg:ml-64" : "lg:ml-0"}`}>
        <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                Mail <span className="text-[#5682B1] dark:text-[#739EC9]">Box</span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">Manage and respond to messages</p>
            </div>
          </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4"
          >
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1">Total Messages</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#FFE8DB]">{stats.total}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4"
          >
            <p className="text-gray-400 text-xs sm:text-sm mb-1">Open</p>
            <p className="text-xl sm:text-2xl font-bold text-green-400">{stats.open}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4"
          >
            <p className="text-gray-400 text-xs sm:text-sm mb-1">Closed</p>
            <p className="text-xl sm:text-2xl font-bold text-red-500 dark:text-red-400">{stats.closed}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4"
          >
            <p className="text-gray-400 text-xs sm:text-sm mb-1">Today</p>
            <p className="text-xl sm:text-2xl font-bold text-[#739EC9]">{stats.today}</p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
              />
            </div>

            {/* Status Filter */}
            <div className="relative w-full sm:w-auto sm:min-w-[150px]">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full appearance-none bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-3 sm:px-4 py-2 pr-7 sm:pr-8 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9] cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
              <FaChevronDown className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 pointer-events-none text-xs sm:text-sm" />
            </div>
          </div>
        </div>

        {/* Table */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-xs sm:text-sm">
            {error}
          </div>
        )}

        {loading && contacts.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#739EC9] mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Loading contacts...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg sm:rounded-xl">
            <FaEnvelope className="text-4xl sm:text-5xl md:text-6xl text-gray-600 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base md:text-lg text-gray-400">No contacts found</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg sm:rounded-xl overflow-hidden">
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <table className="w-full min-w-[640px] sm:min-w-0">
                <thead className="bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/5">
                  <tr>
                    <th className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400 whitespace-nowrap">ID</th>
                    <th className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400 whitespace-nowrap">User</th>
                    <th className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400 hidden sm:table-cell">Subject</th>
                    <th className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400 whitespace-nowrap">Status</th>
                    <th className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400 hidden md:table-cell whitespace-nowrap">Created</th>
                    <th className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <motion.tr
                      key={contact._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition ${
                        !contact.read ? "bg-blue-50 dark:bg-[#739EC9]/5" : ""
                      }`}
                    >
                      <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        #{contact._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="p-2 sm:p-3 md:p-4">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium">{contact.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[120px] sm:max-w-none">{contact.email}</p>
                          <span className="inline-block mt-0.5 sm:mt-1 px-1.5 sm:px-2 py-0.5 bg-[#5682B1]/20 dark:bg-[#739EC9]/20 text-[#5682B1] dark:text-[#739EC9] text-[10px] sm:text-xs rounded">
                            user
                          </span>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 md:p-4 hidden sm:table-cell">
                        <p className="text-xs sm:text-sm text-gray-900 dark:text-white max-w-xs truncate">
                          {contact.message.substring(0, 50)}
                          {contact.message.length > 50 ? "..." : ""}
                        </p>
                      </td>
                      <td className="p-2 sm:p-3 md:p-4">{getStatusBadge(contact.read)}</td>
                      <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
                        <div>
                          <p className="whitespace-nowrap">{formatDate(contact.createdAt)}</p>
                          <p className="text-[10px] sm:text-xs">{formatTime(contact.createdAt)}</p>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 md:p-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() => handleReplyClick(contact)}
                            className="p-1.5 sm:p-2 hover:bg-[#739EC9]/20 rounded-lg transition"
                            title="Reply"
                          >
                            <FaComment className="text-[#739EC9] text-sm sm:text-base" />
                          </button>
                          <button
                            onClick={() => handleDelete(contact._id)}
                            className="p-1.5 sm:p-2 hover:bg-red-500/20 rounded-lg transition"
                            title="Delete"
                          >
                            <FaTrash className="text-red-400 text-sm sm:text-base" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition text-sm sm:text-base text-gray-900 dark:text-white"
            >
              Previous
            </button>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition text-sm sm:text-base text-gray-900 dark:text-white"
            >
              Next
            </button>
          </div>
        )}

        {/* Reply Dialog */}
        <AnimatePresence>
          {showReplyDialog && selectedContact && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-[#FFE8DB]">Reply to {selectedContact.name}</h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      To
                    </label>
                    <input
                      type="email"
                      value={selectedContact.email}
                      disabled
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Message
                    </label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={6}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9] resize-none"
                    />
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/5 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1.5 sm:mb-2">Original Message:</p>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <button
                    onClick={handleSendReply}
                    disabled={sendingReply || !replyMessage.trim()}
                    className="flex-1 bg-gradient-to-r from-[#739EC9] to-[#5682B1] text-white font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {sendingReply ? "Sending..." : "Send Reply"}
                  </button>
                  <button
                    onClick={() => {
                      setShowReplyDialog(false);
                      setSelectedContact(null);
                      setReplySubject("");
                      setReplyMessage("");
                    }}
                    className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-100 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition text-sm sm:text-base text-gray-900 dark:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        </div>
      </div>

      {/* WhatsApp Floating Button - Right Bottom */}
      <a
        href="https://wa.me/918905975919?text=Hi%20Deepika%20%F0%9F%98%8A%0AI%20checked%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you.%0APlease%20connect%20with%20me.%0AThanks!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-3 sm:right-4 md:right-6 bottom-3 sm:bottom-4 md:bottom-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp className="text-xl sm:text-2xl" />
        <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          +91 8905975919
        </span>
      </a>
    </div>
  );
}

export default function AdminPage() {
  return (
    <SidebarProvider>
      <AdminPageContent />
    </SidebarProvider>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaSpinner, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        if (data.token) {
          localStorage.setItem("admin_token", data.token);
        }
        // Redirect to admin dashboard
        router.push("/admin");
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              <img 
                src="/images/logo.png" 
                alt="Deepika Rajpurohit Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span>
                Deepika <span className="text-[#5682B1] dark:text-[#739EC9]">Rajpurohit</span>
              </span>
            </Link>
            <nav className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <Link
                href="/"
                className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-[#5682B1] dark:hover:text-[#739EC9] transition"
              >
                Home
              </Link>
              <ThemeSwitcher />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              Admin <span className="text-[#5682B1] dark:text-[#739EC9]">Login</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Sign in to access admin dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9] transition"
                  placeholder="your-email@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2"
              >
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/5 rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-[#5682B1] dark:focus:border-[#739EC9] transition"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#739EC9] to-[#5682B1] text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-500">
              Portfolio Admin Dashboard
            </p>
          </div>
        </div>
      </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-white/5 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Deepika Rajpurohit. All rights reserved.
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://github.com/deepikacode001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-[#5682B1] dark:hover:text-[#739EC9] transition"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/deepika-rajpurohit-4812a8320"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-[#5682B1] dark:hover:text-[#739EC9] transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/918905975919?text=Hi%20Deepika%20%F0%9F%98%8A%0AI%20checked%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you.%0APlease%20connect%20with%20me.%0AThanks!"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-[#25D366] transition"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a
                href="mailto:deepikaraj01999@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-[#5682B1] dark:hover:text-[#739EC9] transition"
                aria-label="Email"
              >
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

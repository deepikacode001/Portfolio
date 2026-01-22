"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaCertificate,
  FaTicketAlt,
  FaTimes,
  FaSignOutAlt,
  FaUser,
  FaFileAlt,
  FaCode,
} from "react-icons/fa";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useSidebar } from "@/contexts/SidebarContext";

interface SidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, setIsOpen, toggleSidebar } = useSidebar();

  const menuItems = [
    {
      id: "resume",
      label: "Resume",
      icon: FaFileAlt,
      path: "/admin/resume",
    },
    {
      id: "education",
      label: "Education",
      icon: FaGraduationCap,
      path: "/admin/education",
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: FaCertificate,
      path: "/admin/certificates",
    },
    {
      id: "projects",
      label: "My Projects",
      icon: FaCode,
      path: "/admin/projects",
    },
    {
      id: "support",
      label: "Mail Box",
      icon: FaTicketAlt,
      path: "/admin",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-full bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-white/5 z-40 w-64 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo/Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-white/5">
          {/* Close Button - Top Right */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-[#0a0a0a] rounded-lg transition text-gray-700 dark:text-gray-300"
              aria-label="Close sidebar"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          
          {/* Logo - Centered */}
          <div className="flex justify-center mb-4">
            <img 
              src="/images/logo.png" 
              alt="Deepika Rajpurohit Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </div>
          
          {/* Admin Dashboard Title */}
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#FFE8DB] mb-1">
              Admin <span className="text-[#5682B1] dark:text-[#739EC9]">Dashboard</span>
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">Portfolio Management</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b border-gray-200 dark:border-white/5">
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-gray-300 dark:border-gray-600">
              <img
                src="/images/deepika.jpg"
                alt="Deepika Rajpurohit"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<svg class="text-3xl text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>';
                  }
                }}
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Deepika Rajpurohit</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Full Stack Developer</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-[#5682B1]/20 dark:bg-[#739EC9]/20 text-[#5682B1] dark:text-[#739EC9] border border-[#5682B1]/30 dark:border-[#739EC9]/30"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0a0a0a] hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Theme Switcher and Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-white/5 space-y-2">
          <div className="w-full flex items-center justify-center">
            <ThemeSwitcher />
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Toggle Button when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg text-gray-900 dark:text-white shadow-lg hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition"
          aria-label="Open sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </>
  );
}

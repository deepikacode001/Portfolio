"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // If there's less space below than above, open upward
      setOpenUpward(spaceBelow < 120 && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  const themes = [
    { value: "light", label: "Light", icon: FaSun },
    { value: "dark", label: "Dark", icon: FaMoon },
    { value: "system", label: "System", icon: FaDesktop },
  ];

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative w-full">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/5 hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition text-gray-700 dark:text-gray-300"
        aria-label="Change theme"
      >
        <CurrentIcon className="text-lg" />
        <span className="font-medium">Theme</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-[100]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: openUpward ? 10 : -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: openUpward ? 10 : -10, scale: 0.95 }}
              className={`absolute left-0 z-[101] bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-lg shadow-xl overflow-hidden w-full min-w-[150px] ${
                openUpward ? "bottom-full mb-2" : "top-full mt-2"
              }`}
            >
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                const isActive = theme === themeOption.value;

                return (
                  <button
                    key={themeOption.value}
                    onClick={() => {
                      setTheme(themeOption.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                      isActive
                        ? "bg-blue-50 dark:bg-[#739EC9]/20 text-blue-600 dark:text-[#739EC9]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0a0a0a]"
                    }`}
                  >
                    <Icon />
                    <span>{themeOption.label}</span>
                    {isActive && (
                      <span className="ml-auto text-xs">✓</span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

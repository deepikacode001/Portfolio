"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["Home", "About", "Resume", "Services", "Latest Work",  "Contact"];

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-2xl font-bold">DEEPIKA RAJPUROHIT</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navItems.map((item, index) => (
            <Link key={index} href={`#${item.toLowerCase()}`} className="hover:text-teal-500">
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-2 space-y-2 shadow">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-teal-500"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

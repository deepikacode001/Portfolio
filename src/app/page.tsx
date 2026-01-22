"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";

// Import ChatBot with SSR disabled to avoid window is not defined error
const DynamicChatBot = dynamic(() => import('@/components/ChatBot'), { ssr: false });

// FontAwesome
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaBootstrap,
  FaDownload,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaExternalLinkAlt,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiVercel,
  SiCanva,
} from "react-icons/si";

// Lucide
import { ExternalLink, GraduationCap } from "lucide-react";

// Smooth Scroll
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Projects List Component
function ProjectsList() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects/public");
        const data = await response.json();
        if (response.ok) {
          setProjects(data.projects || []);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/5 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Default projects if database is empty */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-30px" }}
          className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl hover:shadow-lg hover:shadow-[#5682B1]/10 transition-all flex flex-col h-full min-h-[280px] border border-gray-200 dark:border-transparent"
        >
          <div className="flex items-start sm:items-center gap-4 mb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFE8DB] mb-1">
                WordPress Projects
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Custom WordPress Development
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
            I have successfully completed 3 WordPress projects, delivering responsive and user-friendly websites with custom themes and plugins.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-2 sm:px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-xs sm:text-sm">
              WordPress
            </span>
            <span className="px-2 sm:px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-xs sm:text-sm">
              Elementor
            </span>
            <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
              WooCommerce
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-30px" }}
          className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl hover:shadow-lg hover:shadow-[#5682B1]/20 transition-all flex flex-col h-full min-h-[280px] border border-gray-200 dark:border-transparent"
        >
          <h3 className="text-2xl font-bold mb-4 text-[#FFE8DB]">
            Dashboard Project
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Developed a comprehensive dashboard application using Next.js, featuring data visualization, user management, and real-time updates.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
              Next.js
            </span>
            <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
              Tailwind CSS
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project._id || index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-30px" }}
          className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl hover:shadow-lg hover:shadow-[#5682B1]/10 transition-all flex flex-col h-full min-h-[280px] border border-gray-200 dark:border-transparent"
        >
          <div className="flex items-start sm:items-center gap-4 mb-4">
            <div className="p-2 sm:p-3 bg-[#739EC9]/10 rounded-lg">
              <FaCode className="w-8 h-8 sm:w-12 sm:h-12 text-[#739EC9]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFE8DB] mb-1">
                {project.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {project.summary}
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.languages.split(",").map((lang: string, idx: number) => (
              <span
                key={idx}
                className="px-2 sm:px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-xs sm:text-sm"
              >
                {lang.trim()}
              </span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-[#5682B1] dark:text-[#739EC9] hover:underline"
            >
              <FaExternalLinkAlt />
              View Project
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Education List Component
function EducationList() {
  const [educations, setEducations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await fetch("/api/education/public");
        const data = await response.json();
        if (response.ok) {
          setEducations(data.educations || []);
        }
      } catch (error) {
        console.error("Error fetching educations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducations();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[1, 2].map((i) => (
          <div key={i} className="p-6 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/5 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  // Show default education if database is empty
  const displayEducations = educations.length > 0 ? educations : [
    {
      _id: "default-1",
      degree: "MCA - Master of Computer Applications",
      institution: "Bikaner Technical University (BTU)",
      period: "2024 — 2026",
      description: "Pursuing advanced studies in computer applications with focus on modern web technologies and software development.",
    },
    {
      _id: "default-2",
      degree: "12th — Commerce with Computer",
      institution: "Rajasthan Board of Secondary Education (RBSE)",
      period: "2020 — 2021",
      description: "Completed higher secondary education with a focus on commerce and computer applications.",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {displayEducations.map((edu, index) => (
        <motion.div
          key={edu._id || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            <p className="text-gray-700 dark:text-gray-300 text-sm">{edu.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Starfield Background
function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };
    window.addEventListener("resize", onResize);

    type Star = { x: number; y: number; z: number; r: number; s: number };
    let stars: Star[] = [];
    const STAR_COUNT = 120;

    const initStars = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.7 + 0.3,
        r: Math.random() * 1.6 + 0.2,
        s: Math.random() * 0.7 + 0.3,
      }));
    };

    const draw = () => {
      if (!ctx) return;

      // Check if dark mode
      const isDark = document.documentElement.classList.contains('dark');

      // background gradient - light theme mein white, dark mein black
      const grad = ctx.createLinearGradient(0, 0, width, height);
      if (isDark) {
        grad.addColorStop(0, "#000000");
        grad.addColorStop(1, "#000000");
      } else {
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(1, "#f8f9fa");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // radial glow with new theme colors
      const rad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        0,
        width * 0.5,
        height * 0.3,
        Math.max(width, height)
      );
      if (isDark) {
        rad.addColorStop(0, "rgba(86, 130, 177, 0.3)");
        rad.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        rad.addColorStop(0, "rgba(86, 130, 177, 0.1)");
        rad.addColorStop(1, "rgba(255,255,255,0)");
      }
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, width, height);

      // stars - only visible in dark mode
      if (isDark) {
        for (const st of stars) {
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.r * st.z, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.5 + 0.5 * st.z})`;
          ctx.fill();

          // parallax drift
          st.x += st.s * 0.2;
          if (st.x > width + 2) st.x = -2;
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    initStars();
    draw();
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-10 h-screen w-screen [image-rendering:pixelated] dark:opacity-100 opacity-0"
    />
  );
}

// Skills List
const skills = [
  {
    name: "HTML5",
    level: "Advanced",
    icon: <FaHtml5 className="text-orange-500" />,
  },
  {
    name: "CSS3",
    level: "Advanced",
    icon: <FaCss3Alt className="text-blue-500" />,
  },
  {
    name: "JavaScript",
    level: "Advanced",
    icon: <SiJavascript className="text-yellow-400" />,
  },
  {
    name: "TypeScript",
    level: "Advanced",
    icon: <SiTypescript className="text-blue-400" />,
  },
  {
    name: "React.js",
    level: "Advanced",
    icon: <FaReact className="text-cyan-400" />,
  },
  {
    name: "Next.js",
    level: "Advanced",
    icon: <SiNextdotjs className="text-white" />,
  },
  {
    name: "Node.js",
    level: "Advanced",
    icon: <FaNodeJs className="text-green-500" />,
  },
  {
    name: "Express.js",
    level: "Advanced",
    icon: <SiExpress className="text-gray-400" />,
  },
  {
    name: "MongoDB",
    level: "Advanced",
    icon: <SiMongodb className="text-green-400" />,
  },
  {
    name: "MySQL",
    level: "Advanced",
    icon: <SiMysql className="text-blue-600" />,
  },
  {
    name: "Tailwind CSS",
    level: "Advanced",
    icon: <SiTailwindcss className="text-sky-400" />,
  },
  {
    name: "Bootstrap",
    level: "Advanced",
    icon: <FaBootstrap className="text-purple-500" />,
  },
  {
    name: "Git & GitHub",
    level: "Advanced",
    icon: <FaGithub className="text-white" />,
  },
  {
    name: "Vercel",
    level: "Intermediate",
    icon: <SiVercel className="text-white" />,
  },
  {
    name: "Canva",
    level: "Intermediate",
    icon: <SiCanva className="text-pink-500" />,
  },
];

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully! I will get back to you soon.",
        });
        // Reset form
        setFormData({ name: "", email: "", message: "" });
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="w-screen overflow-x-hidden">
      <main className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-zinc-100 selection:bg-black/40 dark:selection:bg-red-600/40 selection:text-white w-full overflow-x-hidden">
        <Starfield />

        {/* Navbar */}
        <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-black/40 border-b border-gray-200 dark:border-white/5">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3">
            <button
              onClick={() => {
                scrollToId("hero");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 sm:gap-3 font-semibold tracking-wide text-gray-900 dark:text-white/90 hover:text-gray-700 dark:hover:text-white transition"
            >
              <img 
                src="/images/logo.png" 
                alt="Deepika Rajpurohit Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
              />
              <span className="text-xs sm:text-sm md:text-base">
                <b> <span className="text-[#5682B1]">Deepika Rajpurohit</span></b>
              </span>
            </button>
            <div className="flex gap-1 sm:gap-2 items-center">
              <div className="hidden sm:flex gap-1 md:gap-2 items-center">
                {["About", "Education", "Skills", "Projects", "Contact"].map(
                  (label) => (
                    <button
                      key={label}
                      onClick={() => scrollToId(label.toLowerCase())}
                      className="rounded-xl px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white transition whitespace-nowrap"
                    >
                      {label}
                    </button>
                  )
                )}
                <Link
                  href="/login"
                  className="rounded-xl px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-[#5682B1] dark:bg-[#739EC9] text-white hover:opacity-90 transition whitespace-nowrap"
                >
                  Admin Login
                </Link>
              </div>
              <ThemeSwitcher />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden text-gray-900 dark:text-white p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="sm:hidden border-t border-gray-200 dark:border-white/5 bg-white/95 dark:bg-black/95 backdrop-blur"
              >
                <div className="flex flex-col gap-2 px-4 py-4">
                  {["About", "Education", "Skills", "Projects", "Contact"].map(
                    (label) => (
                      <button
                        key={label}
                        onClick={() => {
                          scrollToId(label.toLowerCase());
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left rounded-xl px-4 py-3 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        {label}
                      </button>
                    )
                  )}
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center rounded-xl px-4 py-3 text-sm bg-[#5682B1] dark:bg-[#739EC9] text-white hover:opacity-90 transition"
                  >
                    Admin Login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Hero */}
        <section
          id="hero"
          className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
        >
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-full md:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Hi, I'm <span className="text-[#5682B1] block sm:inline">Deepika Rajpurohit</span>
            </motion.h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              I am a Full-Stack Developer passionate about creating modern, fast,
              and scalable web applications.
            </p>

            <div className="flex flex-wrap gap-3 mt-2 sm:mt-4">
              <a
                href="https://github.com/deepikacode001"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition flex-shrink-0"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://linkedin.com/in/deepika-rajpurohit-4812a8320"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition flex-shrink-0"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="mailto:deepikaraj01999@gmail.com"
                className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition flex-shrink-0"
                aria-label="Email"
              >
                <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="/images/DEEPIKA RAJPUROHIT.pdf"
                download
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#5682b1] text-white rounded-xl hover:bg-[#5682b1] transition text-sm sm:text-base whitespace-nowrap"
              >
                <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-5 md:p-6 rounded-2xl shadow-xl mt-8 sm:mt-10 md:mt-0 w-full md:w-1/2 border border-gray-200 dark:border-gray-800"
          >
            <pre className="text-gray-900 dark:text-white text-xs sm:text-sm overflow-x-auto">
              {`const developer = {
    name: "Deepika Rajpurohit",
    role: "Full Stack Developer",
    email: "deepikaraj01999@gmail.com",
    github: "github.com/deepikacode001",
};`}
            </pre>
          </motion.div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-t border-gray-200 dark:border-white/5 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
        >
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">About Me</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Hi, I’m{" "}
                <span className="text-[#5682B1]">
                  {" "}
                  <b>Deepika Rajpurohit,</b>
                </span>{" "}
                a Full Stack Developer passionate about building scalable and
                user-friendly web applications. I specialize in{" "}
                <span className="text-[#5682B1]">
                  {" "}
                  <b>JavaScript, React.js, Next.js, Node.js, and MongoDB,</b>
                </span>
                with experience in{" "}
                <span className="text-[#5682B1]">
                  {" "}
                  <b>TypeScript and MySQL,</b>
                </span>{" "}
                as well. I’ve gained hands-on full-stack development experience
                through internships at Codake Softwares Pvt. Ltd. and Grid Code
                Media, working with modern tools and frameworks. Currently, I’m
                pursuing my MCA at
                <span className="text-[#5682B1]">
                  {" "}
                  <b> Bikaner Technical University (BTU),</b>
                </span>{" "}
                while continuously upgrading my skills.
                <span className="text-[#5682B1]">
                  {" "}
                  <b> My vision</b>
                </span>{" "}
                is to contribute to making the web more open, innovative, and
                impactful.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <h3 className="text-[#5682B1] dark:text-[#739ec9] font-medium">Location</h3>
                  <p className="text-gray-700 dark:text-gray-300">Rajasthan, India</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-[#5682B1] dark:text-[#739ec9] font-medium">Experience</h3>
                  <p className="text-gray-700 dark:text-gray-300"> 1 Years</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-[#5682B1] dark:text-[#739ec9] font-medium">Email</h3>
                  <p className="text-gray-700 dark:text-gray-300">deepikaraj01999@gmail.com</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-[#5682B1] dark:text-[#739ec9] font-medium">Freelance</h3>
                  <p className="text-gray-700 dark:text-gray-300">Available</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full md:w-1/2 flex justify-center"
            >
              <div className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] relative rounded-2xl overflow-hidden border-2 border-white/10 mx-auto md:mx-0">
                <img
                  src="/images/deepika.jpg"
                  alt="Deepika Rajpurohit"
                  className="w-full h-full object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#739EC9]/10 to-transparent"></div>
              </div>
              {/* Background decorative elements */}
              <div className="absolute -z-10 -inset-4 bg-gradient-to-tr from-[#739EC9]/5 to-transparent blur-2xl"></div>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="w-full py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-black/50 overflow-hidden">
          <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              My <span className="text-[#739EC9]">Skills</span>
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 w-full">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      delay: index * 0.05,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                  viewport={{ once: true, margin: "-30px" }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="bg-white dark:bg-[#1a1a1a] p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl text-center hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#739EC9]/5 border border-gray-200 dark:border-transparent"
                >
                  <motion.div
                    className="text-3xl sm:text-4xl mb-2 sm:mb-3 mx-auto w-fit"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="font-medium text-gray-900 dark:text-[#FFE8DB] text-sm sm:text-base mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#739EC9]">{skill.level}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white dark:bg-black/30">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              My <span className="text-[#739EC9]">Projects</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* WordPress Projects */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-30px" }}
                className="bg-white dark:bg-[#1a1a1a] p-4 sm:p-5 md:p-6 rounded-xl hover:shadow-lg hover:shadow-[#5682B1]/10 transition-all flex flex-col h-full min-h-[240px] sm:min-h-[280px] border border-gray-200 dark:border-transparent"
              >
                <div className="flex items-start sm:items-center gap-4 mb-4">
                  <div className="p-2 sm:p-3 bg-[#739EC9]/10 rounded-lg">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12 text-[#739EC9]" fill="currentColor" viewBox="0 0 24 24"><path d="M21.469 6.825c.84 1.537 1.314 3.3 1.314 5.175 0 3.979-2.156 7.456-5.363 9.325-.322.183-.682.281-1.006.281-.322 0-.64-.098-.92-.28l-.134-.08c-2.434-1.392-4.375-3.7-5.078-6.537-.056-.184-.09-.368-.09-.552 0-.322.134-.64.403-.825.27-.184.64-.276.96-.276.18 0 .36.046.506.134.184.09.322.224.414.368l.09.184c.506 1.053 1.284 1.992 2.25 2.7.322.184.69.322 1.006.46.322.138.64.23.96.276.64.09 1.284.138 1.93.138.46 0 .92-.046 1.38-.09.322-.046.64-.09.96-.184.322-.09.64-.23.92-.414.322-.184.64-.414.92-.69.276-.276.46-.598.64-.92.184-.322.276-.69.322-1.053.046-.368.09-.736.09-1.104 0-1.84-.598-3.534-1.53-4.968-.276-.368-.598-.736-.966-1.053-.322-.276-.69-.506-1.053-.736-.322-.184-.69-.322-1.006-.46-.322-.138-.64-.23-.96-.276-.64-.09-1.284-.138-1.93-.138-.46 0-.92.046-1.38.09-.322.046-.64.09-.96.184-.322.09-.64.23-.92.414-.322.184-.64.414-.92.69-.276.276-.46.598-.64.92-.184.322-.276.69-.322 1.053-.046.368-.09.736-.09 1.104 0 1.84.598 3.534 1.53 4.968.276.368.598.736.966 1.053.322.276.69.506 1.053.736.322.184.69.322 1.006.46.322.138.64.23.96.276.64.09 1.284.138 1.93.138.46 0 .92-.046 1.38-.09.322-.046.64-.09.96-.184.322-.09.64-.23.92-.414.322-.184.64-.414.92-.69.276-.276.46-.598.64-.92.184-.322.276-.69.322-1.053.046-.368.09-.736.09-1.104 0-1.84-.598-3.534-1.53-4.968z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#FFE8DB] mb-1">
                      WordPress Projects
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      Custom WordPress Development
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                  I have successfully completed 3 WordPress projects, delivering responsive and user-friendly websites with custom themes and plugins.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 sm:px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-xs sm:text-sm">
                    WordPress
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-xs sm:text-sm">
                    Elementor
                  </span>
                  <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
                    WooCommerce
                  </span>
                </div>
              </motion.div>

              {/* Next.js Project */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl hover:shadow-lg hover:shadow-[#5682B1]/20 transition-all flex flex-col h-full min-h-[280px] border border-gray-200 dark:border-transparent"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#FFE8DB]">
                  Dashboard Project
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Developed a comprehensive dashboard application using Next.js,
                  featuring data visualization, user management, and real-time
                  updates.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
                    Tailwind CSS
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="relative py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-black/50">
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-[#5682B1]/20 text-[#739EC9]">
                Education
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                My <span className="text-[#739EC9]">Education</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#5682B1] to-[#739EC9] mx-auto mb-12"></div>
            </motion.div>

            <EducationList />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative py-12 sm:py-16 md:py-20 bg-white dark:bg-black/30">
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-[#5682B1]/20 text-[#739EC9]">
                Contact
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Get In <span className="text-[#739EC9]">Touch</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#5682B1] to-[#739EC9] mx-auto mb-12"></div>
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Have a project in mind or want to discuss potential opportunities?
                Feel free to reach out and let's create something amazing
                together.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-white/5">
                    <FaEnvelope className="h-6 w-6 text-[#739EC9]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-[#FFE8DB] mb-1">
                      Email Me
                    </h3>
                    <a
                      href="mailto:deepikaraj01999@gmail.com"
                      className="text-[#5682B1] dark:text-[#739EC9] hover:underline"
                    >
                      deepikaraj01999@gmail.com
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-white/5">
                    <FaLinkedin className="h-6 w-6 text-[#739EC9]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-[#FFE8DB] mb-1">
                      LinkedIn
                    </h3>
                    <a
                      href="https://linkedin.com/in/deepika-rajpurohit-4812a8320"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5682B1] dark:text-[#739EC9] hover:underline"
                    >
                      Connect with me
                    </a>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-white/5">
                    <FaGithub className="h-6 w-6 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-[#FFE8DB] mb-1">
                      GitHub
                    </h3>
                    <a
                      href="https://github.com/deepikacode001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5682B1] dark:text-[#739EC9] hover:underline"
                    >
                      View my projects
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-6 bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/5"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-[#FFE8DB] mb-4">Send me a message</h3>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3 rounded-lg text-sm ${submitStatus.type === "success"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-black/20 dark:bg-red-500/20 text-black dark:text-red-400 border border-black/30 dark:border-red-500/30"
                        }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm sm:text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-[#739EC9] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-500 transition"
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm sm:text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-[#739EC9] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-500 transition"
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm sm:text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-[#739EC9] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-500 transition resize-none"
                    placeholder="Your message here..."
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#739EC9] to-[#5a8bc4] text-white font-medium py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/5 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-900 dark:text-[#FFE8DB] text-sm md:text-base">
                © {new Date().getFullYear()} Developer Portfolio by <span className="text-[#739EC9] font-medium">deepikarajpurohit</span>
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="https://github.com/deepikacode001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 dark:text-[#FFE8DB] hover:text-[#5682B1] dark:hover:text-[#739EC9] transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/deepika-rajpurohit-4812a8320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 dark:text-[#FFE8DB] hover:text-[#5682B1] dark:hover:text-[#739EC9] transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:deepikaraj01999@gmail.com"
                  className="text-gray-900 dark:text-[#FFE8DB] hover:text-[#5682B1] dark:hover:text-[#739EC9] transition-colors"
                  aria-label="Email"
                >
                  <FaEnvelope className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
        <DynamicChatBot />

        {/* WhatsApp Floating Button - Left Bottom */}
        <a
          href="https://wa.me/918905975919?text=Hi%20Deepika%20%F0%9F%98%8A%0AI%20checked%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you.%0APlease%20connect%20with%20me.%0AThanks!"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed left-3 sm:left-4 md:left-6 bottom-3 sm:bottom-4 md:bottom-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label="Contact on WhatsApp"
        >
          <FaWhatsapp className="text-xl sm:text-2xl" />
          <span className="hidden sm:block absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            +91 8905975919
          </span>
        </a>
      </main>
    </div>
  );
}

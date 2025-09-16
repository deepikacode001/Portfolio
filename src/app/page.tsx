"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// FontAwesome
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaDocker,
  FaBootstrap,
  FaWordpress,
  FaDownload,
  FaLinkedin,
  FaEnvelope,
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

      // background gradient with new theme
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#000000");
      grad.addColorStop(1, "#000000");
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
      rad.addColorStop(0, "rgba(86, 130, 177, 0.3)");
      rad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, width, height);

      // stars
      for (const st of stars) {
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r * st.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.5 + 0.5 * st.z})`;
        ctx.fill();

        // parallax drift
        st.x += st.s * 0.2;
        if (st.x > width + 2) st.x = -2;
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
      className="fixed inset-0 -z-10 h-screen w-screen [image-rendering:pixelated]"
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
    name: "Docker",
    level: "Intermediate",
    icon: <FaDocker className="text-blue-400" />,
  },
  {
    name: "Vercel",
    level: "Intermediate",
    icon: <SiVercel className="text-white" />,
  },
  {
    name: "WordPress",
    level: "Intermediate",
    icon: <FaWordpress className="text-blue-500" />,
  },
  {
    name: "Canva",
    level: "Intermediate",
    icon: <SiCanva className="text-pink-500" />,
  },
];

export default function Portfolio() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted! (Connect backend or email service here)");
  };

  return (
    <main className="relative min-h-screen bg-black text-zinc-100 selection:bg-red-600/40 selection:text-white">
      <Starfield />

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => scrollToId("hero")}
            className="font-semibold tracking-wide text-white/90 hover:text-white transition"
          >
            <b> <span className="text-[#5682B1]">Deepika Rajpurohit</span></b>
          </button>
          <div className="hidden gap-2 sm:flex">
            {["About", "Education", "Skills", "Projects", "Contact"].map(
              (label) => (
                <button
                  key={label}
                  onClick={() => scrollToId(label.toLowerCase())}
                  className="rounded-xl px-3 py-2 text-sm text-zinc-300 hover:text-white transition"
                >
                  {label}
                </button>
              )
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20"
      >
        <div className="flex flex-col gap-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Hi, I'm <span className="text-[#5682B1]">Deepika Rajpurohit</span>
          </motion.h1>

          <p className="text-lg text-gray-300 max-w-lg">
            I am a Full-Stack Developer passionate about creating modern, fast,
            and scalable web applications.
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/deepikacode001"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-2xl hover:bg-gray-700 transition"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/deepika-rajpurohit-4812a8320"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-2xl hover:bg-gray-700 transition"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="mailto:deepikaraj01999@gmail.com"
              className="p-3 bg-gray-800 rounded-2xl hover:bg-gray-700 transition"
            >
              <FaEnvelope size={24} />
            </a>
            <a
              href="/images/DEEPIKA RAJPUROHIT.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-[#5682B1] hover:bg-[#739EC9] text-[#FFE8DB] rounded-2xl transition"
            >
              <FaDownload /> Download CV
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 p-6 rounded-2xl shadow-xl mt-10 md:mt-0 w-full md:w-1/2"
        >
          <pre className="text-white text-sm">
            {`const developer = {
    name: "Deepika Rajpurohit",
    role: "Full Stack Developer",
    email: "deepikaraj01999@gmail.com",
    github: "github.com/deepikacode001",
    linkedin: "linkedin.com/in/deepika-rajpurohit-4812a8320"
};`}
          </pre>
        </motion.div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-t border-white/5 max-w-6xl mx-auto px-6 py-20"
      >
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-gray-300 leading-relaxed">
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
                <h3 className="text-[#739ec9] font-medium">Location</h3>
                <p className="text-gray-300">Rajasthan, India</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-[#739ec9] font-medium">Experience</h3>
                <p className="text-gray-300"> 1 Years</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-[#739ec9] font-medium">Email</h3>
                <p className="text-gray-300">deepikaraj01999@gmail.com</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-[#739ec9] font-medium">Freelance</h3>
                <p className="text-gray-300">Available</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full md:w-1/2 flex justify-center"
          >
            <div className="w-[300px] h-[400px] md:w-[350px] md:h-[450px] relative rounded-2xl overflow-hidden border-2 border-white/10">
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
      <section id="skills" className="py-20 bg-black/50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My Skills
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: "easeOut",
                  },
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="bg-[#1a1a1a] p-6 rounded-xl text-center hover:bg-[#2a2a2a] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#739EC9]/10"
              >
                <motion.div
                  className="text-4xl mb-3 mx-auto w-fit"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill.icon}
                </motion.div>
                <h3 className="font-medium text-[#FFE8DB] mb-1">
                  {skill.name}
                </h3>
                <p className="text-sm text-[#739EC9]">{skill.level}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 bg-black/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">My Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* WordPress Projects */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#1a1a1a] p-6 rounded-xl hover:shadow-lg hover:shadow-[#5682B1]/20 transition-all"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#FFE8DB]">
                WordPress Projects
              </h3>
              <p className="text-gray-300 mb-4">
                I have successfully completed 3 WordPress projects, delivering
                responsive and user-friendly websites with custom themes and
                plugins.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
                  WordPress
                </span>
                <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
                  Elementor
                </span>
                <span className="px-3 py-1 bg-[#5682B1]/20 text-[#739EC9] rounded-full text-sm">
                  WooCommerce
                </span>
              </div>
            </motion.div>

            {/* Next.js Project */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1a1a1a] p-6 rounded-xl hover:shadow-lg hover:shadow-[#5682B1]/20 transition-all"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#FFE8DB]">
                Dashboard Project
              </h3>
              <p className="text-gray-300 mb-4">
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
      <section id="education" className="relative py-20 bg-black/50">
        <div className="container mx-auto px-6">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="text-[#739EC9]">Education</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#5682B1] to-[#739EC9] mx-auto mb-12"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "MCA - Master of Computer Applications",
                org: "Bikaner Technical University (BTU)",
                period: "2024 — 2026",
                description:
                  "Pursuing advanced studies in computer applications with focus on modern web technologies and software development.",
                icon: <GraduationCap className="h-6 w-6 text-[#739EC9]" />,
              },
              {
                title: "12th — Commerce with Computer",
                org: "Rajasthan Board of Secondary Education (RBSE)",
                period: "2020 — 2021",
                description:
                  "Completed higher secondary education with a focus on commerce and computer applications.",
                icon: <GraduationCap className="h-6 w-6 text-[#739EC9]" />,
              },
            ].map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 bg-[#1a1a1a] rounded-2xl border border-white/5 hover:border-[#5682B1]/30 transition-all duration-300"
              >
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/5 flex items-center justify-center group-hover:bg-[#5682B1]/20 transition-colors">
                  {edu.icon}
                </div>
                <div className="ml-10">
                  <h3 className="text-xl font-semibold text-[#FFE8DB] mb-1">
                    {edu.title}
                  </h3>
                  <p className="text-[#739EC9] text-sm mb-3">
                    {edu.org} • {edu.period}
                  </p>
                  <p className="text-gray-300 text-sm">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20 bg-black/30">
        <div className="container mx-auto px-6">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In <span className="text-[#739EC9]">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#5682B1] to-[#739EC9] mx-auto mb-12"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities?
              Feel free to reach out and let's create something amazing
              together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1a1a1a] rounded-xl border border-white/5">
                  <FaEnvelope className="h-6 w-6 text-[#739EC9]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#FFE8DB] mb-1">
                    Email Me
                  </h3>
                  <a
                    href="mailto:deepikaraj01999@gmail.com"
                    className="text-[#739EC9] hover:underline"
                  >
                    deepikaraj01999@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1a1a1a] rounded-xl border border-white/5">
                  <FaLinkedin className="h-6 w-6 text-[#739EC9]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#FFE8DB] mb-1">
                    LinkedIn
                  </h3>
                  <a
                    href="https://linkedin.com/in/deepika-rajpurohit-4812a8320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#739EC9] hover:underline"
                  >
                    linkedin.com/in/deepika-rajpurohit
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1a1a1a] rounded-xl border border-white/5">
                  <FaGithub className="h-6 w-6 text-[#739EC9]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#FFE8DB] mb-1">
                    GitHub
                  </h3>
                  <a
                    href="https://github.com/deepikacode001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#739EC9] hover:underline"
                  >
                    github.com/deepikacode001
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 bg-[#1a1a1a] p-8 rounded-2xl border border-white/5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#FFE8DB] mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl focus:ring-2 focus:ring-[#739EC9] focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#FFE8DB] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl focus:ring-2 focus:ring-[#739EC9] focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#FFE8DB] mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl focus:ring-2 focus:ring-[#739EC9] focus:border-transparent text-white placeholder-gray-400 transition-all resize-none"
                  placeholder="Hi Deepika, I'd like to discuss a potential project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-[#5682B1] to-[#739EC9] text-[#FFE8DB] font-medium rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-95"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#FFE8DB] text-sm md:text-base">
              © {new Date().getFullYear()} Developer Portfolio by <span className="text-[#739EC9] font-medium">deepikarajpurohit</span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="https://github.com/deepikacode001" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#FFE8DB] hover:text-[#739EC9] transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/deepika-rajpurohit-4812a8320" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#FFE8DB] hover:text-[#739EC9] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:deepikaraj01999@gmail.com" 
                className="text-[#FFE8DB] hover:text-[#739EC9] transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

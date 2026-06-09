"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// FontAwesome
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaBootstrap,
  FaFileAlt,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaExternalLinkAlt,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  SiJavascript,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiVercel,
  SiFigma,
  SiGit,
  SiWordpress,
  SiShopify,
} from "react-icons/si";

// Smooth Scroll
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function AuroraBackground() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-orb aurora-orb--teal" />
      <div className="aurora-orb aurora-orb--gold" />
      <div className="aurora-orb aurora-orb--warm" />
    </div>
  );
}

// Skills List
const skills = [
  {
    name: "JavaScript",
    level: "Advanced",
    icon: <SiJavascript className="text-yellow-400" />,
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
    name: "Figma",
    level: "Advanced",
    icon: <SiFigma className="text-purple-400" />,
  },
  {
    name: "Git",
    level: "Advanced",
    icon: <SiGit className="text-orange-500" />,
  },
  {
    name: "Vercel",
    level: "Advanced",
    icon: <SiVercel className="text-white" />,
  },
  {
    name: "WordPress",
    level: "Advanced",
    icon: <SiWordpress className="text-[#DAA520]" />,
  },
  {
    name: "Shopify",
    level: "Advanced",
    icon: <SiShopify className="text-green-500" />,
  },
  {
    name: "Tailwind CSS",
    level: "90%",
    icon: <SiTailwindcss className="text-sky-400" />,
  },
  {
    name: "Bootstrap",
    level: "Advanced",
    icon: <FaBootstrap className="text-purple-500" />,
  },
];

const projects = [
  {
    id: "1",
    name: "Trading Kulture",
    summary: "MERN Stack · Stock Market Platform",
    description:
      "AI Candle Academy platform for stock market learning — built with MERN stack featuring course modules, trading journal, admin dashboard, and real-time market education tools.",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "Dashboard"],
    link: "https://tradingkulture.com/",
  },
  {
    id: "2",
    name: "Gaurav Katta",
    summary: "E-Commerce · Shopify Theme",
    description:
      "Premium designer wear store built on a Shopify theme — customized layout, product collections, occasion-based navigation, and brand styling for men's and women's ethnic couture.",
    tags: ["Shopify", "Theme Customization", "Liquid", "E-Commerce"],
    link: "https://gauravkatta.co/",
  },
  {
    id: "3",
    name: "Eatmate",
    summary: "E-Commerce · WordPress Theme",
    description:
      "Healthy snacks and dry fruits store built on a WordPress theme — WooCommerce setup with product categories, ratings, reviews, and checkout flow customized to match the brand.",
    tags: ["WordPress", "Theme Customization", "WooCommerce", "E-Commerce"],
    link: "https://eatmate.in/",
  },
  {
    id: "4",
    name: "Abyad Chicken",
    summary: "E-Commerce · WordPress Theme",
    description:
      "Farm-fresh poultry website built on a WordPress theme — customized product catalog, farm story pages, and online store layout for a clean food-brand experience.",
    tags: ["WordPress", "Theme Customization", "WooCommerce", "E-Commerce"],
    link: "https://abyadchicken.com/",
  },
  {
    id: "5",
    name: "Geeta Baal Sanskar",
    summary: "Freelance · MERN Stack (UI)",
    description:
      "Freelance project for gbs.org.in — designed and built the complete frontend UI for this Indian culture learning platform with categories, stories, prayers, activities, and newsletter sections.",
    tags: ["React", "MERN Stack", "UI Design", "Responsive"],
    link: "https://gbs.org.in/",
  },
];

const journey = [
  {
    year: "2024",
    title: "Internship",
    org: "Codake Softwares Pvt. Ltd.",
    subtitle: "",
    description:
      "Completed internship at Codake Softwares Pvt. Ltd. — learning MERN stack development, responsive UI design, and hands-on experience with real client projects.",
    accent: "text-[#D4AF37]",
    border: "border-[#D4AF37]/40",
    dot: "bg-[#D4AF37]",
    glow: "shadow-[#D4AF37]/20",
  },
  {
    year: "2025",
    title: "Junior Developer",
    org: "Trading Kulture",
    subtitle: "",
    description:
      "Worked as Junior Developer at Trading Kulture — building MERN stack features, stock market dashboards, and full-stack modules for the AI Candle Academy platform.",
    accent: "text-[#00CED1]",
    border: "border-[#008080]/40",
    dot: "bg-[#008080]",
    glow: "shadow-[#00CED1]/20",
  },
  {
    year: "2026",
    title: "Senior Developer",
    org: "Adcrunk Digital Market",
    subtitle: "",
    description:
      "Currently working as Senior Developer at Adcrunk Digital Market — leading feature development, improving application architecture, and delivering scalable web products.",
    accent: "text-[#0077B6]",
    border: "border-[#0077B6]/40",
    dot: "bg-[#0077B6]",
    glow: "shadow-[#0077B6]/20",
  },
];

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const CV_PATH = "/images/DEEPIKA_RAJPUROHIT.pdf";
  const CONTACT_EMAIL = "deepikaraj01999@gmail.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      formData.subject || `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setSubmitStatus({
      type: "success",
      message: "Opening your email client to send the message.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => {
      setSubmitStatus({ type: null, message: "" });
    }, 5000);
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
      <main className="relative min-h-screen bg-transparent text-[#cccccc] selection:bg-[#D4AF37]/30 selection:text-white w-full overflow-x-hidden">
        <AuroraBackground />

        {/* Hero */}
        <section
          id="hero"
          className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-3 sm:px-4 md:px-6 py-16 sm:py-20 md:py-28 lg:py-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-[3px] border-[#D4AF37]/70 bg-[#050505]/80 flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 overflow-hidden ring-2 ring-[#00CED1]/20">
              <img
                src="/images/deepika.jpeg"
                alt="Deepika Rajpurohit"
                className="h-full w-full object-cover object-[center_15%] scale-[1.17]"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5"
          >
            <span className="text-white">Deepika </span>
            <span className="text-gradient-gold">Rajpurohit</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#cccccc]/80 max-w-xl leading-relaxed mb-8 sm:mb-10"
          >
            I am a Full-Stack Developer passionate about creating modern, fast,
            and scalable web applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => scrollToId("projects")}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 btn-gold rounded-full text-sm sm:text-base"
            >
              View Work
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 btn-gold rounded-full text-sm sm:text-base font-medium"
            >
              Contact Us
            </button>
            <a
              href={CV_PATH}
              download="Deepika_Rajpurohit_CV.pdf"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 btn-gold rounded-full text-sm sm:text-base font-medium inline-flex items-center justify-center gap-2"
            >
              <FaFileAlt className="text-sm" />
              Download CV
            </a>
          </motion.div>
        </section>

        {/* About */}
        <section
          id="about"
          className="section-glow border-t border-[#D4AF37]/10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-10 sm:mb-14"
          >
            <span className="text-gradient-gold">ABOUT</span>{" "}
            <span className="text-white">ME</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8 sm:space-y-10"
            >
              {[
                {
                  num: "01",
                  color: "text-[#DAA520]",
                  text: (
                    <>
                      Hi, I&apos;m <span className="text-[#D4AF37] font-semibold">Deepika Rajpurohit</span>, a Full Stack Developer passionate about building scalable and user-friendly web applications with{" "}
                      <span className="text-[#D4AF37] font-semibold">JavaScript, React.js, Next.js, Node.js, and MongoDB</span>.
                    </>
                  ),
                },
                {
                  num: "02",
                  color: "text-[#00CED1]",
                  text: (
                    <>
                      I&apos;ve gained hands-on experience starting with an internship at{" "}
                      <span className="text-[#D4AF37] font-semibold">Codake Softwares Pvt. Ltd.</span>, then as Junior Developer at{" "}
                      <span className="text-[#D4AF37] font-semibold">Trading Kulture</span>, and now as Senior Developer at{" "}
                      <span className="text-[#D4AF37] font-semibold">Adcrunk Digital Market</span>.
                    </>
                  ),
                },
                {
                  num: "03",
                  color: "text-[#D4AF37]",
                  text: (
                    <>
                      I&apos;ve built projects including a stock market learning platform, Shopify & WordPress e-commerce stores, and UI for{" "}
                      <span className="text-[#D4AF37] font-semibold">gbs.org.in</span> — focusing on clean design, responsive layouts, and real-world client needs.
                    </>
                  ),
                },
                {
                  num: "04",
                  color: "text-[#F5E6C8]",
                  text: (
                    <>
                      Completed my <span className="text-[#D4AF37] font-semibold">MCA from Bikaner Technical University (BTU)</span>, while continuously upgrading my skills in TypeScript, AWS, Figma, and modern full-stack development.
                    </>
                  ),
                },
              ].map((block, index) => (
                <motion.div
                  key={block.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 sm:gap-6"
                >
                  <span className={`text-2xl sm:text-3xl font-bold shrink-0 ${block.color}`}>
                    {block.num}
                  </span>
                  <p className="text-sm sm:text-base text-[#cccccc]/85 leading-relaxed pt-1">
                    {block.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-3xl blur-2xl -z-10" />
              <div className="glass-panel rounded-2xl p-5 sm:p-6 md:p-8">
                <pre className="text-xs sm:text-sm leading-relaxed overflow-x-auto font-mono">
                  <code>
                    <span className="text-[#00CED1]">const</span>{" "}
                    <span className="text-[#DAA520]">developer</span>{" "}
                    <span className="text-gray-400">=</span> {"{\n"}
                    {"  "}
                    <span className="text-[#DAA520]">name</span>
                    <span className="text-gray-400">:</span>{" "}
                    <span className="text-[#F5E6C8]">&quot;Deepika Rajpurohit&quot;</span>
                    <span className="text-gray-400">,</span>
                    {"\n  "}
                    <span className="text-[#DAA520]">passion</span>
                    <span className="text-gray-400">:</span>{" "}
                    <span className="text-[#F5E6C8]">&quot;Creating digital experiences&quot;</span>
                    <span className="text-gray-400">,</span>
                    {"\n  "}
                    <span className="text-[#DAA520]">skills</span>
                    <span className="text-gray-400">:</span>{" "}
                    <span className="text-gray-400">[</span>
                    <span className="text-[#F5E6C8]">&quot;React&quot;</span>
                    <span className="text-gray-400">, </span>
                    <span className="text-[#F5E6C8]">&quot;Next.js&quot;</span>
                    <span className="text-gray-400">, </span>
                    <span className="text-[#F5E6C8]">&quot;Node.js&quot;</span>
                    <span className="text-gray-400">],</span>
                    {"\n  "}
                    <span className="text-[#DAA520]">mission</span>
                    <span className="text-gray-400">:</span>{" "}
                    <span className="text-[#F5E6C8]">&quot;Build impactful web apps&quot;</span>
                    {"\n}"}
                    <span className="text-gray-400">;</span>
                    {"\n\n"}
                    <span className="text-gray-500">{"// Always learning, always growing"}</span>
                    {"\n"}
                    <span className="text-[#DAA520]">developer</span>
                    <span className="text-gray-400">.code()</span>
                    <span className="text-gray-400"> && </span>
                    <span className="text-[#DAA520]">developer</span>
                    <span className="text-gray-400">.create();</span>
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#D4AF37]/10"
          >
            {[
              { value: "16+", label: "Projects Launched", color: "text-[#DAA520]" },
              { value: "2+", label: "Years Experience", color: "text-[#00CED1]" },
              { value: "2", label: "Companies Worked", color: "text-[#F5E6C8]" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className={`font-display text-3xl sm:text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs sm:text-sm text-[#cccccc]/50 tracking-widest mt-1 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Skills */}
        <section id="skills" className="section-glow w-full py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
          <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
            <motion.h2
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              My <span className="text-gradient-gold">Skills</span>
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
                  className="glass-panel p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl text-center transition-all duration-300"
                >
                  <motion.div
                    className="text-3xl sm:text-4xl mb-2 sm:mb-3 mx-auto w-fit"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="font-medium text-[#F5E6C8] text-sm sm:text-base mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#DAA520]">{skill.level}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section-glow py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
            <motion.h2
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              My <span className="text-gradient-gold">Projects</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  className="glass-panel p-4 sm:p-5 md:p-6 rounded-xl transition-all flex flex-col h-full min-h-[240px] sm:min-h-[280px]"
                >
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5E6C8] mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#D4AF37] mb-3">
                    {project.summary}
                  </p>
                  <p className="text-sm sm:text-base text-[#cccccc]/75 mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 bg-[#D4AF37]/20 text-[#DAA520] rounded-full text-xs sm:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-[#D4AF37] hover:underline"
                  >
                    <FaExternalLinkAlt />
                    View Live Site
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section id="journey" className="section-glow relative py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-[#D4AF37]/20 text-[#DAA520]">
                Journey
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                My <span className="text-gradient-gold">Journey</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] via-[#00CED1] to-[#0077B6] mx-auto mb-6"></div>
              <p className="text-sm sm:text-base text-[#cccccc]/70 max-w-xl mx-auto">
                The evolution of a developer through time and experience.
              </p>
            </motion.div>

          <div className="max-w-5xl mx-auto">

            <div className="relative">
              <div
                className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#00CED1] to-[#0077B6]"
                aria-hidden="true"
              />

              <div className="space-y-10 sm:space-y-14">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex flex-col sm:flex-row items-start gap-0 ${
                      index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    <div className="hidden sm:block sm:w-1/2" />

                    <div
                      className={`absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-6 w-3 h-3 rotate-45 ${item.dot} border-2 border-black z-10`}
                      aria-hidden="true"
                    />

                    <div
                      className={`w-full sm:w-1/2 pl-10 sm:pl-0 ${
                        index % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"
                      }`}
                    >
                      <div
                        className={`relative glass-panel border ${item.border} rounded-2xl p-5 sm:p-6 ${item.glow} hover:border-opacity-70 transition-colors`}
                      >
                        <div
                          className={`hidden sm:block absolute top-6 w-3 h-3 rotate-45 ${item.dot} ${
                            index % 2 === 0 ? "-right-1.5" : "-left-1.5"
                          }`}
                          aria-hidden="true"
                        />
                        <p className={`text-sm font-semibold mb-2 ${item.accent}`}>
                          {item.year}
                        </p>
                        <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8] mb-1">
                          {item.title}
                        </h3>
                        <p className={`text-sm font-medium underline underline-offset-4 ${item.accent}`}>
                          {item.org}
                        </p>
                        {item.subtitle && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 mb-3">
                            {item.subtitle}
                          </p>
                        )}
                        {!item.subtitle && <div className="mb-3" />}
                        <p className="text-sm text-[#cccccc]/70 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section-glow relative py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-5xl">
            <motion.div
              className="text-center mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-3">
                <span className="bg-gradient-to-r from-[#00CED1] via-[#D4AF37] to-[#DAA520] bg-clip-text text-transparent">
                  CONNECT
                </span>
              </h2>
              <p className="text-[#cccccc]/75 text-sm sm:text-base max-w-lg mx-auto">
                Ready to build something extraordinary together? Let&apos;s start a conversation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-5 sm:space-y-6"
              >
                {[
                  {
                    icon: <FaEnvelope className="h-4 w-4 text-[#00CED1]" />,
                    border: "border-[#00CED1]/40",
                    label: "EMAIL",
                    value: "deepikaraj01999@gmail.com",
                    href: "mailto:deepikaraj01999@gmail.com",
                  },
                  {
                    icon: <FaPhone className="h-4 w-4 text-[#25D366]" />,
                    border: "border-[#25D366]/40",
                    label: "PHONE",
                    value: "+91 8905975919",
                    href: "tel:+918905975919",
                  },
                  {
                    icon: <FaMapMarkerAlt className="h-4 w-4 text-[#DAA520]" />,
                    border: "border-[#D4AF37]/40",
                    label: "LOCATION",
                    value: "India",
                    href: undefined,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div
                      className={`shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-[#050505]/80 border ${item.border}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs tracking-[0.2em] text-[#cccccc]/50 mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm sm:text-base font-semibold text-[#F5E6C8] hover:text-[#D4AF37] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm sm:text-base font-semibold text-[#F5E6C8]">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <p className="text-[10px] sm:text-xs tracking-[0.2em] text-[#cccccc]/50 mb-3">
                    FOLLOW THE JOURNEY
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      {
                        href: "https://github.com/deepikacode001",
                        icon: <FaGithub className="h-4 w-4" />,
                        border: "border-[#D4AF37]/40 hover:border-[#D4AF37]",
                        label: "GitHub",
                      },
                      {
                        href: "https://www.linkedin.com/in/deepika-rajpurohit-4812a8320/",
                        icon: <FaLinkedin className="h-4 w-4" />,
                        border: "border-[#00CED1]/40 hover:border-[#00CED1]",
                        label: "LinkedIn",
                      },
                      {
                        href: "mailto:deepikaraj01999@gmail.com",
                        icon: <FaEnvelope className="h-4 w-4" />,
                        border: "border-[#DAA520]/40 hover:border-[#DAA520]",
                        label: "Email",
                      },
                      {
                        href: "https://wa.me/918905975919",
                        icon: <FaWhatsapp className="h-4 w-4" />,
                        border: "border-[#25D366]/40 hover:border-[#25D366]",
                        label: "WhatsApp",
                      },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl bg-[#050505]/80 border text-[#F5E6C8] transition-colors ${social.border}`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="glass-panel p-4 sm:p-5 rounded-2xl w-full max-w-sm md:max-w-md md:ml-auto space-y-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-2.5 rounded-lg text-xs ${submitStatus.type === "success"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#050505]/70 border border-[#D4AF37]/20 rounded-xl px-3 py-2 text-sm text-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]/50 placeholder-[#cccccc]/35 transition"
                    placeholder="Your Name"
                    required
                  />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#050505]/70 border border-[#D4AF37]/20 rounded-xl px-3 py-2 text-sm text-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]/50 placeholder-[#cccccc]/35 transition"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#050505]/70 border border-[#D4AF37]/20 rounded-xl px-3 py-2 text-sm text-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]/50 placeholder-[#cccccc]/35 transition"
                  placeholder="Subject"
                />
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#050505]/70 border border-[#D4AF37]/20 rounded-xl px-3 py-2 text-sm text-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]/50 placeholder-[#cccccc]/35 transition resize-none"
                  placeholder="Tell me about your vision..."
                  required
                />
                <motion.button
                  type="submit"
                  className="w-full py-2.5 px-4 btn-gold rounded-full text-sm font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="glass-nav border-t border-[#D4AF37]/10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#F5E6C8] text-sm md:text-base">
              © {new Date().getFullYear()} Developer Portfolio by{" "}
              <span className="text-[#DAA520] font-medium">Deepika Rajpurohit</span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

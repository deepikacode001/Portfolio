"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

      // background gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#0b0b0f");
      grad.addColorStop(1, "#140b12");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // red radial glow
      const rad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        0,
        width * 0.5,
        height * 0.3,
        Math.max(width, height)
      );
      rad.addColorStop(0, "rgba(180,10,40,0.25)");
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
            <b>Deepika Rajpurohit</b>
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
            Hi, I'm Deepika Rajpurohit
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
              href="/Deepika_Rajpurohit_CV.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-2xl hover:bg-red-500 transition"
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
          <pre className="text-green-400 text-sm">
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
              Hi, I'm Deepika Rajpurohit, a Full Stack Developer passionate
              about building scalable and user-friendly web applications. I
              specialize in JavaScript, React.js, and Next.js, and I enjoy
              turning ideas into real-world digital solutions. I believe in
              self-learning and continuously upgrading my skills. Along with
              that, I have gained practical experience through internships: (3
              Months): Learned HTML, CSS,<b>Codake Softwares Private Limited</b>
              and Bootstrap, building the foundation of web development. <br />
              <b>GRID CODE MEDIA – Best Internet Website Development Agency:</b>
              I HTML, CSS, Bootstrap, Git & GitHub, JavaScript, TypeScript,
              React.js, Next.js, Node.js, MongoDB, and MySQL, gaining hands-on
              full-stack development experience. Currently, I’m enhancing my
              expertise in full-stack development, working with modern tools and
              frameworks like React.js, Next.js, Node.js, and MongoDB. I’m also
              pursuing my MCA at Bikaner Technical University (BTU),
              continuously learning and growing in the field of computer and
              information sciences. <b>My vision</b> is to contribute to making
              the web more open, innovative, and impactful.{" "}
              <b>Core Skillset:</b> JavaScript, React.js, Next.js, Node.js,
              TypeScript, MongoDB, MySQL Experience: 1+ Year (including
              internships & projects)
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <h3 className="text-red-400 font-medium">Location</h3>
                <p className="text-gray-300">Rajasthan, India</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-red-400 font-medium">Experience</h3>
                <p className="text-gray-300"> 1 Years</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-red-400 font-medium">Email</h3>
                <p className="text-gray-300">deepikaraj01999@gmail.com</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-red-400 font-medium">Freelance</h3>
                <p className="text-gray-300">Available</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full md:w-1/2"
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Deepika Rajpurohit"
                className="object-cover w-full h-full"
              />
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-transparent"></div>
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-red-500 to-transparent opacity-20"></div>
            </div>
            {/* Background decorative elements */}
            <div className="absolute -z-10 -inset-4 bg-gradient-to-tr from-red-500/20 to-transparent blur-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="bg-black text-white py-16 px-8 border-t border-white/5"
      >
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative group flex flex-col items-center justify-center bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-red-500 transition duration-300"
            >
              <div className="text-4xl mb-3">{skill.icon}</div>
              <h3 className="font-semibold text-lg">{skill.name}</h3>
              <p className="text-sm text-red-400">{skill.level}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="relative border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-2xl font-semibold"
          >
            Education
          </motion.h2>
          <div className="relative grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "MCA - Master of Computer Applications",
                org: "[BTU]",
                period: "2024 — 2026",
              },
              {
                title: "12th — Commerce",
                org: "RBSE",
                period: "2020 — 2021",
                detail: "Commerce with Computer.",
              },
            ].map((ed, i) => (
              <motion.div
                key={ed.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-white">
                      <GraduationCap className="h-4 w-4 text-red-300" />
                      <h3 className="font-medium">{ed.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-400">{ed.org}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                    {ed.period}
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-300">{ed.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-2xl font-semibold"
          >
            Projects
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Eminence Interiors Website",
                desc: "Corporate interior design company website developed in WordPress with responsive UI.",
                tags: ["WordPress", "Elementor", "Responsive"],
                demo: "https://eminence.tawafoqrealestate.com/",
                image: "/images/eminence.png",
              },
              {
                title: "Divine Homes Website",
                desc: "Construction business website built with WordPress showcasing projects and services.",
                tags: ["WordPress", "Custom Theme", "Responsive"],
                demo: "https://moonstonevistaa.com/",
                image: "/images/moonstonevistaa.png",
              },
            ].map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03]"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-medium text-white">{p.title}</h3>
                  <p className="text-sm text-zinc-300">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs text-red-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={p.demo}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" /> Live
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative border-t border-white/5 bg-black/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-2xl font-semibold text-white"
          >
            Contact
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 flex flex-col gap-4"
            >
              <label className="text-sm text-zinc-300 font-medium">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </label>
              <label className="text-sm text-zinc-300 font-medium">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </label>
              <label className="text-sm text-zinc-300 font-medium">
                Message
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="mt-1 w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </label>
              <button
                type="submit"
                className="mt-2 px-6 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition"
              >
                Send Message
              </button>
            </motion.form>
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 flex flex-col gap-4 justify-center"
            >
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-red-400" />
                <span className="text-zinc-200">deepikaraj01999@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaLinkedin className="text-blue-400" />
                <a
                  href="https://linkedin.com/in/deepika-rajpurohit-4812a8320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 hover:text-white underline"
                >
                  linkedin.com/in/deepika-rajpurohit-4812a8320
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaGithub className="text-white" />
                <a
                  href="https://github.com/deepikacode001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 hover:text-white underline"
                >
                  github.com/deepikacode001
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

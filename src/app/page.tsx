// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Github,
//   Linkedin,
//   Mail,
//   ExternalLink,
//   Code,
//   Palette,
//   Database,
//   Globe,
//   Smartphone,
//   Zap,
// } from "lucide-react";

// export default function Portfolio() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const projects = [
//     {
//       title: "E-Commerce Platform",
//       description:
//         "Custom e-commerce solution using WordPress and WooCommerce. Features include product management, secure payment integration, order tracking, and responsive design",
//       image: "/public/images/Screenshot-1.png",
//       technologies: ["WordPress"],
//       github: "https://github.com",
//       live: "https://example.com",
//     },
//     {
//       title: "Task Management App",
//       description:
//         "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
//       image: "/placeholder.svg?height=200&width=300",
//       technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
//       github: "https://github.com",
//       live: "https://example.com",
//     },
//     {
//       title: "Weather Dashboard",
//       description:
//         "Interactive weather dashboard with location-based forecasts, charts, and weather alerts using modern APIs.",
//       image: "/placeholder.svg?height=200&width=300",
//       technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind"],
//       github: "https://github.com",
//       live: "https://example.com",
//     },
//     {
//       title: "Social Media Analytics",
//       description:
//         "Analytics dashboard for social media metrics with data visualization, reporting, and performance tracking.",
//       image: "/placeholder.svg?height=200&width=300",
//       technologies: ["React", "D3.js", "Express", "PostgreSQL"],
//       github: "https://github.com",
//       live: "https://example.com",
//     },
//     {
//       title: "Portfolio Website",
//       description:
//         "Responsive portfolio website with modern design, animations, and optimized performance for showcasing projects.",
//       image: "/placeholder.svg?height=200&width=300",
//       technologies: ["Next.js", "Framer Motion", "Tailwind", "Vercel"],
//       github: "https://github.com",
//       live: "https://example.com",
//     },
//     {
//       title: "Chat Application",
//       description:
//         "Real-time chat application with multiple rooms, file sharing, emoji support, and user presence indicators.",
//       image: "/placeholder.svg?height=200&width=300",
//       technologies: ["React", "Firebase", "Socket.io", "Material-UI"],
//       github: "https://github.com",
//       live: "https://example.com",
//     },
//   ];
//   const journeyData = [
//     {
//       year: "2024",
//       title: "Internship at Codake Softwares",
//       description:
//         "Completed a 3-month internship focused on front-end development using HTML, CSS, and Bootstrap for responsive web design.",
//     },
//     {
//       year: "2025",
//       title: "Joined Grid Code Media",
//       description:
//         "Working as a Front-End Intern, building modern interfaces using React and collaborating on live projects.",
//     },
//     {
//       year: "2024 - Present",
//       title: "MCA at BTU",
//       description:
//         "Pursuing Master of Computer Applications from Bikaner Technical University (BTU) with a focus on web development.",
//     },
//   ];

//   const skills = [
//     {
//       name: "Frontend Development",
//       icon: Code,
//       description: "React, Vue.js, Next.js, TypeScript",
//     },
//     {
//       name: "UI/UX Design",
//       icon: Palette,
//       description: "Figma, Adobe XD, Responsive Design",
//     },
//     // {
//     //   name: "Backend Development",
//     //   icon: Database,
//     //   description: "Node.js, Express, MongoDB, PostgreSQL",
//     // },
//     {
//       name: "Web Technologies",
//       icon: Globe,
//       description: "HTML5, CSS3, JavaScript, REST APIs",
//     },
//     {
//       name: "E-commerce Development",
//       icon: Smartphone, // You can keep or change this icon as needed
//       description: "WordPress, WooCommerce, Custom Themes",
//     },

//     // {
//     //   name: "Performance",
//     //   icon: Zap,
//     //   description: "Optimization, SEO, Web Vitals",
//     // },
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-green-900/20">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex justify-between items-center">
//             <div className="text-xl font-bold text-green-400">Portfolio</div>
//             <div className="hidden md:flex space-x-8">
//               <a href="#home" className="hover:text-green-400 transition-colors">
//                 Home
//               </a>
//               <a
//                 href="#about"
//                 className="hover:text-green-400 transition-colors"
//               >
//                 About
//               </a>
//               <a
//                 href="#projects"
//                 className="hover:text-green-400 transition-colors"
//               >
//                 Projects
//               </a>
//               <a
//                 href="#contact"
//                 className="hover:text-green-400 transition-colors"
//               >
//                 Contact
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section
//   id="home"
//   className="min-h-screen flex items-center justify-center relative overflow-hidden"
// >
//   {/* Background gradient */}
//   <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black"></div>

//   {/* Main content */}
//   <div className="container mx-auto px-6 text-center relative z-10">
//     <div
//       className={`transition-all duration-1000 ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//       }`}
//     >
//       {/* Profile Image */}
//       <div className="flex justify-center mb-6">
//         <img
//           src="/profile.jpg" // 🔁 Replace with your actual image file in public/
//           alt=""
//           className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-green-400 shadow-lg"
//         />
//       </div>

//       {/* Name */}
//       <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
//         Deepika Rajpurohit
//       </h1>

//       {/* Role */}
//       <h2 className="text-2xl md:text-3xl text-green-400 mb-6">
//         Frontend Developer
//       </h2>

//       {/* Tagline */}
//       <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//         Crafting beautiful, responsive, and user-friendly web experiences
//         with modern technologies
//       </p>

//       {/* Buttons */}
//      <div className="flex flex-col sm:flex-row gap-4 justify-center">
//   {/* Download CV */}
//   <a href="/CV.pdf" download>
//     <Button
//       size="lg"
//       className="bg-green-600 hover:bg-green-700 text-white"
//     >
//       Download CV
//     </Button>
//   </a>

//   {/* View My Work */}
//   <a href="#projects"> {/* Replace with your actual section ID */}
//     <Button
//       size="lg"
//       variant="outline"
//       className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
//     >
//       View My Work
//     </Button>
//   </a>
// </div>

//     </div>
//   </div>

//   {/* Animated Background Elements */}
//   <div className="absolute inset-0 overflow-hidden">
//     <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-600/10 rounded-full blur-3xl animate-pulse"></div>
//     <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//   </div>
// </section>


//       {/* About Section */}
//       <section id="about" className="py-20 bg-gray-900/50">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-16 text-green-400">
//             About Me
//           </h2>
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h3 className="text-2xl font-semibold mb-6">
//                 Passionate Frontend Developer
//               </h3>
//               <p className="text-gray-300 mb-6 leading-relaxed">
//                 Hi, I'm Deepika Rajpurohit, a Front-End Developer passionate
//                 about creating interactive and user-friendly web experiences
//                 using technologies like JavaScript, React.js, and Next.js. I
//                 enjoy translating ideas into visually appealing and responsive
//                 interfaces that offer real-world value.
//               </p>
//               <p className="text-gray-300 mb-6 leading-relaxed">
//                 I’m currently working as a Front-End Intern at Grid Code Media,
//                 where I focus on developing clean and modern web designs.
//                 Previously, I completed a 3-month internship at Codake Softwares
//                 Private Limited, where I gained hands-on experience in building
//                 web pages and customizing WordPress themes for e-commerce
//                 websites.
//               </p>
//               <p className="text-gray-300 leading-relaxed">
//                 The projects showcased here reflect my learning journey and
//                 personal growth. While my ongoing work at Grid Code Media
//                 involves real-world client projects, some details are not
//                 displayed due to company confidentiality.
//               </p>
//               <p className="text-gray-300 leading-relaxed">
//                 I am pursuing my MCA at Bikaner Technical University (BTU) and
//                 continuously striving to grow in the field of web development
//                 and UI/UX design.
//               </p>
//               <br />
//               <div className="flex space-x-4">
//                 <a
//                   href="https://github.com/deepikacode001"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
//                   >
//                     <Github className="w-4 h-4 mr-2" />
//                     GitHub
//                   </Button>
//                 </a>
//                 <a
//                   href="https://www.linkedin.com/in/deepika-rajpurohit-4812a8320/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
//                   >
//                     <Linkedin className="w-4 h-4 mr-2" />
//                     LinkedIn
//                   </Button>
//                 </a>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-6">
//               {skills.map((skill, index) => (
//                 <Card
//                   key={index}
//                   className="bg-gray-800/50 border-gray-700 hover:border-green-500/50 transition-colors"
//                 >
//                   <CardContent className="p-4 text-center">
//                     <skill.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
//                     <h4 className="font-semibold text-white mb-2">
//                       {skill.name}
//                     </h4>
//                     <p className="text-sm text-gray-400">{skill.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Projects Section */}
//       <section id="projects" className="py-20">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-16 text-green-400">
//             Featured Projects
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {projects.map((project, index) => (
//               <Card
//                 key={index}
//                 className="bg-gray-900/50 border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105"
//               >
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={project.image || "/placeholder.svg"}
//                     alt={project.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                 </div>
//                 <CardHeader>
//                   <CardTitle className="text-white">{project.title}</CardTitle>
//                   <CardDescription className="text-gray-300">
//                     {project.description}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {project.technologies.map((tech, techIndex) => (
//                       <Badge
//                         key={techIndex}
//                         variant="secondary"
//                         className="bg-green-900/30 text-green-300"
//                       >
//                         {tech}
//                       </Badge>
//                     ))}
//                   </div>
//                   <div className="flex space-x-3">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
//                     >
//                       <Github className="w-4 h-4 mr-2" />
//                       Code
//                     </Button>
//                     <Button size="sm" className="bg-green-600 hover:bg-green-700">
//                       <ExternalLink className="w-4 h-4 mr-2" />
//                       Live Demo
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* JourneyMap */}
//       <section className="py-16 px-6 bg-gray-950 text-white">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-3xl font-bold mb-12 text-center">My Journey</h2>

//           <div className="relative border-l-2 border-green-500 pl-6">
//             {journeyData.map((item, index) => (
//               <div key={index} className="mb-10 ml-2 relative">
//                 {/* Timeline Dot */}
//                 <div className="absolute w-4 h-4 bg-green-500 rounded-full -left-[31px] top-1.5" />

//                 {/* Content */}
//                 <span className="text-sm text-green-400">{item.year}</span>
//                 <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
//                 <p className="text-sm text-gray-300 mt-1">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-20 bg-gray-900/50">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-4xl font-bold mb-8 text-green-400">
//             Let's Work Together
//           </h2>
//           <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
//             I'm always interested in new opportunities and exciting projects.
//             Let's discuss how we can bring your ideas to life.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <a
//               href="mailto:deepikaraj01999@gmail.co"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button size="lg" className="bg-green-600 hover:bg-green-700">
//                 <Mail className="w-5 h-5 mr-2" />
//                 Send Email
//               </Button>
//             </a>

//             <a
//               href="https://www.linkedin.com/in/deepika-rajpurohit-4812a8320/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
//               >
//                 <Linkedin className="w-5 h-5 mr-2" />
//                 Connect on LinkedIn
//               </Button>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-8 border-t border-gray-800">
//         <div className="container mx-auto px-6 text-center">
//           <p className="text-gray-400">
//             © 2024 Deepika Rajpurohit. Built with Next.js & Tailwind CSS.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }
// Dark Animated Portfolio — Single-file React component
// Requirements: Tailwind CSS, Framer Motion, lucide-react
// 
// Quick setup (for Next.js):
//   npm i framer-motion lucide-react
//   Tailwind: https://tailwindcss.com/docs/guides/nextjs
// Drop this file into app/page.tsx (or src/app/page.tsx) and adjust content.

"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Rocket,
  MapPin,
} from "lucide-react";

// Simple smooth scroll helper
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Animated starfield background using <canvas>
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
      // dark gradient background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#0b0b0f");
      grad.addColorStop(1, "#140b12");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // subtle red radial glow center
      const rad = ctx.createRadialGradient(width * 0.5, height * 0.3, 0, width * 0.5, height * 0.3, Math.max(width, height));
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

export default function Portfolio() {
  return (
    <main className="relative min-h-screen bg-black text-zinc-100 selection:bg-red-600/40 selection:text-white">
      <Starfield />

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => scrollToId("home")}
            className="font-semibold tracking-wide text-white/90 hover:text-white transition"
          >
            Deepika • Portfolio
          </button>
          <div className="hidden gap-2 sm:flex">
            {[
              ["About", "about"],
              ["Education", "education"],
              ["Skills", "skills"],
              ["Projects", "projects"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className="rounded-xl px-3 py-2 text-sm text-zinc-300 hover:text-white transition"
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs text-red-200">
            <Rocket className="h-3.5 w-3.5" /> Dark • Animated • Theme
          </div>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Hi, I'm <span className="bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">Deepika Rajpurohit</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base">
            Full‑Stack Developer • Next.js • React • Node • Laravel • MongoDB. I build clean UIs and scalable backends.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("projects");
              }}
              className="group rounded-2xl border border-red-500/50 bg-red-600/20 px-5 py-2 text-sm font-medium text-red-100 backdrop-blur transition hover:bg-red-600/30"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 text-zinc-300">
            <a href="https://github.com/" target="_blank" className="hover:text-white" aria-label="GitHub"><Github className="h-5 w-5" /></a>
            <a href="https://www.linkedin.com/" target="_blank" className="hover:text-white" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
            <a href="mailto:hello@example.com" className="hover:text-white" aria-label="Email"><Mail className="h-5 w-5" /></a>
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="relative border-t border-white/5 bg-gradient-to-b from-black/0 to-black/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-6 text-2xl font-semibold">
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="max-w-3xl text-zinc-300"
          >
            I'm a developer who loves shipping polished, performant web apps. My focus is on DX, accessibility, and delightful micro‑interactions. I enjoy translating business goals into clean engineering.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: <MapPin className="h-4 w-4" />, label: "Location", value: "India" },
              { icon: <Briefcase className="h-4 w-4" />, label: "Role", value: "Full‑Stack Developer" },
              { icon: <Code2 className="h-4 w-4" />, label: "Stack", value: "Next.js • Node • MongoDB" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_20px_rgba(255,0,0,0.05)]"
              >
                <div className="text-sm text-zinc-400">{item.label}</div>
                <div className="mt-1 flex items-center gap-2 text-white">
                  {item.icon}
                  <span>{item.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="relative border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-8 text-2xl font-semibold">
            Education
          </motion.h2>
          <div className="relative grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "B.Sc. Computer Science",
                org: "Aishwarya College",
                period: "2022 — 2025",
                detail: "Data Structures, OS, DBMS, Web Dev, Cloud."
              },
              {
                title: "12th — Science",
                org: "RBSE",
                period: "2021 — 2022",
                detail: "PCM with Computer Science."
              },
            ].map((ed, i) => (
              <motion.div
                key={ed.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-5"
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

      {/* Skills */}
      <section id="skills" className="relative border-t border-white/5 bg-black/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-6 text-2xl font-semibold">
            Skills
          </motion.h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              "HTML5", "CSS3", "Tailwind", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "MySQL", "Laravel", "Git & GitHub", "REST APIs", "Firebase", "Docker",
            ].map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="absolute -inset-px rounded-2xl opacity-0 blur-lg transition group-hover:opacity-100" style={{ background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(239,68,68,0.25), transparent 40%)" }} />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-sm text-white">{s}</span>
                  <span className="text-[10px] text-red-200/70">Advanced</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-8 text-2xl font-semibold">
            Projects
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "E‑Commerce Storefront",
                desc: "Next.js + MongoDB + Stripe • Product listings, cart, checkout, admin dashboard.",
                tags: ["Next.js", "MongoDB", "Stripe"],
                repo: "#",
                demo: "#",
              },
              {
                title: "SaaS Analytics Dashboard",
                desc: "Role‑based auth, charts, CRUD, server actions, responsive layouts.",
                tags: ["Next.js", "Prisma", "Postgres"],
                repo: "#",
                demo: "#",
              },
              {
                title: "Portfolio v2",
                desc: "Animated dark theme with framer‑motion and a custom starfield background.",
                tags: ["React", "Framer Motion", "Tailwind"],
                repo: "#",
                demo: "#",
              },
              {
                title: "Realtime Chat App",
                desc: "Socket.io messaging, typing indicators, file sharing, JWT auth.",
                tags: ["Node", "Express", "Socket.io"],
                repo: "#",
                demo: "#",
              },
            ].map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03]"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.25),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(239,68,68,0.15),transparent_40%)]" />
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-medium text-white">{p.title}</h3>
                  <p className="text-sm text-zinc-300">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs text-red-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <a href={p.repo} className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white"><Github className="h-4 w-4" /> Code</a>
                    <a href={p.demo} className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white"><ExternalLink className="h-4 w-4" /> Live</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative border-t border-white/5 bg-black/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-6 text-2xl font-semibold">
            Contact
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.form
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onSubmit={(e) => e.preventDefault()}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-zinc-300">Name</span>
                  <input className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-red-500/30 placeholder:text-zinc-500 focus:ring-2" placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="text-sm text-zinc-300">Email</span>
                  <input type="email" className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-red-500/30 placeholder:text-zinc-500 focus:ring-2" placeholder="you@example.com" />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-sm text-zinc-300">Message</span>
                <textarea rows={5} className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-red-500/30 placeholder:text-zinc-500 focus:ring-2" placeholder="Tell me about your project..." />
              </label>
              <button className="mt-4 w-full rounded-2xl border border-red-500/40 bg-red-600/20 px-4 py-2 text-sm font-medium text-red-100 backdrop-blur transition hover:bg-red-600/30">
                Send Message
              </button>
              <p className="mt-3 text-xs text-zinc-400">This is a demo form. Wire it to an API like Formspree or a server action.</p>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="mb-3 text-lg font-medium">Let's build something great</h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@example.com</li>
                <li className="flex items-center gap-2"><Github className="h-4 w-4" /> github.com/yourhandle</li>
                <li className="flex items-center gap-2"><Linkedin className="h-4 w-4" /> linkedin.com/in/yourhandle</li>
              </ul>
              <p className="mt-4 text-sm text-zinc-400">
                Available for freelance, internships, and full‑time roles.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} Deepika Rajpurohit</span>
          <span className="inline-flex items-center gap-1"><Rocket className="h-3.5 w-3.5" /> Crafted with Next.js + Tailwind</span>
        </div>
      </footer>

      {/* mouse glow effect over skill cards */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('#skills .group');
            for (const card of cards) {
              const r = card.getBoundingClientRect();
              (card as HTMLElement).style.setProperty('--x', (e.clientX - r.left) + 'px');
              (card as HTMLElement).style.setProperty('--y', (e.clientY - r.top) + 'px');
            }
          });
        `,
      }} />
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Database,
  Globe,
  Smartphone,
  Zap,
} from "lucide-react";

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Custom e-commerce solution using WordPress and WooCommerce. Features include product management, secure payment integration, order tracking, and responsive design",
      image: "/public/images/Screenshot-1.png",
      technologies: ["WordPress"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      title: "Weather Dashboard",
      description:
        "Interactive weather dashboard with location-based forecasts, charts, and weather alerts using modern APIs.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      title: "Social Media Analytics",
      description:
        "Analytics dashboard for social media metrics with data visualization, reporting, and performance tracking.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["React", "D3.js", "Express", "PostgreSQL"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      title: "Portfolio Website",
      description:
        "Responsive portfolio website with modern design, animations, and optimized performance for showcasing projects.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Next.js", "Framer Motion", "Tailwind", "Vercel"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      title: "Chat Application",
      description:
        "Real-time chat application with multiple rooms, file sharing, emoji support, and user presence indicators.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["React", "Firebase", "Socket.io", "Material-UI"],
      github: "https://github.com",
      live: "https://example.com",
    },
  ];
  const journeyData = [
    {
      year: "2024",
      title: "Internship at Codake Softwares",
      description:
        "Completed a 3-month internship focused on front-end development using HTML, CSS, and Bootstrap for responsive web design.",
    },
    {
      year: "2025",
      title: "Joined Grid Code Media",
      description:
        "Working as a Front-End Intern, building modern interfaces using React and collaborating on live projects.",
    },
    {
      year: "2024 - Present",
      title: "MCA at BTU",
      description:
        "Pursuing Master of Computer Applications from Bikaner Technical University (BTU) with a focus on web development.",
    },
  ];

  const skills = [
    {
      name: "Frontend Development",
      icon: Code,
      description: "React, Vue.js, Next.js, TypeScript",
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      description: "Figma, Adobe XD, Responsive Design",
    },
    // {
    //   name: "Backend Development",
    //   icon: Database,
    //   description: "Node.js, Express, MongoDB, PostgreSQL",
    // },
    {
      name: "Web Technologies",
      icon: Globe,
      description: "HTML5, CSS3, JavaScript, REST APIs",
    },
    {
      name: "E-commerce Development",
      icon: Smartphone, // You can keep or change this icon as needed
      description: "WordPress, WooCommerce, Custom Themes",
    },

    // {
    //   name: "Performance",
    //   icon: Zap,
    //   description: "Optimization, SEO, Web Vitals",
    // },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-green-900/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-green-400">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-green-400 transition-colors">
                Home
              </a>
              <a
                href="#about"
                className="hover:text-green-400 transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="hover:text-green-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="hover:text-green-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
  id="home"
  className="min-h-screen flex items-center justify-center relative overflow-hidden"
>
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black"></div>

  {/* Main content */}
  <div className="container mx-auto px-6 text-center relative z-10">
    <div
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img
          src="/profile.jpg" // 🔁 Replace with your actual image file in public/
          alt=""
          className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-green-400 shadow-lg"
        />
      </div>

      {/* Name */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
        Deepika Rajpurohit
      </h1>

      {/* Role */}
      <h2 className="text-2xl md:text-3xl text-green-400 mb-6">
        Frontend Developer
      </h2>

      {/* Tagline */}
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Crafting beautiful, responsive, and user-friendly web experiences
        with modern technologies
      </p>

      {/* Buttons */}
     <div className="flex flex-col sm:flex-row gap-4 justify-center">
  {/* Download CV */}
  <a href="/CV.pdf" download>
    <Button
      size="lg"
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      Download CV
    </Button>
  </a>

  {/* View My Work */}
  <a href="#projects"> {/* Replace with your actual section ID */}
    <Button
      size="lg"
      variant="outline"
      className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
    >
      View My Work
    </Button>
  </a>
</div>

    </div>
  </div>

  {/* Animated Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-600/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>
</section>


      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-green-400">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Passionate Frontend Developer
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Hi, I'm Deepika Rajpurohit, a Front-End Developer passionate
                about creating interactive and user-friendly web experiences
                using technologies like JavaScript, React.js, and Next.js. I
                enjoy translating ideas into visually appealing and responsive
                interfaces that offer real-world value.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I’m currently working as a Front-End Intern at Grid Code Media,
                where I focus on developing clean and modern web designs.
                Previously, I completed a 3-month internship at Codake Softwares
                Private Limited, where I gained hands-on experience in building
                web pages and customizing WordPress themes for e-commerce
                websites.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The projects showcased here reflect my learning journey and
                personal growth. While my ongoing work at Grid Code Media
                involves real-world client projects, some details are not
                displayed due to company confidentiality.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I am pursuing my MCA at Bikaner Technical University (BTU) and
                continuously striving to grow in the field of web development
                and UI/UX design.
              </p>
              <br />
              <div className="flex space-x-4">
                <a
                  href="https://github.com/deepikacode001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/in/deepika-rajpurohit-4812a8320/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card
                  key={index}
                  className="bg-gray-800/50 border-gray-700 hover:border-green-500/50 transition-colors"
                >
                  <CardContent className="p-4 text-center">
                    <skill.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">
                      {skill.name}
                    </h4>
                    <p className="text-sm text-gray-400">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-green-400">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{project.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-green-900/30 text-green-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* JourneyMap */}
      <section className="py-16 px-6 bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">My Journey</h2>

          <div className="relative border-l-2 border-green-500 pl-6">
            {journeyData.map((item, index) => (
              <div key={index} className="mb-10 ml-2 relative">
                {/* Timeline Dot */}
                <div className="absolute w-4 h-4 bg-green-500 rounded-full -left-[31px] top-1.5" />

                {/* Content */}
                <span className="text-sm text-green-400">{item.year}</span>
                <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-green-400">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:deepikaraj01999@gmail.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </Button>
            </a>

            <a
              href="https://www.linkedin.com/in/deepika-rajpurohit-4812a8320/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                Connect on LinkedIn
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Deepika Rajpurohit. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

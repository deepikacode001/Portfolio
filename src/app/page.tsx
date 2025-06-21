"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Database, Globe, Smartphone, Zap } from "lucide-react"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
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
  ]

  const skills = [
    { name: "Frontend Development", icon: Code, description: "React, Vue.js, Next.js, TypeScript" },
    { name: "UI/UX Design", icon: Palette, description: "Figma, Adobe XD, Responsive Design" },
    { name: "Backend Development", icon: Database, description: "Node.js, Express, MongoDB, PostgreSQL" },
    { name: "Web Technologies", icon: Globe, description: "HTML5, CSS3, JavaScript, REST APIs" },
    { name: "Mobile Development", icon: Smartphone, description: "React Native, Flutter, PWA" },
    { name: "Performance", icon: Zap, description: "Optimization, SEO, Web Vitals" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-blue-900/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-blue-400">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-blue-400 transition-colors">
                Home
              </a>
              <a href="#about" className="hover:text-blue-400 transition-colors">
                About
              </a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">
                Projects
              </a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Your Name</span>
              <br />
              <span className="text-blue-400">Frontend Developer</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Crafting beautiful, responsive, and user-friendly web experiences with modern technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
              >
                Download CV
              </Button>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Passionate Frontend Developer</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a dedicated frontend developer with a passion for creating exceptional digital experiences. With
                expertise in modern web technologies, I transform ideas into beautiful, functional websites and
                applications that users love.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                My journey in web development started with curiosity and has evolved into a career focused on continuous
                learning, innovation, and delivering high-quality solutions that make a difference.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <skill.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">{skill.name}</h4>
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
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
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
                  <CardDescription className="text-gray-300">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-blue-900/30 text-blue-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-400">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas
            to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2024 Your Name. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}

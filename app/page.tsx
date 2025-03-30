"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ChevronDown,
  Code,
  Briefcase,
  User,
  GraduationCap,
  ExternalLink,
  Menu,
  X,
  MapPin,
} from "lucide-react"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleNavClick = (section: string) => {
    setActiveSection(section)
    setMenuOpen(false)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "home", label: "Home", icon: <User className="w-4 h-4" /> },
    { id: "about", label: "About", icon: <User className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <Briefcase className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Code className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ]

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black pointer-events-none z-0" />

      {/* Cursor glow effect */}
      <motion.div
        className="fixed w-64 h-64 rounded-full bg-purple-600/20 pointer-events-none z-10 filter blur-3xl opacity-50"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 50,
        }}
      />

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10 pointer-events-none z-0" />

      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 bg-black/50 p-2 rounded-full backdrop-blur-sm border border-purple-500/50 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-6 h-6 text-purple-400" /> : <Menu className="w-6 h-6 text-purple-400" />}
      </button>

      {/* Desktop navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 hidden md:block">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
              <motion.span
                className="inline-block"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">DEV</span>
                <span className="text-white">FOLIO</span>
              </motion.span>
            </Link>
            <motion.div
              className="flex space-x-1 bg-black/30 backdrop-blur-md rounded-full p-1 border border-white/10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_15px_rgba(167,139,250,0.5)]"
                      : "hover:bg-white/10 text-white/70"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex md:hidden bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-6 py-3 rounded-full flex items-center gap-3 text-lg w-64 justify-center transition-all ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_15px_rgba(167,139,250,0.5)]"
                      : "bg-white/5 text-white/70 border border-white/10"
                  }`}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * navItems.findIndex((n) => n.id === item.id) }}
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative z-20">
        {/* Hero section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <motion.div
                className="md:w-1/2 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium text-purple-300 border border-purple-500/30">
                  Creative Developer
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="block">Hi, I'm</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 text-5xl md:text-7xl drop-shadow-[0_0_10px_rgba(137,207,240,0.3)]">
                    Alex Chen
                  </span>
                  <span className="block mt-2">Full Stack Developer</span>
                </h1>
                <p className="text-lg text-gray-300 max-w-xl">
                  I build exceptional digital experiences that are fast, accessible, and designed with user experience
                  in mind.
                </p>
                <div className="flex gap-4 pt-6">
                  <motion.button
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(149,76,233,0.5)] hover:shadow-[0_0_25px_rgba(149,76,233,0.7)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Projects
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 rounded-full bg-transparent border border-purple-500/50 text-white font-medium hover:bg-white/5 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Me
                  </motion.button>
                </div>
                <div className="flex gap-4 pt-6">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                    whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
                  >
                    <Github className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                    whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                    whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </motion.a>
                </div>
              </motion.div>
              <motion.div
                className="md:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl opacity-40 animate-pulse" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-purple-500/50">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Alex Chen"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-sm text-gray-400 mb-2">Scroll Down</p>
              <ChevronDown className="w-6 h-6 text-purple-400 animate-bounce" />
            </motion.div>
          </div>
        </section>

        {/* About section */}
        <section id="about" className="min-h-screen flex items-center justify-center py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Me</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-4 rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-20" />
                <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt="About Me"
                    width={600}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold">Full Stack Developer based in San Francisco, California</h3>
                <p className="text-gray-300">
                  I'm a passionate Full Stack Developer with over 5 years of experience creating modern and responsive
                  web applications. My expertise spans across both front-end and back-end technologies, allowing me to
                  build complete, scalable solutions.
                </p>
                <p className="text-gray-300">
                  I specialize in React, Next.js, Node.js, and modern JavaScript. I'm passionate about creating
                  intuitive user interfaces with smooth animations and excellent performance.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <div className="text-purple-400 font-medium">Name:</div>
                    <div>Alex Chen</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-medium">Email:</div>
                    <div>alex@example.com</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-medium">Location:</div>
                    <div>San Francisco, CA</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-medium">Available:</div>
                    <div>Freelance & Full-time</div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <motion.a
                    href="#contact"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(149,76,233,0.5)] hover:shadow-[0_0_25px_rgba(149,76,233,0.7)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Hire Me
                  </motion.a>
                  <motion.a
                    href="#"
                    className="px-6 py-3 rounded-full bg-transparent border border-purple-500/50 text-white font-medium hover:bg-white/5 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download CV
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-20">
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-20 group-hover:opacity-40 transition-all" />
                <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 h-full group-hover:border-purple-500/50 transition-all">
                  <GraduationCap className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-white font-medium">Master in Computer Science</div>
                      <div className="text-gray-400">Stanford University, 2018-2020</div>
                    </div>
                    <div>
                      <div className="text-white font-medium">Bachelor in Software Engineering</div>
                      <div className="text-gray-400">UC Berkeley, 2014-2018</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-20 group-hover:opacity-40 transition-all" />
                <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 h-full group-hover:border-purple-500/50 transition-all">
                  <Briefcase className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-white font-medium">Senior Developer</div>
                      <div className="text-gray-400">Tech Solutions Inc, 2020-Present</div>
                    </div>
                    <div>
                      <div className="text-white font-medium">Frontend Developer</div>
                      <div className="text-gray-400">Digital Creations, 2018-2020</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-20 group-hover:opacity-40 transition-all" />
                <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 h-full group-hover:border-purple-500/50 transition-all">
                  <Code className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Achievements</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-white font-medium">Google Developer Expert</div>
                      <div className="text-gray-400">Web Technologies, 2022</div>
                    </div>
                    <div>
                      <div className="text-white font-medium">Open Source Contributor</div>
                      <div className="text-gray-400">100+ Contributions, 2021</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects section */}
        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Projects
                </span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-4 rounded-full" />
              <p className="text-gray-300 max-w-2xl mx-auto mt-6">
                Check out some of my latest work. Each project represents a unique challenge and solution.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + item * 0.1 }}
                >
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-0 group-hover:opacity-40 transition-all" />
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm group-hover:border-purple-500/50 transition-all">
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=300&width=500&text=Project+${item}`}
                        alt={`Project ${item}`}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        Project Title {item}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        A short description of this project and the technologies used to build it.
                      </p>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300">
                          React
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-300">
                          Next.js
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300">
                          Tailwind
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <motion.a
                          href="#"
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                          whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
                        >
                          <Github className="w-5 h-5 text-white" />
                        </motion.a>
                        <motion.a
                          href="#"
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                          whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="#"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium inline-flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(149,76,233,0.5)] hover:shadow-[0_0_25px_rgba(149,76,233,0.7)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
                <ChevronDown className="w-4 h-4 rotate-270" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Skills section */}
        <section id="skills" className="py-20 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Skills
                </span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-4 rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
                <div className="space-y-6">
                  {[
                    { name: "HTML/CSS", percentage: 95 },
                    { name: "JavaScript/TypeScript", percentage: 90 },
                    { name: "React/Next.js", percentage: 88 },
                    { name: "Node.js", percentage: 85 },
                    { name: "Tailwind CSS", percentage: 92 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-purple-400">{skill.percentage}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-6">Professional Skills</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { name: "Communication", percentage: 90 },
                    { name: "Teamwork", percentage: 95 },
                    { name: "Problem Solving", percentage: 88 },
                    { name: "Creativity", percentage: 92 },
                    { name: "Project Management", percentage: 85 },
                    { name: "Adaptability", percentage: 90 },
                  ].map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="relative"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-32 h-32">
                          <circle
                            className="text-white/10"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="58"
                            cx="64"
                            cy="64"
                          />
                          <motion.circle
                            className="text-purple-500"
                            strokeWidth="8"
                            strokeLinecap="round"
                            stroke="url(#gradient)"
                            fill="transparent"
                            r="58"
                            cx="64"
                            cy="64"
                            initial={{ strokeDasharray: "364 364", strokeDashoffset: 364 }}
                            whileInView={{
                              strokeDashoffset: 364 - (364 * skill.percentage) / 100,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#9333ea" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-xl font-bold">{skill.percentage}%</span>
                          <span className="text-sm text-gray-300">{skill.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-20 relative group rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-20 group-hover:opacity-40 transition-all" />
              <div className="relative p-8 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-3">
                    <h3 className="text-2xl font-bold mb-2">Let's work together on your next project</h3>
                    <p className="text-gray-300">
                      I'm currently available for freelance work. If you have a project that you want to get started,
                      feel free to get in touch.
                    </p>
                  </div>
                  <div className="md:col-span-2 flex justify-center md:justify-end">
                    <motion.a
                      href="#contact"
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium inline-flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(149,76,233,0.5)] hover:shadow-[0_0_25px_rgba(149,76,233,0.7)]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Me
                      <ChevronDown className="w-4 h-4 rotate-270" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold">
                Get In{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Touch
                </span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-4 rounded-full" />
              <p className="text-gray-300 max-w-2xl mx-auto mt-6">
                Have a project in mind? Let's discuss how I can help bring your ideas to life.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="text-gray-300 mb-8">
                  Feel free to reach out to me through any of these channels. I'll get back to you as soon as possible.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-white/5 border border-white/10 text-purple-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Email</div>
                      <div className="font-medium">alex@example.com</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-white/5 border border-white/10 text-purple-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Location</div>
                      <div className="font-medium">San Francisco, California</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-white/5 border border-white/10 text-purple-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Employment</div>
                      <div className="font-medium">Available for Freelance & Full-time</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                    whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
                  >
                    <Github className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                    whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                    whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-all" />
                  <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
                    <form className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="Your email"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Subject"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                          placeholder="Your message"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(149,76,233,0.5)] hover:shadow-[0_0_25px_rgba(149,76,233,0.7)] w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Message
                      </motion.button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">DEV</span>
                <span className="text-white">FOLIO</span>
              </span>
            </div>
            <div className="text-sm text-gray-400">© {new Date().getFullYear()} Alex Chen. All rights reserved.</div>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
              >
                <Github className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
              >
                <Twitter className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                whileHover={{ y: -3, boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)" }}
              >
                <Linkedin className="w-5 h-5 text-white" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


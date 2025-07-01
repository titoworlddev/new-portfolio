"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ProjectModal } from "@/components/project-modal"
import { Github, Linkedin, ArrowRight, Download, CheckCircle, Play, Menu, X } from "lucide-react"

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectsData, setProjectsData] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/data/projects.json")
        const data = await response.json()
        setProjectsData(data)
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const webProjects = isLoading ? [] : Object.values(projectsData).filter((project: any) => project.category === "web")
  const mobileProjects = isLoading
    ? []
    : Object.values(projectsData).filter((project: any) => project.category === "movil")

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const courses = [
    {
      title: "React: De cero a experto ( Hooks y MERN ) - 54 horas",
      platform: "Udemy - 2024",
      description:
        "Este curso cuenta con más de 400 lecciones y más de 40 horas de vídeo haciendo aplicaciones y pruebas distintas que ayuda a alcanzar el objetivo de dominar React y otras tecnologías que lo rodean, hay muchas tareas y ejercicios que ayudan a asimilar los conocimientos necesarios para ser un FullStack Developer utilizando React y Node en el Backend junto con Mongo y Firestore como bases de datos.",
      technologies:
        "React a profundidad, Hooks y Hooks personalizados, Functional Components, HOC - higher-order components, Context API, Redux, MERN - Mongo + Express + React + Node, Router, Diseños diferentes en diferentes rutas, Bootstrap, Mongoose, JWT y su re-validación, Encriptación de contraseñas, Google Sign-in, Autenticación personalizada, Unit Test, Pruebas especializadas en cada aplicación terminada, Despliegues a producción, Enzyme, Jest, React Testing Library, Mocks, Animaciones en componentes, History, QueryStrings, Heroku y Heroku Logs, Git y Github, Redux DevTools, React DevTools",
      completed: true,
    },
    {
      title: "Introducción a Frameworks de Frontend con Vue 3 - 8 horas",
      platform: "Mastermind - 2023",
      completed: true,
    },
    {
      title: "Diseño web profesional el curso completo práctico y desde 0 - 42 horas",
      platform: "Udemy - 2022 a 2023",
      completed: true,
    },
    {
      title: "Flutter intermedio: Diseños profesionales y animaciones - 15.5 horas",
      platform: "Udemy - 2021",
      completed: true,
    },
    {
      title: "Flutter: Tu guía completa para ios y android - 37.5 horas",
      platform: "Udemy - 2020",
      completed: true,
    },
    {
      title: "Dart: De cero hasta los detalles - 10 horas",
      platform: "Udemy - 2020",
      completed: true,
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-teal-500/10 rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Navigation - Mobile First */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
            CA
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Proyectos", id: "proyectos" },
              { name: "Sobre mí", id: "sobre-mi" },
              { name: "Habilidades", id: "habilidades" },
              { name: "Contacto", id: "contacto" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-300 hover:text-teal-400 hover:-translate-y-0.5 transition-all duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Desktop Social Links */}
          <div className="hidden md:flex space-x-4">
            <a
              href="https://github.com/titoworlddev"
              target="_blank"
              className="text-slate-400 hover:text-white hover:scale-110 transition-all"
              rel="noreferrer"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/cristian-arias"
              target="_blank"
              className="text-slate-400 hover:text-white hover:scale-110 transition-all"
              rel="noreferrer"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              {[
                { name: "Proyectos", id: "proyectos" },
                { name: "Sobre mí", id: "sobre-mi" },
                { name: "Habilidades", id: "habilidades" },
                { name: "Contacto", id: "contacto" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-slate-300 hover:text-teal-400 transition-colors py-2"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex space-x-4 pt-4 border-t border-slate-700/50">
                <a
                  href="https://github.com/titoworlddev"
                  target="_blank"
                  className="text-slate-400 hover:text-white transition-colors"
                  rel="noreferrer"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/cristian-arias"
                  target="_blank"
                  className="text-slate-400 hover:text-white transition-colors"
                  rel="noreferrer"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Mobile First */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-teal-400 text-base sm:text-lg mb-4 font-mono">CRISTIAN ARIAS</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-teal-200 to-emerald-400 bg-clip-text text-transparent">
              Desarrollador
              <br />
              <span className="text-teal-400">Frontend</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Apasionado desarrollador frontend con +3 años de experiencia en el desarrollo web y móvil. Busco
              oportunidades para aplicar y ampliar mis conocimientos, aportando entusiasmo y un enfoque centrado en la
              usabilidad y el diseño.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("proyectos")}
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white border-0 group"
              >
                Ver Proyectos
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-teal-400/50 text-teal-400 hover:bg-teal-400/10 backdrop-blur-sm bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar CV
              </Button>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-teal-400/30 backdrop-blur-sm bg-slate-800/30">
                <img src="/hero-image.png" alt="Cristian Arias" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Mobile First */}
      <section id="proyectos" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
              MIS PROYECTOS
            </h2>
          </div>

          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
              <p className="text-slate-400 mt-4">Cargando proyectos...</p>
            </div>
          ) : (
            <>
              {/* Web Projects */}
              <div className="mb-12 sm:mb-16">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-6 sm:mb-8 underline decoration-teal-400">
                  Web
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {webProjects.map((project: any, index) => (
                    <div key={index} className="cursor-pointer" onClick={() => handleProjectClick(project)}>
                      <Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-teal-400/50 transition-all duration-500 overflow-hidden h-full">
                        <div className="relative overflow-hidden">
                          <img
                            src={project.img || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-4 sm:p-6">
                          <h4 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-teal-400 transition-colors text-center">
                            {project.title}
                          </h4>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Projects */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-6 sm:mb-8 underline decoration-teal-400">
                  Móvil
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {mobileProjects.map((project: any, index) => (
                    <div key={index} className="cursor-pointer" onClick={() => handleProjectClick(project)}>
                      <Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-teal-400/50 transition-all duration-500 overflow-hidden h-full">
                        <div className="relative overflow-hidden">
                          <img
                            src={project.img || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-4 sm:p-6">
                          <h4 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-teal-400 transition-colors text-center">
                            {project.title}
                          </h4>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Section - Mobile First */}
      <section id="sobre-mi" className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              SOBRE MÍ
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-300 leading-relaxed">
              <p>
                Actualmente me especializo en Frontend de Web y Móvil, pero estoy aprendiendo sobre el backend porque me
                gustaría llegar a ser un desarrollador fullstack.
              </p>
              <p>
                Con muchas ganas de trabajar, ya que me encanta lo que hago, la programación y el diseño, por lo que me
                apasiona crear aplicaciones funcionales, bonitas e intuitivas.
              </p>
              <p>
                En conclusión me gusta mucho el mundo de la tecnología y también soy muy curioso, lo cual me lleva a
                estar aprendiendo cosas nuevas constantemente.
              </p>
              <p className="text-lg sm:text-xl font-semibold text-teal-400">
                Si quieres saber más sobre mí, te invito a descargar mi CV.
              </p>
            </div>
            <div className="mt-6 sm:mt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
              >
                <Download className="mr-2 h-4 w-4" />
                Descarga mi CV
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Mobile First */}
      <section id="habilidades" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              HABILIDADES
            </h2>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Web Skills */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-4 sm:mb-6 underline decoration-teal-400">
                Web
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6">
                {[
                  "HTML5",
                  "CSS3",
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Vue.js",
                  "Astro",
                  "Tailwind",
                  "Bootstrap",
                  "Sass",
                  "Node.js",
                  "Express",
                  "Firebase",
                  "MongoDB",
                  "Redux",
                  "Vite",
                ].map((skill, index) => (
                  <div
                    key={skill}
                    className="flex flex-col items-center p-3 sm:p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-teal-400/50 transition-all duration-300 group"
                  >
                    <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">🌐</div>
                    <span className="text-xs sm:text-xs text-slate-300 text-center font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Skills */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-4 sm:mb-6 underline decoration-teal-400">
                Móvil
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6">
                {["Dart", "Flutter"].map((skill, index) => (
                  <div
                    key={skill}
                    className="flex flex-col items-center p-3 sm:p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-teal-400/50 transition-all duration-300 group"
                  >
                    <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">📱</div>
                    <span className="text-xs sm:text-xs text-slate-300 text-center font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Utility Skills */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-4 sm:mb-6 underline decoration-teal-400">
                Utilidades
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6">
                {["Git", "GitHub"].map((skill, index) => (
                  <div
                    key={skill}
                    className="flex flex-col items-center p-3 sm:p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-teal-400/50 transition-all duration-300 group"
                  >
                    <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">🔧</div>
                    <span className="text-xs sm:text-xs text-slate-300 text-center font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Skills */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-4 sm:mb-6 underline decoration-teal-400">
                Diseño
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6">
                {["Figma", "Adobe XD"].map((skill, index) => (
                  <div
                    key={skill}
                    className="flex flex-col items-center p-3 sm:p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-teal-400/50 transition-all duration-300 group"
                  >
                    <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">🎨</div>
                    <span className="text-xs sm:text-xs text-slate-300 text-center font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section - Mobile First */}
      <section id="cursos" className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              CURSOS Y CERTIFICACIONES
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {courses.map((course, index) => (
              <div key={index}>
                <Card className="p-4 sm:p-6 bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:border-teal-400/50 transition-all duration-300">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {course.completed ? (
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                      ) : (
                        <Play className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-teal-400 font-medium mb-3 sm:mb-4">{course.platform}</p>

                      {course.description && (
                        <div className="mb-3 sm:mb-4">
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">Temas principales del curso:</h4>
                          <p className="text-slate-400 text-sm leading-relaxed mb-3 sm:mb-4">{course.description}</p>
                        </div>
                      )}

                      {course.technologies && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">Tecnologías y herramientas:</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">{course.technologies}</p>
                        </div>
                      )}

                      {index === 0 && (
                        <div className="mt-4">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
                          >
                            Ver certificado
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Mobile First */}
      <section id="contacto" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
              CONTÁCTAME
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 mb-2">Envíame un mensaje si deseas trabajar conmigo.</p>
            <p className="text-slate-500">- Usa el formulario o carlosmejuto@gmail.com -</p>
          </div>

          <div>
            <Card className="p-6 sm:p-8 bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Nombre <span className="text-red-400">*</span>
                    </label>
                    <Input
                      className="bg-slate-700/50 border-slate-600/50 focus:border-teal-400/50 text-white placeholder:text-slate-400"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <Input
                      type="email"
                      className="bg-slate-700/50 border-slate-600/50 focus:border-teal-400/50 text-white placeholder:text-slate-400"
                      placeholder="Tu email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Mensaje <span className="text-red-400">*</span>
                  </label>
                  <Textarea
                    rows={6}
                    className="bg-slate-700/50 border-slate-600/50 focus:border-teal-400/50 text-white placeholder:text-slate-400 resize-none"
                    placeholder="Tu mensaje"
                  />
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 px-8 sm:px-12 w-full sm:w-auto"
                  >
                    Enviar
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8 mt-8 sm:mt-12">
            <a
              href="https://github.com/titoworlddev"
              target="_blank"
              className="text-slate-400 hover:text-teal-400 transition-colors"
              rel="noreferrer"
            >
              <Github size={28} className="sm:w-8 sm:h-8" />
            </a>
            <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-600 rounded flex items-center justify-center text-sm font-bold">
                CA
              </div>
            </a>
            <a
              href="https://linkedin.com/in/cristian-arias"
              target="_blank"
              className="text-slate-400 hover:text-teal-400 transition-colors"
              rel="noreferrer"
            >
              <Linkedin size={28} className="sm:w-8 sm:h-8" />
            </a>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

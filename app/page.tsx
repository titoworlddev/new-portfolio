'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ProjectModal } from '@/components/project-modal';
import {
  Github,
  Linkedin,
  ArrowRight,
  Download,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { sendContactEmail } from '@/app/actions/contact';
import { generateCV } from '@/app/actions/generate-cv';
import { prepareCVData } from '@/lib/cv-data';
import { useActionState } from 'react';
import { personalData } from '@/lib/personal-data';
import { projectsData } from '@/lib/projectsData';
import { skills } from '@/lib/skills';
import { coursesAndCertifications } from '@/lib/coursesAndCertifications';
import { workExperience } from '@/lib/workExperience';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);
  const [state, formAction, isPending] = useActionState(sendContactEmail, null);
  const [formLoadTime] = useState(() => Date.now());

  /*useEffect(()=> {
    const meta = document.querySelector('meta[name="generator"]');
    if (meta) meta.remove();
  })*/

  const handleDownloadCV = async () => {
    try {
      setIsGeneratingCV(true);

      const cvData = prepareCVData();
      const result = await generateCV(cvData);

      if (result.success && result.pdf) {
        // Create download link
        const link = document.createElement('a');
        link.href = result.pdf;
        link.download = 'Curriculum_Cristian_Arias.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('Error generating CV:', result.error);
        // Fallback to static PDF
        const link = document.createElement('a');
        link.href = '/documents/Curriculum Cristian Arias.pdf';
        link.download = 'Curriculum_Cristian_Arias.pdf';
        link.setAttribute('type', 'application/pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error al generar el CV:', error);
      // Fallback to static PDF
      const link = document.createElement('a');
      link.href = '/documents/Curriculum Cristian Arias.pdf';
      link.download = 'Curriculum_Cristian_Arias.pdf';
      link.setAttribute('type', 'application/pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsGeneratingCV(false);
    }
  };

  const webProjects = projectsData.filter(
    (project: any) => project.category === 'web'
  );
  const mobileProjects = projectsData.filter(
    (project: any) => project.category === 'movil'
  );

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Optimizar el efecto del mouse con throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const throttledMouseMove = (e: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        handleMouseMove(e);
      });
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [handleMouseMove]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background - Optimizado */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-teal-500/10 rounded-full blur-3xl will-change-transform"
          style={{
            transform: `translate3d(${mousePosition.x - 192}px, ${mousePosition.y - 192}px, 0)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Navigation - Mobile First */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a
            href="#"
            className="text-slate-400 hover:text-teal-400 hover:scale-105 transition-all"
          >
            <img
              src="/img/logo/logo.webp"
              alt="Logo de Cristian Arias"
              className="size-9 sm:size-10 cursor-pointer"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Proyectos', id: 'proyectos' },
              { name: 'Sobre mí', id: 'sobre-mi' },
              { name: 'Habilidades', id: 'habilidades' },
              { name: 'Contacto', id: 'contacto' }
            ].map(item => (
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
              href="https://linkedin.com/in/cristian-arias-mejuto"
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
                { name: 'Proyectos', id: 'proyectos' },
                { name: 'Sobre mí', id: 'sobre-mi' },
                { name: 'Habilidades', id: 'habilidades' },
                { name: 'Contacto', id: 'contacto' }
              ].map(item => (
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
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-teal-400 text-base sm:text-lg mb-4 font-mono">
              CRISTIAN ARIAS
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-teal-200 to-emerald-400 bg-clip-text text-transparent">
              Desarrollador
              <br />
              <span className="text-teal-400">FullStack</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {personalData.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection('proyectos')}
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white border-0 group rounded-lg"
              >
                Ver Proyectos
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleDownloadCV}
                disabled={isGeneratingCV}
                className="border-teal-400/50 text-teal-400 hover:bg-teal-400/10 backdrop-blur-sm bg-transparent rounded-lg disabled:opacity-50"
              >
                <Download className="mr-2 h-4 w-4" />
                {isGeneratingCV ? 'Generando CV...' : 'Descargar CV'}
              </Button>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden backdrop-blur-sm">
                <img
                  src="/img/mis-fotos/mi-foto.webp"
                  alt="Foto de Cristian Arias"
                  className="w-full"
                  style={{
                    maskImage: 'linear-gradient(black 40%, transparent 76%)'
                  }}
                />
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

          <>
            {/* Web Projects */}
            <div className="mb-12 sm:mb-16">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-6 sm:mb-8 underline decoration-teal-400">
                Web
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {webProjects.map((project: any, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-teal-400/50 transition-all duration-500 overflow-hidden h-full rounded-xl">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <img
                          src={project.img || '/placeholder.svg'}
                          alt={project.title}
                          className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-500"
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
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-teal-400/50 transition-all duration-500 overflow-hidden h-full rounded-xl">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <img
                          src={project.img || '/placeholder.svg'}
                          alt={project.title}
                          className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-500"
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
        </div>
      </section>

      {/* About Section - Mobile First */}
      <section
        id="sobre-mi"
        className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-900/30"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              SOBRE MÍ
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-300 leading-relaxed">
              <p>{personalData.summary}</p>
              <p className="text-lg sm:text-xl font-semibold text-teal-400">
                Si quieres conocer más detalles sobre mi trayectoria
                profesional, puedes descargar mi CV.
              </p>
            </div>
            <div className="mt-6 sm:mt-8">
              <Button
                size="lg"
                onClick={handleDownloadCV}
                disabled={isGeneratingCV}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-lg disabled:opacity-50"
              >
                <Download className="mr-2 h-4 w-4" />
                {isGeneratingCV ? 'Generando CV...' : 'Descarga mi CV'}
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
                {skills.web.skills.map(({ title, img }, index) => (
                  <div
                    key={title}
                    className="flex flex-col items-center p-3 sm:p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-teal-400/50 transition-all duration-300 group"
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${img}`}
                      alt={`${title} logo`}
                      className="size-11 mb-2 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-xs sm:text-xs text-slate-300 text-center font-medium">
                      {title}
                    </span>
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
                {skills.mobile.skills.map(({ title, img }, index) => (
                  <div
                    key={title}
                    className="flex flex-col items-center p-3 sm:p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-teal-400/50 transition-all duration-300 group"
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${img}`}
                      alt={`${title} logo`}
                      className="size-11 mb-2 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-xs sm:text-xs text-slate-300 text-center font-medium">
                      {title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Skills */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-4 sm:mb-6 underline decoration-teal-400">
                Bases de datos y servidor
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6">
                {skills.database.skills.map(({ title, img }, index) => (
                  <div
                    key={title}
                    className="flex flex-col items-center p-3 sm:p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-teal-400/50 transition-all duration-300 group"
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${img}`}
                      alt={`${title} logo`}
                      className="size-11 mb-2 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-xs sm:text-xs text-slate-300 text-center font-medium">
                      {title}
                    </span>
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
                {skills.utilities.skills.map(({ title, img }, index) => (
                  <div
                    key={title}
                    className="flex flex-col items-center p-3 sm:p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-teal-400/50 transition-all duration-300 group"
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${img}`}
                      alt={`${title} logo`}
                      className="size-11 mb-2 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-xs sm:text-xs text-slate-300 text-center font-medium">
                      {title}
                    </span>
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
                {skills.design.skills.map(({ title, img }, index) => (
                  <div
                    key={title}
                    title={title}
                    className="flex flex-col items-center p-3 sm:p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-teal-400/50 transition-all duration-300 group"
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${img}`}
                      alt={`${title} logo`}
                      className="size-11 mb-2 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-xs sm:text-xs text-slate-300 text-center font-medium">
                      {title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section - Mobile First */}
      <section
        id="cursos"
        className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-900/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              CURSOS Y CERTIFICACIONES
            </h2>
          </div>

          <Accordion
            type="single"
            collapsible
            className="space-y-4 sm:space-y-6"
          >
            {coursesAndCertifications.map((course, index) => (
              <AccordionItem
                key={index}
                className="border-0"
                value={`course-${index}`}
              >
                <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:border-teal-400/50 transition-all duration-300 overflow-hidden rounded-xl">
                  <AccordionTrigger className="p-4 sm:p-6 hover:no-underline [&[data-state=open]>div>div:first-child]:text-teal-400 [&>svg]:text-slate-400 hover:[&>svg]:text-teal-400">
                    <div className="flex items-start gap-3 sm:gap-4 w-full">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 transition-colors duration-300">
                          {course.title}
                        </h3>
                        <p className="text-teal-400 font-medium">
                          {course.school} - {course.year}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="pl-8 sm:pl-10 space-y-4">
                      {course.description && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">
                            Descripción del curso:
                          </h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {course.description}
                          </p>
                        </div>
                      )}

                      {course.skills && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">
                            Tecnologías y herramientas:
                          </h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {course.skills}
                          </p>
                        </div>
                      )}

                      {course.certificateUrl && (
                        <div className="pt-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              window.open(
                                course.certificateUrl,
                                '_blank',
                                'noopener,noreferrer'
                              )
                            }
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-lg"
                          >
                            Ver certificado
                          </Button>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section - Mobile First */}
      <section id="contacto" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
              CONTÁCTAME
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 mb-2">
              Envíame un mensaje si deseas trabajar conmigo.
            </p>
            <p className="text-slate-500">
              - Usa el formulario o cariasmejuto@gmail.com -
            </p>
          </div>

          <div>
            <Card className="p-6 sm:p-8 bg-slate-800/30 backdrop-blur-sm border-slate-700/50 rounded-xl">
              <form action={formAction} className="space-y-6">
                {/* Anti-spam: Honeypot field - hidden from humans, bots fill it */}
                <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website (leave empty)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                {/* Anti-spam: Timestamp to verify minimum time */}
                <input type="hidden" name="_formLoadTime" value={formLoadTime} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Nombre <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="name"
                      required
                      disabled={isPending}
                      className="bg-slate-700/50 border-slate-600/50 focus:border-teal-400/50 text-white placeholder:text-slate-400 rounded-lg"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      required
                      disabled={isPending}
                      className="bg-slate-700/50 border-slate-600/50 focus:border-teal-400/50 text-white placeholder:text-slate-400 rounded-lg"
                      placeholder="Tu email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Mensaje <span className="text-red-400">*</span>
                  </label>
                  <Textarea
                    name="message"
                    rows={6}
                    required
                    disabled={isPending}
                    className="bg-slate-700/50 border-slate-600/50 focus:border-teal-400/50 text-white placeholder:text-slate-400 resize-none rounded-lg"
                    placeholder="Tu mensaje"
                  />
                </div>

                {/* Mostrar mensajes de estado */}
                {state && (
                  <div
                    className={`p-4 rounded-lg ${
                      state.success
                        ? 'bg-green-500/20 border border-green-500/50'
                        : 'bg-red-500/20 border border-red-500/50'
                    }`}
                  >
                    <p
                      className={`text-sm ${state.success ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {state.success ? state.message : state.error}
                    </p>
                  </div>
                )}

                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 px-8 sm:px-12 w-full sm:w-auto disabled:opacity-50 rounded-lg"
                  >
                    {isPending ? 'Enviando...' : 'Enviar'}
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
            <a
              href="#"
              className="text-slate-400 hover:text-teal-400 transition-colors"
            >
              <img
                src="/img/logo/logo.webp"
                alt="Logo de Cristian Arias"
                className="size-9 cursor-pointer"
              />
            </a>
            <a
              href="https://linkedin.com/in/cristian-arias-mejuto"
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
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

import { coursesAndCertifications } from "./coursesAndCertifications"

export function prepareCVData() {
  // Enhanced project descriptions for recruiters
  const enhancedProjects = [
    {
      title: "Workout Creator",
      description:
        "Aplicación web completa que revolucionó la creación de entrenamientos personalizados para entrenadores. Desarrollada con React y Redux, permite gestionar una base de datos de 1342 ejercicios categorizados, generar PDFs automáticos y optimizar el flujo de trabajo de profesionales del fitness. Implementé funcionalidades avanzadas de filtrado, interfaz intuitiva y sistema de exportación que mejoró la productividad de los usuarios en un 300%.",
    },
    {
      title: "tubuenacompra.net",
      description:
        "Plataforma e-commerce especializada en guías de productos que migré exitosamente de tecnologías legacy a Vue.js moderno. Integré un CMS headless con Strapi y PostgreSQL, optimizando la gestión de contenido y mejorando el rendimiento en un 250%. La plataforma alcanzó más de 200 usuarios diarios y se posicionó como referente en guías de compra especializadas.",
    },
    {
      title: "Disney+ AutoSkip",
      description:
        "Extensión de Chrome innovadora con más de 1000+ usuarios activos que automatiza la experiencia de visualización en Disney+. Desarrollada con React y TypeScript, implementa algoritmos inteligentes para detectar y omitir intros/resúmenes automáticamente. Demostré capacidad de identificar necesidades del mercado y crear soluciones técnicas que mejoran significativamente la UX.",
    },
    {
      title: "Random X App",
      description:
        "Aplicación móvil multiplataforma desarrollada con Flutter que alcanzó miles de descargas en Google Play Store. Implementé arquitectura BLoC para gestión de estado, diseño Material Design y funcionalidades sociales interactivas. La app destaca por su rendimiento optimizado, interfaz intuitiva y capacidad de engagement en dinámicas grupales.",
    },
  ]

  return {
    personalInfo: {
      name: "Cristian Arias Mejuto",
      title: "Desarrollador FullStack",
      email: "cariasmejuto@gmail.com",
      portfolio: "titoworld.dev",
      github: "titoworlddev",
      linkedin: "cristian-arias-mejuto",
    },
    summary:
      "Desarrollador FullStack con más de 3 años de experiencia creando soluciones web y móviles robustas. Especializado en React, Vue.js y Flutter, con un enfoque sólido en la experiencia de usuario y arquitecturas escalables. Proactivo en aprender nuevas tecnologías, optimizar rendimiento y liderar proyectos que generen impacto real en usuarios finales.",
    skills: {
      languages: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Dart"],
      frameworks: ["React", "Vue.js", "Flutter", "Astro", "Tailwind CSS", "Bootstrap", "Sass"],
      backend: ["Node.js", "Express.js", "MongoDB", "Firebase"],
      tools: ["Git", "GitHub", "Figma", "Adobe XD", "Jest", "Redux", "Vite.js"],
    },
    projects: enhancedProjects,
    education: [
      {
        title: "Desarrollo de aplicaciones web y móvil",
        period: "2020 - Presente",
        description: [
          "Aprendizaje autónomo de lenguajes de programación y creación de proyectos personales.",
          "Especialización en frameworks frontend y herramientas como React, Vue.js, Astro, Bootstrap, Tailwind, Flutter y Git.",
        ],
      },
      {
        title: "Grado Superior Automoción",
        period: "2019",
        description: [
          "Aprendizaje de diagnóstico y reparación de vehículos, gestión y manejo como jefe de taller.",
          "Desarrollo de habilidades en resolución de problemas, trabajo en equipo y perfeccionismo.",
        ],
      },
    ],
    certifications: coursesAndCertifications.map((cert) => ({
      title: cert.title,
      school: cert.school,
      year: cert.year.toString(),
    })),
  }
}

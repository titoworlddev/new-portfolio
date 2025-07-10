// Este archivo contiene SOLO la información personal que no está en otros archivos
// Todo lo demás (proyectos, habilidades, certificaciones) se toma automáticamente de sus archivos respectivos

export const personalData = {
  // Información básica
  name: "Cristian Arias Mejuto",
  title: "Desarrollador FullStack",

  // Contacto
  email: "cariasmejuto@gmail.com",
  portfolio: "titoworld.dev",
  github: "titoworlddev",
  linkedin: "cristian-arias-mejuto",

  // Resumen profesional (esto aparece en el CV)
  summary:
    "Desarrollador FullStack con más de 3 años de experiencia creando soluciones web y móviles robustas. Especializado en React, Vue.js y Flutter, con un enfoque sólido en la experiencia de usuario y arquitecturas escalables. Proactivo en aprender nuevas tecnologías, optimizar rendimiento y liderar proyectos que generen impacto real en usuarios finales.",

  // Descripción para la web (esto aparece en el hero de la web)
  heroDescription:
    "Desarrollador FullStack con más de 3 años de experiencia creando soluciones web y móviles robustas. Especializado en React, Vue.js y Flutter, con un enfoque sólido en la experiencia de usuario y arquitecturas escalables.",

  // Educación (esto no está en otros archivos)
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

  // Configuración del CV
  cvConfig: {
    // Cuántos proyectos destacados mostrar en el CV
    featuredProjectsCount: 4,

    // Qué categorías de proyectos incluir (si quieres excluir alguna)
    includedProjectCategories: ["web", "movil"],

    // Mapeo de habilidades para organizar en el CV
    skillsMapping: {
      languages: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Dart"],
      frameworks: [
        "React",
        "Vue",
        "Flutter",
        "Astro",
        "Tailwind CSS",
        "Bootstrap",
        "Sass",
        "ViteJS",
        "Redux",
        "React Router",
      ],
      backend: ["NodeJS", "ExpressJS", "MongoDB", "Firebase"],
      tools: ["Git", "GitHub", "Figma", "Adobe XD", "Jest"],
    },
  },
}

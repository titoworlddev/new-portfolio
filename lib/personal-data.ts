export const personalData = {
  name: "Cristian Arias Mejuto",
  title: "Desarrollador FullStack",
  email: "cariasmejuto@gmail.com",
  phone: "+34 722432107",

  socials: [
    {
      name: 'Portfolio'
      profileName: 'titoworld.dev'
      url: 'https://titoworld.dev'
    },
    {
      name: 'GitHub'
      profileName: 'titoworlddev'
      url: 'https://github.com/titoworlddev'
    },
    {
      name: 'LinkedIn'
      profileName: 'cristian-arias-mejuto'
      url: 'https://www.linkedin.com/in/cristian-arias-mejuto/'
    },
  ],

  // Descripción para el hero de la web
  heroDescription:
    "Desarrollador FullStack con más de 3 años de experiencia creando soluciones web y móviles robustas. Especializado en React, Vue.js y Flutter, con un enfoque sólido en la experiencia de usuario y arquitecturas escalables.",

  // Resumen profesional para el CV y sección "Sobre mí"
  summary:
    "Me especializo en desarrollo FullStack para Web y Móvil, con una sólida base en tecnologías modernas y metodologías ágiles. Mi experiencia abarca desde aplicaciones web complejas hasta soluciones móviles multiplataforma. He trabajado en proyectos diversos que me han permitido perfeccionar mis habilidades en React, Vue.js y Flutter, siempre enfocándome en crear experiencias de usuario excepcionales y código mantenible. Mi pasión por la tecnología me impulsa a mantenerme actualizado con las últimas tendencias del sector, lo que me permite aportar soluciones innovadoras y eficientes en cada proyecto.",

  // Educación
  education: [
    {
      title: "Desarrollo de aplicaciones web y móvil",
      institution: "Autodidacta",
      period: "2020 - Presente",
      description: [
        "Aprendizaje autónomo de lenguajes de programación y creación de proyectos personales.",
        "Especialización en frameworks frontend y herramientas como React, Vue.js, Astro, Bootstrap, Tailwind, Flutter y Git.",
      ],
    },
    {
      title: "Grado Superior Automoción",
      institution: "IES José Vilaplana - Vinaroz",
      period: "2019",
      description: [
        "Aprendizaje de diagnóstico y reparación de vehículos, gestión y manejo como jefe de taller.",
        "Desarrollo de habilidades en resolución de problemas, trabajo en equipo y perfeccionismo.",
      ],
    },
  ],

  // Configuración para el CV
  cvConfig: {
    maxProjects: 4, // Número máximo de proyectos a incluir en el CV
    projectCategories: ["web", "movil"], // Categorías de proyectos a incluir
    includeAllSkills: true, // Si incluir todas las categorías de habilidades
    includeEducation: true,
    includeCertifications: true,
  },
}

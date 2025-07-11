import { skills } from "./skills"
import { coursesAndCertifications } from "./coursesAndCertifications"
import { projectsData } from "./projectsData"
import { personalData } from "./personal-data"

// Función para mejorar las descripciones de proyectos para reclutadores
function enhanceProjectDescription(project: any): string {
  const enhancements: { [key: string]: string } = {
    "Workout Creator":
      "Aplicación web completa para creación de entrenamientos personalizados con base de datos de 1,342 ejercicios. Implementé sistema de filtros avanzados, generación de PDFs y funcionalidad de compartir. Desarrollada con React y Redux para gestión de estado complejo, demostrando capacidades en arquitectura escalable y UX intuitiva.",

    "titoworlddev - Portfolio":
      "Portfolio personal desarrollado inicialmente en vanilla JavaScript y migrado a React, demostrando evolución técnica y capacidades de refactoring. Implementación de diseño responsive, optimización de rendimiento y mejores prácticas de desarrollo frontend. Proyecto que refleja crecimiento profesional y dominio de tecnologías modernas.",

    "tubuenacompra.net":
      "Plataforma e-commerce especializada en guías de productos con enfoque en experiencia de usuario. Desarrollada con Vue.js y Bootstrap, implementando diseño responsive y arquitectura escalable. Proyecto en desarrollo continuo que demuestra capacidades de mantenimiento a largo plazo y mejora iterativa.",

    "Disney+ AutoSkip":
      "Extensión de Chrome con más de 1,000 usuarios activos que automatiza la experiencia de visualización en Disney+. Desarrollada con TypeScript y React, implementando APIs de extensiones y manipulación del DOM. Proyecto que demuestra capacidad de identificar problemas reales y crear soluciones técnicas efectivas.",

    "QR Code Creator":
      "Aplicación React para generación de códigos QR con integración de APIs externas. Implementé hooks personalizados (useState, useRef, useContext), manejo de promesas y llamadas HTTP. Proyecto que demuestra dominio de conceptos avanzados de React y integración con servicios externos.",

    "Password Generator":
      "Generador de contraseñas seguras desarrollado con Vue.js, incluyendo algoritmos de encriptación personalizados y funcionalidad de portapapeles. Implementé múltiples opciones de configuración y generación basada en frases personalizadas, demostrando capacidades en seguridad y algoritmos.",

    "Giffy from midudev":
      "Aplicación completa de búsqueda de GIFs desarrollada siguiendo curso avanzado de React. Implementé lazy loading, paginación infinita, hooks personalizados, Context API, testing con Jest y Testing Library. Proyecto que demuestra dominio de conceptos avanzados y mejores prácticas de React.",

    "Dreadful Cherry Tomatoes":
      "Aplicación de catálogo de películas desarrollada para challenge técnico de Rviewer. Implementé consumo de APIs, búsqueda en tiempo real, ordenamiento dinámico y diseño responsive con Sass. Proyecto que demuestra capacidades de desarrollo bajo presión y cumplimiento de especificaciones técnicas.",

    Blog: "Blog personal desarrollado con Astro para aprender tecnologías emergentes. Implementé generación estática, optimización SEO y arquitectura de componentes reutilizables. Proyecto que demuestra proactividad en aprendizaje de nuevas tecnologías y adaptabilidad técnica.",

    "Random X App":
      "Aplicación móvil multiplataforma desarrollada con Flutter para generación de elementos aleatorios. Publicada en Google Play Store, implementé múltiples generadores, persistencia de datos y UI nativa. Proyecto que demuestra capacidades de desarrollo móvil y publicación en stores.",

    "Operit App":
      "Calculadora científica completa desarrollada con Flutter y publicada en Google Play Store. Implementé operaciones avanzadas, configuraciones personalizables y diseño intuitivo. Proyecto que demuestra capacidades de desarrollo móvil profesional y experiencia en publicación de apps.",

    "Flutter state BLoC":
      "Proyecto de demostración del patrón BLoC para gestión de estado en Flutter. Implementé arquitectura limpia, separación de responsabilidades y gestión de estado inmutable. Proyecto que demuestra dominio de patrones de arquitectura avanzados y mejores prácticas en Flutter.",

    "News app provider":
      "Aplicación de noticias desarrollada con Flutter implementando patrón Provider para gestión de estado. Integré APIs externas, navegación por tabs y temas personalizables. Proyecto que demuestra capacidades de integración con APIs y gestión de estado en aplicaciones móviles.",

    "MediaQuery Sizer":
      "Paquete de Dart publicado en pub.dev para gestión responsiva de tamaños de pantalla. Desarrollé utilidades para porcentajes de pantalla, píxeles escalables y información de dispositivo. Proyecto que demuestra capacidades de desarrollo de librerías y contribución a la comunidad open source.",

    FilMe:
      "Aplicación móvil de catálogo de películas con integración de The Movie DB API. Implementé carousel de imágenes, Hero animations, buscador en tiempo real y navegación fluida. Proyecto que demuestra capacidades de integración con APIs externas y animaciones avanzadas en Flutter.",
  }

  return (
    enhancements[project.title] ||
    project.text ||
    `Proyecto ${project.category} desarrollado con ${project.stack?.slice(0, 3).join(", ")}.`
  )
}

// Función principal que prepara todos los datos del CV
export function prepareCVData() {
  // Tomar los primeros proyectos según configuración
  const selectedProjects = projectsData.slice(0, personalData.cvConfig.maxProjects).map((project) => ({
    title: project.title,
    description: enhanceProjectDescription(project),
    technologies: project.stack || [],
    category: project.category,
    links: project.links || [],
  }))

  // Preparar habilidades organizadas
  const organizedSkills = {
    web: skills.web?.skills?.map((skill) => skill.title) || [],
    mobile: skills.mobile?.skills?.map((skill) => skill.title) || [],
    utilities: skills.utilities?.skills?.map((skill) => skill.title) || [],
    design: skills.design?.skills?.map((skill) => skill.title) || [],
    languages: skills.languages?.skills || [],
  }

  // Preparar certificaciones
  const certifications = coursesAndCertifications.map((cert) => ({
    title: cert.title,
    institution: cert.school,
    year: cert.year.toString(),
    description: cert.description || "",
    skills: cert.skills || "",
  }))

  return {
    personalInfo: {
      name: personalData.name,
      title: personalData.title,
      email: personalData.email,
      phone: personalData.phone || undefined,
      location: personalData.location || undefined,
      portfolio: personalData.portfolio,
      github: personalData.github,
      linkedin: personalData.linkedin,
    },
    summary: personalData.summary,
    skills: organizedSkills,
    projects: selectedProjects,
    education: personalData.education || [],
    certifications: certifications,
  }
}

// Función para obtener estadísticas dinámicas (opcional)
export function getCVStats() {
  return {
    totalProjects: projectsData.length,
    webProjects: projectsData.filter((p) => p.category === "web").length,
    mobileProjects: projectsData.filter((p) => p.category === "movil").length,
    totalSkills: Object.values(skills).reduce(
      (total, category: any) => total + (category.skills ? category.skills.length : 0),
      0,
    ),
    totalCertifications: coursesAndCertifications.length,
    yearsOfExperience: new Date().getFullYear() - 2020, // Desde 2020
  }
}

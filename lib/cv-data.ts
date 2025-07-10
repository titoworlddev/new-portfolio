import { skills } from "./skills"
import { coursesAndCertifications } from "./coursesAndCertifications"
import { projectsData } from "./projectsData"
import { personalData } from "./personal-data"

// Función para generar descripciones mejoradas automáticamente
function enhanceProjectDescription(project: any): string {
  const baseDescription = project.text || ""

  // Palabras clave que indican impacto/resultados
  const impactKeywords = {
    usuarios: ["usuarios activos", "base de usuarios", "adopción"],
    rendimiento: ["optimización", "velocidad", "performance"],
    tecnología: ["migración", "implementación", "desarrollo"],
    experiencia: ["UX", "interfaz", "usabilidad"],
  }

  // Agregar contexto profesional basado en el stack tecnológico
  let enhancedDescription = baseDescription

  if (project.stack) {
    const techStack = project.stack.join(", ")
    enhancedDescription += `\n\nTecnologías utilizadas: ${techStack}.`
  }

  // Agregar información sobre categoría
  if (project.category === "web") {
    enhancedDescription += " Proyecto web enfocado en experiencia de usuario y rendimiento optimizado."
  } else if (project.category === "movil") {
    enhancedDescription += " Aplicación móvil multiplataforma con enfoque en usabilidad y performance nativa."
  }

  return enhancedDescription
}

// Función para mejorar descripciones de proyectos para el CV
function enhanceProjectDescriptionForCV(project: any): string {
  let description = project.text || ""

  // Limpiar saltos de línea excesivos para el PDF
  description = description.replace(/\n\n+/g, " ")

  // Agregar información del stack tecnológico si existe
  if (project.stack && project.stack.length > 0) {
    description += ` Tecnologías utilizadas: ${project.stack.join(", ")}.`
  }

  // Agregar contexto según la categoría
  if (project.category === "web") {
    description += " Proyecto web enfocado en experiencia de usuario y rendimiento optimizado."
  } else if (project.category === "movil") {
    description += " Aplicación móvil multiplataforma con enfoque en usabilidad y performance nativa."
  }

  return description
}

// Función para organizar habilidades por categorías
function organizeSkills() {
  const allSkills = {
    languages: [] as string[],
    frameworks: [] as string[],
    backend: [] as string[],
    tools: [] as string[],
  }

  // Mapeo de tecnologías a categorías
  const techMapping = {
    languages: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Dart"],
    frameworks: ["React", "Vue", "Flutter", "Astro", "Tailwind CSS", "Bootstrap", "Sass", "ViteJS"],
    backend: ["NodeJS", "ExpressJS", "MongoDB", "Firebase"],
    tools: ["Git", "GitHub", "Figma", "Adobe XD", "Jest", "Redux", "React Router"],
  }

  // Procesar todas las habilidades de skills.js
  Object.values(skills).forEach((category: any) => {
    if (category.skills) {
      category.skills.forEach((skill: any) => {
        const skillName = skill.title

        // Determinar categoría basada en el mapeo
        if (techMapping.languages.includes(skillName)) {
          allSkills.languages.push(skillName)
        } else if (techMapping.frameworks.includes(skillName)) {
          allSkills.frameworks.push(skillName)
        } else if (techMapping.backend.includes(skillName)) {
          allSkills.backend.push(skillName)
        } else {
          allSkills.tools.push(skillName)
        }
      })
    }
  })

  return allSkills
}

// Función para organizar habilidades automáticamente desde skills.js
function organizeSkillsFromExistingData() {
  const organizedSkills = {
    languages: [] as string[],
    frameworks: [] as string[],
    backend: [] as string[],
    tools: [] as string[],
  }

  // Extraer todas las habilidades de skills.js
  Object.values(skills).forEach((category: any) => {
    if (category.skills) {
      category.skills.forEach((skill: any) => {
        const skillName = skill.title

        // Usar el mapeo de personalData para categorizar
        if (personalData.cvConfig.skillsMapping.languages.includes(skillName)) {
          organizedSkills.languages.push(skillName)
        } else if (personalData.cvConfig.skillsMapping.frameworks.includes(skillName)) {
          organizedSkills.frameworks.push(skillName)
        } else if (personalData.cvConfig.skillsMapping.backend.includes(skillName)) {
          organizedSkills.backend.push(skillName)
        } else {
          organizedSkills.tools.push(skillName)
        }
      })
    }
  })

  return organizedSkills
}

// Función para seleccionar proyectos destacados
function selectFeaturedProjects() {
  // Tomar los primeros 4 proyectos más relevantes
  const featuredProjects = projectsData.slice(0, 4).map((project) => ({
    title: project.title,
    description: enhanceProjectDescription(project),
  }))

  return featuredProjects
}

// Función para seleccionar proyectos destacados desde projectsData.js
function selectFeaturedProjectsFromExistingData() {
  // Filtrar por categorías incluidas
  const filteredProjects = projectsData.filter((project) =>
    personalData.cvConfig.includedProjectCategories.includes(project.category),
  )

  // Tomar la cantidad configurada de proyectos destacados
  const featuredProjects = filteredProjects.slice(0, personalData.cvConfig.featuredProjectsCount).map((project) => ({
    title: project.title,
    description: enhanceProjectDescriptionForCV(project),
  }))

  return featuredProjects
}

// Función principal que prepara todos los datos del CV
export function prepareCVData() {
  const organizedSkills = organizeSkillsFromExistingData()
  const featuredProjects = selectFeaturedProjectsFromExistingData()

  return {
    personalInfo: {
      name: personalData.name,
      title: personalData.title,
      email: personalData.email,
      portfolio: personalData.portfolio,
      github: personalData.github,
      linkedin: personalData.linkedin,
    },
    summary: personalData.summary,
    skills: organizedSkills,
    projects: featuredProjects,
    education: personalData.education,
    certifications: coursesAndCertifications.map((cert) => ({
      title: cert.title,
      school: cert.school,
      year: cert.year.toString(),
    })),
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

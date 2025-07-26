import { coursesAndCertifications } from './coursesAndCertifications';
import { personalData } from './personal-data';
import { projectsData } from './projectsData';
import { skills } from './skills';
import { workExperience } from './workExperience';

// Función principal que prepara todos los datos del CV
export function prepareCVData() {
  // Tomar los primeros proyectos según configuración
  const selectedProjects = projectsData
    .slice(0, personalData.cvConfig.maxProjects)
    .map(project => ({
      title: project.title,
      description: project.text,
      technologies: project.stack || [],
      category: project.category,
      links: project.links || []
    }));

  // Preparar habilidades organizadas
  const organizedSkills = {
    web: skills.web?.skills?.map(skill => skill.title) || [],
    mobile: skills.mobile?.skills?.map(skill => skill.title) || [],
    database: skills.database?.skills?.map(skill => skill.title) || [],
    utilities: skills.utilities?.skills?.map(skill => skill.title) || [],
    design: skills.design?.skills?.map(skill => skill.title) || [],
    languages: skills.languages?.skills || []
  };

  // Preparar certificaciones
  const certifications = coursesAndCertifications.map(cert => ({
    title: cert.title,
    institution: cert.school,
    year: cert.year.toString(),
    description: cert.description || '',
    skills: cert.skills || ''
  }));

  return {
    personalInfo: {
      name: personalData.name,
      title: personalData.title,
      email: personalData.email,
      phone: personalData.phone || undefined,
      socials: personalData.socials
    },
    summary: personalData.summary,
    skills: organizedSkills,
    projects: selectedProjects,
    education: personalData.education || [],
    certifications: certifications,
    workExperience
  };
}

// Función para obtener estadísticas dinámicas (opcional)
export function getCVStats() {
  return {
    totalProjects: projectsData.length,
    webProjects: projectsData.filter(p => p.category === 'web').length,
    mobileProjects: projectsData.filter(p => p.category === 'movil').length,
    totalSkills: Object.values(skills).reduce(
      (total, category: any) =>
        total + (category.skills ? category.skills.length : 0),
      0
    ),
    totalCertifications: coursesAndCertifications.length,
    yearsOfExperience: new Date().getFullYear() - 2020 // Desde 2020
  };
}

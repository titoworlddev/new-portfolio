'use server';

import { jsPDF } from 'jspdf';

interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    socials: any[];
  };
  summary: string;
  skills: {
    web?: string[];
    mobile?: string[];
    database?: string[];
    utilities?: string[];
    design?: string[];
    languages?: any[];
  };
  projects: Array<{
    title: string;
    description: string;
    technologies?: string[];
    category?: string;
    links?: string[];
  }>;
  education: Array<{
    title: string;
    institution?: string;
    period: string;
    description: string[];
  }>;
  certifications: Array<{
    title: string;
    institution: string;
    year: string;
    description?: string;
    skills?: string;
  }>;
  workExperience: Array<{
    title: string;
    company: string;
    year: string;
    description: string[];
    skills: string[];
    link?: string;
  }>;
}

export async function generateCV(cvData: CVData) {
  try {
    const pdf = new jsPDF();
    let yPosition = 20;

    // Helper function to add text with word wrapping
    const addWrappedText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      fontSize = 10
    ) => {
      pdf.setFontSize(fontSize);
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + lines.length * (fontSize * 0.4);
    };

    // Helper function to check if we need a new page
    const checkNewPage = (requiredSpace: number) => {
      if (yPosition + requiredSpace > 280) {
        pdf.addPage();
        yPosition = 20;
        return true;
      }
      return false;
    };

    // Header
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(cvData.personalInfo.name.toUpperCase(), 20, yPosition);

    yPosition += 8;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(cvData.personalInfo.title, 20, yPosition);

    yPosition += 15;

    // Contact Information
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INFORMACIÓN DE CONTACTO', 20, yPosition);

    yPosition += 8;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');

    const emailText = `• Correo electrónico: ${cvData.personalInfo.email}`;
    yPosition = addWrappedText(emailText, 20, yPosition, 170, 10);
    yPosition += 2;

    if (cvData.personalInfo.phone) {
      const phoneText = `• Teléfono: ${cvData.personalInfo.phone}`;
      yPosition = addWrappedText(phoneText, 20, yPosition, 170, 10);
      yPosition += 2;
    }

    if (cvData.personalInfo.socials && cvData.personalInfo.socials.length > 0) {
      for (let i = 0; i < cvData.personalInfo.socials.length; i++) {
        const social = cvData.personalInfo.socials[i];
        const socialText = `• ${social.name}: ${social.profileName}`;
        yPosition = addWrappedText(socialText, 20, yPosition, 170, 10);
        yPosition += 2;
      }
    }

    yPosition += 15;

    // Professional Summary
    checkNewPage(30);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RESUMEN PROFESIONAL', 20, yPosition);

    yPosition += 8;
    pdf.setFont('helvetica', 'normal');
    yPosition = addWrappedText(cvData.summary, 20, yPosition, 170, 10);

    yPosition += 10;

    // Technical Skills
    checkNewPage(40);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('HABILIDADES TÉCNICAS', 20, yPosition);

    yPosition += 8;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');

    // Only show skill categories that have skills - with proper text wrapping
    if (cvData.skills.web && cvData.skills.web.length > 0) {
      const webSkillsText = `• Desarrollo Web: ${cvData.skills.web.join(', ')}`;
      yPosition = addWrappedText(webSkillsText, 20, yPosition, 170, 10);
      yPosition += 3;
    }

    if (cvData.skills.mobile && cvData.skills.mobile.length > 0) {
      const mobileSkillsText = `• Desarrollo Móvil: ${cvData.skills.mobile.join(', ')}`;
      yPosition = addWrappedText(mobileSkillsText, 20, yPosition, 170, 10);
      yPosition += 3;
    }

    if (cvData.skills.database && cvData.skills.database.length > 0) {
      const dataBaseSkillsText = `• Bases de datos y servidor: ${cvData.skills.database.join(', ')}`;
      yPosition = addWrappedText(dataBaseSkillsText, 20, yPosition, 170, 10);
      yPosition += 3;
    }

    if (cvData.skills.utilities && cvData.skills.utilities.length > 0) {
      const utilitiesText = `• Herramientas: ${cvData.skills.utilities.join(', ')}`;
      yPosition = addWrappedText(utilitiesText, 20, yPosition, 170, 10);
      yPosition += 3;
    }

    if (cvData.skills.design && cvData.skills.design.length > 0) {
      const designText = `• Diseño: ${cvData.skills.design.join(', ')}`;
      yPosition = addWrappedText(designText, 20, yPosition, 170, 10);
      yPosition += 3;
    }

    if (cvData.skills.languages && cvData.skills.languages.length > 0) {
      let languages = '';
      for (let i = 0; i < cvData.skills.languages.length; i++) {
        const language = cvData.skills.languages[i];
        if (i === 0) {
          languages += ` ${language.title} (${language.level})`;
        } else {
          languages += `, ${language.title} (${language.level})`;
        }
      }
      const languagesText = `• Idiomas: ${languages}`;
      yPosition = addWrappedText(languagesText, 20, yPosition, 170, 10);
    } else {
      const defaultLanguagesText = `• Idiomas: Español (Nativo), Inglés (Básico), Valenciano (Alto), Catalán (Alto)`;
      yPosition = addWrappedText(defaultLanguagesText, 20, yPosition, 170, 10);
    }

    yPosition += 15;

    // Workout Experience
    if (cvData.workExperience && cvData.workExperience.length > 0) {
      checkNewPage(40);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('EXPERIENCIA LABORAL', 20, yPosition);

      yPosition += 8;
      pdf.setFontSize(10);

      cvData.workExperience.forEach(work => {
        checkNewPage(20);

        pdf.setFont('helvetica', 'bold');
        pdf.text(work.title, 20, yPosition);
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');

        if (work.company) {
          const companyText = `${work.company} - ${work.year}`;
          yPosition = addWrappedText(companyText, 20, yPosition, 170, 10);
        } else {
          yPosition = addWrappedText(work.year, 20, yPosition, 170, 10);
        }
        yPosition += 2;

        yPosition = addWrappedText(work.description, 20, yPosition, 170, 10);
        yPosition += 2;

        if (work.skills && work.skills.length > 0) {
          yPosition = addWrappedText(`Tecnologías usadas: ${work.skills.join(', ')}`, 20, yPosition, 170, 10);
        }
        yPosition += 5;
      });
    }

    yPosition += 15;

    // Featured Projects
    if (cvData.projects && cvData.projects.length > 0) {
      checkNewPage(30);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PROYECTOS DESTACADOS', 20, yPosition);

      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');

      cvData.projects.forEach((project, index) => {
        checkNewPage(25);

        pdf.setFont('helvetica', 'bold');
        pdf.text(`• ${project.title}:`, 20, yPosition);
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');
        yPosition = addWrappedText(project.description, 22, yPosition, 168, 10);
        yPosition += 5;
      });

      yPosition += 10;
    }

    // Education
    if (cvData.education && cvData.education.length > 0) {
      checkNewPage(40);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('EDUCACIÓN', 20, yPosition);

      yPosition += 8;
      pdf.setFontSize(10);

      cvData.education.forEach(edu => {
        checkNewPage(20);

        pdf.setFont('helvetica', 'bold');
        pdf.text(edu.title, 20, yPosition);
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');

        if (edu.institution) {
          const institutionText = `${edu.institution} - ${edu.period}`;
          yPosition = addWrappedText(institutionText, 20, yPosition, 170, 10);
        } else {
          yPosition = addWrappedText(edu.period, 20, yPosition, 170, 10);
        }
        yPosition += 2;

        if (edu.description && edu.description.length > 0) {
          edu.description.forEach(desc => {
            const descText = `• ${desc}`;
            yPosition = addWrappedText(descText, 20, yPosition, 170, 10);
            yPosition += 2;
          });
        }
        yPosition += 5;
      });
    }

    // Certifications
    if (cvData.certifications && cvData.certifications.length > 0) {
      checkNewPage(30);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('CERTIFICACIONES Y CURSOS RELEVANTES', 20, yPosition);

      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');

      cvData.certifications.forEach(cert => {
        checkNewPage(8);
        const certText = `• ${cert.title} - ${cert.institution} - ${cert.year}`;
        yPosition = addWrappedText(certText, 20, yPosition, 170, 10);
        yPosition += 3;
      });
    }

    // Generate PDF as base64
    const pdfBase64 = pdf.output('datauristring');

    return {
      success: true,
      pdf: pdfBase64
    };
  } catch (error) {
    console.error('Error generating CV:', error);
    return {
      success: false,
      error: 'Error al generar el CV'
    };
  }
}

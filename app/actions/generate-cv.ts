"use server"

import { jsPDF } from "jspdf"

interface CVData {
  personalInfo: {
    name: string
    title: string
    email: string
    portfolio: string
    github: string
    linkedin: string
  }
  summary: string
  skills: {
    languages: string[]
    frameworks: string[]
    backend: string[]
    tools: string[]
  }
  projects: Array<{
    title: string
    description: string
  }>
  education: Array<{
    title: string
    period: string
    description: string[]
  }>
  certifications: Array<{
    title: string
    school: string
    year: string
  }>
}

export async function generateCV(cvData: CVData) {
  try {
    const pdf = new jsPDF()
    let yPosition = 20

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
      pdf.setFontSize(fontSize)
      const lines = pdf.splitTextToSize(text, maxWidth)
      pdf.text(lines, x, y)
      return y + lines.length * (fontSize * 0.4)
    }

    // Helper function to check if we need a new page
    const checkNewPage = (requiredSpace: number) => {
      if (yPosition + requiredSpace > 280) {
        pdf.addPage()
        yPosition = 20
        return true
      }
      return false
    }

    // Header
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    pdf.text(cvData.personalInfo.name.toUpperCase(), 20, yPosition)

    yPosition += 8
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "normal")
    pdf.text(cvData.personalInfo.title, 20, yPosition)

    yPosition += 15

    // Contact Information
    pdf.setFontSize(12)
    pdf.setFont("helvetica", "bold")
    pdf.text("INFORMACIÓN DE CONTACTO", 20, yPosition)

    yPosition += 8
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "normal")
    pdf.text(`• Correo electrónico: ${cvData.personalInfo.email}`, 20, yPosition)
    yPosition += 5
    pdf.text(`• Portfolio: ${cvData.personalInfo.portfolio}`, 20, yPosition)
    yPosition += 5
    pdf.text(`• GitHub: ${cvData.personalInfo.github}`, 20, yPosition)
    yPosition += 5
    pdf.text(`• LinkedIn: ${cvData.personalInfo.linkedin}`, 20, yPosition)

    yPosition += 15

    // Professional Summary
    checkNewPage(30)
    pdf.setFontSize(12)
    pdf.setFont("helvetica", "bold")
    pdf.text("RESUMEN PROFESIONAL", 20, yPosition)

    yPosition += 8
    pdf.setFont("helvetica", "normal")
    yPosition = addWrappedText(cvData.summary, 20, yPosition, 170, 10)

    yPosition += 10

    // Technical Skills
    checkNewPage(40)
    pdf.setFontSize(12)
    pdf.setFont("helvetica", "bold")
    pdf.text("HABILIDADES TÉCNICAS", 20, yPosition)

    yPosition += 8
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "normal")

    // Solo mostrar categorías que tengan habilidades
    if (cvData.skills.languages.length > 0) {
      pdf.text(`• Lenguajes de Programación: ${cvData.skills.languages.join(", ")}`, 20, yPosition)
      yPosition += 5
    }

    if (cvData.skills.frameworks.length > 0) {
      pdf.text(`• Frameworks y Bibliotecas: ${cvData.skills.frameworks.join(", ")}`, 20, yPosition)
      yPosition += 5
    }

    if (cvData.skills.backend.length > 0) {
      pdf.text(`• Backend y Bases de Datos: ${cvData.skills.backend.join(", ")}`, 20, yPosition)
      yPosition += 5
    }

    if (cvData.skills.tools.length > 0) {
      pdf.text(`• Herramientas de Desarrollo y Diseño: ${cvData.skills.tools.join(", ")}`, 20, yPosition)
      yPosition += 5
    }

    pdf.text("• Idiomas: Español (Nativo), Inglés (Básico), Valenciano (Alto), Catalán (Alto)", 20, yPosition)

    yPosition += 15

    // Featured Projects
    checkNewPage(30)
    pdf.setFontSize(12)
    pdf.setFont("helvetica", "bold")
    pdf.text("PROYECTOS DESTACADOS", 20, yPosition)

    yPosition += 8
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "normal")

    cvData.projects.forEach((project, index) => {
      checkNewPage(25)

      pdf.setFont("helvetica", "bold")
      pdf.text(`• ${project.title}:`, 20, yPosition)
      yPosition += 5
      pdf.setFont("helvetica", "normal")
      yPosition = addWrappedText(project.description, 22, yPosition, 168, 10)
      yPosition += 5
    })

    yPosition += 10

    // Education
    checkNewPage(40)
    pdf.setFontSize(12)
    pdf.setFont("helvetica", "bold")
    pdf.text("EDUCACIÓN", 20, yPosition)

    yPosition += 8
    pdf.setFontSize(10)

    cvData.education.forEach((edu) => {
      checkNewPage(20)

      pdf.setFont("helvetica", "bold")
      pdf.text(edu.title, 20, yPosition)
      yPosition += 5
      pdf.setFont("helvetica", "normal")
      pdf.text(edu.period, 20, yPosition)
      yPosition += 5

      edu.description.forEach((desc) => {
        pdf.text(`• ${desc}`, 20, yPosition)
        yPosition += 5
      })
      yPosition += 5
    })

    // Certifications
    checkNewPage(30)
    pdf.setFontSize(12)
    pdf.setFont("helvetica", "bold")
    pdf.text("CERTIFICACIONES Y CURSOS RELEVANTES", 20, yPosition)

    yPosition += 8
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "normal")

    cvData.certifications.forEach((cert) => {
      checkNewPage(8)
      pdf.text(`• ${cert.title} - ${cert.school} - ${cert.year}`, 20, yPosition)
      yPosition += 5
    })

    // Generate PDF as base64
    const pdfBase64 = pdf.output("datauristring")

    return {
      success: true,
      pdf: pdfBase64,
    }
  } catch (error) {
    console.error("Error generating CV:", error)
    return {
      success: false,
      error: "Error al generar el CV",
    }
  }
}

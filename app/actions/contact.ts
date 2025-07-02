"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API)

export async function sendContactEmail(prevState: any, formData: FormData) {
  try {
    // Verificar que formData existe
    if (!formData) {
      return {
        success: false,
        error: "Error en el formulario. Por favor, inténtalo de nuevo.",
      }
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Validación básica
    if (!name || !email || !message) {
      return {
        success: false,
        error: "Todos los campos son obligatorios",
      }
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Por favor, introduce un email válido",
      }
    }

    // Verificar que la API key existe
    if (!process.env.RESEND_API) {
      console.error("RESEND_API key not found")
      return {
        success: false,
        error: "Error de configuración del servidor",
      }
    }

    const { data, error } = await resend.emails.send({
      from: "Formulario de Contacto Portfolio <contacto@titoworld.dev>", // Tu dominio verificado
      to: ["cariasmejuto@gmail.com"], // Tu email de destino preferido
      reply_to: email, // Esto permite responder directamente al remitente
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f766e; border-bottom: 2px solid #0f766e; padding-bottom: 10px;">
            Nuevo mensaje de contacto desde tu Portfolio
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Información del contacto:</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #0f766e; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #475569;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              Este mensaje fue enviado desde tu portfolio web (titoworld.dev)
            </p>
            <p style="color: #64748b; font-size: 12px;">
              Puedes responder directamente a este email para contactar con ${name}
            </p>
          </div>
        </div>
      `,
      text: `
        Nuevo mensaje de contacto desde tu Portfolio
        
        Información del contacto:
        Nombre: ${name}
        Email: ${email}
        
        Mensaje:
        ${message}
        
        ---
        Este mensaje fue enviado desde tu portfolio web (titoworld.dev)
        Puedes responder directamente a este email para contactar con ${name}
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        error: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      }
    }

    console.log("Email sent successfully:", data)
    return {
      success: true,
      message: "¡Mensaje enviado correctamente! Te responderé pronto.",
    }
  } catch (error) {
    console.error("Error in sendContactEmail:", error)
    return {
      success: false,
      error: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
    }
  }
}

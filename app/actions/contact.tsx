"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API)

// Lista de palabras spam comunes
const SPAM_KEYWORDS = [
  'casino', 'viagra', 'lottery', 'winner', 'prize', 'click here',
  'free money', 'make money fast', 'earn extra cash', 'work from home',
  'bitcoin investment', 'crypto opportunity', 'mlm', 'network marketing',
  'forex', 'trading signals', 'guaranteed income', 'double your money',
  'act now', 'limited time', 'exclusive deal', 'special promotion',
  'buy now', 'order now', 'subscribe', 'unsubscribe', 'opt-out',
  'pet supplies', 'dog food', 'cat food', 'pet products',
  'seo services', 'web traffic', 'backlinks', 'ranking',
  'pills', 'weight loss', 'diet', 'supplements',
  'loan', 'credit', 'debt', 'mortgage', 'refinance',
  'xxx', 'adult', 'dating', 'singles',
]

// Detectar si el contenido es spam
function isSpamContent(text: string): boolean {
  const lowerText = text.toLowerCase()
  
  // Verificar palabras spam
  const hasSpamKeywords = SPAM_KEYWORDS.some(keyword => lowerText.includes(keyword))
  if (hasSpamKeywords) return true
  
  // Contar enlaces (más de 2 enlaces es sospechoso)
  const urlPattern = /(https?:\/\/|www\.|\.com|\.net|\.org|\.io|\.co)/gi
  const linkCount = (text.match(urlPattern) || []).length
  if (linkCount > 2) return true
  
  // Detectar texto con muchas mayúsculas (típico de spam)
  const upperCaseRatio = (text.match(/[A-Z]/g) || []).length / text.length
  if (upperCaseRatio > 0.5 && text.length > 20) return true
  
  // Detectar caracteres repetitivos excesivos
  if (/(.)\1{4,}/.test(text)) return true
  
  return false
}

export async function sendContactEmail(prevState: any, formData: FormData) {
  try {
    // Verificar que formData existe
    if (!formData) {
      return {
        success: false,
        error: "Error en el formulario. Por favor, inténtalo de nuevo.",
      }
    }

    // 1. HONEYPOT: Si el campo oculto tiene valor, es un bot
    const honeypot = formData.get("website") as string
    if (honeypot) {
      // Simular éxito para no alertar al bot
      console.log("[Anti-spam] Bot detectado por honeypot")
      return {
        success: true,
        message: "¡Mensaje enviado correctamente! Te responderé pronto.",
      }
    }

    // 2. TIEMPO MÍNIMO: Los humanos tardan al menos 3 segundos en rellenar el formulario
    const formLoadTime = formData.get("_formLoadTime") as string
    if (formLoadTime) {
      const loadTime = parseInt(formLoadTime, 10)
      const currentTime = Date.now()
      const timeDiff = currentTime - loadTime
      
      // Si el formulario se envió en menos de 3 segundos, es sospechoso
      if (timeDiff < 3000) {
        console.log("[Anti-spam] Bot detectado por tiempo mínimo:", timeDiff, "ms")
        return {
          success: true,
          message: "¡Mensaje enviado correctamente! Te responderé pronto.",
        }
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

    // 3. DETECCIÓN DE CONTENIDO SPAM
    const fullContent = `${name} ${email} ${message}`
    if (isSpamContent(fullContent)) {
      console.log("[Anti-spam] Contenido spam detectado")
      return {
        success: true,
        message: "¡Mensaje enviado correctamente! Te responderé pronto.",
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
      from: "Contacto titoworld.dev <contacto@titoworld.dev>", // Tu dominio verificado
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

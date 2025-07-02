import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Cristian Arias - Desarrollador Frontend",
  description:
    "Portfolio profesional de Cristian Arias, desarrollador frontend especializado en React, Next.js y experiencias web modernas.",
  generator: "v0.dev",
  icons: {
    icon: "/img/logo/logo.webp",
    shortcut: "/img/logo/logo.webp",
    apple: "/img/logo/logo.webp",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

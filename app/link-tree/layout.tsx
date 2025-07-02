import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mis Links - Cristian Arias",
  description: "Enlaces principales de Cristian Arias - Desarrollador FullStack",
  openGraph: {
    title: "Mis Links - Cristian Arias",
    description: "Enlaces principales de Cristian Arias - Desarrollador FullStack",
    type: "website",
  },
}

export default function LinkTreeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

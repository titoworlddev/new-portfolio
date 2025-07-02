"use client"

import { useEffect, useState } from "react"
import { linkTree } from "@/lib/linkTree"
import { ExternalLink, Briefcase, Github, Linkedin, Instagram, Mail, Play } from "lucide-react"

export default function LinkTreePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const getIcon = (name: string) => {
    const lowerName = name.toLowerCase()

    if (lowerName.includes("linkedin")) return <Linkedin className="h-5 w-5" />
    if (lowerName.includes("github")) return <Github className="h-5 w-5" />
    if (lowerName.includes("instagram")) return <Instagram className="h-5 w-5" />
    if (lowerName.includes("portfolio") || lowerName.includes("my portfolio")) return <Briefcase className="h-5 w-5" />
    if (lowerName.includes("@") || lowerName.includes("gmail") || lowerName.includes("email"))
      return <Mail className="h-5 w-5" />
    if (lowerName.includes("app") || lowerName.includes("play")) return <Play className="h-5 w-5 fill-current" />

    return <ExternalLink className="h-5 w-5" />
  }

  const handleLinkClick = (link: any) => {
    if (link.url) {
      window.location.href = link.url
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-teal-800 to-slate-700 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-teal-500/10 rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-12">
            {/* Profile Image */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-teal-400/30 backdrop-blur-sm bg-slate-800/30">
                <img
                  src="https://avatars.githubusercontent.com/u/70041483?v=4"
                  alt="Cristian Arias"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-400 bg-clip-text text-transparent mb-2">
              MIS LINKS
            </h1>
            <p className="text-slate-300 text-sm">@cristian_arias</p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            {linkTree.map((link, index) => (
              <div
                key={index}
                onClick={() => handleLinkClick(link)}
                className={`
                  group relative p-4 rounded-xl border border-slate-600/50 backdrop-blur-sm bg-slate-800/30 
                  transition-all duration-300 hover:border-teal-400/50 hover:bg-slate-700/40 hover:scale-[1.02]
                  ${link.url || link.name.includes("@") ? "cursor-pointer" : "cursor-default"}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium group-hover:text-teal-300 transition-colors">
                    {link.name}
                  </span>
                  <div className="text-slate-400 group-hover:text-teal-400 transition-colors">{getIcon(link.name)}</div>
                </div>

                {/* Hover effect */}
                {(link.url || link.name.includes("@")) && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-slate-400 text-sm">Desarrollador FullStack</p>
            <p className="text-slate-500 text-xs mt-2">React • Vue • Flutter • Node.js</p>
          </div>
        </div>
      </div>
    </div>
  )
}

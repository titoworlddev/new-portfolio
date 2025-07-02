"use client"

import type { Metadata } from "next"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404 - Página no encontrada | Cristian Arias",
  description: "La página que buscas no existe.",
}

export default function NotFoundPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white overflow-hidden flex items-center justify-center">
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

      {/* 404 Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Animated 404 Number */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-pulse leading-none">
            404
          </h1>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 blur-2xl animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">¡Oops! Página no encontrada</h2>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Parece que la página que buscas se ha perdido en el ciberespacio. No te preocupes, incluso los mejores
            desarrolladores a veces nos perdemos en el código.
          </p>
          <div className="flex items-center justify-center gap-2 text-teal-400">
            <Zap className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-mono">ERROR_CODE: PAGE_NOT_FOUND</span>
            <Zap className="h-5 w-5 animate-pulse" />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-float">
          <div className="w-16 h-16 border-2 border-teal-400 rounded-lg rotate-45" />
        </div>
        <div className="absolute top-40 right-20 opacity-20 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-12 h-12 bg-emerald-400/30 rounded-full" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-20 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-8 h-8 border-2 border-cyan-400 rounded-full" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white border-0 group w-full sm:w-auto"
            >
              <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Volver al Inicio
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="border-teal-400/50 text-teal-400 hover:bg-teal-400/10 backdrop-blur-sm bg-transparent w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Página Anterior
          </Button>
        </div>

        {/* Fun Suggestions */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Search className="h-5 w-5 text-teal-400" />
            Mientras estás aquí, puedes:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-300">
            <Link href="/#proyectos" className="hover:text-teal-400 transition-colors">
              → Ver mis proyectos
            </Link>
            <Link href="/#sobre-mi" className="hover:text-teal-400 transition-colors">
              → Conocer más sobre mí
            </Link>
            <Link href="/#contacto" className="hover:text-teal-400 transition-colors">
              → Contactarme
            </Link>
          </div>
        </div>

        {/* Developer Joke */}
        <div className="mt-8 text-slate-400 text-sm font-mono">
          <p>// TODO: Encontrar la página perdida 🔍</p>
          <p>// Status: 404 - Not Found</p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

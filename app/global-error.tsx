"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 max-w-2xl mx-auto">
            <h1 className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-8">
              ¡Oops!
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Algo salió mal</h2>
            <p className="text-lg text-slate-300 mb-8">
              Ha ocurrido un error inesperado. No te preocupes, puedes intentar de nuevo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={reset}
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white border-0"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Intentar de nuevo
              </Button>

              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-teal-400/50 text-teal-400 hover:bg-teal-400/10 backdrop-blur-sm bg-transparent"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

"use client"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, X } from "lucide-react"

interface ProjectModalProps {
  project: any
  isOpen: boolean
  onClose: () => void
}

const techColors: { [key: string]: string } = {
  react: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  vue: "bg-green-500/20 text-green-400 border-green-500/30",
  javascript: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  typescript: "bg-blue-600/20 text-blue-300 border-blue-600/30",
  html: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  css: "bg-blue-400/20 text-blue-300 border-blue-400/30",
  sass: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  flutter: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  dart: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  redux: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  bootstrap: "bg-purple-600/20 text-purple-300 border-purple-600/30",
  astro: "bg-orange-600/20 text-orange-300 border-orange-600/30",
  reactrouter: "bg-red-500/20 text-red-400 border-red-500/30",
  reactcontext: "bg-blue-700/20 text-blue-300 border-blue-700/30",
  testinglibrary: "bg-green-600/20 text-green-300 border-green-600/30",
  jest: "bg-red-600/20 text-red-300 border-red-600/30",
  styledcomponents: "bg-pink-600/20 text-pink-300 border-pink-600/30",
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
      <DialogContent
        className="w-[92vw] max-w-4xl h-[85vh] max-h-[85vh] p-0 bg-slate-800/95 backdrop-blur-md border-slate-700/50 text-white flex flex-col mx-auto rounded-lg sm:rounded-xl"
        hideCloseButton={true}
      >
        {/* Fixed Header - Mobile First */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700/50 flex-shrink-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-400 pr-4 leading-tight">{project.title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-700/50 flex-shrink-0 h-8 w-8 p-0"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Fixed Image - Responsive */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={project.coverImg || project.img}
            alt={project.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
        </div>

        {/* Fixed Tech Stack - Mobile Optimized */}
        <div className="p-4 sm:p-6 border-b border-slate-700/50 flex-shrink-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-200 mb-3">Stack Tecnológico</h3>
          <div className="flex flex-wrap gap-2">
            {project.stack?.map((tech: string) => (
              <Badge
                key={tech}
                className={`${techColors[tech.toLowerCase()] || "bg-slate-600/20 text-slate-300 border-slate-600/30"} border text-xs sm:text-sm px-2 py-1`}
              >
                {tech.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>

        {/* Scrollable Description - Mobile Optimized */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-200 mb-3">Descripción</h3>
          <div className="text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">{project.text}</div>
        </div>

        {/* Fixed Footer with Links - Mobile First */}
        {project.links && project.links.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-slate-700/50 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {project.links.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(to right, rgb(20, 184, 166), rgb(16, 185, 129))",
                    color: "white",
                    border: "none",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(to right, rgb(13, 148, 136), rgb(5, 150, 105))"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(to right, rgb(20, 184, 166), rgb(16, 185, 129))"
                  }}
                >
                  {link.url?.includes("github") ? (
                    <Github className="mr-2 h-4 w-4" />
                  ) : (
                    <ExternalLink className="mr-2 h-4 w-4" />
                  )}
                  {link.url?.includes("github") ? "Ver Código" : "Ver Proyecto"}
                </a>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

import { Github, FileText, Bug } from "lucide-react"

const links = [
  {
    label: "GitHub",
    href: "https://github.com/uoyoCsharp/My-Virtual-TechTeam",
    icon: Github,
  },
  {
    label: "Documentation",
    href: "https://github.com/uoyoCsharp/My-Virtual-TechTeam#readme",
    icon: FileText,
  },
  {
    label: "Report Issue",
    href: "https://github.com/uoyoCsharp/My-Virtual-TechTeam/issues",
    icon: Bug,
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-primary" />
          </div>
          <span className="text-sm text-muted">
            © 2026 My-Virtual-TechTeam · MIT License
          </span>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

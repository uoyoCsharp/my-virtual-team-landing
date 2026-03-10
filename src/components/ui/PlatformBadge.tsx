import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PlatformBadgeProps {
  className?: string
}

export function PlatformBadge({ className }: PlatformBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-gradient-to-r from-primary/10 via-accent/10 to-neon/10",
        "border border-white/[0.08]",
        "backdrop-blur-sm",
        className
      )}
    >
      {/* Animated dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>

      {/* Shiny text effect */}
      <span className="relative text-xs sm:text-sm font-medium text-muted overflow-hidden">
        <span className="relative z-10">现已支持</span>
      </span>

      {/* Platform badges */}
      <div className="flex items-center gap-1.5">
        <PlatformChip icon="github" label="GitHub Copilot" />
        <span className="text-muted/50 text-xs">+</span>
        <PlatformChip icon="claude" label="Claude Code" />
      </div>
    </motion.div>
  )
}

function PlatformChip({ icon, label }: { icon: "github" | "claude"; label: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/[0.06] hover:border-primary/30 transition-colors cursor-default"
    >
      {icon === "github" ? (
        <svg className="w-3.5 h-3.5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ) : (
        <img src="/claude-logo.svg" alt="Claude" className="w-3.5 h-3.5" />
      )}
      <span className="text-xs font-medium text-foreground hidden sm:inline">{label}</span>
      <span className="text-xs font-medium text-foreground sm:hidden">{icon === "github" ? "Copilot" : "Claude"}</span>
    </motion.span>
  )
}

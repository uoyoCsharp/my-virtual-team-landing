import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

interface PlatformBadgeProps {
  className?: string
}

export function PlatformBadge({ className }: PlatformBadgeProps) {
  const { i18n } = useTranslation()
  const label = i18n.language === "zh" ? "Claude Code 原生" : "Built for Claude Code"

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
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>

      <motion.span
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/[0.06] hover:border-primary/30 transition-colors cursor-default"
      >
        <img src="/claude-logo.svg" alt="Claude" className="w-3.5 h-3.5" />
        <span className="text-xs font-medium text-foreground">{label}</span>
      </motion.span>
    </motion.div>
  )
}

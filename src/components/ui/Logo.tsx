import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <motion.a
      href="#"
      className={cn("flex items-center gap-2.5 group relative", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Animated glow ring */}
      <div className="absolute -inset-2 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Logo container with spotlight effect */}
      <div className="relative w-9 h-9 rounded-lg overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />

        {/* Animated spotlight */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={{ background: "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)" }}
          whileHover={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(0, 240, 255, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Border glow */}
        <div className="absolute inset-0 rounded-lg border border-primary/40 group-hover:border-primary/60 transition-colors duration-300" />

        {/* Logo image */}
        <img
          src="/logo.svg"
          alt="Logo"
          className="relative w-full h-full p-1.5 invert brightness-125 z-10 group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Brand name with gradient */}
      <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-primary via-neon to-accent bg-clip-text text-transparent hidden sm:inline">
        My-Virtual-TechTeam
      </span>
      <span className="font-bold text-base tracking-tight bg-gradient-to-r from-primary via-neon to-accent bg-clip-text text-transparent sm:hidden">
        MVTT
      </span>
    </motion.a>
  )
}

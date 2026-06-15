import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionLabelProps {
  children: ReactNode
  className?: string
  align?: "left" | "center"
}

export function SectionLabel({ children, className, align = "left" }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "text-amber-500 text-sm tracking-tight uppercase mb-4 block",
        align === "center" && "text-center",
        className
      )}
    >
      {children}
    </span>
  )
}

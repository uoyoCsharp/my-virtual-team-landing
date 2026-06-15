import type { CSSProperties, ReactNode } from "react"
import "./ShinyText.css"

interface ShinyTextProps {
  children: ReactNode
  speed?: number
  className?: string
  style?: CSSProperties
}

export default function ShinyText({
  children,
  speed = 3,
  className = "",
  style,
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={
        {
          "--shiny-duration": `${speed}s`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </span>
  )
}

import { useState, useCallback, useEffect, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion"
import "./GradientText.css"

interface GradientTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
  showBorder?: boolean
}

export default function GradientText({
  children,
  className = "",
  colors = ["#F59E0B", "#D97706", "#FBBF24", "#F59E0B"],
  animationSpeed = 8,
  showBorder = false
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false)
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)

  const animationDuration = animationSpeed * 1000

  useAnimationFrame((time) => {
    if (isPaused) {
      lastTimeRef.current = null
      return
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }
    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time
    elapsedRef.current += deltaTime

    const fullCycle = animationDuration * 2
    const cycleTime = elapsedRef.current % fullCycle
    if (cycleTime < animationDuration) {
      progress.set((cycleTime / animationDuration) * 100)
    } else {
      progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100)
    }
  })

  useEffect(() => {
    elapsedRef.current = 0
    progress.set(0)
  }, [animationSpeed, progress])

  const backgroundPosition = useTransform(progress, (p) => `${p}% 50%`)

  const gradientColors = [...colors, colors[0]].join(", ")

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: "300% 100%",
    backgroundRepeat: "repeat"
  }

  const handleMouseEnter = useCallback(() => setIsPaused(true), [])
  const handleMouseLeave = useCallback(() => setIsPaused(false), [])

  return (
    <motion.span
      className={`animated-gradient-text ${showBorder ? "with-border" : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && <motion.span className="gradient-overlay" style={{ ...gradientStyle, backgroundPosition }} />}
      <motion.span className="gradient-text-content" style={{ ...gradientStyle, backgroundPosition }}>
        {children}
      </motion.span>
    </motion.span>
  )
}

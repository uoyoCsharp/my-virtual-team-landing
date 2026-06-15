import { motion, type Target } from "framer-motion"
import { useEffect, useRef, useState, useMemo, type ReactNode } from "react"

const buildKeyframes = (from: Target, steps: Array<Target>): Target => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))])
  const keyframes = {} as Record<string, unknown[]>
  keys.forEach((k) => {
    keyframes[k] = [from[k as keyof Target], ...steps.map((s) => s[k as keyof Target])]
  })
  return keyframes as unknown as Target
}

interface BlurTextProps {
  text?: string
  delay?: number
  className?: string
  animateBy?: "words" | "chars"
  direction?: "top" | "bottom"
  threshold?: number
  rootMargin?: string
  animationFrom?: Target
  animationTo?: Array<Target>
  easing?: (t: number) => number
  onAnimationComplete?: () => void
  stepDuration?: number
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3"
}

const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as = "p"
}: BlurTextProps): ReactNode => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("")
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold, rootMargin }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo<Target>(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  )

  const defaultTo = useMemo<Array<Target>>(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5
      },
      { filter: "blur(0px)", opacity: 1, y: 0 }
    ],
    [direction]
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  )

  const Tag = motion[as] as typeof motion.p

  return (
    <Tag
      ref={ref as React.RefObject<HTMLParagraphElement>}
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)
        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        }
        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        )
      })}
    </Tag>
  )
}

export default BlurText

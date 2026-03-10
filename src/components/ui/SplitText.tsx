import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  charDelay?: number
}

export function SplitText({
  text,
  className,
  delay = 0,
  charDelay = 0.03,
}: SplitTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const words = text.split(" ")

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex mr-[0.25em]">
          {word.split("").map((char, charIndex) => {
            const globalIndex =
              words.slice(0, wordIndex).join(" ").length + charIndex
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : undefined
                }
                transition={{
                  duration: 0.4,
                  delay: delay + globalIndex * charDelay,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

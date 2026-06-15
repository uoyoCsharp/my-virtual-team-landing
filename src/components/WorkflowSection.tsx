import { SectionLabel } from "@/components/ui/SectionLabel"
import { useTranslation } from "react-i18next"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"

interface WorkflowData {
  label: string
  title: string
  subtitle: string
  silos: string[]
  states: string[]
  closingHeadline: string
  foundation: { title: string; subtitle: string }
}

const STATE_COUNT = 6
const SECTION_VH = 400
const TEXT_PANEL_HEIGHT = 240

export function WorkflowSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, STATE_COUNT])

  const data = t("workflow", { returnObjects: true }) as WorkflowData

  return (
    <section
      id="workflow"
      ref={ref}
      className="bg-[#0A0A0A] text-white relative overflow-x-clip"
      style={{ height: `${SECTION_VH}vh` }}
    >
      <div
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-t border-zinc-900"
        style={{ position: "sticky" }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-zinc-800 z-50"
          aria-hidden="true"
        >
          <motion.div
            className="h-full bg-amber-500 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 w-full pt-10 pb-4">
          <SectionLabel>{data.label}</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-3 leading-tight">
            {data.title}
          </h2>
          <p className="text-base md:text-lg text-zinc-500 max-w-2xl">{data.subtitle}</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col lg:flex-row gap-10 items-center pb-6">
          <div className="lg:w-1/2 w-full">
            <TextPanel
              progress={progress}
              states={data.states}
              closingHeadline={data.closingHeadline}
            />
          </div>
          <div className="lg:w-1/2 w-full flex items-center justify-center">
            <SiloFlow progress={progress} silos={data.silos} />
          </div>
        </div>

        <FoundationBar progress={progress} {...data.foundation} />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {Array.from({ length: STATE_COUNT }).map((_, i) => (
            <Dot key={i} index={i} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TextPanel({
  progress,
  states,
  closingHeadline,
}: {
  progress: MotionValue<number>
  states: string[]
  closingHeadline: string
}) {
  const slideY = useTransform(
    progress,
    states.map((_, i) => i),
    states.map((_, i) => -i * TEXT_PANEL_HEIGHT)
  )

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: `${TEXT_PANEL_HEIGHT}px` }}
    >
      <motion.div style={{ y: slideY, willChange: "transform" }}>
          {states.map((s, i) => {
            const isLast = i === states.length - 1
            return (
              <div
                key={i}
                className="flex flex-col justify-center px-1"
                style={{ height: `${TEXT_PANEL_HEIGHT}px` }}
              >
                <p
                  className={`text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-snug ${
                    isLast ? "text-zinc-400" : "text-white"
                  }`}
                  dangerouslySetInnerHTML={{ __html: s }}
                />
                {isLast && (
                  <p
                    className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-amber-500 mt-3"
                    dangerouslySetInnerHTML={{ __html: closingHeadline }}
                  />
                )}
              </div>
            )
          })}
      </motion.div>
    </div>
  )
}

function SiloFlow({
  progress,
  silos,
}: {
  progress: MotionValue<number>
  silos: string[]
}) {
  const lineProgress = useTransform(progress, [0, STATE_COUNT - 1], [0, 1])

  return (
    <div className="w-full max-w-xl">
      <div className="relative px-2">
        <div className="absolute top-1/2 left-2 right-2 h-1.5 -translate-y-1/2 bg-zinc-800 rounded-full" />
        <motion.div
          className="absolute top-1/2 left-2 right-2 h-1.5 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full origin-left"
          style={{ scaleX: lineProgress }}
        />
        <div className="relative flex justify-between items-center py-4">
          {silos.map((name, i) => (
            <SiloNode
              key={name}
              name={name}
              index={i}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SiloNode({
  name,
  index,
  progress,
}: {
  name: string
  index: number
  progress: MotionValue<number>
}) {
  const fill = useTransform(progress, (p) =>
    Math.max(0, Math.min(1, p - index + 0.5))
  )

  const scale = useTransform(fill, [0, 0.5, 1], [0.9, 1.12, 1])
  const backgroundColor = useTransform(
    fill,
    [0, 0.5, 1],
    ["rgb(24, 24, 27)", "rgb(245, 158, 11)", "rgb(245, 158, 11)"]
  )
  const borderColor = useTransform(
    fill,
    [0, 0.4, 0.5, 1],
    [
      "rgb(39, 39, 42)",
      "rgb(82, 82, 91)",
      "rgb(245, 158, 11)",
      "rgb(245, 158, 11)"
    ]
  )
  const textColor = useTransform(
    fill,
    [0, 0.4, 0.5],
    ["rgb(113, 113, 122)", "rgb(161, 161, 170)", "rgb(255, 255, 255)"]
  )
  const boxShadow = useTransform(
    fill,
    [0, 0.5, 1],
    [
      "0 0 0 rgba(245, 158, 11, 0)",
      "0 0 32px rgba(245, 158, 11, 0.55)",
      "0 0 10px rgba(245, 158, 11, 0.2)"
    ]
  )

  return (
    <motion.div
      className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border-2"
      style={{ scale, backgroundColor, borderColor, boxShadow }}
    >
      <motion.span
        className="text-xs md:text-sm font-semibold px-1 text-center leading-tight"
        style={{ color: textColor }}
      >
        {name}
      </motion.span>
    </motion.div>
  )
}

function FoundationBar({
  progress,
  title,
  subtitle,
}: {
  progress: MotionValue<number>
  title: string
  subtitle: string
}) {
  const opacity = useTransform(progress, [3.5, 4.2], [0, 1])
  const y = useTransform(progress, [3.5, 4.2], [30, 0])

  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 w-full"
      style={{ opacity, y }}
    >
      <div className="bg-zinc-950 rounded-2xl border border-amber-500/30 h-20 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.15)]">
        <span className="text-amber-500 font-semibold text-lg md:text-xl tracking-tight">
          {title}
        </span>
        <span className="text-zinc-600 text-xs md:text-sm tracking-tight mt-1">
          {subtitle}
        </span>
      </div>
    </motion.div>
  )
}

function Dot({
  index,
  progress,
}: {
  index: number
  progress: MotionValue<number>
}) {
  const dist = useTransform(progress, (v) => Math.abs(v - index))
  const width = useTransform(dist, [0, 0.5, 1.5], [36, 18, 8])
  const backgroundColor = useTransform(
    dist,
    [0, 0.4, 1.5],
    ["rgb(245, 158, 11)", "rgb(245, 158, 11)", "rgb(63, 63, 70)"]
  )

  return (
    <motion.div
      className="h-2 rounded-full"
      style={{ width, backgroundColor }}
    />
  )
}

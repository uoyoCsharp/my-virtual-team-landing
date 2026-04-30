import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

type Story = {
  icon: string
  role: string
  title: string
  scenario: string
  commands: string[]
  outcomes: string[]
}

const visuals = [
  {
    accent: "text-primary",
    border: "border-primary/20",
    bg: "from-primary/10 to-primary/0",
    glow: "rgba(59,130,246,0.18)",
    chipBg: "bg-primary/10",
  },
  {
    accent: "text-neon",
    border: "border-neon/20",
    bg: "from-neon/10 to-neon/0",
    glow: "rgba(0,240,255,0.18)",
    chipBg: "bg-neon/10",
  },
  {
    accent: "text-accent",
    border: "border-accent/20",
    bg: "from-accent/10 to-accent/0",
    glow: "rgba(139,92,246,0.18)",
    chipBg: "bg-accent/10",
  },
]

export function StoriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useTranslation()

  const items = t("stories.items", { returnObjects: true }) as Story[]

  return (
    <section id="stories" className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)", filter: "blur(100px)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-primary via-neon to-accent bg-clip-text text-transparent">
              {t("stories.title")}
            </span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            {t("stories.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {items && items.map((story, i) => {
            const vis = visuals[i % visuals.length]
            return (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: 0.12 * i }}
                className={cn(
                  "relative flex flex-col rounded-xl sm:rounded-2xl border p-5 sm:p-6 bg-gradient-to-b transition-all duration-300 hover:-translate-y-1",
                  vis.border,
                  vis.bg
                )}
                style={{ boxShadow: `0 0 0 1px transparent` }}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-background/60 border border-white/[0.08] flex items-center justify-center text-2xl backdrop-blur-sm shrink-0"
                    style={{ boxShadow: `inset 0 0 20px ${vis.glow}` }}
                  >
                    {story.icon}
                  </div>
                  <div className="min-w-0">
                    <p className={cn("text-xs font-mono mb-1", vis.accent)}>{story.role}</p>
                    <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                      {story.title}
                    </h3>
                  </div>
                </div>

                {/* Scenario */}
                <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                  {story.scenario}
                </p>

                {/* Command sequence */}
                <div className="bg-[#0d0d12] border border-white/[0.06] rounded-lg p-3 mb-4 font-mono text-[10px] sm:text-xs leading-relaxed overflow-x-auto scrollbar-hide">
                  {story.commands.map((cmd, j) => {
                    const isComment = cmd.startsWith("→") || cmd.startsWith("#")
                    return (
                      <div
                        key={j}
                        className={cn(
                          "whitespace-nowrap",
                          isComment ? "text-muted/60" : "text-foreground"
                        )}
                      >
                        {!isComment && <span className="text-success mr-1.5">$</span>}
                        {cmd}
                      </div>
                    )
                  })}
                </div>

                {/* Outcomes */}
                <ul className="space-y-1.5 mt-auto">
                  {story.outcomes.map((out, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-muted">
                      <span className={cn("mt-1 w-1 h-1 rounded-full shrink-0", vis.chipBg.replace("bg-", "bg-"))}
                        style={{ backgroundColor: vis.glow.replace("0.18", "1") }}
                      />
                      <span className="leading-relaxed">{out}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

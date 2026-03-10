import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

export function WorkflowSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useTranslation()

  const itemsInfo = t("workflow.items", { returnObjects: true }) as Array<{id: string, command: string, desc1: string, desc2: string}>;
  
  const visuals = [
    { snippet: "[Analyst] Parsing requirement...\n→ Input: \"User auth\"\n→ Output: workspace/auth.md", color: "text-neon", glowColor: "rgba(0,240,255,0.15)", agent: "Analyst" },
    { snippet: "[Architect] Designing system...\n→ Output: architecture/auth-design.md", color: "text-accent", glowColor: "rgba(139,92,246,0.15)", agent: "Architect" },
    { snippet: "[Developer] Implementing...\n→ Output: src/auth/auth.service.ts", color: "text-primary", glowColor: "rgba(59,130,246,0.15)", agent: "Developer" },
    { snippet: "[Reviewer] Reviewing code...\n→ Report: reviews/auth-review.md", color: "text-success", glowColor: "rgba(16,185,129,0.15)", agent: "Reviewer" },
    { snippet: "[Tester] Generating tests...\n→ Output: tests/auth.spec.ts", color: "text-yellow-400", glowColor: "rgba(250,204,21,0.15)", agent: "Tester" }
  ];

  return (
    <section id="workflow" className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #3B82F6 0%, transparent 70%)", filter: "blur(100px)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-neon to-primary bg-clip-text text-transparent">
              {t("workflow.title")}
            </span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">{t("workflow.subtitle")}</p>
        </motion.div>

        <div className="relative space-y-6 sm:space-y-8">
          {/* Mobile: Horizontal timeline indicator */}
          <div className="lg:hidden flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {itemsInfo && itemsInfo.map((_, i) => {
              const vis = visuals[i % visuals.length];
              return (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: vis.glowColor.replace("0.15", "0.8") }} />
                  {i < (itemsInfo?.length || 0) - 1 && <div className="w-4 h-px bg-white/10" />}
                </div>
              );
            })}
          </div>

          {/* Desktop: Vertical timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon/40 via-primary/40 via-accent/40 via-success/40 to-yellow-400/40 hidden lg:block" />

          {itemsInfo && itemsInfo.map((step, i) => {
            const vis = visuals[i % visuals.length];
            return (
            <motion.div key={step.id} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : undefined} transition={{ duration: 0.5, delay: 0.15 * i }} className="relative">
              {/* Mobile: Card number badge */}
              <div className="lg:hidden absolute -left-1 top-4 w-6 h-6 rounded-full bg-surface border border-white/10 flex items-center justify-center text-xs font-mono text-muted">
                {i + 1}
              </div>

              {/* Desktop: Timeline dot */}
              <div className="absolute left-8 top-8 w-3 h-3 -translate-x-1.5 rounded-full bg-current hidden lg:block" style={{ color: vis.glowColor.replace("0.15", "1") }}>
                <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: vis.glowColor.replace("0.15", "0.6") }} />
              </div>

              <div className="lg:ml-16 ml-8 sm:ml-10">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 items-start">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <code className={cn("font-mono text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/[0.08] bg-surface", vis.color)}>{step.command}</code>
                      <span className="text-xs text-muted font-mono">→ {vis.agent}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{step.desc1}</h3>
                    <p className="text-sm text-muted leading-relaxed">{step.desc2}</p>
                  </div>
                  <div className="bg-[#0d0d12] border border-white/[0.06] rounded-xl overflow-hidden shadow-2xl w-full">
                    <div className="px-3 sm:px-4 py-2 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
                      <div className="flex gap-1.5">
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/20" />
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/20" />
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/20" />
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 overflow-x-auto">
                      <pre className="text-[10px] sm:text-xs font-mono leading-loose"><code className="text-muted/80">{vis.snippet}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  )
}

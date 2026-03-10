import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

export function ArchitectureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useTranslation()

  const sections = t("commands.sections", { returnObjects: true }) as Array<{
    title: string,
    cmds: Array<{cmd: string, desc: string}>
  }>;

  return (
    <section id="architecture" className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6">
              {t("commands.title", "Master Your Commands")}
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              {t("commands.subtitle", "Use simple directives to trigger actions.")}
            </p>
            <div className="space-y-4 sm:space-y-6 max-h-[400px] sm:max-h-[500px] pr-2 overflow-y-auto custom-scrollbar">
              {sections && sections.map((sec, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 sm:p-5 backdrop-blur-sm">
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">{sec.title}</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {sec.cmds && sec.cmds.map(c => (
                      <div key={c.cmd} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2">
                        <code className="text-accent font-mono text-xs sm:text-sm bg-accent/10 px-2 py-1 rounded inline-block whitespace-nowrap self-start">
                          {c.cmd}
                        </code>
                        <span className="text-xs sm:text-sm text-muted">{c.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Terminal Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-auto"
          >
            <div className="rounded-xl border border-white/[0.08] bg-[#0d0d12] overflow-hidden shadow-2xl shadow-accent/5">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.03] border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[10px] sm:text-xs text-muted font-mono ml-2">
                  interactive-commands.sh
                </span>
              </div>
              <div className="p-3 sm:p-4 font-mono text-[10px] sm:text-xs lg:text-sm leading-loose text-muted">
                <span className="text-success">&gt;</span> <span className="text-foreground">#init</span><br />
                [My-Virtual-TechTeam] initialized.<br />
                <span className="text-success">&gt;</span> <span className="text-foreground">#analyze</span><br />
                [Analyst] Ready to analyze requirements...<br />
                <span className="text-success">&gt;</span> <span className="text-foreground">#design</span><br />
                [Architect] Generating blueprint...<br />
                <span className="text-success">&gt;</span> <span className="text-foreground">#implement</span><br />
                [Developer] Writing code in context...<br />
                <span className="text-success">&gt;</span> <span className="text-foreground">#review</span><br />
                [Reviewer] Reviewing code...<br />
                <span className="text-success">&gt;</span> <span className="text-foreground">#test</span><br />
                [Tester] Generating test cases...<br />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

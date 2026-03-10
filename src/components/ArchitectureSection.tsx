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
    <section id="architecture" className="relative py-24 sm:py-32" ref={ref}>
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
              {t("commands.title", "Master Your Commands")}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              {t("commands.subtitle", "Use simple directives to trigger actions.")}
            </p>
            <div className="space-y-6 max-h-[500px] pr-2 overflow-y-auto custom-scrollbar">
              {sections && sections.map((sec, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-foreground mb-4">{sec.title}</h3>
                  <div className="space-y-3">
                    {sec.cmds && sec.cmds.map(c => (
                      <div key={c.cmd} className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                        <code className="text-accent font-mono text-sm bg-accent/10 px-2 py-1 rounded inline-block whitespace-nowrap self-start">
                          {c.cmd}
                        </code>
                        <span className="text-sm text-muted">{c.desc}</span>
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
          >
            <div className="rounded-xl border border-white/[0.08] bg-[#0d0d12] overflow-hidden shadow-2xl shadow-accent/5">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-muted font-mono ml-2">
                  interactive-commands.sh
                </span>
              </div>
              <div className="p-4 font-mono text-sm leading-loose text-muted">
                <span className="text-success">&gt;</span> <span className="text-foreground">#init</span><br />
                [My-Virtual-TechTeam] initialized.<br />
                <span className="text-success">&gt;</span> <span className="text-foreground">#analyze</span><br />
                [Analyst] Ready to analyze requirements...<br />
                <span className="text-success">&gt;</span> <span className="text-foreground">#design</span><br />
                [Architect] Generating blueprint...<br />
                <span className="text-success">&gt;</span> <span className="text-foreground">#implement</span><br />
                [Developer] Writing code in context...<br />
                <span className="text-success">&gt;</span> <span className="text-foreground">#status</span><br />
                [Conductor] Current Phase: Implementation<br />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

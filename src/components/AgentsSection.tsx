import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

export function AgentsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useTranslation()

  const items = t("agents.items", { returnObjects: true }) as Array<{name: string, role: string, desc: string, cmds: string}>;
  
  const visualProfiles = [
    { color: "from-blue-500/20 to-blue-500/0", border: "border-blue-500/20", icon: "⚡" },
    { color: "from-neon/20 to-neon/0", border: "border-neon/20", icon: "👁️" },
    { color: "from-accent/20 to-accent/0", border: "border-accent/20", icon: "📐" },
    { color: "from-primary/20 to-primary/0", border: "border-primary/20", icon: "💻" },
    { color: "from-success/20 to-success/0", border: "border-success/20", icon: "🛡️" },
    { color: "from-yellow-400/20 to-yellow-400/0", border: "border-yellow-400/20", icon: "🧪" }
  ];

  return (
    <section id="agents" className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">{t("agents.title")}</h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">{t("agents.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items && items.map((agent, i) => {
            const vis = visualProfiles[i % visualProfiles.length];
            return (
            <motion.div key={agent.name} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.5, delay: 0.1 * i }} className={"relative rounded-xl sm:rounded-2xl border p-4 sm:p-6 bg-gradient-to-b " + vis.border + " " + vis.color}>
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-background/50 border border-white/[0.08] flex items-center justify-center text-xl sm:text-2xl shadow-inner backdrop-blur-sm">
                  {vis.icon}
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-end">
                  {agent.cmds.split(', ').map(cmd => (
                    <span key={cmd} className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black/40 text-muted/80 backdrop-blur-md">{cmd}</span>
                  ))}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{agent.name}</h3>
              <p className="text-xs sm:text-sm font-mono text-primary/80 mb-2 sm:mb-4">{agent.role}</p>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{agent.desc}</p>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  )
}

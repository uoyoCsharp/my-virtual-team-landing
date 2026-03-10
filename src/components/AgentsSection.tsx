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
    <section id="agents" className="relative py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">{t("agents.title")}</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{t("agents.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items && items.map((agent, i) => {
            const vis = visualProfiles[i % visualProfiles.length];
            return (
            <motion.div key={agent.name} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.5, delay: 0.1 * i }} className={"relative rounded-2xl border p-6 bg-gradient-to-b " + vis.border + " " + vis.color}>
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-background/50 border border-white/[0.08] flex items-center justify-center text-2xl shadow-inner backdrop-blur-sm">
                  {vis.icon}
                </div>
                <div className="flex gap-1.5">
                  {agent.cmds.split(', ').map(cmd => (
                    <span key={cmd} className="text-xs font-mono px-2 py-1 rounded bg-black/40 text-muted/80 backdrop-blur-md">{cmd}</span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{agent.name}</h3>
              <p className="text-sm font-mono text-primary/80 mb-4">{agent.role}</p>
              <p className="text-sm text-muted leading-relaxed">{agent.desc}</p>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  )
}

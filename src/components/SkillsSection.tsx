import { Icon } from "@iconify/react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import GlareHover from "@/components/reactbits/GlareHover"
import { useTranslation } from "react-i18next"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface SkillItem {
  icon: string
  command: string
  useWhen?: string
  desc: string
}
interface SkillCategory {
  id: string
  label: string
  layout: "wide" | "grid"
  items: SkillItem[]
}

export function SkillsSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const categories = t("skills.categories", { returnObjects: true }) as SkillCategory[]

  return (
    <section id="skills" ref={ref} className="py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel align="center">{t("skills.label")}</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-6"
          >
            {t("skills.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto"
          >
            {t("skills.subtitle")}
          </motion.p>
        </div>

        {categories.map((cat, catIdx) => {
          const isWorkflow = cat.id === "workflow"
          return (
            <div key={cat.id} className="mb-16 last:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-zinc-200" />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  {cat.label}
                </span>
                <div className="h-px flex-1 bg-zinc-200" />
              </div>

              {cat.layout === "wide" ? (
                <div className="space-y-3">
                  {cat.items.map((s, i) => (
                    <GlareHover
                      key={s.command}
                      width="100%"
                      height="auto"
                      background="#FFFFFF"
                      borderRadius="12px"
                      borderColor="#E4E4E7"
                      glareColor="#F59E0B"
                      glareOpacity={0.2}
                      glareSize={300}
                      transitionDuration={800}
                      className="hover:!border-amber-200"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.4, delay: 0.1 + catIdx * 0.1 + i * 0.04 }}
                        className="p-5 group flex flex-col md:flex-row md:items-center gap-4"
                      >
                        <div className="flex items-center gap-3 md:w-52 shrink-0">
                          <div
                            className={cn(
                              "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                              isWorkflow
                                ? "bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white"
                                : "bg-zinc-100 text-zinc-500 group-hover:bg-amber-500 group-hover:text-white"
                            )}
                          >
                            <Icon icon={s.icon} width="20" height="20" />
                          </div>
                          <p className="text-sm font-medium text-zinc-900 font-mono">{s.command}</p>
                        </div>
                        <div className="flex-1">
                          {s.useWhen && (
                            <p className="text-sm text-zinc-700">
                              <span className="text-zinc-400">Use when:</span> {s.useWhen}
                            </p>
                          )}
                          <p className={cn("text-sm text-zinc-500", s.useWhen && "mt-1")}>
                            {s.desc}
                          </p>
                        </div>
                      </motion.div>
                    </GlareHover>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cat.items.map((s, i) => (
                    <GlareHover
                      key={s.command}
                      width="100%"
                      height="auto"
                      background="#FFFFFF"
                      borderRadius="12px"
                      borderColor="#E4E4E7"
                      glareColor="#F59E0B"
                      glareOpacity={0.2}
                      glareSize={300}
                      transitionDuration={800}
                      className="hover:!border-amber-200"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.4, delay: 0.1 + catIdx * 0.1 + i * 0.04 }}
                        className="p-4 flex items-start gap-3"
                      >
                        <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-500 shrink-0 mt-0.5">
                          <Icon icon={s.icon} width="18" height="18" />
                        </div>
                        <div>
                          <p className="text-sm font-mono font-medium text-zinc-900">{s.command}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{s.desc}</p>
                        </div>
                      </motion.div>
                    </GlareHover>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

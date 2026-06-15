import { SectionLabel } from "@/components/ui/SectionLabel"
import { useTranslation } from "react-i18next"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface RecipeStep {
  cmd: string
}
interface Recipe {
  name: string
  steps: RecipeStep[]
}

export function RecipesSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const items = t("recipes.items", { returnObjects: true }) as Recipe[]

  return (
    <section ref={ref} className="py-32 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel align="center">{t("recipes.label")}</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-6"
          >
            {t("recipes.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-zinc-500 max-w-2xl mx-auto"
          >
            {t("recipes.subtitle")}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {items.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-zinc-50 p-5 rounded-xl border border-zinc-100 hover:bg-zinc-100/50 transition-colors"
            >
              <div className="text-sm font-medium text-zinc-900 md:w-56 shrink-0">
                {r.name}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {r.steps.map((s, j) => {
                  const isAmber = r.steps.length > 1
                  return (
                    <div key={j} className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs px-2.5 py-1 rounded-full font-mono border",
                          isAmber
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-zinc-100 text-zinc-700 border-zinc-200"
                        )}
                      >
                        {s.cmd}
                      </span>
                      {j < r.steps.length - 1 && (
                        <span className="text-xs text-zinc-300">→</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

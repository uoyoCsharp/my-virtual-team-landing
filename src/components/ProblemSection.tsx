import { Icon } from "@iconify/react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { useTranslation } from "react-i18next"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface ProblemItem {
  icon: string
  title: string
  desc: string
}

export function ProblemSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const items = t("problem.items", { returnObjects: true }) as ProblemItem[]

  return (
    <section id="problem" ref={ref} className="py-32 bg-white relative border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel>{t("problem.label")}</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 max-w-3xl mb-6 leading-tight"
        >
          {t("problem.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-zinc-500 max-w-2xl mb-16 leading-relaxed"
        >
          {t("problem.intro")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="bg-zinc-50 border border-zinc-100 p-8 rounded-2xl transition-all hover:bg-zinc-100/50 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 shadow-sm rounded-xl flex items-center justify-center mb-6 ${
                  i === 2
                    ? "bg-amber-500 text-white"
                    : "bg-white border border-zinc-200 text-zinc-900"
                }`}
              >
                <Icon icon={item.icon} width="24" height="24" />
              </div>
              <h3 className="text-2xl font-medium tracking-tight text-zinc-900 mb-3">
                {item.title}
              </h3>
              <p className="text-base text-zinc-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 bg-amber-50 border border-amber-100 rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <p
            className="text-lg font-medium text-zinc-900 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t("problem.mentalModel") }}
          />
        </motion.div>
      </div>
    </section>
  )
}

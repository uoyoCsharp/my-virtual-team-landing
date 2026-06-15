import { Icon } from "@iconify/react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { useTranslation } from "react-i18next"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function WhoIsForSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const fitItems = t("whoIsFor.fit", { returnObjects: true }) as string[]
  const skipItems = t("whoIsFor.skip.items", { returnObjects: true }) as string[]

  return (
    <section ref={ref} className="py-32 bg-[#FAFAFA] border-t border-zinc-100">
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel align="center">{t("whoIsFor.label")}</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 text-center mb-8 leading-tight"
        >
          <span dangerouslySetInnerHTML={{ __html: t("whoIsFor.title") }} />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-zinc-500 text-center max-w-2xl mx-auto mb-16"
        >
          {t("whoIsFor.subtitle")}
        </motion.p>

        <div className="grid grid-cols-1 gap-4 mb-12">
          {fitItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="flex items-start gap-5 bg-white p-6 rounded-2xl border border-zinc-100"
            >
              <div className="text-sm font-medium text-amber-500 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-base text-zinc-700 leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800"
        >
          <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
            {t("whoIsFor.skip.title")}
          </p>
          <div className="space-y-3">
            {skipItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Icon
                  icon="solar:close-circle-linear"
                  width="18"
                  height="18"
                  className="text-zinc-600 shrink-0"
                />
                <p className="text-sm text-zinc-400">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

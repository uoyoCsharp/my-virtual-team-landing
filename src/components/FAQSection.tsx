import { Icon } from "@iconify/react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

interface FaqItem {
  q: string
  a: string
}

export function FAQSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [open, setOpen] = useState<number | null>(0)

  const items = t("faq.items", { returnObjects: true }) as FaqItem[]

  return (
    <section id="faq" ref={ref} className="py-32 bg-white border-t border-zinc-100">
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel align="center">{t("faq.label")}</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 text-center mb-16"
        >
          {t("faq.title")}
        </motion.h2>

        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 cursor-pointer text-left"
              >
                <h3 className="text-lg font-medium text-zinc-900 pr-4">{item.q}</h3>
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  width="24"
                  height="24"
                  className={`text-zinc-400 shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-6 pb-6 text-base text-zinc-500 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.a }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

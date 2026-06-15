import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function InstallCTASection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const codeLinesRaw = t("install.codeLines", { returnObjects: true }) as Array<{ prefix: string; text: string }>
  const commandsRaw = t("install.commands", { returnObjects: true }) as Array<{ cmd: string; desc: string }>

  return (
    <section
      id="install"
      ref={ref}
      className="py-32 bg-zinc-950 text-center relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="text-amber-500 text-sm tracking-tight uppercase mb-6 block"
        >
          {t("install.label")}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-8 leading-tight"
        >
          <span dangerouslySetInnerHTML={{ __html: t("install.title") }} />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-12"
        >
          {t("install.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 max-w-lg mx-auto text-left"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-amber-400/60" />
          </div>
          {codeLinesRaw.map((line, i) => (
            <p key={i} className="font-mono text-sm text-zinc-400 mb-1 last:mb-0">
              <span className={line.prefix === "#" ? "text-zinc-600" : "text-amber-400"}>{line.prefix}</span>{" "}
              {line.text}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-lg mx-auto mb-12"
        >
          {commandsRaw.map((c, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
              <p className="font-mono text-xs text-amber-400">{c.cmd}</p>
              <p className="text-[11px] text-zinc-600 mt-1">{c.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://www.npmjs.com/package/@uoyo/mvtt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="px-8 py-4 text-base">
              {t("install.ctaPrimary")}
              <Icon icon="solar:arrow-right-linear" width="18" height="18" className="ml-1" />
            </Button>
          </a>
          <a
            href="https://github.com/uoyoCsharp/My-Virtual-TechTeam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-400 text-base hover:text-white transition-colors"
          >
            <Icon icon="mdi:github" width="20" height="20" />
            {t("install.ctaSecondary")}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

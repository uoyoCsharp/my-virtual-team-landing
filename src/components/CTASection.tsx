import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

const cloneCommand = "npx degit uoyoCsharp/My-Virtual-TechTeam"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cloneCommand)
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <section className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7 }} className="relative rounded-xl sm:rounded-2xl border border-white/[0.08] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at top, #3B82F6 0%, transparent 50%), radial-gradient(ellipse at bottom right, #8B5CF6 0%, transparent 50%)" }} />
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          </div>
          <div className="relative z-10 px-6 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
              {t("cta.titlePart1")}
            </h2>
            <p className="text-muted text-base sm:text-lg mb-6 sm:mb-10 max-w-xl mx-auto">{t("cta.subtitle")}</p>
            <div className="flex items-center gap-2 max-w-2xl mx-auto bg-[#0d0d12] border border-white/[0.08] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 mb-6 sm:mb-8">
              <code className="flex-1 text-left font-mono text-xs sm:text-sm text-foreground/90 truncate"><span className="text-success">$</span> {cloneCommand}</code>
              <button onClick={handleCopy} className="flex-shrink-0 p-1.5 sm:p-2 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer">
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <a href="https://github.com/uoyoCsharp/My-Virtual-TechTeam" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-sm sm:text-base px-6 sm:px-10"><ExternalLink className="w-4 h-4 mr-2" /> {t("cta.button")}</Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

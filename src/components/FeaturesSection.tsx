import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { useTranslation } from "react-i18next"
import {
  Users,
  Globe,
  FolderOpen,
  Handshake,
  Database,
  Brain,
  Settings,
  Puzzle,
  Languages,
} from "lucide-react"

const icons = [Users, Globe, FolderOpen, Handshake, Database, Brain, Settings, Puzzle, Languages];

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useTranslation()

  // Get features from translations
  const features = t("features.items", { returnObjects: true }) as Array<{title: string, titleZh: string, desc: string}>;

  return (
    <section id="features" className="relative py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {t("features.title1")}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("features.title2")}
            </span>
            {t("features.title3")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* 3x3 Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features && features.map((feature, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <SpotlightCard className="h-full">
                  <Icon className="w-8 h-8 text-primary mb-4 stroke-[1.5]" />
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-primary/70 font-mono mb-3">
                    {feature.titleZh}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {feature.desc}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

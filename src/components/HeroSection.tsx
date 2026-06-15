import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/ui/CopyButton"
import BlurText from "@/components/reactbits/BlurText"
import GradientText from "@/components/reactbits/GradientText"
import ClickSpark from "@/components/reactbits/ClickSpark"
import ShinyText from "@/components/reactbits/ShinyText"
import { useNpmVersion } from "@/hooks/useNpmVersion"
import { useTranslation } from "react-i18next"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface FloatingYaml {
  filename: string
  activeChange: string
  id: string
  status: string
  lastSynced: string
}
interface FloatingTerminal {
  command: string
  result: string
}
interface HeroData {
  badge: string
  titleLead: string
  titleAccent: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  installCommand: string
  statsTitle: string
  stats: Array<{ value: string; label: string }>
  floating: {
    sessionYaml: FloatingYaml
    skillBadge: string
    teamBadge: string
    terminal: FloatingTerminal
  }
}

export function HeroSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const npmVersion = useNpmVersion("@uoyo/mvtt")

  const data = t("hero", { returnObjects: true }) as HeroData

  return (
    <section
      ref={ref}
      className="relative pt-40 pb-20 overflow-hidden flex flex-col items-center justify-center text-center min-h-[90vh]"
    >
      <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex absolute left-[4%] top-[14%] w-40 h-20 bg-emerald-500 rounded-full shadow-xl border-[6px] border-white p-2 items-center float-slow rotate-[-14deg] hover:rotate-[-6deg] transition-transform duration-500"
        >
          <div className="w-14 h-14 bg-white rounded-full shadow-sm ml-auto flex items-center justify-center text-emerald-500">
            <Icon icon="solar:check-circle-linear" width="28" height="28" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -5 }}
          animate={inView ? { opacity: 1, y: 0, rotate: -5 } : undefined}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:flex absolute left-[18%] top-[42%] w-44 h-16 bg-white rounded-2xl shadow-xl p-4 items-center gap-3 float-medium border border-zinc-200"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
            <Icon icon="solar:check-circle-linear" width="20" height="20" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 bg-zinc-200 rounded w-full" />
            <div className="h-2 bg-zinc-100 rounded w-3/4" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 8 } : undefined}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex absolute right-[12%] top-[10%] w-36 h-36 bg-amber-500 rounded-3xl shadow-xl border-[6px] border-white p-4 items-center justify-center float-fast glow"
        >
          <Icon icon="solar:code-scan-linear" width="56" height="56" className="text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 5 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 5 } : undefined}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden md:flex absolute right-[4%] top-[38%] w-52 h-28 bg-zinc-900 rounded-2xl shadow-xl p-4 flex-col justify-center float-slow border border-zinc-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="h-1.5 bg-zinc-700 rounded w-16" />
          </div>
          <p className="font-mono text-[10px] text-amber-400/80">
            {data.floating.terminal.command}
          </p>
          <p className="font-mono text-[10px] text-zinc-500 mt-1">
            {data.floating.terminal.result}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 6 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 6 } : undefined}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:flex absolute left-[10%] bottom-[20%] w-28 h-28 bg-amber-50 rounded-2xl shadow-lg border border-amber-100 items-center justify-center float-medium"
        >
          <div className="text-center">
            <Icon
              icon="solar:users-group-rounded-linear"
              width="32"
              height="32"
              className="text-amber-500 mx-auto mb-1"
            />
            <p className="text-[10px] text-amber-600 uppercase tracking-wider font-medium">
              {data.floating.teamBadge}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-3 py-1 mb-8"
        >
          {npmVersion && (
            <a
              href="https://www.npmjs.com/package/@uoyo/mvtt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono tracking-normal"
              title={`Latest version on npm: v${npmVersion}`}
            >
              <ShinyText speed={2.5}>v{npmVersion}</ShinyText>
            </a>
          )}
        </motion.span>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-zinc-900 leading-[0.9] mb-8 flex flex-col items-center gap-2">
          <BlurText
            text={data.titleLead}
            as="span"
            className="inline"
            delay={80}
            animateBy="words"
            direction="top"
          />
          <GradientText
            colors={["#F59E0B", "#FBBF24", "#D97706", "#F59E0B"]}
            animationSpeed={6}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter"
          >
            {data.titleAccent}
          </GradientText>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-zinc-500 max-w-2xl leading-relaxed mb-10"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <a href="#install">
            <Button className="px-8 py-4 text-base">
              {data.ctaPrimary}
              <Icon
                icon="solar:arrow-right-linear"
                width="20"
                height="20"
                className="ml-1"
              />
            </Button>
          </a>
          <a
            href="#workflow"
            className="inline-flex items-center gap-2 text-zinc-600 text-base px-6 py-4 hover:text-zinc-900 transition-colors"
          >
            <Icon icon="solar:play-circle-linear" width="20" height="20" />
            <span>{data.ctaSecondary}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-full px-5 py-3 shadow-lg"
        >
          <span className="text-amber-400 font-mono text-sm select-none">$</span>
          <code className="font-mono text-sm text-zinc-300 select-all">
            {data.installCommand}
          </code>
          <ClickSpark
            sparkColor="#F59E0B"
            sparkCount={10}
            sparkRadius={18}
            className="ml-2"
          >
            <CopyButton
              text={data.installCommand}
              className="text-zinc-500 hover:text-amber-500 p-1 rounded-md hover:bg-zinc-800"
            />
          </ClickSpark>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-24"
      >
        <p className="text-sm text-zinc-400 mb-8 tracking-tight text-center">
          {data.statsTitle}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          {data.stats.map((s, i) => (
            <div
              key={i}
              className={`space-y-1 ${i > 0 ? "md:border-l md:border-zinc-100" : ""}`}
            >
              <p
                className={`text-3xl font-medium tracking-tight ${
                  i === 0 ? "text-amber-500" : "text-zinc-900"
                }`}
              >
                {s.value}
              </p>
              <p className="text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

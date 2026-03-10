import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Star, BookOpen, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SplitText } from "@/components/ui/SplitText"
import { useTranslation } from "react-i18next"

function TerminalAnimation() {
  const { t } = useTranslation()

  const terminalLines = [
    { type: "input" as const, text: t("hero.terminal.userInit", "$ #init") },
    { type: "output" as const, text: t("hero.terminal.conductorStart", "[Conductor] Initializing virtual tech team...") },
    { type: "output" as const, text: t("hero.terminal.conductorParse", "[Conductor] Loading registry.yaml...") },
    { type: "output" as const, text: "" },
    { type: "success" as const, text: t("hero.terminal.agent1", "✓ Analyst agent activated") },
    { type: "success" as const, text: t("hero.terminal.agent2", "✓ Architect agent activated") },
    { type: "success" as const, text: t("hero.terminal.agent3", "✓ Developer agent activated") },
    { type: "success" as const, text: t("hero.terminal.agent4", "✓ Reviewer agent activated") },
    { type: "success" as const, text: t("hero.terminal.agent5", "✓ Tester agent activated") },
    { type: "output" as const, text: "" },
    { type: "output" as const, text: t("hero.terminal.conductorContext", "[Conductor] Team is ready. Awaiting instructions...") },
    { type: "input" as const, text: t("hero.terminal.userInput2", "$ #analyze --requirement \"User auth module\"") },
    { type: "output" as const, text: t("hero.terminal.systemReady", "[Analyst] Analyzing requirement...") },
  ]

  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const animationStarted = useRef(false)

  const animateTerminal = useCallback(async () => {
    if (animationStarted.current) return
    animationStarted.current = true

    for (let i = 0; i < terminalLines.length; i++) {
      const line = terminalLines[i]

      if (line.type === "input") {
        setIsTyping(true)
        for (let j = 0; j <= line.text.length; j++) {
          setCurrentText(line.text.slice(0, j))
          await new Promise((r) => setTimeout(r, 40 + Math.random() * 30))
        }
        setIsTyping(false)
        await new Promise((r) => setTimeout(r, 200))
      }

      setVisibleLines(i + 1)
      setCurrentText("")

      // Auto scroll to bottom
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight
      }

      const delay = line.type === "input" ? 400 : line.text === "" ? 100 : 150
      await new Promise((r) => setTimeout(r, delay))
    }
  }, [])

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(animateTerminal, 600)
      return () => clearTimeout(timeout)
    }
  }, [isInView, animateTerminal])

  return (
    <div ref={containerRef} className="w-full max-w-lg mx-auto lg:mx-0 lg:max-w-2xl">
      <div className="rounded-lg sm:rounded-xl border border-white/[0.08] bg-[#0d0d12] shadow-2xl shadow-primary/5 overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-white/[0.03] border-b border-white/[0.06]">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[10px] sm:text-xs text-muted font-mono ml-2 truncate">
            my-virtual-techteam — terminal
          </span>
        </div>

        {/* Terminal Body */}
        <div ref={bodyRef} className="p-2.5 sm:p-4 font-mono text-[10px] sm:text-xs lg:text-sm leading-relaxed h-[260px] sm:h-[280px] lg:h-[340px] overflow-y-auto overflow-x-hidden scrollbar-hide">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={
                line.type === "input"
                  ? "text-foreground"
                  : line.type === "success"
                    ? "text-success"
                    : "text-muted"
              }
            >
              {line.text || "\u00A0"}
            </motion.div>
          ))}

          {isTyping && (
            <div className="text-foreground">
              {currentText}
              <span className="inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-primary ml-0.5 animate-pulse" />
            </div>
          )}

          {!isTyping && visibleLines >= terminalLines.length && (
            <div className="text-foreground mt-1">
              $ <span className="inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-primary ml-0.5 animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const sectionRef = useRef(null)
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("npx degit uoyoCsharp/My-Virtual-TechTeam")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16"
    >
      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full opacity-15 sm:opacity-20"
          style={{
            background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
            filter: "blur(100px) sm:blur(120px)",
            animation: "glow-pulse 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full opacity-10 sm:opacity-15"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            filter: "blur(80px) sm:blur(120px)",
            animation: "glow-pulse 8s ease-in-out infinite 2s",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16 lg:py-20 flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="w-full text-center lg:text-left lg:pr-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight mb-3 sm:mb-4 lg:mb-6">
            <SplitText
              text={t("hero.titlePart1", "Unleash Your Potential with an ")}
              className="inline"
              charDelay={0.02}
            />
            <span className="bg-gradient-to-r from-primary via-neon to-accent bg-clip-text text-transparent inline">
              {t("hero.titlePart2", "AI Virtual Tech Team")}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-sm sm:text-base lg:text-lg text-muted max-w-xl mb-4 sm:mb-6 lg:mb-8 leading-relaxed mx-auto lg:mx-0"
          >
            {t("hero.subtitle", "基于提示词工程构建的多架构 AI Agent 框架。将复杂的软件开发生命周期交由虚拟的 Analyst, Architect 和 Developer 协作完成。")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
          >
            <a
              href="https://github.com/uoyoCsharp/My-Virtual-TechTeam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" className="sm:size-default">
                <Star className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t("hero.viewGithub", "View on GitHub")}</span>
                <span className="sm:hidden">GitHub</span>
              </Button>
            </a>
            <a
              href="#architecture"
            >
              <Button variant="outline" size="sm" className="sm:size-default">
                <BookOpen className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t("hero.quickStart", "Quick Start")}</span>
                <span className="sm:hidden">Docs</span>
              </Button>
            </a>
          </motion.div>

          {/* Quick Install Section */}
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.8, duration: 0.5 }}
             className="mt-6 sm:mt-8 lg:mt-10 p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm text-foreground font-medium">{t("install.title", "Start Building in Seconds")}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-muted mb-2 sm:mb-3 hidden sm:block">
              {t("install.description", "Out of the box. Use npx degit to directly pull the AI virtual team scaffolding.")}
            </p>
            <div className="flex items-center gap-2 bg-black/40 p-2 sm:p-3 rounded-md sm:rounded-lg border border-white/5 relative">
              <code className="text-[10px] sm:text-xs font-mono text-primary flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                npx degit uoyoCsharp/My-Virtual-TechTeam
              </code>
              <button
                onClick={handleCopy}
                className="text-muted hover:text-foreground transition-colors absolute right-2 sm:right-3 shrink-0 bg-black/60 p-1 sm:p-1.5 rounded backdrop-blur-md"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-3 h-3 sm:w-4 sm:h-4 text-success" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4" />}
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Terminal Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex justify-center lg:justify-end w-full"
        >
          <TerminalAnimation />
        </motion.div>
      </div>
    </section>
  )
}

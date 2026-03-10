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
  const isInView = useInView(containerRef, { once: true })
  const animationStarted = useRef(false)

  const animateTerminal = useCallback(async () => {
    if (animationStarted.current) return
    animationStarted.current = true

    for (let i = 0; i < terminalLines.length; i++) {
      const line = terminalLines[i]

      if (line.type === "input") {
        setIsTyping(true)
        // Type character by character
        for (let j = 0; j <= line.text.length; j++) {
          setCurrentText(line.text.slice(0, j))
          await new Promise((r) => setTimeout(r, 40 + Math.random() * 30))
        }
        setIsTyping(false)
        await new Promise((r) => setTimeout(r, 200))
      }

      setVisibleLines(i + 1)
      setCurrentText("")

      // Pause between lines
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
    <div ref={containerRef} className="w-full max-w-2xl">
      {/* Terminal Window Chrome */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0d0d12] shadow-2xl shadow-primary/5 overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-muted font-mono ml-2">
            my-virtual-techteam — terminal
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 font-mono text-sm leading-relaxed h-[340px] overflow-hidden">
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

          {/* Current typing line */}
          {isTyping && (
            <div className="text-foreground">
              {currentText}
              <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse" />
            </div>
          )}

          {/* Resting cursor */}
          {!isTyping && visibleLines >= terminalLines.length && (
            <div className="text-foreground mt-1">
              $ <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse" />
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
            filter: "blur(120px)",
            animation: "glow-pulse 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            filter: "blur(120px)",
            animation: "glow-pulse 8s ease-in-out infinite 2s",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
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
            className="text-lg text-muted max-w-xl mb-8 leading-relaxed"
          >
            {t("hero.subtitle", "基于提示词工程构建的多架构 AI Agent 框架。将复杂的软件开发生命周期交由虚拟的 Analyst, Architect 和 Developer 协作完成。")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://github.com/uoyoCsharp/My-Virtual-TechTeam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                <Star className="w-4 h-4" />
                {t("hero.viewGithub", "View on GitHub")}
              </Button>
            </a>
            <a
              href="https://github.com/uoyoCsharp/My-Virtual-TechTeam#readme"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                <BookOpen className="w-4 h-4" />
                {t("hero.quickStart", "Read the Docs")}
              </Button>
            </a>
          </motion.div>
          
          {/* Quick Install Section */}
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.8, duration: 0.5 }}
             className="mt-12 p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm max-w-md"
          >
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-foreground font-medium">{t("install.title", "Start Building in Seconds")}</span>
            </div>
            <p className="text-xs text-muted mb-4">
              {t("install.description", "Out of the box. Use npx degit to directly pull the AI virtual team scaffolding.")}
            </p>
            <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg border border-white/5 relative group">
              <code className="text-xs font-mono text-primary flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                npx degit uoyoCsharp/My-Virtual-TechTeam
              </code>
              <button 
                onClick={handleCopy}
                className="text-muted hover:text-foreground transition-colors absolute right-3 shrink-0 bg-black/60 p-1 rounded backdrop-blur-md"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Terminal Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <TerminalAnimation />
        </motion.div>
      </div>
    </section>
  )
}

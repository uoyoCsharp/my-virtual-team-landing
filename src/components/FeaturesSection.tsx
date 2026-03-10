import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
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

const features = [
  {
    icon: Users,
    title: "Role Separation",
    titleZh: "角色分离",
    description:
      "Each agent has a clearly defined role — Analyst, Architect, Developer, Reviewer, and Tester — ensuring focused, high-quality output.",
  },
  {
    icon: Globe,
    title: "Platform Agnostic",
    titleZh: "平台无关",
    description:
      "Works with any AI platform — GitHub Copilot, Cursor, Claude, ChatGPT, or any LLM that supports prompts.",
  },
  {
    icon: FolderOpen,
    title: "Unified Registry",
    titleZh: "统一资源注册表",
    description:
      "A single registry.yaml governs all agents, skills, and workspace configurations in one place.",
  },
  {
    icon: Handshake,
    title: "Context Contract",
    titleZh: "智能上下文契约",
    description:
      "Agents pass structured context to each other, maintaining coherence across the entire development lifecycle.",
  },
  {
    icon: Database,
    title: "Data Tiering",
    titleZh: "数据冷热分层存储",
    description:
      "Hot data in active workspace, warm data in indexed references, cold data archived — optimizing token usage.",
  },
  {
    icon: Brain,
    title: "Semantic Index",
    titleZh: "语义知识库索引",
    description:
      "Built-in semantic indexing allows agents to intelligently search and reference your codebase and documentation.",
  },
  {
    icon: Settings,
    title: "Semi-automatic Workflows",
    titleZh: "半自动工作流控制",
    description:
      "You stay in control. Agents propose, you approve. Semi-automatic workflows balance efficiency with human oversight.",
  },
  {
    icon: Puzzle,
    title: "Modular Skills",
    titleZh: "技能模块化热插拔",
    description:
      "Add, remove, or customize agent skills like plugins. Each skill is a standalone markdown file — easy to extend.",
  },
  {
    icon: Languages,
    title: "Language Agnostic",
    titleZh: "无视编程语言限制",
    description:
      "TypeScript, Python, Rust, Go, Java — your virtual team adapts to any language or tech stack you choose.",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
            Why{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              My-Virtual-TechTeam
            </span>
            ?
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Nine core capabilities that make your AI-powered development team
            efficient, modular, and truly platform-agnostic.
          </p>
        </motion.div>

        {/* 3x3 Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <SpotlightCard className="h-full">
                <feature.icon className="w-8 h-8 text-primary mb-4 stroke-[1.5]" />
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-primary/70 font-mono mb-3">
                  {feature.titleZh}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

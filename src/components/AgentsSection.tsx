import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Agent {
  name: string
  role: string
  commands: string[]
  description: string
  color: string
  bgGlow: string
  shape: "hexagon" | "diamond" | "circle" | "shield" | "pentagon" | "octagon"
}

const agents: Agent[] = [
  {
    name: "Conductor",
    role: "Team Orchestrator",
    commands: ["#init", "#status", "#delegate"],
    description:
      "The central coordinator that initializes the team, manages workflow state, and delegates tasks to specialized agents.",
    color: "from-neon to-primary",
    bgGlow: "rgba(0,240,255,0.12)",
    shape: "hexagon",
  },
  {
    name: "Analyst",
    role: "Requirements Engineer",
    commands: ["#analyze", "#clarify"],
    description:
      "Parses user stories and feature requests into structured, actionable requirement documents for the team.",
    color: "from-primary to-accent",
    bgGlow: "rgba(59,130,246,0.12)",
    shape: "diamond",
  },
  {
    name: "Architect",
    role: "System Designer",
    commands: ["#design", "#diagram"],
    description:
      "Transforms requirements into detailed system architecture, API contracts, and component blueprints.",
    color: "from-accent to-purple-400",
    bgGlow: "rgba(139,92,246,0.12)",
    shape: "pentagon",
  },
  {
    name: "Developer",
    role: "Code Builder",
    commands: ["#implement", "#fix", "#refactor"],
    description:
      "Writes production-ready code following the architect's design, maintaining clean code standards.",
    color: "from-primary to-neon",
    bgGlow: "rgba(59,130,246,0.12)",
    shape: "circle",
  },
  {
    name: "Reviewer",
    role: "Quality Guardian",
    commands: ["#review", "#audit"],
    description:
      "Analyzes code for bugs, security vulnerabilities, performance issues, and adherence to best practices.",
    color: "from-success to-emerald-300",
    bgGlow: "rgba(16,185,129,0.12)",
    shape: "shield",
  },
  {
    name: "Tester",
    role: "Test Specialist",
    commands: ["#test", "#coverage"],
    description:
      "Generates comprehensive test suites — unit, integration, and edge case tests — ensuring robust coverage.",
    color: "from-yellow-400 to-orange-400",
    bgGlow: "rgba(250,204,21,0.12)",
    shape: "octagon",
  },
]

function AgentIcon({ shape, gradient }: { shape: string; gradient: string }) {
  const size = 64
  const center = size / 2

  const getPath = () => {
    switch (shape) {
      case "hexagon": {
        const r = 28
        return Array.from({ length: 6 }, (_, i) => {
          const angle = (Math.PI / 3) * i - Math.PI / 2
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
        }).join(" ")
      }
      case "diamond": {
        const r = 26
        return `${center},${center - r} ${center + r},${center} ${center},${center + r} ${center - r},${center}`
      }
      case "pentagon": {
        const r = 26
        return Array.from({ length: 5 }, (_, i) => {
          const angle = (Math.PI * 2 / 5) * i - Math.PI / 2
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
        }).join(" ")
      }
      case "shield": {
        return `${center},${center - 28} ${center + 24},${center - 14} ${center + 24},${center + 8} ${center},${center + 28} ${center - 24},${center + 8} ${center - 24},${center - 14}`
      }
      case "octagon": {
        const r = 26
        return Array.from({ length: 8 }, (_, i) => {
          const angle = (Math.PI / 4) * i - Math.PI / 8
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
        }).join(" ")
      }
      default:
        return ""
    }
  }

  const gradientId = `grad-${shape}`

  if (shape === "circle") {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className={`[stop-color:var(--tw-gradient-from)]`} style={{ stopColor: "#3B82F6" }} />
            <stop offset="100%" className={`[stop-color:var(--tw-gradient-to)]`} style={{ stopColor: "#00F0FF" }} />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={26}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={2}
        />
        <circle cx={center} cy={center} r={6} fill={`url(#${gradientId})`} opacity={0.6} />
      </svg>
    )
  }

  const colors: Record<string, [string, string]> = {
    "from-neon to-primary": ["#00F0FF", "#3B82F6"],
    "from-primary to-accent": ["#3B82F6", "#8B5CF6"],
    "from-accent to-purple-400": ["#8B5CF6", "#C084FC"],
    "from-primary to-neon": ["#3B82F6", "#00F0FF"],
    "from-success to-emerald-300": ["#10B981", "#6EE7B7"],
    "from-yellow-400 to-orange-400": ["#FACC15", "#FB923C"],
  }

  const [c1, c2] = colors[gradient] || ["#3B82F6", "#00F0FF"]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <polygon
        points={getPath()}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
      />
      <circle cx={center} cy={center} r={6} fill={`url(#${gradientId})`} opacity={0.6} />
    </svg>
  )
}

export function AgentsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeAgent, setActiveAgent] = useState<string | null>(null)

  return (
    <section id="agents" className="relative py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Your Dedicated{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Specialists
            </span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Six specialized AI agents, each with a distinct role and skill set,
            working in concert to deliver your software.
          </p>
        </motion.div>

        {/* Agent Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              onMouseEnter={() => setActiveAgent(agent.name)}
              onMouseLeave={() => setActiveAgent(null)}
              className={cn(
                "relative group rounded-xl border border-white/[0.06] bg-surface p-6 transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-1 cursor-pointer overflow-hidden"
              )}
            >
              {/* Glow background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(300px circle at 50% 0%, ${agent.bgGlow}, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4">
                  <AgentIcon shape={agent.shape} gradient={agent.color} />
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {agent.name}
                </h3>
                <p className={cn("text-sm font-medium mb-3 bg-gradient-to-r bg-clip-text text-transparent", agent.color)}>
                  {agent.role}
                </p>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {agent.description}
                </p>

                {/* Commands */}
                <div className="flex flex-wrap gap-2">
                  {agent.commands.map((cmd) => (
                    <code
                      key={cmd}
                      className={cn(
                        "text-xs font-mono px-2 py-1 rounded-md border border-white/[0.08] bg-white/[0.03] transition-colors",
                        activeAgent === agent.name
                          ? "text-foreground border-white/[0.15]"
                          : "text-muted"
                      )}
                    >
                      {cmd}
                    </code>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const treeData = [
  { name: ".ai-agents/", indent: 0, type: "folder" as const, highlight: false },
  { name: "├── agents/", indent: 1, type: "folder" as const, highlight: true, annotation: "Agent prompt definitions" },
  { name: "│   ├── conductor.md", indent: 2, type: "file" as const, highlight: false },
  { name: "│   ├── analyst.md", indent: 2, type: "file" as const, highlight: false },
  { name: "│   ├── architect.md", indent: 2, type: "file" as const, highlight: false },
  { name: "│   ├── developer.md", indent: 2, type: "file" as const, highlight: false },
  { name: "│   ├── reviewer.md", indent: 2, type: "file" as const, highlight: false },
  { name: "│   └── tester.md", indent: 2, type: "file" as const, highlight: false },
  { name: "├── skills/", indent: 1, type: "folder" as const, highlight: true, annotation: "Modular skill plugins" },
  { name: "│   ├── analyze.md", indent: 2, type: "file" as const, highlight: false },
  { name: "│   ├── design.md", indent: 2, type: "file" as const, highlight: false },
  { name: "│   ├── implement.md", indent: 2, type: "file" as const, highlight: false },
  { name: "│   ├── review.md", indent: 2, type: "file" as const, highlight: false },
  { name: "│   └── test.md", indent: 2, type: "file" as const, highlight: false },
  { name: "├── workspace/", indent: 1, type: "folder" as const, highlight: true, annotation: "Active project data" },
  { name: "│   ├── requirements/", indent: 2, type: "folder" as const, highlight: false },
  { name: "│   ├── architecture/", indent: 2, type: "folder" as const, highlight: false },
  { name: "│   └── implementation/", indent: 2, type: "folder" as const, highlight: false },
  { name: "└── registry.yaml", indent: 1, type: "file" as const, highlight: true, annotation: "Central configuration" },
]

export function ArchitectureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="architecture" className="relative py-24 sm:py-32" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
              Clean, Modular{" "}
              <span className="bg-gradient-to-r from-accent to-neon bg-clip-text text-transparent">
                Under the Hood
              </span>
            </h2>

            <div className="space-y-6 text-muted leading-relaxed">
              <p>
                At the heart of My-Virtual-TechTeam is the{" "}
                <code className="text-neon font-mono text-sm bg-neon/10 px-1.5 py-0.5 rounded">
                  .ai-agents
                </code>{" "}
                directory — a platform-agnostic configuration layer that lives
                alongside your source code.
              </p>
              <p>
                Every agent, skill, and workflow is defined in plain Markdown and
                YAML. No vendor lock-in, no proprietary formats. Just drop the
                folder into any project to activate your virtual team.
              </p>
              <p>
                The{" "}
                <code className="text-neon font-mono text-sm bg-neon/10 px-1.5 py-0.5 rounded">
                  registry.yaml
                </code>{" "}
                acts as a single source of truth — mapping agents to their skills,
                defining workspace paths, and governing the entire lifecycle.
              </p>
            </div>
          </motion.div>

          {/* Right: Directory Tree */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-xl border border-white/[0.08] bg-[#0d0d12] overflow-hidden shadow-2xl shadow-accent/5">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-muted font-mono ml-2">
                  project structure
                </span>
              </div>

              {/* Tree */}
              <div className="p-4 font-mono text-sm leading-loose">
                {treeData.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : undefined}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className={
                        item.highlight
                          ? "text-foreground"
                          : item.type === "folder"
                            ? "text-primary/70"
                            : "text-muted/60"
                      }
                    >
                      {item.name}
                    </span>
                    {item.annotation && (
                      <span className="text-xs text-accent/60 hidden sm:inline">
                        ← {item.annotation}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

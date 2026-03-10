import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

const steps = [
  {
    command: "#analyze",
    agent: "Analyst",
    title: "Analyze Requirements",
    description: "Parse user stories and generate structured requirement documents.",
    snippet: `[Analyst] Parsing requirement...
→ Input:  "User authentication module"
→ Output: workspace/requirements/user-auth.md
✓ Functional requirements extracted
✓ Non-functional constraints identified`,
    color: "text-neon",
    glowColor: "rgba(0,240,255,0.15)",
  },
  {
    command: "#design",
    agent: "Architect",
    title: "Design Architecture",
    description: "Generate system design, API schemas, and component diagrams.",
    snippet: `[Architect] Designing system...
→ Input:  workspace/requirements/user-auth.md
→ Output: workspace/architecture/auth-design.md
✓ Component diagram generated
✓ API contract defined`,
    color: "text-accent",
    glowColor: "rgba(139,92,246,0.15)",
  },
  {
    command: "#implement",
    agent: "Developer",
    title: "Implement Code",
    description: "Write production-ready code following the architectural blueprint.",
    snippet: `[Developer] Implementing...
→ Input:  workspace/architecture/auth-design.md
→ Output: src/auth/auth.service.ts
✓ JWT token handling
✓ Password hashing with bcrypt`,
    color: "text-primary",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    command: "#review",
    agent: "Reviewer",
    title: "Review Quality",
    description: "Analyze code for bugs, security issues, and best practice adherence.",
    snippet: `[Reviewer] Reviewing code...
→ Input:  src/auth/auth.service.ts
→ Report: workspace/reviews/auth-review.md
✓ No critical vulnerabilities
⚠ Suggest: Add rate limiting`,
    color: "text-success",
    glowColor: "rgba(16,185,129,0.15)",
  },
  {
    command: "#test",
    agent: "Tester",
    title: "Generate Tests",
    description: "Create comprehensive test suites covering edge cases and integration.",
    snippet: `[Tester] Generating tests...
→ Input:  src/auth/auth.service.ts
→ Output: tests/auth.service.spec.ts
✓ 12 unit tests generated
✓ 4 integration tests generated`,
    color: "text-yellow-400",
    glowColor: "rgba(250,204,21,0.15)",
  },
]

export function WorkflowSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="workflow" className="relative py-24 sm:py-32" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, #3B82F6 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Seamless{" "}
            <span className="bg-gradient-to-r from-neon to-primary bg-clip-text text-transparent">
              Development Lifecycle
            </span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Five specialized agents, one fluid pipeline. Watch your ideas
            transform from requirements to tested, production-ready code.
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="relative space-y-8">
          {/* Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon/40 via-primary/40 via-accent/40 via-success/40 to-yellow-400/40 hidden lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.command}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="relative"
            >
              {/* Node dot */}
              <div className="absolute left-8 top-8 w-3 h-3 -translate-x-1.5 rounded-full bg-current hidden lg:block"
                style={{ color: step.glowColor.replace("0.15", "1") }}
              >
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{
                    backgroundColor: step.glowColor.replace("0.15", "0.6"),
                  }}
                />
              </div>

              <div className="lg:ml-16 grid lg:grid-cols-2 gap-6 items-start">
                {/* Left: Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <code
                      className={cn(
                        "font-mono text-sm font-semibold px-3 py-1.5 rounded-lg border border-white/[0.08] bg-surface",
                        step.color
                      )}
                    >
                      {step.command}
                    </code>
                    <span className="text-xs text-muted font-mono">
                      → {step.agent}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Right: Code Snippet */}
                <div
                  className="rounded-xl border border-white/[0.06] bg-[#0d0d12] p-4 font-mono text-xs leading-relaxed overflow-x-auto"
                  style={{
                    boxShadow: `0 0 40px ${step.glowColor}`,
                  }}
                >
                  {step.snippet.split("\n").map((line, j) => (
                    <div
                      key={j}
                      className={cn(
                        line.startsWith("✓")
                          ? "text-success"
                          : line.startsWith("⚠")
                            ? "text-yellow-400"
                            : line.startsWith("→")
                              ? "text-muted"
                              : line.startsWith("[")
                                ? step.color
                                : "text-muted/70"
                      )}
                    >
                      {line || "\u00A0"}
                    </div>
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

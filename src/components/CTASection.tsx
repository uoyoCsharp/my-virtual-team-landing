import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const cloneCommand = "git clone https://github.com/uoyoCsharp/My-Virtual-TechTeam.git"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cloneCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement("textarea")
      textarea.value = cloneCommand
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section className="relative py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-white/[0.08] overflow-hidden"
        >
          {/* Gradient background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at top, #3B82F6 0%, transparent 50%), radial-gradient(ellipse at bottom right, #8B5CF6 0%, transparent 50%)",
              }}
            />
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Ready to scale your{" "}
              <span className="bg-gradient-to-r from-primary via-neon to-accent bg-clip-text text-transparent">
                productivity
              </span>
              ?
            </h2>
            <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
              Start building with your AI Tech Team today. Clone the repo, drop
              the configuration into your project, and let your virtual team
              handle the rest.
            </p>

            {/* Clone Command Box */}
            <div className="flex items-center gap-2 max-w-2xl mx-auto bg-[#0d0d12] border border-white/[0.08] rounded-xl px-4 py-3 mb-8">
              <code className="flex-1 text-left font-mono text-sm text-foreground/90 truncate">
                <span className="text-success">$</span> {cloneCommand}
              </code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 p-2 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* CTA Button */}
            <a
              href="https://github.com/uoyoCsharp/My-Virtual-TechTeam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="text-base px-10">
                <ExternalLink className="w-4 h-4" />
                Get Started
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

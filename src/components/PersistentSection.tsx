import { Icon } from "@iconify/react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { useTranslation } from "react-i18next"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface Feature {
  icon: string
  title: string
  desc: string
}

interface FileLine {
  indent: number
  text: string
  color: "muted" | "zinc" | "amber"
  comment?: string
  highlight?: boolean
}

const COLOR_MAP: Record<FileLine["color"], string> = {
  muted: "text-zinc-500",
  zinc: "text-zinc-400",
  amber: "text-amber-400",
}

export function PersistentSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const features = t("persistent.features", { returnObjects: true }) as Feature[]
  const fileTree = t("persistent.fileTree", { returnObjects: true }) as { root: string; lines: FileLine[] }

  const highlighted = fileTree.lines.find((l) => l.highlight)
  const highlightIndex = highlighted ? fileTree.lines.indexOf(highlighted) : -1

  return (
    <section ref={ref} className="py-32 bg-[#FAFAFA] border-t border-zinc-100 relative overflow-hidden">
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <SectionLabel>{t("persistent.label")}</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-5 leading-tight"
            >
              <span dangerouslySetInnerHTML={{ __html: t("persistent.title") }} />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg text-zinc-500 leading-relaxed mb-8"
            >
              {t("persistent.desc")}
            </motion.p>

            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                    <Icon icon={f.icon} width="18" height="18" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-zinc-900">{f.title}</p>
                    <p className="text-sm text-zinc-500">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative group">
              <div
                className="absolute -inset-6 bg-amber-500/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                aria-hidden="true"
              />

              <div className="relative bg-zinc-900 rounded-2xl border border-zinc-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-zinc-800 bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                  </div>
                  <span className="text-xs text-zinc-400 ml-3 font-mono">
                    {fileTree.root}
                  </span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[10px] text-amber-500 font-mono uppercase tracking-wider">
                      live
                    </span>
                  </div>
                </div>

                <div className="p-7 font-mono text-[15px] leading-[1.9]">
                  {fileTree.lines.map((line, i) => (
                    <div
                      key={i}
                      className={`relative flex items-baseline rounded-md transition-colors duration-300 ${
                        i === highlightIndex
                          ? "bg-amber-500/10 -mx-3 px-3"
                          : ""
                      }`}
                    >
                      {i === highlightIndex && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-1 h-5 bg-amber-500 rounded-full"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`shrink-0 select-none ${COLOR_MAP[line.color]} ${
                          i === highlightIndex ? "text-amber-300" : ""
                        }`}
                        style={{ width: `${line.indent * 20 + 20}px` }}
                      >
                        {line.indent === 0 ? "" : "│"}
                      </span>
                      <span
                        className={`${COLOR_MAP[line.color]} ${
                          i === highlightIndex ? "text-amber-300 font-medium" : ""
                        }`}
                      >
                        {line.text}
                        {line.comment && (
                          <span
                            className={`ml-2 ${
                              i === highlightIndex
                                ? "text-amber-500/60"
                                : "text-zinc-600"
                            }`}
                          >
                            {line.comment}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-zinc-500 mt-5 font-medium">
              {t("persistent.caption")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { useState, type ReactNode } from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  text: string
  className?: string
  children?: ReactNode
}

export function CopyButton({ text, className, children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "text-zinc-500 hover:text-amber-500 transition-colors p-1 rounded-md hover:bg-zinc-800/50",
        className
      )}
      title="Copy to clipboard"
    >
      {copied ? (
        <Icon icon="solar:check-circle-bold" width="16" height="16" className="text-emerald-400" />
      ) : children ? (
        children
      ) : (
        <Icon icon="solar:copy-linear" width="16" height="16" />
      )}
    </button>
  )
}

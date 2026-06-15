import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <a
      href="#"
      aria-label="MVTT — My Virtual Tech Team"
      className={cn("flex items-center gap-2.5 group", className)}
    >
      <img
        src="/logo.svg"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 transition-transform duration-300 group-hover:rotate-[-6deg]"
      />
      <span
        className="font-display text-[1.65rem] leading-none font-extrabold tracking-[-0.04em] text-zinc-900"
        style={{ fontVariationSettings: "'opsz' 96" }}
      >
        <span className="uppercase">mv</span>
        <span className="uppercase italic font-medium text-amber-600">tt</span>
        <span className="text-amber-500">.</span>
      </span>
    </a>
  )
}

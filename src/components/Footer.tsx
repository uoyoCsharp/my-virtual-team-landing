import { Logo } from "@/components/ui/Logo"
import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-zinc-950 text-zinc-600 py-8 border-t border-zinc-900 text-center">
      <div className="flex items-center justify-center mb-3 [&_*]:!text-zinc-400">
        <Logo />
      </div>
      <p className="text-xs">{t("footer.license", "Open source under MIT License.")}</p>
    </footer>
  )
}

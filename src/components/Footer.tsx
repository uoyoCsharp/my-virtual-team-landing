import { useTranslation } from "react-i18next"
import { Logo } from "@/components/ui/Logo"

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <Logo className="scale-90 sm:scale-100" />
        <p className="text-xs sm:text-sm text-muted text-center">{t("footer.copyright")}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a href="https://github.com/uoyoCsharp/My-Virtual-TechTeam" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted hover:text-foreground transition-colors">{t("footer.links.rep")}</a>
          <a href="https://github.com/uoyoCsharp/My-Virtual-TechTeam#readme" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted hover:text-foreground transition-colors">{t("footer.links.doc")}</a>
          <a href="https://github.com/uoyoCsharp/My-Virtual-TechTeam/issues" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted hover:text-foreground transition-colors">{t("footer.links.issue")}</a>
        </div>
      </div>
    </footer>
  )
}

import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-primary" />
          </div>
          <span className="font-bold text-foreground tracking-tight">My-Virtual-TechTeam</span>
        </div>
        <p className="text-sm text-muted">{t("footer.copyright")}</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/uoyoCsharp/My-Virtual-TechTeam" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">{t("footer.links.rep")}</a>
          <a href="https://github.com/uoyoCsharp/My-Virtual-TechTeam#readme" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">{t("footer.links.doc")}</a>
          <a href="https://github.com/uoyoCsharp/My-Virtual-TechTeam/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">{t("footer.links.issue")}</a>
        </div>
      </div>
    </footer>
  )
}

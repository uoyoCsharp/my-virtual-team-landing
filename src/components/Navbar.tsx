import { Logo } from "@/components/ui/Logo"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { useTranslation } from "react-i18next"
import { useState } from "react"

export function Navbar() {
  const { t, i18n } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: t("nav.why"), href: "#problem" },
    { label: t("nav.workflow"), href: "#workflow" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.faq"), href: "#faq" },
  ]

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "zh" : "en")
  }

  const isZh = i18n.language === "zh"

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-500">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-zinc-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-1.5 rounded-full border border-zinc-200 hover:border-amber-200"
            title="Change Language"
          >
            {isZh ? "EN" : "中"}
          </button>
          <a href="#install">
            <Button size="sm" className="h-9 px-5 text-sm">
              {t("nav.cta")}
            </Button>
          </a>
        </div>

        <button
          className="md:hidden text-zinc-700 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <Icon
            icon={mobileOpen ? "solar:close-square-linear" : "solar:hamburger-menu-linear"}
            width="24"
            height="24"
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#FAFAFA]/95 backdrop-blur-md border-b border-zinc-200/50">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={toggleLanguage}
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2 rounded-full border border-zinc-200"
              >
                {isZh ? "EN" : "中"}
              </button>
              <a href="#install" onClick={() => setMobileOpen(false)} className="flex-1">
                <Button size="sm" className="w-full h-9 px-5 text-sm">
                  {t("nav.cta")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

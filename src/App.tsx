import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ProblemSection } from "@/components/ProblemSection"
import { PersistentSection } from "@/components/PersistentSection"
import { WorkflowSection } from "@/components/WorkflowSection"
import { SkillsSection } from "@/components/SkillsSection"
import { RecipesSection } from "@/components/RecipesSection"
import { WhoIsForSection } from "@/components/WhoIsForSection"
import { FAQSection } from "@/components/FAQSection"
import { InstallCTASection } from "@/components/InstallCTASection"
import { Footer } from "@/components/Footer"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-amber-200 selection:text-amber-900 overflow-x-clip">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <PersistentSection />
        <WorkflowSection />
        <SkillsSection />
        <RecipesSection />
        <WhoIsForSection />
        <FAQSection />
        <InstallCTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App

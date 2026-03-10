import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { WorkflowSection } from "@/components/WorkflowSection"
import { AgentsSection } from "@/components/AgentsSection"
import { ArchitectureSection } from "@/components/ArchitectureSection"
import { CTASection } from "@/components/CTASection"
import { Footer } from "@/components/Footer"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <AgentsSection />
        <ArchitectureSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App

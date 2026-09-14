import { AosProvider } from "@/components/providers/AosProvider"
import { LandingNav } from "@/components/landing/LandingNav"
import { Hero } from "@/components/landing/Hero"
import { LandingFooter } from "@/components/landing/LandingFooter"

export default function LandingPage() {
  return (
    <AosProvider>
      <div className="flex min-h-screen flex-col bg-bg dark:bg-darkBg">
        <LandingNav />
        <div className="flex-1">
          <Hero />
        </div>
        <LandingFooter />
      </div>
    </AosProvider>
  )
}

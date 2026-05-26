import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { WorkSection } from '@/components/work-section'
import { ExperienceSection } from '@/components/experience-section'
import { StackSection } from '@/components/stack-section'
import { ServicesSection } from '@/components/services-section'
import { CredentialsSection } from '@/components/credentials-section'
import { GitHubSection } from '@/components/github-stats-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <StackSection />
      <ServicesSection />
      <ExperienceSection />
      <CredentialsSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

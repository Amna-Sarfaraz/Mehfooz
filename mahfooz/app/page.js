import { SiteFooter } from "../components/landing/site-footer";
import { HeroSection } from "../components/landing/hero-section";
import { HowItWorksSection } from "../components/landing/how-it-works-section";
import { ModulesPreviewSection } from "../components/landing/modules-preview-section";
import { SiteHeader } from "../components/landing/site-header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ModulesPreviewSection />
      </main>
      <SiteFooter />
    </div>
  );
}

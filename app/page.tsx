import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { HeroSection } from "@/components/homepage/hero-section";
import { PainProofSection } from "@/components/homepage/pain-proof-section";
import { PillarsSection } from "@/components/homepage/pillars-section";
import { DemoFlowSection } from "@/components/homepage/demo-flow-section";
import { DeveloperSection } from "@/components/homepage/developer-section";
import { SecuritySection } from "@/components/homepage/security-section";
import { TemplatesSection } from "@/components/homepage/templates-section";
import { CTASection } from "@/components/homepage/cta-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <PainProofSection />
        <PillarsSection />
        <DemoFlowSection />
        <DeveloperSection />
        <SecuritySection />
        <TemplatesSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}

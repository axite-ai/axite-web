import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import IntegrationsSection from "@/components/integrations-1";
import ContactSection from "@/components/contact";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <IntegrationsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

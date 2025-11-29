import HeroSection from "@/components/hero-section";
import ProblemSection from "@/components/problem-section";
import FeaturesSection from "@/components/features-section";
import WhoSection from "@/components/who-section";
import ContactSection from "@/components/contact";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <WhoSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

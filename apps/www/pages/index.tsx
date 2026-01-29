import dynamic from 'next/dynamic'
import Layout from '~/components/Layouts/Default'
import Hero from '~/components/Hero/Hero'

// Lazy load sections below the fold
const HowItWorksSection = dynamic(() => import('~/components/HowItWorksSection'))
const GetStartedSection = dynamic(() => import('~/components/GetStartedSection'))
const TransformationSection = dynamic(() => import('~/components/TransformationSection'))
const SecuritySection = dynamic(() => import('~/components/SecuritySection'))
const FinalCTASection = dynamic(() => import('~/components/FinalCTASection'))

const Index = () => {
  return (
    <Layout>
      {/* 1. Hero - Clear value proposition */}
      <Hero />

      {/* 2. How it works - Axite observability style */}
      <HowItWorksSection />

      {/* 3. Getting Started - Three steps */}
      <GetStartedSection />

      {/* 5. Transformation - Before/After stories */}
      <TransformationSection />

      {/* 6. Trust - Security & Compliance */}
      <SecuritySection />

      {/* 7. Final CTA */}
      <FinalCTASection />
    </Layout>
  )
}

export default Index

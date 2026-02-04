import dynamic from 'next/dynamic'
import Layout from '~/components/Layouts/Default'
import Hero from '~/components/Hero/Hero'

// Lazy load sections below the fold
const ProductProofSection = dynamic(() => import('~/components/ProductProofSection'))
const IntegrationsSection = dynamic(() => import('~/components/IntegrationsSection'))
const HowItWorksSection = dynamic(() => import('~/components/HowItWorksSection'))
const SecuritySection = dynamic(() => import('~/components/SecuritySection'))
const FinalCTASection = dynamic(() => import('~/components/FinalCTASection'))

const Index = () => {
  return (
    <Layout>
      {/* 1. Hero - Core value proposition */}
      <Hero />

      {/* 2. Product proof - Animated pipeline visualization */}
      <ProductProofSection />

      {/* 3. Integrations - Works with your stack */}
      <IntegrationsSection />

      {/* 4. How it works - 4-stage flow */}
      <HowItWorksSection />

      {/* 5. Security - Trust signals */}
      <SecuritySection />

      {/* 6. Final CTA */}
      <FinalCTASection />
    </Layout>
  )
}

export default Index

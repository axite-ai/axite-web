import dynamic from 'next/dynamic'
import Layout from '~/components/Layouts/Default'
import Hero from '~/components/Hero/Hero'
import Logos from '~/components/logos'

const ProofSection = dynamic(() => import('~/components/ProofSection'))
const TransformationSection = dynamic(() => import('~/components/TransformationSection'))
const PillarsSection = dynamic(() => import('~/components/PillarsSection'))
const HowItWorksSection = dynamic(() => import('~/components/HowItWorksSection'))
const SecuritySection = dynamic(() => import('~/components/SecuritySection'))
const FinalCTASection = dynamic(() => import('~/components/FinalCTASection'))

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ProofSection />
      <Logos />
      <TransformationSection />
      <PillarsSection />
      <HowItWorksSection />
      <SecuritySection />
      <FinalCTASection />
    </Layout>
  )
}

export default Index

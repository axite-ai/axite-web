import SectionContainer from '~/components/Layouts/SectionContainer'
import SectionHeader from '~/components/UI/SectionHeader'
import PolicyDemo from './PolicyDemo'
import TrustStrip from './TrustStrip'

const ProofSection = () => {
  return (
    <SectionContainer>
      <SectionHeader
        subtitle="See it in action"
        title="Policy enforcement that explains itself"
      />
      <div className="mt-12">
        <PolicyDemo />
        <TrustStrip />
      </div>
    </SectionContainer>
  )
}

export default ProofSection

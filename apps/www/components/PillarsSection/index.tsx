import SectionContainer from '~/components/Layouts/SectionContainer'
import SectionHeader from '~/components/UI/SectionHeader'
import PolicyPillar from './PolicyPillar'
import IdentityPillar from './IdentityPillar'
import AuditPillar from './AuditPillar'

const PillarsSection = () => {
  return (
    <SectionContainer>
      <SectionHeader
        title="How it works"
        subtitle="Three Pillars"
        paragraph="Axite delivers agent governance through three interconnected mechanisms."
        className="mb-12 lg:mb-16"
      />

      {/* Grid layout: Policy featured (full width), Identity + Audit side by side below */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Policy Pillar - Featured, spans full width on desktop */}
        <div className="lg:col-span-2">
          <PolicyPillar />
        </div>

        {/* Identity Pillar - Half width on desktop */}
        <div>
          <IdentityPillar />
        </div>

        {/* Audit Pillar - Half width on desktop */}
        <div>
          <AuditPillar />
        </div>
      </div>
    </SectionContainer>
  )
}

export default PillarsSection

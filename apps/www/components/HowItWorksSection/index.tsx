import SectionContainer from '~/components/Layouts/SectionContainer'
import SectionHeader from '~/components/UI/SectionHeader'
import Panel from '~/components/Panel/Panel'

interface Step {
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Connect',
    description:
      'Connect your tools and MCP servers to Axite\'s gateway. Your existing infrastructure stays in place.',
  },
  {
    number: '02',
    title: 'Define',
    description:
      'Set policies for what agents can do and who can do it. Allow, deny, or require approval for any action.',
  },
  {
    number: '03',
    title: 'Monitor',
    description:
      'Track every action with audit-grade logging. Full decision traces for compliance and debugging.',
  },
]

const StepCard = ({ step }: { step: Step }) => {
  return (
    <Panel innerClassName="p-6 md:p-8">
      <div className="flex flex-col gap-4">
        <span className="text-xs font-mono uppercase tracking-widest text-foreground-lighter">
          {step.number}
        </span>
        <h3 className="text-lg text-foreground font-semibold">{step.title}</h3>
        <p className="text-foreground-lighter">{step.description}</p>
      </div>
    </Panel>
  )
}

const HowItWorksSection = () => {
  return (
    <SectionContainer>
      <SectionHeader
        subtitle="Getting started"
        title="Three steps to governance"
        paragraph="From zero visibility to complete control in hours, not months."
      />
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {steps.map((step) => (
          <StepCard key={step.number} step={step} />
        ))}
      </div>
    </SectionContainer>
  )
}

export default HowItWorksSection

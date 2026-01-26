import { AlertTriangle, CheckCircle, HelpCircle, Shield } from 'lucide-react'
import SectionContainer from '~/components/Layouts/SectionContainer'
import SectionHeader from '~/components/UI/SectionHeader'
import Panel from '~/components/Panel/Panel'

interface TransformationBlock {
  pain: {
    icon: React.ReactNode
    statement: string
  }
  outcome: {
    icon: React.ReactNode
    statement: string
  }
}

const transformations: TransformationBlock[] = [
  {
    pain: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      statement: 'Agent tried to delete production database during routine cleanup',
    },
    outcome: {
      icon: <CheckCircle className="w-5 h-5 text-brand-500" />,
      statement: 'Every destructive action requires explicit policy approval with full audit trail',
    },
  },
  {
    pain: {
      icon: <HelpCircle className="w-5 h-5 text-amber-500" />,
      statement: "SOC2 auditor asks 'What can this agent access?' — no one knows",
    },
    outcome: {
      icon: <Shield className="w-5 h-5 text-brand-500" />,
      statement: 'Complete inventory of every agent, tool, and permission — audit-ready',
    },
  },
]

const TransformationCard = ({ block }: { block: TransformationBlock }) => {
  return (
    <Panel innerClassName="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        {/* Pain state */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-0.5">{block.pain.icon}</div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-foreground-lighter mb-2 block">
              Before
            </span>
            <p className="text-foreground-light">{block.pain.statement}</p>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-default" />

        {/* Outcome state */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-0.5">{block.outcome.icon}</div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-foreground-lighter mb-2 block">
              After
            </span>
            <p className="text-foreground">{block.outcome.statement}</p>
          </div>
        </div>
      </div>
    </Panel>
  )
}

const TransformationSection = () => {
  return (
    <SectionContainer>
      <SectionHeader
        subtitle="The transformation"
        title="From chaos to control"
        paragraph="Without governance, agents become liability. With Axite, they become audit-ready."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {transformations.map((block, index) => (
          <TransformationCard key={index} block={block} />
        ))}
      </div>
    </SectionContainer>
  )
}

export default TransformationSection

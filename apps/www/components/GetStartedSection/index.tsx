'use client'

import { Link2, Shield, FileSearch } from 'lucide-react'
import SectionContainer from '~/components/Layouts/SectionContainer'

const steps = [
  {
    icon: Link2,
    title: 'Connect your tools',
    description:
      'Point Axite at your MCP servers and agent tools. No code changes required.',
  },
  {
    icon: Shield,
    title: 'Define your policies',
    description:
      'Write policies that match your security requirements. Allow, deny, or require human approval.',
  },
  {
    icon: FileSearch,
    title: 'Monitor everything',
    description:
      'Every action logged with full decision traces. Export to your existing security tooling.',
  },
]

const GetStartedSection = () => {
  return (
    <SectionContainer>
      {/* Section header */}
      <div className="max-w-xl mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-4">
          Deploy in three steps
        </h2>
        <p className="text-foreground-lighter text-lg">
          From zero visibility to complete audit trails in hours, not months.
        </p>
      </div>

      {/* Feature grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div key={step.title} className="flex flex-col gap-4">
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-surface-100 border border-muted flex items-center justify-center">
                <Icon className="w-5 h-5 text-foreground-light" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-normal text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground-lighter leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </SectionContainer>
  )
}

export default GetStartedSection

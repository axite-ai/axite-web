'use client'

import SectionContainer from '~/components/Layouts/SectionContainer'

const TransformationSection = () => {
  return (
    <SectionContainer className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        {/* Quote */}
        <blockquote className="text-xl sm:text-2xl lg:text-3xl text-foreground font-normal leading-relaxed mb-8">
          "Without governance, agents become liability. With Axite, they become
          audit-ready. We went from 'we can't approve this' to 'ship it' in a week."
        </blockquote>

        {/* Attribution */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-foreground font-medium">Security Lead</span>
          <span className="text-foreground-muted font-mono text-sm">
            Enterprise SaaS Company
          </span>
        </div>
      </div>
    </SectionContainer>
  )
}

export default TransformationSection

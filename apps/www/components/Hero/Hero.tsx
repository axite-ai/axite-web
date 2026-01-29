import Link from 'next/link'
import { Button } from 'ui'
import SectionContainer from '~/components/Layouts/SectionContainer'

const Hero = () => {
  return (
    <div className="relative -mt-[65px]">
      <SectionContainer className="pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="relative">
          <div className="mx-auto max-w-4xl lg:flex lg:items-center justify-center text-center">
            <div className="relative z-10 pt-[90px] lg:pt-[90px] flex flex-col items-center justify-center gap-6">
              {/* Small label */}
              <span className="font-mono text-xs text-brand uppercase tracking-widest">
                Agent Governance Platform
              </span>

              {/* Main title */}
              <h1 className="text-foreground text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
                Complete visibility and control
                <br />
                <span className="text-foreground-light">over every agent action</span>
              </h1>

              {/* Description */}
              <p className="text-foreground-lighter text-lg max-w-2xl">
                Policy enforcement, identity management, and audit-grade logging
                for every MCP tool call. Ship agents your security team can approve.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <Button asChild size="medium" type="primary">
                  <Link href="/demo">
                    Try the Demo
                  </Link>
                </Button>
                <Button asChild size="medium" type="default">
                  <Link href="/contact/sales">
                    Book a call
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}

export default Hero

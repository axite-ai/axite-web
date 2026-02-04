import Link from 'next/link'
import { Button } from 'ui'
import SectionContainer from '~/components/Layouts/SectionContainer'
import BookACallButton from '~/components/BookACallButton'

const Hero = () => {
  return (
    <div className="relative -mt-[65px]">
      <SectionContainer className="pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="relative">
          <div className="mx-auto max-w-4xl lg:flex lg:items-center justify-center text-center">
            <div className="relative z-10 pt-[90px] lg:pt-[90px] flex flex-col items-center justify-center gap-6">
              {/* Small label */}
              <span className="font-mono text-xs text-brand uppercase tracking-widest">
                Change Control for AI Agents
              </span>

              {/* Main title */}
              <h1 className="text-foreground text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
                Change control for
                <br />
                <span className="text-foreground-light">agent actions in prod</span>
              </h1>

              {/* Description */}
              <p className="text-foreground-lighter text-lg max-w-2xl">
                Every tool call hits a policy gate before execution. Approvals are
                HMAC-signed and bound to the exact action. Every decision produces a
                tamper-evident audit receipt.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <BookACallButton label="Request a 30-day pilot" type="primary" size="medium" />
                <Button asChild size="medium" type="default">
                  <Link href="/demo">Watch 90-sec demo</Link>
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

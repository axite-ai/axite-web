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
            <div className="relative z-10 pt-[90px] lg:pt-[90px] flex flex-col items-center justify-center gap-4 lg:gap-8">
              <div className="flex flex-col items-center">
                {/* Main title */}
                <h1 className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl">
                  <span className="block text-foreground">Change control for</span>
                  <span className="text-brand block md:ml-0">agent actions</span>
                </h1>

                <p className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
                  Built for Platform/SRE teams deploying agents into production.
                </p>
                <p className="pt-2 text-foreground-lighter text-sm sm:text-base lg:text-lg">
                  Every tool call is <strong className="text-foreground-light font-medium">allow</strong> / <strong className="text-foreground-light font-medium">block</strong> / <strong className="text-foreground-light font-medium">require approval</strong> before it can touch prod.{' '}
                  <br className="hidden md:block" />
                  Approve in Slack. Export an audit trail.
                </p>
              </div>

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

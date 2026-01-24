import Link from 'next/link'

import { Button } from 'ui'
import SectionContainer from '~/components/Layouts/SectionContainer'
import { useSendTelemetryEvent } from '~/lib/telemetry'

const Hero = () => {
  const sendTelemetryEvent = useSendTelemetryEvent()

  return (
    <div className="relative -mt-[65px]">
      <SectionContainer className="pt-8 pb-10 md:pt-16 overflow-hidden">
        <div className="relative">
          <div className="mx-auto">
            <div className="mx-auto max-w-2xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
              <div className="relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
                <div className="flex flex-col items-center">
                  <h1 className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl">
                    <span className="block text-foreground">Complete visibility and control</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#3B63F3] via-[#3B63F3] to-[#00B3A4] block md:ml-0">over every agent action</span>
                  </h1>
                  <p className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
                    The agent governance platform for enterprises.{' '}
                    <br className="hidden md:block" />
                    Policy enforcement, identity management, and audit-grade logging for every MCP action.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild size="medium">
                    <Link
                      href="/contact/sales"
                      onClick={() =>
                        sendTelemetryEvent({
                          action: 'book_security_review_clicked',
                          properties: { buttonLocation: 'Homepage Hero' },
                        })
                      }
                    >
                      Book Security Review
                    </Link>
                  </Button>
                  <Button asChild size="medium" type="default">
                    <Link
                      href="/docs"
                      onClick={() =>
                        sendTelemetryEvent({
                          action: 'view_docs_clicked',
                          properties: { buttonLocation: 'Homepage Hero' },
                        })
                      }
                    >
                      View Docs
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}

export default Hero

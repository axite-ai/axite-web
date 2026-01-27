import Link from 'next/link'
import { Button, cn } from 'ui'
import { useSendTelemetryEvent } from '~/lib/telemetry'

interface Props {
  className?: string
}

const FinalCTASection = ({ className }: Props) => {
  const sendTelemetryEvent = useSendTelemetryEvent()

  return (
    <div
      className={cn(
        'bg-alternative grid grid-cols-12 items-center gap-4 border-t py-32 text-center px-16',
        className
      )}
    >
      <div className="col-span-12">
        <h2 className="heading-gradient text-2xl sm:text-3xl xl:text-4xl">
          Ship agents to production with confidence
        </h2>
      </div>
      <div className="flex items-center justify-center col-span-12 mt-4">
        <Button asChild size="medium">
          <Link
            href="/contact/sales"
            onClick={() =>
              sendTelemetryEvent({
                action: 'book_security_review_clicked',
                properties: { buttonLocation: 'Final CTA Section' },
              })
            }
          >
            Book Security Review
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default FinalCTASection

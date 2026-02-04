import Link from 'next/link'
import { Button } from 'ui'
import BookACallButton from '~/components/BookACallButton'

const FinalCTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-8">
          Ready to govern agent actions in prod?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <BookACallButton label="Request a 30-day pilot" type="primary" size="medium" />
          <Button asChild type="default" size="medium">
            <Link href="/demo">Watch 90-sec demo</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection

import Link from 'next/link'
import { Button } from 'ui'

const FinalCTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-8">
          Ready to ship secure agents?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild type="primary" size="medium">
            <Link href="/docs/quickstart">Start for free</Link>
          </Button>
          <Button asChild type="default" size="medium">
            <Link href="/contact/sales">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection

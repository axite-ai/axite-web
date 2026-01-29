import Link from 'next/link'
import { Check } from 'lucide-react'

const SecuritySection = () => {
  return (
    <section className="border-t border-b border-muted bg-surface-75">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: Security message */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-foreground-light">We protect your data.</span>
            <Link
              href="/security"
              className="text-brand hover:text-brand-400 transition-colors"
            >
              More on Security
            </Link>
          </div>

          {/* Right: Compliance badges */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-brand" />
              <span className="text-foreground-light">SOC2 Type 2</span>
              <span className="text-foreground-muted">In Progress</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-brand" />
              <span className="text-foreground-light">HIPAA</span>
              <span className="text-foreground-muted">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecuritySection

import Link from 'next/link'

const TrustStrip = () => {
  return (
    <div className="py-8 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
        {/* SOC2 Badge */}
        <div className="flex items-center gap-3">
          <img
            src="/images/security/soc2-type2.svg"
            alt="SOC2 Type II"
            className="h-12 w-auto"
          />
          <span className="text-sm text-foreground-light">SOC2 Type II In Progress</span>
        </div>

        {/* Trust Center Link */}
        <Link
          href="/trust"
          className="text-sm text-brand hover:text-brand-600 transition-colors underline-offset-4 hover:underline"
        >
          View Trust Center
        </Link>
      </div>
    </div>
  )
}

export default TrustStrip

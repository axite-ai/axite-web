import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import Layout from '~/components/Layouts/Default'
import SectionContainer from '~/components/Layouts/SectionContainer'

// Lazy load the demo component to avoid SSR issues with framer-motion
const InteractiveDemo = dynamic(
  () => import('~/components/InteractiveDemo').then(mod => ({ default: mod.InteractiveDemo })),
  { ssr: false }
)

export default function DemoPage() {
  return (
    <>
      <NextSeo
        title="Interactive Demo | Axite"
        description="Try Axite's agent governance platform. See policy enforcement, identity-aware access control, and audit-grade logging in action."
        openGraph={{
          title: 'Interactive Demo | Axite',
          description:
            'Try Axite\'s agent governance platform. See policy enforcement, identity-aware access control, and audit-grade logging in action.',
          url: 'https://axite.dev/demo',
          type: 'website',
        }}
      />
      <Layout>
        <SectionContainer className="pt-8 pb-16 md:pt-16 md:pb-24">
          {/* Page header */}
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs text-brand uppercase tracking-widest">
              Interactive Demo
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-foreground mt-4 mb-4">
              See Axite in action
            </h1>
            <p className="text-foreground-lighter text-lg">
              Watch how Axite enforces identity-aware policy at the point of action
              and produces audit-grade evidence. Select a bundle, configure policies,
              and run the scenario.
            </p>
          </div>

          {/* Demo component */}
          <InteractiveDemo />

          {/* Help text */}
          <div className="mt-8 p-4 bg-surface-200 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-foreground mb-2">How to use</h3>
            <ol className="text-sm text-foreground-lighter space-y-1 list-decimal list-inside">
              <li>Select a bundle (defaults to Payment Agent)</li>
              <li>Optionally adjust the role and policy toggles</li>
              <li>Click <strong>Run</strong> to watch the scenario play out</li>
              <li>When an action requires <strong>REVIEW</strong>, approve or deny it with a justification</li>
              <li>Click any event in the stream to see the full decision trace</li>
              <li>Export the audit bundle as JSON when done</li>
            </ol>
          </div>
        </SectionContainer>
      </Layout>
    </>
  )
}

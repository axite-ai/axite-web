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
        title="Demo | Axite"
        description="Watch how Axite ensures secure infrastructure changes with AI agents - enforcing approvals and providing a clear evidence chain."
        openGraph={{
          title: 'Demo | Axite',
          description:
            'Watch how Axite ensures secure infrastructure changes with AI agents - enforcing approvals and providing a clear evidence chain.',
          url: 'https://axite.ai/demo',
          type: 'website',
        }}
      />
      <Layout>
        {/* Video Demo Section */}
        <SectionContainer className="pt-8 pb-8 md:pt-16 md:pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="font-mono text-xs text-brand uppercase tracking-widest">
                Demo
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mt-4 mb-4">
                Secure Infrastructure Changes with AI Agents
              </h1>
              <p className="text-foreground-lighter text-lg max-w-2xl mx-auto">
                See how Axite enforces approvals and provides a clear evidence chain of what was
                executed.
              </p>
            </div>

            {/* Loom video embed */}
            <div className="relative w-full rounded-lg overflow-hidden border border-muted bg-surface-100">
              <div style={{ position: 'relative', paddingBottom: '64.86%', height: 0 }}>
                <iframe
                  src="https://www.loom.com/embed/b790d4f7728b43afa7ae342a6c596176?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
                  frameBorder={0}
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Interactive Demo Section */}
        <SectionContainer className="pt-8 pb-16 md:pt-12 md:pb-24 border-t border-muted">
          {/* Section header */}
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs text-brand uppercase tracking-widest">
              Interactive Demo
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-foreground mt-4 mb-4">
              Try it yourself
            </h2>
            <p className="text-foreground-lighter text-lg">
              Explore how Axite enforces identity-aware policy at the point of action
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

import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { ExternalLink } from 'lucide-react'
import Layout from '~/components/Layouts/Default'
import SectionContainer from '~/components/Layouts/SectionContainer'

const DemoAnimation = dynamic(
  () => import('~/components/DemoAnimation').then(mod => ({ default: mod.DemoAnimation })),
  { ssr: false }
)

export default function DemoPage() {
  return (
    <>
      <NextSeo
        title="Demo | Axite"
        description="See how Axite intercepts every AI agent action before execution — approve via Slack, block destructive operations, and get tamper-evident receipts."
        openGraph={{
          title: 'Demo | Axite',
          description:
            'See how Axite intercepts every AI agent action before execution — approve via Slack, block destructive operations, and get tamper-evident receipts.',
          url: 'https://axite.ai/demo',
          type: 'website',
        }}
      />
      <Layout>
        {/* Hero: Animated Demo */}
        <SectionContainer className="pt-8 pb-8 md:pt-16 md:pb-12">
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-brand uppercase tracking-widest">
              Demo
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mt-4 mb-4">
              Every agent action. Intercepted.
            </h1>
            <p className="text-foreground-lighter text-lg max-w-xl mx-auto">
              Approve, block, or require sign-off — before execution. With receipts.
            </p>
          </div>

          <DemoAnimation />
        </SectionContainer>

        {/* CTA: Explore full dashboard */}
        <SectionContainer className="pt-0 pb-8 md:pt-0 md:pb-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-foreground-lighter text-sm mb-4">
              See the full product: agents, approval queues, policy editor, and audit timeline.
            </p>
            <a
              href="https://demo.axite.dev/demo/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-white font-medium text-sm hover:bg-brand/90 transition-colors"
            >
              Explore the dashboard
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </SectionContainer>

        {/* Loom Video (supporting content) */}
        <SectionContainer className="pt-8 pb-16 md:pt-12 md:pb-24 border-t border-muted">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-normal text-foreground mb-2">
                Watch the walkthrough
              </h2>
              <p className="text-foreground-lighter text-sm">
                3-minute narrated demo of Axite in action.
              </p>
            </div>
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
      </Layout>
    </>
  )
}

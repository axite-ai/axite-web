import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import DefaultLayout from '~/components/Layouts/Default'
import PricingPlans from '~/components/Pricing/PricingPlans'

const PricingFAQs = dynamic(() => import('~/components/Pricing/PricingFAQs'))
const CTABanner = dynamic(() => import('~/components/CTABanner'))

export default function IndexPage() {
  const router = useRouter()

  const meta_title = 'Pricing | Axite'
  const meta_description =
    'Simple pricing for agent governance. Start with our free Sandbox tier, or contact us for Enterprise deployment options.'

  return (
    <DefaultLayout>
      <NextSeo
        title={meta_title}
        description={meta_description}
        openGraph={{
          title: meta_title,
          description: meta_description,
          url: `https://axite.ai/${router.pathname}`,
          images: [
            {
              url: `https://axite.ai/images/og/axite-og.png`,
            },
          ],
        }}
      />

      <div className="relative z-10 pt-8 pb-4 xl:py-16">
        <div className="mx-auto max-w-7xl px-8 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-2 lg:max-w-none">
            <h1 className="h1">
              Simple pricing for
              <br className="block lg:hidden" /> agent governance
            </h1>
            <p className="p text-lg leading-5">
              Start with our free Sandbox tier. Upgrade to Enterprise when you need production support.
            </p>
          </div>
        </div>
      </div>

      <PricingPlans />

      <div id="faq" className="border-t">
        <PricingFAQs />
      </div>
      <CTABanner />
    </DefaultLayout>
  )
}

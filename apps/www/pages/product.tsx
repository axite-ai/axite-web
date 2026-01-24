import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { Button } from 'ui'

import DefaultLayout from '~/components/Layouts/Default'
import SectionContainer from '~/components/Layouts/SectionContainer'
import content from '~/data/product'

const ProductPage: NextPage = () => (
  <>
    <NextSeo
      title={content.metadata.metaTitle}
      description={content.metadata.metaDescription}
      openGraph={{
        title: content.metadata.metaTitle,
        description: content.metadata.metaDescription,
        url: `https://axite.ai/product`,
        images: [
          {
            url: `/images/og/axite-og.png`,
          },
        ],
      }}
    />
    <DefaultLayout>
      {/* Hero Section */}
      <SectionContainer className="pt-8 pb-10 md:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-foreground text-4xl sm:text-5xl lg:text-6xl font-semibold">
            {content.heroSection.h1}
          </h1>
          <p className="mt-6 text-foreground-light text-lg lg:text-xl">
            {content.heroSection.subheader[0]}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild size="medium">
              <Link href={content.cta.primaryCta.url}>{content.cta.primaryCta.label}</Link>
            </Button>
            <Button asChild size="medium" type="default">
              <Link href={content.cta.secondaryCta.url}>{content.cta.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
      </SectionContainer>

      {/* How It Works Section */}
      <SectionContainer className="border-t py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-brand text-sm font-mono uppercase tracking-wider">
              {content.howItWorks.label}
            </span>
            <h2 className="mt-2 text-foreground text-3xl sm:text-4xl font-semibold">
              {content.howItWorks.heading}
            </h2>
            <p className="mt-4 text-foreground-light max-w-2xl mx-auto">
              {content.howItWorks.subheading}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.howItWorks.steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-surface-100 border flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">{step.title}</h3>
                  <p className="text-foreground-lighter text-sm">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </SectionContainer>

      {/* Features Sections */}
      {content.features.sections.map((section, i) => {
        const Icon = section.icon
        const isEven = i % 2 === 0
        return (
          <SectionContainer key={section.id} className={`py-16 ${isEven ? '' : 'bg-surface-75'}`}>
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={isEven ? '' : 'lg:order-2'}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <span className="text-brand text-sm font-mono uppercase tracking-wider">
                      {section.title}
                    </span>
                  </div>
                  <h2 className="text-foreground text-3xl font-semibold mb-4">{section.heading}</h2>
                  <p className="text-foreground-light mb-6">{section.description}</p>
                  <ul className="space-y-3">
                    {section.highlights.map((highlight, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-brand flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-foreground-light">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button asChild type="default" size="small">
                      <Link href={section.url}>Learn more</Link>
                    </Button>
                  </div>
                </div>
                <div className={`${isEven ? 'lg:order-2' : ''} bg-surface-100 border rounded-xl p-8 min-h-[300px] flex items-center justify-center`}>
                  <Icon className="w-24 h-24 text-foreground-muted" strokeWidth={0.5} />
                </div>
              </div>
            </div>
          </SectionContainer>
        )
      })}

      {/* MCP Gateway Section */}
      <SectionContainer className="py-16 border-t">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                  <content.gateway.icon className="w-5 h-5 text-brand" />
                </div>
                <span className="text-brand text-sm font-mono uppercase tracking-wider">
                  {content.gateway.label}
                </span>
              </div>
              <h2 className="text-foreground text-3xl font-semibold mb-4">{content.gateway.heading}</h2>
              <p className="text-foreground-light mb-6">{content.gateway.description}</p>
              <ul className="space-y-3">
                {content.gateway.highlights.map((highlight, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-brand flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-foreground-light">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-100 border rounded-xl p-8 min-h-[300px] flex items-center justify-center">
              <content.gateway.icon className="w-24 h-24 text-foreground-muted" strokeWidth={0.5} />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer className="py-16 border-t bg-surface-75">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-foreground text-3xl sm:text-4xl font-semibold">{content.cta.heading}</h2>
          <p className="mt-4 text-foreground-light text-lg">{content.cta.subheading}</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild size="medium">
              <Link href={content.cta.primaryCta.url}>{content.cta.primaryCta.label}</Link>
            </Button>
            <Button asChild size="medium" type="default">
              <Link href={content.cta.secondaryCta.url}>{content.cta.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </DefaultLayout>
  </>
)

export default ProductPage

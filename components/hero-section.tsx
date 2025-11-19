import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { HeroHeader } from './header'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

export default function HeroSection() {
    return (
      <>
        <HeroHeader />
        <main className="overflow-x-hidden">
          <section className="bg-background">
            <div className="pb-24 pt-32 md:pb-32 md:pt-40">
              <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                  <h1 className="max-w-2xl text-balance text-5xl font-medium md:text-6xl xl:text-7xl">
                    Launch Your Company's GPT App in Days, Not Months
                  </h1>
                  <p className="mt-6 max-w-2xl text-pretty text-lg">
                    We build ChatGPT, Claude, and Gemini apps that transform your product into an AI-native experience. No engineering required. Be early. Be everywhere.
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                    <Button
                      size="lg"
                      className="px-5 text-base"
                      data-cal-namespace="discovery"
                      data-cal-link="axite/discovery"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      <span className="text-nowrap">Book a 20-Minute Discovery Call</span>
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="px-5 text-base"
                      data-cal-namespace="discovery"
                      data-cal-link="axite/discovery"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      <span className="text-nowrap">See How It Works</span>
                    </Button>
                  </div>
                </div>
                <div className="order-first ml-auto w-full lg:absolute lg:right-0 lg:top-0 lg:order-last lg:w-1/2 lg:h-full flex items-center justify-center lg:justify-end">
                  <Image
                    className="object-contain dark:hidden scale-100 lg:scale-150"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                    }}
                    src="/product-images/2mobile-olap-l.png"
                    alt="AI Integration Dashboard"
                    width={800}
                    height={800}
                    priority
                  />
                  <Image
                    className="hidden object-contain dark:block scale-100 lg:scale-150"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                    }}
                    src="/product-images/2mobile-olap-d.png"
                    alt="AI Integration Dashboard"
                    width={800}
                    height={800}
                    priority
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
}

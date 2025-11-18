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
                    Bring Your Services Into AI Assistants
                  </h1>
                  <p className="mt-6 max-w-2xl text-pretty text-lg">
                    We build MCP connectors that bring your services into the AI
                    assistants your customers already use. ChatGPT, Claude,
                    Gemini and more — your business logic becomes instantly
                    accessible through natural language.
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                    <Button
                      size="lg"
                      className="px-5 text-base"
                      data-cal-namespace="discovery"
                      data-cal-link="axite/discovery"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      <span className="text-nowrap">Get Started</span>
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="px-5 text-base"
                      data-cal-namespace="discovery"
                      data-cal-link="axite/discovery"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      <span className="text-nowrap">Request a Demo</span>
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
          <section className="bg-background pb-24 md:pb-32">
            <div className="group relative m-auto max-w-6xl px-6">
              <div className="flex flex-col items-center md:flex-row">
                <div className="md:max-w-44 md:border-r md:pr-6">
                  <p className="text-end text-sm">
                    Integrate with any platform
                  </p>
                </div>
                <div className="relative py-6 md:w-[calc(100%-11rem)]">
                  <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                    <div className="flex">
                      <Image
                        className="mx-auto h-8 w-fit dark:invert dark:brightness-0 dark:contrast-200"
                        src="/ai-svgs/openai.svg"
                        alt="OpenAI Logo"
                        height={32}
                        width={100}
                      />
                    </div>

                    <div className="flex">
                      <Image
                        className="mx-auto h-8 w-fit"
                        src="/ai-svgs/deepseek-color.svg"
                        alt="DeepSeek Logo"
                        height={32}
                        width={100}
                      />
                    </div>

                    <div className="flex">
                      <Image
                        className="mx-auto h-8 w-fit"
                        src="/ai-svgs/claude-color.svg"
                        alt="Claude Logo"
                        height={32}
                        width={100}
                      />
                    </div>

                    <div className="flex">
                      <Image
                        className="mx-auto h-8 w-fit"
                        src="/ai-svgs/gemini-color.svg"
                        alt="Gemini Logo"
                        height={32}
                        width={100}
                      />
                    </div>

                    <div className="flex">
                      <Image
                        className="mx-auto h-8 w-fit dark:invert"
                        src="/ai-svgs/githubcopilot.svg"
                        alt="GitHub Copilot Logo"
                        height={32}
                        width={100}
                      />
                    </div>

                    <div className="flex">
                      <Image
                        className="mx-auto h-8 w-fit dark:invert"
                        src="/ai-svgs/mcp.svg"
                        alt="MCP Logo"
                        height={32}
                        width={100}
                      />
                    </div>

                    <div className="flex">
                      <Image
                        className="mx-auto h-8 w-fit"
                        src="/ai-svgs/perplexity-color.svg"
                        alt="Perplexity Logo"
                        height={32}
                        width={100}
                      />
                    </div>

                    <div className="flex">
                      <Image
                        className="mx-auto h-8 w-fit dark:invert"
                        src="/ai-svgs/grok.svg"
                        alt="Grok Logo"
                        height={32}
                        width={100}
                      />
                    </div>
                  </InfiniteSlider>

                  <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                  <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                  <ProgressiveBlur
                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                    direction="left"
                    blurIntensity={1}
                  />
                  <ProgressiveBlur
                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                    direction="right"
                    blurIntensity={1}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
}

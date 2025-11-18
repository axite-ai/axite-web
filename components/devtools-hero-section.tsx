import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function DevtoolsHeroSection() {
    return (
      <main className="overflow-x-hidden">
        <section className="bg-background">
          <div className="pb-24 pt-32 md:pb-32 md:pt-40">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <div className="mb-4 flex justify-center lg:justify-start">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href="/">Home</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Devtools</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <h1 className="max-w-2xl text-balance text-5xl font-medium md:text-6xl xl:text-7xl">
                  Build MCP Connectors for Your Devtools
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg">
                  We create custom MCP plugins that integrate your devtools with
                  AI coding assistants. From Claude Code to Cursor, Windsurf to
                  Gemini CLI — make your devtools instantly accessible through
                  the Model Context Protocol.
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
                  className="object-contain scale-100 lg:scale-150"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                  }}
                  src="/product-images/codecli.png"
                  alt="MCP Devtools Integration"
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
                  Compatible with leading AI coding assistants
                </p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/ai-svgs/claude-color.svg"
                      alt="Claude Code"
                      height={32}
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit dark:invert"
                      src="/ai-svgs/cursor.svg"
                      alt="Cursor"
                      height={32}
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit dark:invert"
                      src="/ai-svgs/windsurf.svg"
                      alt="Windsurf"
                      height={32}
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/ai-svgs/gemini-color.svg"
                      alt="Gemini CLI"
                      height={32}
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit dark:invert"
                      src="/ai-svgs/cline.svg"
                      alt="Cline"
                      height={32}
                      width={100}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-8 w-fit"
                      src="/ai-svgs/lovable-color.svg"
                      alt="Lovable"
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
    );
}

'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { HeroHeader } from './header'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { Play } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function HeroSection() {
    return (
      <>
        <HeroHeader />
        <main className="overflow-x-hidden">
          <section className="bg-background">
            <div className="pb-32 pt-32 md:pb-40 md:pt-40">
              <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                <div className="relative z-10 mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                  <h1 className="max-w-2xl text-balance text-5xl font-medium md:text-6xl xl:text-7xl">
                    Launch Your Company's GPT App in Days, Not Months
                  </h1>
                  <p className="mt-6 max-w-2xl text-pretty text-lg">
                    We turn your existing API, product, or workflow into a fully functional GPT/Claude/Gemini app. Live in days, not months.
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                    <Button
                      size="lg"
                      className="px-6 text-base w-full sm:w-auto"
                      data-cal-namespace="discovery"
                      data-cal-link="axite/discovery"
                      data-cal-config='{"layout":"month_view"}'
                    >
                      <span className="text-nowrap">Book a 15-Minute Discovery Call</span>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="lg"
                          variant="ghost"
                          className="px-6 text-base w-full sm:w-auto"
                        >
                          <Play className="mr-2 h-5 w-5" />
                          <span className="text-nowrap">30-Second Demo</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] w-full lg:max-w-7xl">
                        <DialogHeader>
                          <DialogTitle>Real Integration Example</DialogTitle>
                          <DialogDescription>
                            AskMyMoney: An AI-powered financial assistant we built in days
                          </DialogDescription>
                        </DialogHeader>
                        <div className="aspect-video w-full">
                          <iframe
                            src="https://player.vimeo.com/video/1138583939?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1"
                            className="h-full w-full rounded-lg"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                            title="AskMyMoney GPT Demo"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="mt-4 text-center lg:text-left">
                    <Link
                      href="#contact"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                    >
                      Not ready for a call? Tell us about your product or workflow.
                    </Link>
                  </div>
                </div>
                <div className="order-first ml-auto w-full lg:absolute lg:right-0 lg:top-0 lg:order-last lg:w-1/2 lg:h-full flex items-center justify-center lg:justify-end lg:z-0">
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

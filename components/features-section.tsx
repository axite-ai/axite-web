import Image from 'next/image'
import { Zap, Code, Shield, Workflow } from 'lucide-react'

export default function FeaturesSection() {
    return (
      <section className="bg-background py-32 md:py-40">
        <div className="mx-auto max-w-6xl px-6">
          {/* Features Grid */}
          <div className="mb-32 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                AI Assistants Are the Next App Store
              </h2>
              <p className="text-muted-foreground mt-6 text-lg">
                Most companies don't have a ChatGPT or Claude app. We build them for you — fast. Your product becomes instantly accessible, voice-controlled, and LLM-native.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Zap className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      New Distribution Channel
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Your product becomes discoverable by millions inside ChatGPT and Claude
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Code className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Zero Engineering Burden
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      We turn your existing API into a fully functional GPT App
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/product-images/light-laptop.png"
                alt="AI Integration Platform"
                width={600}
                height={400}
                className="dark:hidden"
              />
              <Image
                src="/product-images/dark-laptop.png"
                alt="AI Integration Platform"
                width={600}
                height={400}
                className="hidden dark:block"
              />
            </div>
          </div>

          {/* Second Feature */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <Image
                src="/product-images/dt-angle-dl-l.png"
                alt="Mobile AI Integration"
                width={600}
                height={400}
                className="dark:hidden"
              />
              <Image
                src="/product-images/dt-angle-dl-d.png"
                alt="Mobile AI Integration"
                width={600}
                height={400}
                className="hidden dark:block"
              />
            </div>
            <div className="order-1 flex flex-col justify-center lg:order-2">
              <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                What We Build
              </h2>
              <p className="text-muted-foreground mt-6 text-lg" id="how-it-works">
                We develop three types of AI integrations, all powered by our AI integration engine — the infrastructure that makes your product AI-native.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Shield className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Customer-Facing GPT Apps</h3>
                    <p className="text-muted-foreground text-sm">
                      Let your users access your product directly inside AI assistants
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Workflow className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Internal AI Automations</h3>
                    <p className="text-muted-foreground text-sm">
                      Let your team automate workflows through your systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

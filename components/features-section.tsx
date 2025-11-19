import Image from 'next/image'
import { Zap, Code, Shield, Workflow, Plug } from 'lucide-react'

export default function FeaturesSection() {
    return (
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* Features Grid */}
          <div className="mb-32 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                AI Assistants Are the Next App Store
              </h2>
              <p className="text-muted-foreground mt-6 text-lg">
                Your competitors will launch AI-native experiences. You can beat them to it.
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
                      Your product becomes instantly discoverable inside platforms with 300M+ weekly users
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
            <div className="relative order-2 lg:order-1 flex items-center justify-center overflow-hidden">
              <Image
                src="/product-images/dt-angle-dl-l.png"
                alt="Mobile AI Integration"
                width={800}
                height={533}
                className="dark:hidden scale-125"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
              />
              <Image
                src="/product-images/dt-angle-dl-d.png"
                alt="Mobile AI Integration"
                width={800}
                height={533}
                className="hidden dark:block scale-125"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
              />
            </div>
            <div className="order-1 flex flex-col justify-center lg:order-2">
              <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                What We Build
              </h2>
              <p className="text-muted-foreground mt-6 text-lg" id="how-it-works">
                We build three types of AI integrations that make your product accessible inside modern AI assistants—for your customers or your internal team.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Shield className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Customer-Facing GPT Apps</h3>
                    <p className="text-muted-foreground text-sm">
                      Let your customers access your product directly inside ChatGPT, Claude, and Gemini.
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Examples: search data, trigger actions, generate reports, retrieve account info.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Workflow className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Internal Automations</h3>
                    <p className="text-muted-foreground text-sm">
                      Automate repetitive workflows across your internal systems using AI assistants.
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Examples: CRM updates, reporting, data entry, operations tasks.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Plug className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Custom AI Integrations</h3>
                    <p className="text-muted-foreground text-sm">
                      We build secure connectors between your APIs, databases, and LLMs.
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Examples: MCP connectors, custom endpoints, multi-system workflows.
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

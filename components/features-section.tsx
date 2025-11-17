import Image from 'next/image'
import { Zap, Code, Shield, Workflow } from 'lucide-react'

export default function FeaturesSection() {
    return (
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                {/* Features Grid */}
                <div className="mb-24 grid gap-12 lg:grid-cols-2 lg:gap-8">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold md:text-4xl">From API to Conversation in Days</h2>
                        <p className="text-muted-foreground mt-6 text-lg">
                            We build custom MCP connectors that transform your existing business APIs into conversational interfaces. Your customers can interact with your services through ChatGPT, Claude, or any LLM.
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex gap-4">
                                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                    <Zap className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Rapid Connector Development</h3>
                                    <p className="text-muted-foreground text-sm">Custom MCP servers built and deployed in days, not months</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                    <Code className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Works with Your Existing APIs</h3>
                                    <p className="text-muted-foreground text-sm">No need to rebuild—we connect to your current business systems</p>
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
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
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
                        <h2 className="text-3xl font-semibold md:text-4xl">Secure, Scalable Connectors</h2>
                        <p className="text-muted-foreground mt-6 text-lg">
                            Every MCP connector we build is designed for enterprise security and production-ready performance. Your business data stays protected while remaining accessible through AI.
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex gap-4">
                                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                    <Shield className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Enterprise Security Standards</h3>
                                    <p className="text-muted-foreground text-sm">Authentication, encryption, and compliance built into every connector</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                    <Workflow className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Multi-Platform Support</h3>
                                    <p className="text-muted-foreground text-sm">One connector works across ChatGPT, Claude, Gemini, and emerging LLMs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

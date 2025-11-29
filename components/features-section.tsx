import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Shield, Workflow, Plug } from 'lucide-react'
import Image from 'next/image'
import { ReactNode } from 'react'

export default function FeaturesSection() {
    return (
        <section className="bg-background py-24 md:py-32">
            <div className="@container mx-auto max-w-6xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">What Axite Delivers</h2>
                    <p className="text-muted-foreground mt-3 text-lg">Agent-native infrastructure without the chaos.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-12 grid max-w-sm gap-6 md:mt-16">
                    <Card className="group">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Workflow className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 text-xl font-semibold">1. Agent-Ready Workflows That Actually Work</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm mb-4">
                                We don't dump your API into 100 tools.
                            </p>
                            <p className="text-muted-foreground text-sm mb-3">
                                We design end-to-end workflows agents can reliably execute:
                            </p>
                            <ul className="text-muted-foreground space-y-2 text-sm">
                                <li>• Create & pay invoice</li>
                                <li>• Book shipment and notify customer</li>
                                <li>• Sync catalog across channels</li>
                                <li>• Generate usage analytics</li>
                            </ul>
                            <p className="text-muted-foreground mt-4 text-sm">
                                Clean schemas. Correct arguments. Chaining logic. Fallbacks.
                            </p>
                            <p className="mt-2 text-sm font-medium">
                                This is what makes agents reliable inside your product.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Shield className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 text-xl font-semibold">2. Safety & Reliability Built In</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm mb-4">
                                Agents will make mistakes. Your system shouldn't pay for them.
                            </p>
                            <ul className="text-muted-foreground space-y-2 text-sm">
                                <li>• Least-privilege permissions</li>
                                <li>• Validation for every tool</li>
                                <li>• Confirmation steps for destructive actions</li>
                                <li>• Logging, monitoring, safety rails</li>
                            </ul>
                            <p className="mt-4 text-sm font-medium">
                                Automation without operational nightmares.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Plug className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 text-xl font-semibold">3. Ship Once. Use Everywhere.</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm mb-3">Supported agent ecosystems:</p>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="flex items-center gap-2 rounded-lg border p-2">
                                    <Image src="/ai-svgs/openai.svg" alt="ChatGPT" width={20} height={20} className="dark:invert" />
                                    <span className="text-xs font-medium">ChatGPT</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border p-2">
                                    <Image src="/ai-svgs/claude-color.svg" alt="Claude" width={20} height={20} />
                                    <span className="text-xs font-medium">Claude</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border p-2">
                                    <Image src="/ai-svgs/gemini-color.svg" alt="Gemini" width={20} height={20} />
                                    <span className="text-xs font-medium">Gemini</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border p-2">
                                    <Image src="/ai-svgs/githubcopilot.svg" alt="Copilot" width={20} height={20} className="dark:invert" />
                                    <span className="text-xs font-medium">Copilot</span>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                No vendor lock-in. No per-platform rebuilds. No extra engineering.
                            </p>
                            <p className="mt-2 text-sm font-medium">
                                Plug-and-play for the entire agent economy.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div aria-hidden className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10"/>
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">{children}</div>
    </div>
)

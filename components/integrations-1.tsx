import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function IntegrationsSection() {
    return (
        <section id="integrations">
            <div className="bg-muted dark:bg-background py-24 md:py-32">
                <div className="mx-auto flex flex-col px-6 md:grid md:max-w-5xl md:grid-cols-2 md:gap-16">
                    <div className="order-last mt-12 flex flex-col gap-12 md:order-first md:mt-0">
                        <div className="space-y-6">
                            <h2 className="text-balance text-3xl font-semibold md:text-4xl lg:text-5xl">One Integration, Every Platform</h2>
                            <p className="text-muted-foreground">Your MCP server works across ChatGPT, Claude Desktop, Gemini, and every future agent platform. No vendor lock-in. No per-platform custom work.</p>
                            <p className="text-muted-foreground text-sm">Ship once. Distribute everywhere.</p>
                            <Button
                                variant="outline"
                                size="sm"
                                asChild>
                                <Link href="#contact">Request Agent-Native Audit</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="-mx-6 px-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)] sm:mx-auto sm:max-w-md md:-mx-6 md:ml-auto md:mr-0">
                        <div className="bg-background dark:bg-muted/50 rounded-2xl border p-3 shadow-lg md:pb-12">
                            <div className="grid grid-cols-2 gap-2">
                                <Integration
                                    icon={<Image src="/ai-svgs/openai.svg" alt="ChatGPT" width={36} height={36} className="dark:invert dark:brightness-0 dark:contrast-200" />}
                                    name="ChatGPT"
                                    description="300M+ weekly users"
                                />
                                <Integration
                                    icon={<Image src="/ai-svgs/claude-color.svg" alt="Claude" width={36} height={36} />}
                                    name="Claude Desktop"
                                    description="MCP-native platform"
                                />
                                <Integration
                                    icon={<Image src="/ai-svgs/gemini-color.svg" alt="Gemini" width={36} height={36} />}
                                    name="Gemini"
                                    description="Multimodal workflows"
                                />
                                <Integration
                                    icon={<Image src="/ai-svgs/perplexity-color.svg" alt="Perplexity" width={36} height={36} />}
                                    name="Perplexity"
                                    description="Research workflows"
                                />
                                <Integration
                                    icon={<Image src="/ai-svgs/githubcopilot.svg" alt="GitHub Copilot" width={36} height={36} className="dark:invert" />}
                                    name="GitHub Copilot"
                                    description="Developer agents"
                                />
                                <Integration
                                    icon={<Image src="/ai-svgs/n8n-color.svg" alt="Custom Agents" width={36} height={36} />}
                                    name="Custom Agents"
                                    description="Bespoke implementations"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Integration = ({ icon, name, description }: { icon: React.ReactNode; name: string; description: string }) => {
    return (
        <div className="hover:bg-muted dark:hover:bg-muted/50 space-y-4 rounded-lg border p-4 transition-colors">
            <div className="flex size-fit items-center justify-center">{icon}</div>
            <div className="space-y-1">
                <h3 className="text-sm font-medium">{name}</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
            </div>
        </div>
    )
}

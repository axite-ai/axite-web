import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import * as React from 'react'

export default function IntegrationsSection() {
    return (
      <section id="integrations" className="py-24 md:py-32">
        <div>
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                Connect Your Business to Any AI Assistant
              </h2>
              <p className="text-muted-foreground mt-6">
                We build custom MCP connectors that bridge your business APIs
                with any LLM platform—ChatGPT, Claude, Gemini, or emerging AI assistants.
                If it supports integrations, we can connect it to your business.
              </p>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <IntegrationCard
                title="ChatGPT Apps"
                description="Connect your business API to ChatGPT. Let customers interact with your services through conversational AI—no complex UI needed."
                link="https://openai.com/index/introducing-apps-in-chatgpt"
              >
                <Image
                  src="/ai-svgs/openai.svg"
                  alt="OpenAI"
                  width={40}
                  height={40}
                  className="size-10 dark:invert dark:brightness-0 dark:contrast-200"
                />
              </IntegrationCard>

              <IntegrationCard
                title="Claude Connectors"
                description="Build MCP servers that connect Claude to your business systems. Enable natural language access to your data and workflows."
                link="https://claude.com/blog/connectors-directory"
              >
                <Image
                  src="/ai-svgs/claude-color.svg"
                  alt="Claude"
                  width={40}
                  height={40}
                  className="size-10"
                />
              </IntegrationCard>

              <IntegrationCard
                title="Custom MCP Servers"
                description="Expert Model Context Protocol development. We create secure, scalable connectors that let any LLM interface with your business logic."
                link="https://modelcontextprotocol.io/docs/getting-started/intro"
              >
                <Image
                  src="/ai-svgs/mcp.svg"
                  alt="MCP"
                  width={40}
                  height={40}
                  className="size-10 dark:invert"
                />
              </IntegrationCard>

              <IntegrationCard
                title="Gemini Integration"
                description="Connect Google's Gemini to your business APIs. Leverage multimodal AI capabilities for text, image, and data processing."
                link="https://zapier.com/blog/gemini-apps/"
              >
                <Image
                  src="/ai-svgs/gemini-color.svg"
                  alt="Gemini"
                  width={40}
                  height={40}
                  className="size-10"
                />
              </IntegrationCard>

              <IntegrationCard
                title="Universal AI Support"
                description="One connector, unlimited possibilities. We build integrations that work across any AI platform—including GitHub Copilot, Grok, Perplexity, and future LLMs."
              >
                <Image
                  src="/ai-svgs/githubcopilot.svg"
                  alt="GitHub Copilot"
                  width={40}
                  height={40}
                  className="size-10 dark:invert"
                />
              </IntegrationCard>

              <IntegrationCard
                title="Custom AI Solutions"
                description="Don't see what you need? We build bespoke LLM integrations tailored to your unique business requirements. Let's discuss your vision."
                link="#contact"
                linkText="Get in Touch"
              >
                <Image
                  src="/ai-svgs/n8n-color.svg"
                  alt="Custom Solutions"
                  width={40}
                  height={40}
                  className="size-10"
                />
              </IntegrationCard>
            </div>
          </div>
        </div>
      </section>
    );
}

const IntegrationCard = ({ title, description, children, link, linkText  }: { title: string; description: string; children: React.ReactNode; link?: string; linkText?: string }) => {
    const isExternalLink = link && !link.startsWith('#');

    return (
        <Card className="p-6">
            <div className="relative">
                <div className="*:size-10">{children}</div>

                <div className="space-y-2 py-6">
                    <h3 className="text-base font-medium">{title}</h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
                </div>

                <div className="flex gap-3 border-t border-dashed pt-6">
                    <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="gap-1 pr-2 shadow-none">
                        <Link
                            href={link ?? '#'}
                            target={isExternalLink ? '_blank' : undefined}
                            rel={isExternalLink ? 'noopener noreferrer' : undefined}
                        >
                            {linkText ?? 'Learn More'}
                            <ChevronRight className="ml-0 size-3.5! opacity-50" />
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>
    )
}

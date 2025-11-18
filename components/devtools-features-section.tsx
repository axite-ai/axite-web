import Image from 'next/image'
import { Code2, Plug, Sparkles, Terminal } from 'lucide-react'

export default function DevtoolsFeaturesSection() {
    return (
      <section id="features" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* Features Grid */}
          <div className="mb-24 grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-semibold md:text-4xl">
                MCP Plugins for AI Coding Assistants
              </h2>
              <p className="text-muted-foreground mt-6 text-lg">
                We build production-grade MCP connectors that make your devtools
                accessible through AI coding assistants. Whether it&apos;s Claude Code,
                Cursor, Windsurf, or Gemini CLI — developers can access your
                tools through natural language commands.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Terminal className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Native AI Assistant Integration
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Built specifically for Claude Code, Cursor, Windsurf, Gemini
                      CLI, and other MCP-compatible coding agents
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Code2 className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Seamless Developer Experience
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Developers interact with your devtools using natural language,
                      directly in their coding environment
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/product-images/light-laptop.png"
                alt="MCP Plugin Integration"
                width={600}
                height={400}
                className="dark:hidden"
              />
              <Image
                src="/product-images/dark-laptop.png"
                alt="MCP Plugin Integration"
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
                src="/product-images/2dt-r-l.png"
                alt="Plugin Marketplace"
                width={600}
                height={400}
                className="dark:hidden"
              />
              <Image
                src="/product-images/2dt-r-d.png"
                alt="Plugin Marketplace"
                width={600}
                height={400}
                className="hidden dark:block"
              />
            </div>
            <div className="order-1 flex flex-col justify-center lg:order-2">
              <h2 className="text-3xl font-semibold md:text-4xl">
                From API to AI Plugin in Days
              </h2>
              <p className="text-muted-foreground mt-6 text-lg">
                We transform your existing devtool APIs into MCP servers that work
                across all major AI coding assistants. Get to market faster with
                our proven integration framework.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Plug className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Universal Compatibility</h3>
                    <p className="text-muted-foreground text-sm">
                      One MCP server works across Claude Code, Cursor, Windsurf,
                      Gemini CLI, and future MCP-compatible tools
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Sparkles className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Rapid Development</h3>
                    <p className="text-muted-foreground text-sm">
                      Production-ready MCP connectors built and deployed in days,
                      not months
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mt-24 md:mt-32">
            <div className="text-center">
              <h2 className="text-3xl font-semibold md:text-4xl">
                Perfect for Developer Tools
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
                Any devtool can become an MCP plugin
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold">Testing Frameworks</h3>
                <p className="text-muted-foreground mt-2">
                  Let developers run, debug, and analyze tests through natural
                  language in their AI assistant
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold">Code Analysis Tools</h3>
                <p className="text-muted-foreground mt-2">
                  Enable AI assistants to trigger linting, formatting, and static
                  analysis on demand
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold">Build & Deploy Tools</h3>
                <p className="text-muted-foreground mt-2">
                  Make build pipelines and deployment workflows accessible through
                  conversational commands
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold">Database Tools</h3>
                <p className="text-muted-foreground mt-2">
                  Query, migrate, and manage databases naturally through AI coding
                  assistants
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold">API Platforms</h3>
                <p className="text-muted-foreground mt-2">
                  Let developers discover, test, and integrate your APIs directly
                  in their workflow
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold">Documentation Tools</h3>
                <p className="text-muted-foreground mt-2">
                  Generate, search, and update documentation through AI-powered
                  natural language
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

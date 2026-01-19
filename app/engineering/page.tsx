import type { Metadata } from "next";
import Link from "next/link";
import { HeroHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ExamplesSection from "@/components/examples-section";
import WhereWeFitSection from "@/components/where-we-fit-section";
import ContactSection from "@/components/contact";
import FooterSection from "@/components/footer";

export const metadata: Metadata = {
  title: "Axite for Engineering - MCP Servers, Schemas, and Safety Rails",
  description:
    "Production-grade MCP servers, tool catalogs, and agent apps with validation, confirmation patterns, and observability.",
};

export default function EngineeringPage() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section className="bg-background">
          <div className="pb-24 pt-32 md:pb-32 md:pt-40">
            <div className="mx-auto max-w-6xl px-6">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  For platform, security, and engineering teams
                </p>
                <h1 className="mt-4 text-balance text-5xl font-medium md:text-6xl">
                  MCP servers, tool catalogs, and agent apps that work in
                  production
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  We design schemas, permissions, and safety rails so agents can
                  execute real workflows across ChatGPT, Claude, Gemini, and
                  future MCP clients.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="px-6 text-base" asChild>
                    <Link href="#contact">Request Agent-Native Audit</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-6 text-base"
                    asChild
                  >
                    <Link href="/product">For product/ops →</Link>
                  </Button>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Need to vet the stack? This page is for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted bg-background py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                Reference architecture
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                MCP sits between your systems and every agent ecosystem.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
              <div className="rounded-2xl border bg-background p-6 shadow-sm">
                <p className="text-sm font-semibold">Your systems</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Core APIs, databases, billing, CRM, and internal services.
                </p>
              </div>
              <div className="hidden text-center text-2xl text-muted-foreground lg:block">
                →
              </div>
              <div className="rounded-2xl border bg-background p-6 shadow-sm">
                <p className="text-sm font-semibold">MCP server</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Tool schemas, permissions, confirmation, and logging.
                </p>
              </div>
              <div className="hidden text-center text-2xl text-muted-foreground lg:block">
                →
              </div>
              <div className="rounded-2xl border bg-background p-6 shadow-sm">
                <p className="text-sm font-semibold">Agent ecosystems</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  ChatGPT, Claude, Gemini, Copilot, and custom agents.
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border bg-background p-6 shadow-sm">
              <p className="text-sm font-semibold">Agent app layer</p>
              <p className="mt-3 text-sm text-muted-foreground">
                We also ship a demo app or ChatGPT-style UI so internal teams can
                test workflows end-to-end.
              </p>
            </div>
          </div>
        </section>

        <ExamplesSection />

        <section className="bg-background py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                How we build reliable MCP workflows
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Engineering details that remove implementation risk.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold">Tool design</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Intent-based tool naming, strict input schemas, and
                    constraints that prevent bad arguments.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold">Permissions & gating</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Least-privilege scopes with confirmation steps for any
                    destructive or financial action.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold">Error handling</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Deterministic error messages, retries, and fallbacks for
                    incomplete agent outputs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold">Observability</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Structured logs, audit trails, and hooks for your existing
                    monitoring stack.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted bg-background py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                MCP specifics we cover
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Built to spec across Tools, Resources, and Prompts.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border bg-background p-6 shadow-sm">
                <p className="text-sm font-semibold">Tools</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Schema design, validation, and strict input requirements.
                </p>
              </div>
              <div className="rounded-2xl border bg-background p-6 shadow-sm">
                <p className="text-sm font-semibold">Resources</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Structured data access, pagination, and safe exposure.
                </p>
              </div>
              <div className="rounded-2xl border bg-background p-6 shadow-sm">
                <p className="text-sm font-semibold">Prompts</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Workflow prompts that guide deterministic agent behavior.
                </p>
              </div>
              <div className="rounded-2xl border bg-background p-6 shadow-sm">
                <p className="text-sm font-semibold">Auth & permissions</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  OAuth, scoped credentials, and least-privilege enforcement.
                </p>
              </div>
              <div className="rounded-2xl border bg-background p-6 shadow-sm">
                <p className="text-sm font-semibold">Client compatibility</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Claude Desktop, ChatGPT connectors, Gemini, Copilot, and custom
                  agents.
                </p>
              </div>
              <div className="rounded-2xl border bg-background p-6 shadow-sm">
                <p className="text-sm font-semibold">Deployment</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Containerized builds, staging flows, and runbooks for handoff.
                </p>
              </div>
            </div>
          </div>
        </section>

        <WhereWeFitSection />

        <section className="bg-background py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
              Want a technical review?
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              We can map your first workflow, identify the schemas, and outline
              the safety model in 12 hours.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="px-6 text-base" asChild>
                <Link href="#contact">Request Agent-Native Audit</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 text-base"
                asChild
              >
                <Link href="#contact">Ask an MCP engineer</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <ContactSection />
      <FooterSection />
    </>
  );
}

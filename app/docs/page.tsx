"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  ArrowRight,
  BookOpen,
  Code,
  Shield,
  Zap,
  FileText,
  Terminal,
  Check,
  Copy,
  Lock,
  Key,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const quickstartSteps: Array<{
  step: string;
  title: string;
  description: string;
  code: Record<string, string>;
  language: string;
}> = [
  {
    step: "1",
    title: "Install the SDK",
    description: "Add the Axite SDK to your project using your preferred package manager.",
    code: {
      npm: "npm install @axite/sdk",
      pnpm: "pnpm add @axite/sdk",
      yarn: "yarn add @axite/sdk",
      bun: "bun add @axite/sdk",
    },
    language: "bash",
  },
  {
    step: "2",
    title: "Configure your API key",
    description: "Initialize the Axite client with your API credentials.",
    code: {
      typescript: `import { Axite } from '@axite/sdk';

const axite = new Axite({
  apiKey: process.env.AXITE_API_KEY,
  environment: 'production'
});`,
      javascript: `const { Axite } = require('@axite/sdk');

const axite = new Axite({
  apiKey: process.env.AXITE_API_KEY,
  environment: 'production'
});`,
    },
    language: "typescript",
  },
  {
    step: "3",
    title: "Connect an integration",
    description: "Establish a secure connection with your first integration using scoped policies.",
    code: {
      typescript: `const salesforce = await axite.connect('salesforce', {
  tenant: 'customer-123',
  policies: ['read-contacts', 'write-leads-approval']
});

// Access tools with built-in security
const contacts = await salesforce.tools.listContacts({
  limit: 100,
  filter: { status: 'active' }
});`,
      javascript: `const salesforce = await axite.connect('salesforce', {
  tenant: 'customer-123',
  policies: ['read-contacts', 'write-leads-approval']
});

// Access tools with built-in security
const contacts = await salesforce.tools.listContacts({
  limit: 100,
  filter: { status: 'active' }
});`,
    },
    language: "typescript",
  },
];

const docSections = [
  {
    icon: Zap,
    title: "Quickstart",
    description: "Get your first integration running in 10 minutes.",
    href: "#quickstart",
    badge: "Start Here",
    badgeVariant: "default" as const,
  },
  {
    icon: Shield,
    title: "Security Model",
    description: "Understand policies, permissions, and approval workflows.",
    href: "#security-model",
    badge: null,
    badgeVariant: "secondary" as const,
  },
  {
    icon: Code,
    title: "SDK Reference",
    description: "Complete API reference for the TypeScript SDK.",
    href: "#sdk",
    badge: "v2.0",
    badgeVariant: "outline" as const,
  },
  {
    icon: FileText,
    title: "Integration Guides",
    description: "Step-by-step guides for Salesforce, Jira, Slack, and more.",
    href: "/integrations",
    badge: null,
    badgeVariant: "secondary" as const,
  },
];

function CodeBlock({
  code,
  language,
  filename,
}: {
  code: string | Record<string, string>;
  language: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(
    typeof code === "object" ? Object.keys(code)[0] : null
  );

  const currentCode = typeof code === "object" ? code[activeTab!] : code;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSyntax = (text: string) => {
    // Simple syntax highlighting
    const lines = text.split("\n");
    return lines.map((line, i) => {
      let highlighted = line
        // Comments
        .replace(/(\/\/.*$|#.*$)/gm, '<span class="text-zinc-500">$1</span>')
        // Strings
        .replace(
          /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
          '<span class="text-emerald-400">$1$2$3</span>'
        )
        // Keywords
        .replace(
          /\b(import|from|const|let|var|await|async|function|return|export|require)\b/g,
          '<span class="text-purple-400">$1</span>'
        )
        // Types/Classes
        .replace(
          /\b(Axite|string|number|boolean)\b/g,
          '<span class="text-amber-400">$1</span>'
        )
        // Properties
        .replace(
          /(\w+)(?=:)/g,
          '<span class="text-sky-400">$1</span>'
        )
        // Methods/Functions
        .replace(
          /\.(\w+)(?=\()/g,
          '.<span class="text-blue-400">$1</span>'
        );

      return (
        <span key={i} className="block">
          <span
            className="select-none text-zinc-600 w-8 inline-block text-right pr-4 text-xs"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </span>
      );
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/20">
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-zinc-700" />
            <div className="size-3 rounded-full bg-zinc-700" />
            <div className="size-3 rounded-full bg-zinc-700" />
          </div>
          {filename && (
            <span className="text-xs font-medium text-zinc-500">{filename}</span>
          )}
          {typeof code === "object" && (
            <div className="flex items-center gap-1 rounded-md bg-zinc-800/50 p-0.5">
              {Object.keys(code).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                    activeTab === tab
                      ? "bg-zinc-700 text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition-all hover:bg-zinc-800 hover:text-zinc-300"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1 text-emerald-400"
                  >
                    <Check className="size-3.5" />
                    <span>Copied!</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 font-mono text-sm leading-relaxed text-zinc-300">
          <code>{highlightSyntax(currentCode)}</code>
        </pre>
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          {/* Background effects */}
          <div className="pointer-events-none absolute inset-0">
            {/* Gradient mesh */}
            <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
            <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.02] opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm backdrop-blur-sm"
              >
                <div className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </div>
                <span className="text-emerald-400">Documentation</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-8 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
              >
                Build{" "}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent from-emerald-400 via-emerald-300 to-teal-400">
                    secure
                  </span>
                  <span className="absolute -bottom-1 left-0 h-3 w-full bg-emerald-500/10 blur-lg" />
                </span>{" "}
                agent integrations
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 text-lg text-muted-foreground md:text-xl"
              >
                Everything you need to connect your AI agents to enterprise tools—safely.
              </motion.p>
            </motion.div>

            {/* Doc sections */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {docSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={section.href}
                    className="group relative flex flex-col rounded-2xl border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-card hover:shadow-lg hover:shadow-emerald-500/5"
                  >
                    {section.badge && (
                      <Badge
                        variant={section.badgeVariant}
                        className={`absolute right-4 top-4 ${
                          section.badge === "Start Here"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : ""
                        }`}
                      >
                        {section.badge}
                      </Badge>
                    )}
                    <div className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 ring-1 ring-emerald-500/20">
                      <section.icon className="size-5 text-emerald-400" />
                    </div>
                    <h3 className="mt-4 font-semibold tracking-tight">{section.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-emerald-400">
                      Read more
                      <ChevronRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quickstart */}
        <section id="quickstart" className="relative border-y bg-muted/30 py-20 md:py-28">
          {/* Subtle pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.015] opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-2xl text-center"
            >
              <Badge variant="outline" className="mb-4 border-emerald-500/20 text-emerald-400">
                <Terminal className="mr-1.5 size-3" />
                Quickstart Guide
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Up and running in minutes
              </h2>
              <p className="mt-4 text-muted-foreground">
                Get your first secure agent integration running in 10 minutes.
              </p>
            </motion.div>

            <div className="mt-16 space-y-12">
              {quickstartSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="flex gap-6 md:gap-8"
                >
                  {/* Step indicator */}
                  <div className="relative flex flex-col items-center">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-lg font-semibold text-white shadow-lg shadow-emerald-500/25">
                      {step.step}
                    </div>
                    {index < quickstartSteps.length - 1 && (
                      <div className="absolute top-14 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-emerald-500/50 to-transparent" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                    <div className="mt-4">
                      <CodeBlock
                        code={step.code}
                        language={step.language}
                        filename={step.language === "bash" ? "Terminal" : "index.ts"}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Success state */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 flex items-center justify-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur-sm"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="size-5 text-emerald-500" />
              </div>
              <div>
                <p className="font-medium text-emerald-400">
                  You're all set!
                </p>
                <p className="text-sm text-muted-foreground">
                  Your agent can now securely interact with Salesforce data.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security Model */}
        <section id="security-model" className="relative py-20 md:py-28">
          {/* Background gradient */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-2xl text-center"
            >
              <Badge variant="outline" className="mb-4 border-emerald-500/20 text-emerald-400">
                <Shield className="mr-1.5 size-3" />
                Security First
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Security Model
              </h2>
              <p className="mt-4 text-muted-foreground">
                Understand how Axite enforces security at every layer.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group rounded-2xl border bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 ring-1 ring-emerald-500/20">
                    <Key className="size-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Policies</h3>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Policies define what actions an agent can take. They're written in a declarative
                  YAML format and versioned alongside your code.
                </p>
                <div className="mt-6">
                  <CodeBlock
                    code={`# salesforce-read-contacts.yaml
name: read-contacts
integration: salesforce
permissions:
  - action: read
    resources: [contacts, accounts]
  - action: write
    resources: [leads]
    approval: required`}
                    language="yaml"
                    filename="policy.yaml"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="group rounded-2xl border bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 ring-1 ring-emerald-500/20">
                    <Lock className="size-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Approval Workflows</h3>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  High-risk actions can require human approval before execution.
                  Configure approval rules per action type.
                </p>
                <div className="mt-6">
                  <CodeBlock
                    code={`// Request approval for write action
const result = await salesforce.tools.createLead({
  name: 'John Doe',
  company: 'Acme Corp'
});

// result.status: 'pending_approval'
// result.approvalUrl: 'https://app.axite.ai/...'`}
                    language="typescript"
                    filename="workflow.ts"
                  />
                </div>
              </motion.div>
            </div>

            {/* Security features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-12 grid gap-4 sm:grid-cols-3"
            >
              {[
                { icon: Shield, title: "Least-Privilege", desc: "Tools only access what they need" },
                { icon: Lock, title: "Scoped Permissions", desc: "Granular control per tenant" },
                { icon: CheckCircle2, title: "Audit Logging", desc: "Complete action history" },
              ].map((feature, i) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-4 rounded-xl border bg-card/30 p-4 backdrop-blur-sm"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <feature.icon className="size-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative border-t bg-muted/30 py-20 md:py-28">
          {/* Background effect */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-6xl px-6 text-center"
          >
            <div className="mx-auto max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm">
                <Sparkles className="size-4 text-emerald-500" />
                <span className="text-emerald-400">Expert Support</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Need help getting started?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Book a call with our team for a technical walkthrough.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="h-12 bg-emerald-600 px-8 hover:bg-emerald-700 bg-emerald-500 hover:bg-emerald-600"
                  asChild
                >
                  <Link href="/contact">
                    Book Technical Call
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                  <Link href="https://github.com/axite" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                    <Code className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

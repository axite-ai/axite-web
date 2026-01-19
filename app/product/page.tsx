'use client'

import Link from "next/link";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "motion/react";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  FileSearch,
  Layers,
  Lock,
  Eye,
  Fingerprint,
  KeyRound,
  Activity,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Secure Tool Access",
    subtitle: "Zero-trust by default",
    description: "Least privilege policies and tenant isolation ensure every agent only accesses what it needs—nothing more.",
    features: [
      { text: "Role-based access control (RBAC)", tooltip: "Define granular permissions per agent role" },
      { text: "Tenant isolation by default", tooltip: "Complete data separation between customers" },
      { text: "Scoped API credentials per agent", tooltip: "Short-lived, minimal-permission tokens" },
      { text: "Just-in-time access provisioning", tooltip: "Permissions granted only when needed" },
    ],
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/5",
    iconBg: "from-emerald-500 to-teal-600",
    accentColor: "emerald",
  },
  {
    icon: CheckCircle2,
    title: "Safe Actions",
    subtitle: "Human-in-the-loop when it matters",
    description: "Write controls and approval workflows make high-risk actions require human confirmation before execution.",
    features: [
      { text: "Configurable approval workflows", tooltip: "Set thresholds for automatic vs manual approval" },
      { text: "Rate limiting per action type", tooltip: "Prevent runaway operations automatically" },
      { text: "Break-glass procedures", tooltip: "Emergency override with full audit trail" },
      { text: "Automatic rollback capabilities", tooltip: "Undo operations when issues are detected" },
    ],
    gradient: "from-sky-500/20 via-blue-500/10 to-indigo-500/5",
    iconBg: "from-sky-500 to-blue-600",
    accentColor: "sky",
  },
  {
    icon: FileSearch,
    title: "Auditability",
    subtitle: "Every action traceable",
    description: "Complete audit trail for compliance and debugging. Every action logged, every decision traceable, every export ready.",
    features: [
      { text: "Immutable audit logs", tooltip: "Tamper-proof records for compliance" },
      { text: "SIEM export (Splunk, Datadog)", tooltip: "Native integrations with your security stack" },
      { text: "Compliance reporting dashboards", tooltip: "One-click reports for SOC 2, HIPAA, GDPR" },
      { text: "Full request/response capture", tooltip: "Complete context for every agent action" },
    ],
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/5",
    iconBg: "from-violet-500 to-purple-600",
    accentColor: "violet",
  },
];

const capabilities = [
  {
    icon: Layers,
    title: "Policy Engine",
    description: "Define fine-grained policies using a declarative configuration language. Version-controlled and auditable.",
    detail: "GitOps-native workflow",
  },
  {
    icon: KeyRound,
    title: "Credential Vault",
    description: "Securely store and rotate API credentials. Each agent gets scoped, short-lived tokens.",
    detail: "Auto-rotation enabled",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Watch agent actions in real-time. Get alerts on anomalous behavior or policy violations.",
    detail: "< 100ms latency",
  },
];

const trustIndicators = [
  { label: "SOC 2", status: "Type II Roadmap", variant: "amber" as const },
  { label: "GDPR", status: "Compliant", variant: "emerald" as const },
  { label: "HIPAA", status: "Ready", variant: "emerald" as const },
  { label: "99.9%", status: "Uptime SLA", variant: "sky" as const },
];

export default function ProductPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
          {/* Sophisticated background layers */}
          <div className="pointer-events-none absolute inset-0">
            {/* Precision grid */}
            <div
              className="absolute inset-0 opacity-[0.02] opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: '64px 64px'
              }}
            />
            {/* Radial gradient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/[0.08] via-transparent to-transparent from-emerald-500/[0.05]" />
            {/* Secondary accent */}
            <div className="absolute right-0 top-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-b from-teal-500/[0.06] to-transparent blur-3xl" />
          </div>

          {/* Animated floating orb */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-gradient-to-b from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-4xl text-center">
              {/* Premium badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Badge
                  variant="outline"
                  className="group relative overflow-hidden border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm backdrop-blur-md transition-all duration-500 hover:border-emerald-500/50 hover:bg-emerald-500/10"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <Shield className="mr-2 size-4 text-emerald-400" />
                  <span className="relative font-medium text-emerald-300">Product Overview</span>
                  <Sparkles className="ml-2 size-3 text-emerald-500/60" />
                </Badge>
              </motion.div>

              {/* Headline with gradient text */}
              <motion.h1
                className="mt-10 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  Okta for
                </span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent from-emerald-400 via-teal-400 to-emerald-400">
                    AI agents
                  </span>
                  {/* Underline accent */}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="mt-10 max-w-2xl mx-auto text-xl leading-relaxed text-muted-foreground md:text-2xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                A security layer between your AI agents and your data.
                <span className="block mt-2 text-lg md:text-xl text-muted-foreground/80">
                  Permissioned access, approval workflows, and audit logs—everything you need to pass enterprise security review.
                </span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Button
                  size="lg"
                  className="group relative h-14 overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 px-10 text-base font-medium text-white shadow-xl shadow-emerald-500/25 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-[1.02] from-emerald-500 to-teal-500"
                  asChild
                >
                  <Link href="/contact">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
                    <span className="relative flex items-center">
                      <ShieldCheck className="mr-2 size-5" />
                      Book Security Review
                      <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group h-14 border-border/60 px-10 text-base font-medium backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/5"
                  asChild
                >
                  <Link href="/docs">
                    <Fingerprint className="mr-2 size-5 transition-colors duration-300 group-hover:text-emerald-600 group-hover:text-emerald-400" />
                    View Documentation
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Three Pillars Section */}
        <section className="relative border-y border-border/50 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 py-28 md:py-36">
          {/* Background pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.015] opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative mx-auto max-w-6xl px-6">
            {/* Section header */}
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="outline" className="border-primary/20 bg-background/60 px-4 py-1.5 backdrop-blur-sm">
                <Lock className="mr-2 size-3.5 text-primary" />
                Core Architecture
              </Badge>

              <h2 className="mt-8 text-4xl font-semibold tracking-[-0.02em] md:text-5xl lg:text-6xl">
                Three pillars of
                <span className="block mt-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent from-emerald-400 via-teal-400 to-emerald-400">
                  agent security
                </span>
              </h2>

              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Built from the ground up to address enterprise security requirements.
                No retrofitting. No compromises.
              </p>
            </motion.div>

            {/* Pillars grid */}
            <TooltipProvider>
              <div className="mt-20 grid gap-8 lg:grid-cols-3">
                {pillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.title}
                    className="group relative"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Card with gradient border effect */}
                    <div className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-border hover:shadow-2xl hover:shadow-emerald-500/5">
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                      {/* Top accent line */}
                      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-${pillar.accentColor}-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                      <div className="relative">
                        {/* Icon with gradient background */}
                        <div className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.iconBg} shadow-lg shadow-${pillar.accentColor}-500/20 transition-transform duration-500 group-hover:scale-110`}>
                          <pillar.icon className="size-7 text-white" />
                        </div>

                        {/* Title and subtitle */}
                        <div className="mt-8">
                          <h3 className="text-2xl font-semibold tracking-tight">{pillar.title}</h3>
                          <p className={`mt-1 text-sm font-medium text-${pillar.accentColor}-400`}>
                            {pillar.subtitle}
                          </p>
                        </div>

                        <p className="mt-4 text-muted-foreground leading-relaxed">
                          {pillar.description}
                        </p>

                        <Separator className="my-6 bg-border/50" />

                        {/* Features list with tooltips */}
                        <ul className="space-y-4">
                          {pillar.features.map((feature) => (
                            <Tooltip key={feature.text}>
                              <TooltipTrigger asChild>
                                <li className="flex items-start gap-3 cursor-default group/item">
                                  <CheckCircle2 className={`mt-0.5 size-5 shrink-0 text-${pillar.accentColor}-500 transition-transform duration-300 group-hover/item:scale-110`} />
                                  <span className="text-sm transition-colors duration-300 group-hover/item:text-foreground">{feature.text}</span>
                                </li>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="max-w-xs border-border/50 bg-card/95 backdrop-blur-xl">
                                <p className="text-sm">{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="relative py-28 md:py-36">
          {/* Subtle background */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-500/[0.03] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-6xl px-6">
            {/* Section header */}
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="outline" className="border-primary/20 bg-background/60 px-4 py-1.5 backdrop-blur-sm">
                <Eye className="mr-2 size-3.5 text-primary" />
                Platform Capabilities
              </Badge>

              <h2 className="mt-8 text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
                Enterprise-grade
                <span className="block mt-1 text-muted-foreground/80">capabilities</span>
              </h2>

              <p className="mt-6 text-lg text-muted-foreground">
                Everything you need to run agents in production, securely and at scale.
              </p>
            </motion.div>

            {/* Capabilities grid */}
            <div className="mt-20 grid gap-6 md:grid-cols-3">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={cap.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/30 hover:bg-card hover:shadow-xl hover:shadow-emerald-500/5">
                    {/* Icon */}
                    <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-muted to-muted/50 ring-1 ring-border/50 transition-all duration-500 group-hover:ring-emerald-500/30 group-hover:shadow-lg group-hover:shadow-emerald-500/10">
                      <cap.icon className="size-6 text-foreground/80 transition-colors duration-500 group-hover:text-emerald-600 group-hover:text-emerald-400" />
                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">{cap.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{cap.description}</p>

                    {/* Detail badge */}
                    <div className="mt-6">
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300">
                        {cap.detail}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators Bar */}
        <motion.section
          className="border-y border-border/50 bg-muted/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap items-center justify-center divide-x divide-border/50">
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={indicator.label}
                  className="flex flex-col items-center px-8 py-8 md:px-12 md:py-10"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-semibold tracking-tight md:text-4xl">{indicator.label}</span>
                    {indicator.variant === 'emerald' && (
                      <CheckCircle2 className="size-6 text-emerald-500" />
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className={`mt-3 ${
                      indicator.variant === 'emerald'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : indicator.variant === 'amber'
                        ? 'bg-amber-500/10 text-amber-600 text-amber-400'
                        : 'bg-sky-500/10 text-sky-600 text-sky-400'
                    }`}
                  >
                    {indicator.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-28 md:py-36">
          {/* Background effects */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/[0.08] via-transparent to-transparent" />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-5xl lg:text-6xl">
                Ready to secure
                <span className="block mt-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent from-emerald-400 via-teal-400 to-emerald-400">
                  your agents?
                </span>
              </h2>

              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Book a security review and see how Axite fits into your stack.
                <span className="block mt-1 text-muted-foreground/80">
                  No commitment. No sales pitch. Just answers.
                </span>
              </p>

              <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="group relative h-14 overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 px-10 text-base font-medium text-white shadow-xl shadow-emerald-500/25 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-[1.02] from-emerald-500 to-teal-500"
                  asChild
                >
                  <Link href="/contact">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
                    <span className="relative flex items-center">
                      Book Security Review
                      <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
              </div>

              {/* Trust tagline */}
              <motion.p
                className="mt-12 text-sm text-muted-foreground/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Trusted by security-conscious teams building the future of AI automation
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  ArrowRight,
  Shield,
  Lock,
  FileText,
  Server,
  Users,
  Clock,
  CheckCircle2,
  Building2,
  Cloud,
  HardDrive,
  Info,
  Fingerprint,
  Eye,
  Key,
} from "lucide-react";
import * as motion from "motion/react-client";

const securityFeatures = [
  {
    icon: Shield,
    title: "Least Privilege",
    description:
      "Every tool call is scoped to minimum required permissions. Agents can't access more than they need.",
    detail:
      "Role-based access control with granular permission sets, automatic scope reduction, and real-time permission auditing.",
  },
  {
    icon: Users,
    title: "Tenant Isolation",
    description:
      "Multi-tenant architecture with complete data isolation between customers.",
    detail:
      "Separate encryption keys per tenant, isolated compute resources, and network-level segregation.",
  },
  {
    icon: Lock,
    title: "Encryption",
    description:
      "AES-256 encryption at rest, TLS 1.3 in transit. Credentials stored in HSM-backed vaults.",
    detail:
      "Hardware Security Modules for key management, automated key rotation, and zero-knowledge architecture.",
  },
  {
    icon: FileText,
    title: "Audit Logs",
    description:
      "Immutable, tamper-proof audit logs with 90-day retention (configurable to 7 years).",
    detail:
      "Cryptographic verification of log integrity, real-time SIEM integration, and compliance-ready exports.",
  },
  {
    icon: Clock,
    title: "Access Reviews",
    description:
      "Automated access reviews and just-in-time provisioning for temporary access.",
    detail:
      "Scheduled certification campaigns, automatic deprovisioning, and time-bound access grants.",
  },
  {
    icon: Server,
    title: "SOC 2 Type II",
    description:
      "SOC 2 Type II certification in progress. Security questionnaire support included.",
    detail:
      "Annual third-party audits, continuous control monitoring, and dedicated compliance team.",
  },
];

const deploymentOptions = [
  {
    title: "Cloud (SaaS)",
    icon: Cloud,
    description: "Fully managed in our secure cloud infrastructure. Fastest time to value.",
    features: ["Automatic updates", "99.9% uptime SLA", "Multi-region availability"],
    accent: "emerald",
  },
  {
    title: "Dedicated Cloud",
    icon: Server,
    description: "Single-tenant deployment in your preferred cloud region.",
    features: ["Isolated infrastructure", "Custom configurations", "Dedicated support"],
    accent: "teal",
  },
  {
    title: "On-Premise",
    icon: HardDrive,
    description: "Deploy within your own infrastructure for maximum control.",
    features: ["Full data residency", "Air-gapped option", "Your compliance controls"],
    accent: "cyan",
  },
];

const compliance = [
  {
    name: "SOC 2 Type II",
    status: "In Progress",
    description: "Annual audit by independent third party",
  },
  { name: "GDPR", status: "Compliant", description: "EU data protection regulation" },
  {
    name: "HIPAA",
    status: "Ready",
    description: "Healthcare data protection standards",
  },
  {
    name: "ISO 27001",
    status: "Roadmap",
    description: "International security management standard",
  },
  {
    name: "PCI DSS",
    status: "Roadmap",
    description: "Payment card industry data security",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
          {/* Background Pattern */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Gradient mesh */}
            <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/8 via-teal-500/5 to-transparent blur-3xl" />
            <div className="absolute top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-emerald-400/6 via-cyan-500/4 to-transparent blur-3xl" />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.015] opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                  linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: "64px 64px",
              }}
            />
            {/* Floating shield icons */}
            <motion.div
              className="absolute top-32 left-[15%] text-emerald-500/10"
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="size-24" />
            </motion.div>
            <motion.div
              className="absolute top-48 right-[20%] text-teal-500/10"
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Lock className="size-16" />
            </motion.div>
            <motion.div
              className="absolute bottom-32 left-[25%] text-emerald-500/8"
              animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <Key className="size-20" />
            </motion.div>
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-emerald-700 border-emerald-400/30 bg-emerald-400/5 text-emerald-400"
                >
                  <Shield className="mr-1.5 size-3.5" />
                  Enterprise Security
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mt-8 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
              >
                <span className="block">Enterprise security,</span>
                <span className="mt-1 block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent from-emerald-400 via-teal-400 to-cyan-400">
                  built from day one
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
              >
                We built Axite to pass security reviews. Every feature, every architecture
                decision is designed with enterprise compliance in mind.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Button
                  size="lg"
                  className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 from-emerald-500 to-teal-500"
                  asChild
                >
                  <Link href="/contact">
                    Request Security Questionnaire
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={itemVariants}
                className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <Fingerprint className="size-4 text-emerald-400" />
                  <span>Zero-knowledge architecture</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Eye className="size-4 text-emerald-400" />
                  <span>Full audit visibility</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Key className="size-4 text-emerald-400" />
                  <span>HSM-backed secrets</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Security Features */}
        <section className="relative border-y border-emerald-500/10 bg-gradient-to-b from-muted/50 via-muted/30 to-background py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <Badge variant="outline" className="mb-4">
                Defense in Depth
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Security at every layer
              </h2>
              <p className="mt-4 text-muted-foreground">
                Defense in depth from API to audit log. Every layer designed for enterprise trust.
              </p>
            </motion.div>

            <motion.div
              className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {securityFeatures.map((feature, index) => (
                <motion.div key={feature.title} variants={itemVariants}>
                  <HoverCard openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-card hover:shadow-lg hover:shadow-emerald-500/5">
                        {/* Subtle gradient on hover */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-teal-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-emerald-500/5 group-hover:to-teal-500/5" />

                        <div className="relative">
                          <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 ring-1 ring-emerald-500/20 transition-all duration-300 group-hover:ring-emerald-500/40">
                            <feature.icon className="size-5 text-emerald-400" />
                          </div>
                          <h3 className="mt-4 font-semibold tracking-tight">
                            {feature.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {feature.description}
                          </p>
                          <div className="mt-3 flex items-center gap-1 text-xs text-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Info className="size-3" />
                            <span>Hover for details</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent
                      side="top"
                      className="w-80 border-emerald-500/20 bg-card/95 backdrop-blur-md"
                    >
                      <div className="flex gap-3">
                        <feature.icon className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                        <div>
                          <h4 className="text-sm font-medium">{feature.title}</h4>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {feature.detail}
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Deployment Options */}
        <section className="relative py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-teal-500/5 via-cyan-500/3 to-transparent blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <Badge variant="outline" className="mb-4">
                Flexible Deployment
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Deploy where compliance requires
              </h2>
              <p className="mt-4 text-muted-foreground">
                Flexible deployment options to meet your security and data residency requirements.
              </p>
            </motion.div>

            <motion.div
              className="mt-16 grid gap-6 md:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {deploymentOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5"
                >
                  {/* Animated gradient border effect */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-cyan-500/0 opacity-0 transition-all duration-500 group-hover:from-emerald-500/10 group-hover:via-teal-500/5 group-hover:to-cyan-500/10 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 ring-1 ring-emerald-500/20 transition-all duration-300 group-hover:scale-110 group-hover:ring-emerald-500/40">
                      <option.icon className="size-7 text-emerald-400" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold tracking-tight">
                      {option.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {option.description}
                    </p>

                    <Separator className="my-6 bg-border/50" />

                    <ul className="space-y-3">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10">
                            <CheckCircle2 className="size-3.5 text-emerald-400" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Compliance Status */}
        <section className="relative border-y border-emerald-500/10 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <Badge variant="outline" className="mb-4">
                Certifications
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Compliance status
              </h2>
              <p className="mt-4 text-muted-foreground">
                Working towards the certifications your enterprise requires.
              </p>
            </motion.div>

            <motion.div
              className="mx-auto mt-16 max-w-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                {compliance.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className={`group flex items-center justify-between p-5 transition-colors hover:bg-muted/50 ${
                      index !== compliance.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="flex items-center gap-3">
                            <span className="font-medium tracking-tight">{item.name}</span>
                            <Info className="size-3.5 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="border-emerald-500/20 bg-card/95 backdrop-blur-md"
                        >
                          <p className="text-xs">{item.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Badge
                      variant="outline"
                      className={`font-medium ${
                        item.status === "Compliant"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 bg-emerald-400/10"
                          : item.status === "Ready"
                            ? "border-teal-500/30 bg-teal-500/10 text-teal-700 text-teal-400"
                            : item.status === "In Progress"
                              ? "border-amber-500/30 bg-amber-500/10 text-amber-700 text-amber-400"
                              : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-24 md:py-32">
          {/* Background elements */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-500/5 via-teal-500/3 to-transparent blur-3xl" />
          </div>

          <motion.div
            className="relative mx-auto max-w-6xl px-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-emerald-700 border-emerald-400/30 bg-emerald-400/5 text-emerald-400"
              >
                Get Started
              </Badge>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl"
            >
              Need more details?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-muted-foreground"
            >
              We&apos;re happy to answer security questionnaires and schedule architecture reviews.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 from-emerald-500 to-teal-500"
                asChild
              >
                <Link href="/contact">
                  Request Security Review
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-emerald-500/20 px-8 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/5"
                asChild
              >
                <Link href="/docs">View Architecture Docs</Link>
              </Button>
            </motion.div>

            {/* Bottom trust bar */}
            <motion.div
              variants={itemVariants}
              className="mt-16 inline-flex flex-wrap items-center justify-center gap-8 rounded-full border border-border/50 bg-muted/30 px-8 py-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="size-4 text-emerald-400" />
                <span>SOC 2 in progress</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="size-4 text-emerald-400" />
                <span>AES-256 encryption</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="size-4 text-emerald-400" />
                <span>SSO/SAML ready</span>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

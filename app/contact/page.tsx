"use client";

import { motion } from "motion/react";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact-form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar,
  Shield,
  Clock,
  Lock,
  CheckCircle2,
  Zap,
  FileCheck,
  Building2,
} from "lucide-react";

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

// Security feature cards data
const securityFeatures = [
  {
    icon: Calendar,
    title: "Security Review Call",
    description:
      "30-minute call to assess your agent architecture. Receive a compliance roadmap tailored to your stack.",
    badge: "Complimentary",
    badgeVariant: "secondary" as const,
  },
  {
    icon: FileCheck,
    title: "Technical Deep-Dive",
    description:
      "Walk through our SDK, policy engine, and deployment options. Get answers to your integration questions.",
    badge: "Engineering",
    badgeVariant: "outline" as const,
  },
  {
    icon: Building2,
    title: "Vendor Questionnaire",
    description:
      "Need us to complete your security questionnaire? We handle SOC 2, GDPR, and enterprise compliance.",
    badge: "Enterprise",
    badgeVariant: "outline" as const,
  },
];

// Trust indicators
const trustIndicators = [
  { icon: Shield, label: "SOC 2 Type II", tooltip: "Audited security controls" },
  { icon: Lock, label: "End-to-End Encryption", tooltip: "AES-256 encryption" },
  { icon: CheckCircle2, label: "GDPR Compliant", tooltip: "EU data protection" },
];

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Emerald gradient orb - top right */}
        <div className="absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-emerald-500/[0.07] blur-[120px] bg-emerald-400/[0.05]" />
        {/* Secondary orb - bottom left */}
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-emerald-600/[0.05] blur-[100px] bg-emerald-500/[0.03]" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <SiteHeader />

      <main className="relative z-10 flex-1">
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Left side - Info */}
              <div className="flex flex-col">
                {/* Header section */}
                <motion.div variants={itemVariants}>
                  <Badge
                    variant="outline"
                    className="mb-6 border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-emerald-700 border-emerald-400/30 bg-emerald-400/5 text-emerald-400"
                  >
                    <Shield className="mr-1.5 size-3" />
                    Enterprise Security
                  </Badge>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl font-semibold tracking-[-0.02em] text-foreground md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
                >
                  Book Your
                  <span className="block bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent from-emerald-400 via-emerald-300 to-teal-400">
                    Security Review
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
                >
                  Connect with our security engineers to discuss how Axite can
                  help you ship AI agents that meet enterprise compliance
                  standards.
                </motion.p>

                {/* Trust indicators */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  {trustIndicators.map((indicator) => (
                    <Tooltip key={indicator.label}>
                      <TooltipTrigger asChild>
                        <div className="flex cursor-default items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-foreground">
                          <indicator.icon className="size-3.5 text-emerald-400" />
                          {indicator.label}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{indicator.tooltip}</TooltipContent>
                    </Tooltip>
                  ))}
                </motion.div>

                <Separator className="my-10 bg-border/60" />

                {/* Feature cards */}
                <motion.div variants={itemVariants} className="space-y-4">
                  {securityFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      variants={itemVariants}
                      className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-card/80 hover:shadow-lg hover:shadow-emerald-500/[0.03]"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="flex gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 transition-all duration-300 group-hover:bg-emerald-500/15 group-hover:ring-emerald-500/30 bg-emerald-400/10 text-emerald-400 ring-emerald-400/20">
                          <feature.icon className="size-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold tracking-tight text-foreground">
                              {feature.title}
                            </h3>
                            <Badge
                              variant={feature.badgeVariant}
                              className="text-[10px] font-medium tracking-wide"
                            >
                              {feature.badge}
                            </Badge>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Response time card */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-emerald-500/[0.02] to-transparent p-5 border-emerald-400/20 from-emerald-400/5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 bg-emerald-400/10">
                      <Clock className="size-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          24-Hour Response Guarantee
                        </p>
                        <Zap className="size-3.5 text-emerald-500" />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Urgent security matters? Book directly and we&apos;ll
                        prioritize your review.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Form */}
              <motion.div variants={cardVariants} className="lg:mt-4">
                <ContactForm />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

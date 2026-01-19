'use client'

import { motion } from 'motion/react'
import { Shield, Key, Users, FileText, Server, Clock, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const securityFeatures = [
  {
    icon: Shield,
    title: 'Least Privilege by Default',
    description: 'Every tool call is scoped to minimum required permissions. No broad access, ever.',
    tooltip: 'Policy engine enforces minimum required permissions per action',
  },
  {
    icon: Users,
    title: 'Tenant Isolation',
    description: 'Multi-tenant by design. Each customer\'s data is completely isolated.',
    tooltip: 'Separate credential stores and data paths per tenant',
  },
  {
    icon: Key,
    title: 'SSO/SAML Ready',
    description: 'Enterprise identity integration. Your existing IdP, your existing policies.',
    tooltip: 'Works with Okta, Azure AD, Google Workspace, and more',
  },
  {
    icon: FileText,
    title: 'Immutable Audit Logs',
    description: 'Every action logged. Every decision traceable. SIEM export included.',
    tooltip: 'Export to Splunk, Datadog, Sumo Logic, and more',
  },
  {
    icon: Server,
    title: 'Deployment Flexibility',
    description: 'Cloud, on-prem, or hybrid. Deploy where your compliance requires.',
    tooltip: 'Single-tenant or multi-tenant deployment options',
  },
  {
    icon: Clock,
    title: 'SOC 2 Roadmap',
    description: 'Built for compliance from day one. Security questionnaire support included.',
    tooltip: 'We help you answer security questionnaires',
  },
]

const complianceBadges = [
  { label: 'SOC 2', status: 'Type II (Roadmap)', color: 'amber' },
  { label: 'GDPR', status: 'Compliant', color: 'emerald' },
  { label: 'HIPAA', status: 'Ready', color: 'emerald' },
  { label: '99.9%', status: 'Uptime SLA', color: 'sky' },
]

export function SecuritySection() {
  return (
    <section className="relative border-y border-border py-24 md:py-32">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/3 h-[500px] w-[500px] rounded-full bg-[var(--gradient-purple)]/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>
      {/* Dot pattern */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-emerald-400 backdrop-blur-sm">
            <Shield className="mr-2 size-3.5" />
            Enterprise Security
          </Badge>

          <h2 className="mt-6 text-3xl font-bold tracking-[-0.02em] md:text-4xl lg:text-5xl">
            Built for security teams
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Every feature designed to pass your security review on the first try.
          </p>
        </motion.div>

        {/* Features grid with tooltips */}
        <TooltipProvider>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature, index) => (
              <Tooltip key={feature.title}>
                <TooltipTrigger asChild>
                  <motion.div
                    className="group cursor-default rounded-2xl border border-border bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-card/50 hover:shadow-lg hover:shadow-emerald-500/5"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 ring-1 ring-emerald-500/20 transition-all duration-300 group-hover:ring-emerald-500/40 group-hover:shadow-md group-hover:shadow-emerald-500/10">
                      <feature.icon className="size-5 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="mt-5 font-semibold tracking-tight">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs border-emerald-500/20 bg-card/95 backdrop-blur-xl">
                  <p className="text-sm">{feature.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        {/* Premium compliance badges */}
        <motion.div
          className="mt-16 overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="flex flex-wrap items-center justify-center gap-0 p-4 md:p-0">
            {complianceBadges.map((badge, index) => (
              <div key={badge.label} className="flex items-center">
                <div className="group px-8 py-6 text-center transition-colors hover:bg-emerald-500/5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-semibold tracking-tight">{badge.label}</span>
                    {badge.color === 'emerald' && (
                      <CheckCircle2 className="size-5 text-emerald-500" />
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className={`mt-2 ${
                      badge.color === 'emerald'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : badge.color === 'amber'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                    }`}
                  >
                    {badge.status}
                  </Badge>
                </div>
                {index < complianceBadges.length - 1 && (
                  <Separator orientation="vertical" className="hidden h-16 md:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

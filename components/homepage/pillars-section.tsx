'use client'

import Link from 'next/link'
import { Shield, CheckCircle2, FileSearch, ArrowRight, Lock, Users, FileText } from 'lucide-react'
import { motion } from 'motion/react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Badge } from '@/components/ui/badge'

const pillars = [
  {
    icon: Shield,
    title: 'Secure Tool Access',
    description: 'Least privilege policies and tenant isolation. Every tool call is scoped to exactly what the agent needs—nothing more.',
    features: ['Role-based access control', 'Tenant isolation by default', 'Scoped API credentials'],
    href: '/product',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    hoverDetails: {
      subtitle: 'Zero-trust by design',
      points: [
        { icon: Lock, text: 'Every API call verified against policy' },
        { icon: Users, text: 'Per-tenant credential isolation' },
      ],
    },
  },
  {
    icon: CheckCircle2,
    title: 'Safe Actions',
    description: 'Write controls and approval workflows. High-risk actions require human approval before execution.',
    features: ['Approval workflows', 'Rate limiting', 'Break-glass procedures'],
    href: '/product',
    gradient: 'from-[var(--gradient-purple)]/20 to-[var(--gradient-pink)]/10',
    hoverDetails: {
      subtitle: 'Human-in-the-loop controls',
      points: [
        { icon: CheckCircle2, text: 'Configurable approval thresholds' },
        { icon: FileText, text: 'Full audit trail for approvals' },
      ],
    },
  },
  {
    icon: FileSearch,
    title: 'Auditability',
    description: 'Complete audit trail for compliance and debugging. Every action logged, every decision traceable.',
    features: ['Immutable audit logs', 'SIEM export ready', 'Compliance reporting'],
    href: '/product',
    gradient: 'from-[var(--gradient-teal)]/20 to-emerald-500/10',
    hoverDetails: {
      subtitle: 'Enterprise compliance ready',
      points: [
        { icon: FileSearch, text: 'SOC2-compatible logging' },
        { icon: FileText, text: 'Export to Splunk, Datadog, etc.' },
      ],
    },
  },
]

export function PillarsSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[var(--gradient-purple)]/5 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Badge variant="outline" className="mb-6 border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-emerald-400">
            Security Architecture
          </Badge>
          <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-4xl lg:text-5xl">
            Enterprise security, built in
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Three pillars that turn "security review blocker" into "security review passed."
          </p>
        </motion.div>

        {/* Pillars grid with premium cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="group relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <HoverCard openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div className="relative h-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/30 p-8 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/30 hover:bg-card/50 hover:shadow-xl hover:shadow-emerald-500/5">
                    {/* Gradient background on hover */}
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                    <div className="relative">
                      {/* Icon with enhanced styling */}
                      <div className="relative inline-flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 ring-1 ring-emerald-500/20 transition-all duration-300 group-hover:ring-emerald-500/40 group-hover:shadow-lg group-hover:shadow-emerald-500/10">
                        <pillar.icon className="size-6 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-6 text-xl font-semibold tracking-tight">{pillar.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{pillar.description}</p>

                      {/* Features list with refined styling */}
                      <ul className="mt-6 space-y-2.5">
                        {pillar.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10">
                              <div className="size-1.5 rounded-full bg-emerald-400" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Link with arrow animation */}
                      <Link
                        href={pillar.href}
                        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition-all duration-300 hover:gap-3"
                      >
                        Learn more
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </HoverCardTrigger>

                <HoverCardContent
                  className="w-80 border-emerald-500/20 bg-card/95 p-5 backdrop-blur-xl"
                  side="top"
                  sideOffset={8}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <pillar.icon className="size-4 text-emerald-400" />
                      <span className="text-sm font-semibold">{pillar.hoverDetails.subtitle}</span>
                    </div>
                    <div className="space-y-2">
                      {pillar.hoverDetails.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <point.icon className="mt-0.5 size-3.5 shrink-0 text-emerald-400/60" />
                          <span>{point.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

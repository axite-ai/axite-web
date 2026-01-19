'use client'

import { motion } from 'motion/react'
import { Bot, Shield, Database, CheckCircle2, FileText, ArrowRight, Eye, Edit3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const steps = [
  {
    icon: Bot,
    label: 'Agent Request',
    sublabel: 'ChatGPT, Claude, Gemini',
    tooltip: 'Any LLM agent can connect via MCP protocol',
    color: 'primary',
  },
  {
    icon: Shield,
    label: 'Axite Gateway',
    sublabel: 'Policy evaluation',
    tooltip: 'Real-time policy checks before any action executes',
    color: 'emerald',
  },
  {
    icon: Database,
    label: 'Connectors',
    sublabel: 'Salesforce, Jira, Slack',
    tooltip: 'Pre-built connectors with security policies included',
    color: 'primary',
  },
  {
    icon: CheckCircle2,
    label: 'Approval',
    sublabel: 'Human-in-the-loop',
    tooltip: 'Configurable approval workflows for sensitive actions',
    color: 'amber',
  },
  {
    icon: FileText,
    label: 'Audit Log',
    sublabel: 'SIEM export',
    tooltip: 'Immutable logs exported to your compliance tools',
    color: 'primary',
  },
]

export function DemoFlowSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/50 py-24 md:py-32">
      {/* Premium grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/40 via-transparent to-muted/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/[0.05] via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="outline" className="border-primary/20 bg-background/60 px-4 py-1.5 backdrop-blur-sm">
            <Shield className="mr-2 size-3.5 text-primary" />
            How It Works
          </Badge>

          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.02em] md:text-4xl lg:text-5xl">
            One gateway to secure
            <span className="relative mx-2 whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent dark:from-emerald-400 dark:to-foreground">
                everything
              </span>
            </span>
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Policy-enforced, audit-logged, approval-ready. Every agent action flows through Axite.
          </p>
        </motion.div>

        {/* Flow diagram */}
        <TooltipProvider>
          <motion.div
            className="mt-16 md:mt-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Desktop flow */}
            <div className="hidden items-center justify-between lg:flex">
              {steps.map((step, index) => (
                <div key={step.label} className="flex items-center">
                  {/* Step */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        className="group flex cursor-default flex-col items-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={`relative flex size-18 items-center justify-center rounded-2xl border-2 bg-background shadow-md transition-all duration-300 group-hover:shadow-xl ${
                          step.color === 'emerald'
                            ? 'border-emerald-500/30 group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10'
                            : step.color === 'amber'
                            ? 'border-amber-500/30 group-hover:border-amber-500/50 group-hover:shadow-amber-500/10'
                            : 'border-border group-hover:border-primary/30 group-hover:shadow-primary/10'
                        }`}>
                          {/* Glow effect for gateway */}
                          {step.color === 'emerald' && (
                            <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-emerald-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                          )}
                          <step.icon className={`relative size-7 transition-transform duration-300 group-hover:scale-110 ${
                            step.color === 'emerald'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : step.color === 'amber'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-primary'
                          }`} />
                        </div>
                        <div className="mt-4 text-center">
                          <div className="font-semibold tracking-tight">{step.label}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{step.sublabel}</div>
                        </div>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs border-primary/10 bg-card/95 backdrop-blur-xl">
                      <p className="text-sm">{step.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Animated Arrow */}
                  {index < steps.length - 1 && (
                    <div className="mx-3 flex-1 min-w-[60px]">
                      <div className="flex items-center">
                        <motion.div
                          className={`h-0.5 flex-1 ${
                            index === 0 || index === 2
                              ? 'bg-gradient-to-r from-border to-emerald-500/50'
                              : index === 1
                              ? 'bg-gradient-to-r from-emerald-500/50 to-border'
                              : 'bg-gradient-to-r from-border to-primary/30'
                          }`}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                          style={{ transformOrigin: 'left' }}
                        />
                        <ArrowRight className="size-4 text-muted-foreground/50" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile flow */}
            <div className="flex flex-col gap-3 lg:hidden">
              {steps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`group flex items-center gap-4 rounded-2xl border bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-card hover:shadow-md ${
                    step.color === 'emerald'
                      ? 'border-emerald-500/20 hover:border-emerald-500/40'
                      : step.color === 'amber'
                      ? 'border-amber-500/20 hover:border-amber-500/40'
                      : 'border-border/50 hover:border-primary/30'
                  }`}>
                    <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                      step.color === 'emerald'
                        ? 'bg-emerald-500/10 ring-1 ring-emerald-500/20'
                        : step.color === 'amber'
                        ? 'bg-amber-500/10 ring-1 ring-amber-500/20'
                        : 'bg-primary/10 ring-1 ring-primary/10'
                    }`}>
                      <step.icon className={`size-5 ${
                        step.color === 'emerald'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : step.color === 'amber'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-primary'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold tracking-tight">{step.label}</div>
                      <div className="text-sm text-muted-foreground">{step.sublabel}</div>
                    </div>
                    <div className="text-xs text-muted-foreground/50">{index + 1}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="ml-6 flex h-3 items-center">
                      <div className="h-full w-0.5 bg-gradient-to-b from-border to-border/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TooltipProvider>

        {/* Read vs Write callout - Enhanced */}
        <motion.div
          className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-emerald-500/[0.04] to-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
            {/* Corner accent */}
            <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-300 group-hover:bg-emerald-500/15" />

            <div className="relative flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                <Eye className="size-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  Read Actions
                </Badge>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Allowed by default</span> with policy-scoped data access. Agents can query CRM records, read tickets, and fetch data within their permission scope.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.08] via-amber-500/[0.04] to-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5">
            {/* Corner accent */}
            <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-amber-500/10 blur-2xl transition-all duration-300 group-hover:bg-amber-500/15" />

            <div className="relative flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20">
                <Edit3 className="size-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  Write Actions
                </Badge>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Configurable approval required.</span> Create leads, update tickets, send messages—all with optional human-in-the-loop confirmation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

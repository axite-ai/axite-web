'use client'

import { motion } from 'motion/react'
import { FileCode, Layers, Sparkles, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

const templates = [
  {
    name: 'Salesforce',
    description: 'CRM access with lead creation approvals',
    policies: ['read-contacts', 'read-opportunities', 'write-leads-approval'],
    icon: '🔵',
    details: {
      subtitle: 'Enterprise CRM integration',
      features: ['Contact & opportunity read access', 'Lead creation with approval workflow', 'Account data scoping by team'],
    },
  },
  {
    name: 'Jira',
    description: 'Issue management with status update controls',
    policies: ['read-issues', 'create-issues', 'update-status-approval'],
    icon: '🟡',
    details: {
      subtitle: 'Project management integration',
      features: ['Full issue read access', 'Issue creation with templates', 'Status transitions require approval'],
    },
  },
  {
    name: 'Slack',
    description: 'Messaging with channel and DM restrictions',
    policies: ['read-channels', 'post-messages', 'dm-approval'],
    icon: '🟣',
    details: {
      subtitle: 'Communication integration',
      features: ['Channel message read access', 'Controlled message posting', 'DM requires explicit approval'],
    },
  },
]

const features = [
  {
    icon: Sparkles,
    title: 'Salesforce, Jira, Slack included',
    description: 'Ready-to-use templates with sensible defaults and approval workflows.',
  },
  {
    icon: FileCode,
    title: 'Fully customizable',
    description: 'Extend templates or build your own. Version-controlled and auditable.',
  },
  {
    icon: Layers,
    title: 'Compounding library',
    description: 'New templates added regularly. Your unfair advantage compounds over time.',
  },
]

export function TemplatesSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-muted/20 via-transparent to-muted/20" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Templates preview */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-4">
              {templates.map((template, index) => (
                <HoverCard key={template.name} openDelay={200} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <motion.div
                      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Gradient border effect on hover */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-primary/10" />
                        <div className="absolute inset-[1px] rounded-2xl bg-card" />
                      </div>

                      <div className="relative">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{template.icon}</span>
                            <div>
                              <h3 className="font-semibold tracking-tight">{template.name}</h3>
                              <p className="mt-0.5 text-sm text-muted-foreground">{template.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="size-5 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                        </div>

                        {/* Policy tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {template.policies.map((policy) => (
                            <span
                              key={policy}
                              className={`rounded-full px-2.5 py-0.5 font-mono text-xs transition-colors duration-300 ${
                                policy.includes('approval')
                                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                  : policy.includes('read')
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              {policy}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </HoverCardTrigger>

                  <HoverCardContent
                    className="w-80 border-primary/10 bg-card/95 p-5 backdrop-blur-xl"
                    side="right"
                    sideOffset={12}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{template.icon}</span>
                        <span className="text-sm font-semibold">{template.details.subtitle}</span>
                      </div>
                      <div className="space-y-2">
                        {template.details.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 pt-2 text-xs text-primary">
                        <ExternalLink className="size-3" />
                        <span>View template documentation</span>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>

            {/* Coming soon hint */}
            <motion.div
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-dashed border-border/50 p-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex -space-x-1">
                <span className="text-sm opacity-60">📊</span>
                <span className="text-sm opacity-60">📋</span>
                <span className="text-sm opacity-60">📁</span>
              </div>
              <span className="text-sm text-muted-foreground">HubSpot, Linear, Notion + more coming soon</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="outline" className="border-primary/20 bg-background/60 px-4 py-1.5 backdrop-blur-sm">
              <Layers className="mr-2 size-3.5 text-primary" />
              Policy Templates
            </Badge>

            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.02em] md:text-4xl lg:text-5xl">
              A growing library of
              <span className="block">
                <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent dark:from-emerald-400 dark:to-foreground">
                  security templates
                </span>
              </span>
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Pre-built policy templates for common integrations. Start secure in minutes, customize as your needs evolve.
            </p>

            {/* Features list with enhanced styling */}
            <div className="mt-10 space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group flex gap-4"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/10 transition-all duration-300 group-hover:ring-primary/20 group-hover:shadow-md group-hover:shadow-primary/10">
                    <feature.icon className="size-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="font-semibold tracking-tight">{feature.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

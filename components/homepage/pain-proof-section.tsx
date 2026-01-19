'use client'

import { AlertTriangle, TrendingDown, Clock, DollarSign } from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const stats = [
  {
    icon: TrendingDown,
    value: '73%',
    label: 'of agent projects stall at compliance review',
    tooltip: 'Based on enterprise AI deployment surveys 2024',
    delay: 0.1,
  },
  {
    icon: Clock,
    value: '6-12 mo',
    label: 'typical delay for DIY security implementation',
    tooltip: 'Average time to build compliant tool access from scratch',
    delay: 0.2,
  },
  {
    icon: DollarSign,
    value: '$2M+',
    label: 'average deal value blocked by security concerns',
    tooltip: 'Enterprise contract value at risk without proper security',
    delay: 0.3,
  },
]

export function PainProofSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/50 py-20 md:py-28">
      {/* Gradient background with depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />

      {/* Subtle radial accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/[0.03] via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Enhanced pain statement card */}
          <div className="group relative max-w-2xl">
            {/* Subtle glow effect */}
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-destructive/20 via-destructive/10 to-destructive/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative overflow-hidden rounded-2xl border border-destructive/20 bg-gradient-to-br from-destructive/[0.08] via-destructive/[0.04] to-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:border-destructive/30 md:p-8">
              {/* Decorative corner accent */}
              <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-destructive/5 blur-2xl" />

              <div className="relative flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 ring-1 ring-destructive/20">
                  <AlertTriangle className="size-5 text-destructive" />
                </div>
                <div>
                  <Badge variant="outline" className="mb-3 border-destructive/30 bg-destructive/5 text-destructive">
                    The Problem
                  </Badge>
                  <p className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    Agent pilots die at security review.
                  </p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    When tool access isn't permissioned, auditable, or safe for write actions—enterprise deals get blocked indefinitely.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row with tooltips */}
          <TooltipProvider>
            <div className="mt-16 grid w-full gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
              {stats.map((stat) => (
                <Tooltip key={stat.value}>
                  <TooltipTrigger asChild>
                    <motion.div
                      className="group relative cursor-default text-center"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: stat.delay, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Hover background effect */}
                      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-muted/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative p-6">
                        {/* Icon */}
                        <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/5 ring-1 ring-primary/10 transition-all duration-300 group-hover:ring-primary/20">
                          <stat.icon className="size-4 text-primary/70" />
                        </div>

                        {/* Value with gradient */}
                        <div className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
                          {stat.value}
                        </div>

                        {/* Label */}
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="max-w-xs border-primary/10 bg-card/95 backdrop-blur-xl"
                  >
                    <p className="text-sm">{stat.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </motion.div>
      </div>
    </section>
  )
}

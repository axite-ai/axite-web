'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Shield, FileCheck, Sparkles, Lock, Zap, Eye } from 'lucide-react'
import { motion } from 'motion/react'
import { GradientText } from '@/components/shared/gradient-text'

// Feature tabs like Portkey
const featureTabs = [
  { icon: Shield, label: "Permissions", description: "Role-based tool access" },
  { icon: Lock, label: "Safe Writes", description: "Confirm before execute" },
  { icon: Eye, label: "Audit Logs", description: "Complete visibility" },
  { icon: Zap, label: "MCP Native", description: "Universal protocol" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient orbs - Portkey style */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary gradient orb - purple/teal */}
        <motion.div
          className="absolute -top-[30%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, var(--gradient-purple) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary orb - pink */}
        <motion.div
          className="absolute -right-[20%] top-[20%] h-[600px] w-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--gradient-pink) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Tertiary orb - teal (brand) */}
        <motion.div
          className="absolute -left-[10%] top-[40%] h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--gradient-teal) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

      {/* Noise texture */}
      <div className="noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-44 md:pb-32 md:pt-52 lg:pt-56">
        <div className="flex flex-col items-center text-center">
          {/* Badge with glow */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Badge
              variant="outline"
              className="group relative overflow-hidden border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10"
            >
              <Shield className="mr-2 size-4 text-emerald-400" />
              <span className="font-medium text-emerald-400">Okta for AI agents</span>
              <Sparkles className="ml-2 size-3 text-emerald-400/60" />
            </Badge>
          </motion.div>

          {/* Bold Headline with gradient */}
          <motion.h1
            className="mt-10 max-w-5xl text-balance text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Ship AI agents that take actions—
            <br />
            <GradientText variant="brand" className="whitespace-nowrap">
              and still pass enterprise security
            </GradientText>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Permissioned tool access, safe write controls, and audit-ready logs.
            Get your agent pilots through security review and into production.
          </motion.p>

          {/* CTAs with gradient button */}
          <motion.div
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Button
              size="lg"
              className="group relative h-13 overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 text-base font-medium text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-emerald-400"
              asChild
            >
              <Link href="/contact">
                <span className="relative z-10 flex items-center">
                  Book Security Review
                  <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group h-13 border-border px-8 text-base font-medium backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/5"
              asChild
            >
              <Link href="/docs">
                <FileCheck className="mr-2 size-4 transition-colors group-hover:text-emerald-400" />
                Read Documentation
              </Link>
            </Button>
          </motion.div>

          {/* Feature tabs - Portkey style */}
          <motion.div
            className="mt-16 w-full max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {featureTabs.map((tab, index) => (
                <motion.div
                  key={tab.label}
                  className="glass-card group flex flex-col items-center gap-2 p-4 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/15">
                    <tab.icon className="size-5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{tab.label}</span>
                  <span className="text-xs text-muted-foreground">{tab.description}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-sm font-medium tracking-wide text-muted-foreground/70 uppercase">
              Trusted by teams building AI agents
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="secondary" className="border border-border bg-card/50 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm">
                Enterprise SaaS
              </Badge>
              <Badge variant="secondary" className="border border-border bg-card/50 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm">
                Fintech
              </Badge>
              <Badge variant="secondary" className="border border-border bg-card/50 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm">
                Developer Tools
              </Badge>
              <Badge variant="secondary" className="border border-border bg-card/50 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm">
                Healthcare
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar, FileText, Shield, CheckCircle2, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'

const trustPoints = [
  { text: 'No credit card required', icon: CheckCircle2 },
  { text: '15-minute setup', icon: CheckCircle2 },
  { text: 'Enterprise-grade from day one', icon: Shield },
]

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Premium layered background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute left-1/3 top-0 h-[600px] w-[600px] rounded-full bg-[var(--gradient-purple)]/5 blur-[150px]" />
        <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
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
      <motion.div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge
              variant="outline"
              className="group relative overflow-hidden border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <Sparkles className="mr-2 size-4 text-emerald-500" />
              <span className="relative font-medium text-emerald-400">Get Started Today</span>
            </Badge>
          </motion.div>

          {/* Headline with gradient */}
          <motion.h2
            className="mt-8 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Ready to ship your agent
            <span className="block text-gradient-brand">
              to production?
            </span>
          </motion.h2>

          <motion.p
            className="mt-6 text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Book a security review and get your agent pilots through compliance in weeks, not months. Join teams shipping enterprise-ready AI agents with confidence.
          </motion.p>

          {/* Premium CTAs */}
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              size="lg"
              className="group relative h-14 overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 text-base font-medium text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-emerald-400"
              asChild
            >
              <Link href="/contact">
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <Calendar className="mr-2 size-5" />
                <span className="relative">Book Security Review</span>
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group h-14 border-border px-8 text-base font-medium backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/5"
              asChild
            >
              <Link href="/docs">
                <FileText className="mr-2 size-4 transition-colors group-hover:text-emerald-400" />
                View Documentation
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {trustPoints.map((point, index) => (
              <motion.div
                key={point.text}
                className="flex items-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <point.icon className="size-4 text-emerald-500" />
                <span>{point.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="mx-auto mt-16 max-w-lg"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="mt-6 text-center text-xs text-muted-foreground/60">
            Trusted by security-conscious teams building the next generation of AI agents
          </p>
        </motion.div>
      </div>
    </section>
  )
}

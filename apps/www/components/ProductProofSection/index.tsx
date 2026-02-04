'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue } from 'framer-motion'
import { cn, Badge } from 'ui'
import SectionContainer from '~/components/Layouts/SectionContainer'
import Panel from '~/components/Panel'
import Link from 'next/link'
import { INITIAL_BOTTOM, getAnimation } from '~/lib/animations'

// =============================================================================
// STAGE DEFINITIONS
// =============================================================================

const STAGES = [
  { id: 'tool-call', label: 'Tool Call' },
  { id: 'policy', label: 'Policy' },
  { id: 'approval', label: 'Approval' },
  { id: 'execute', label: 'Execute' },
  { id: 'receipt', label: 'Receipt' },
] as const

const STAGE_DURATION = 3000
const HOVER_SPEED = 0.3

// =============================================================================
// STAGE CONTENT COMPONENTS
// =============================================================================

const contentTransition = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.24, 0.25, 0.05, 1] } },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.2, ease: [0.24, 0.25, 0.05, 1] } },
}

const CodeLine = ({ dimmed, children }: { dimmed?: boolean; children: React.ReactNode }) => (
  <div className={cn('font-mono text-xs sm:text-sm leading-relaxed', dimmed ? 'text-foreground-muted' : 'text-foreground-light')}>
    {children}
  </div>
)

const StageToolCall = () => (
  <motion.div {...contentTransition} className="space-y-4">
    <div className="flex items-center gap-3 mb-5">
      <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
      <span className="font-mono text-xs text-foreground-muted uppercase tracking-wider">Incoming request</span>
    </div>
    <div className="bg-surface-200/50 border border-border-muted rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-foreground-muted select-none">$</span>
        <span className="font-mono text-sm text-brand">k8s:deploy</span>
      </div>
      <div className="h-px bg-border-muted/50 my-2" />
      <div className="font-mono text-xs sm:text-sm text-foreground-lighter space-y-1 pl-4">
        <div>
          <span className="text-foreground-muted">{'{'}</span>
        </div>
        <div className="pl-3">
          <span className="text-brand/80">"image"</span>
          <span className="text-foreground-muted">: </span>
          <span className="text-foreground-light">"app:v2.4.1"</span>
          <span className="text-foreground-muted">,</span>
        </div>
        <div className="pl-3">
          <span className="text-brand/80">"namespace"</span>
          <span className="text-foreground-muted">: </span>
          <span className="text-foreground-light">"production"</span>
        </div>
        <div>
          <span className="text-foreground-muted">{'}'}</span>
        </div>
      </div>
    </div>
  </motion.div>
)

const StagePolicyGate = () => (
  <motion.div {...contentTransition} className="space-y-4">
    <div className="flex items-center gap-3 mb-5">
      <div className="h-2 w-2 rounded-full bg-brand" />
      <span className="font-mono text-xs text-foreground-muted uppercase tracking-wider">Evaluating policies</span>
    </div>
    <div className="space-y-3">
      {/* RBAC check */}
      <div className="bg-surface-200/50 border border-border-muted rounded-lg p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider shrink-0 w-10">RBAC</span>
            <span className="font-mono text-xs sm:text-sm text-foreground-light truncate">
              deployer <span className="text-foreground-muted mx-1">{'->'}</span> write
            </span>
          </div>
          <Badge variant="default" className="text-[10px] px-1.5 shrink-0">PASS</Badge>
        </div>
      </div>
      {/* Policy check */}
      <div className="bg-surface-200/50 border border-border-muted rounded-lg p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider shrink-0 w-10">Policy</span>
            <span className="font-mono text-xs sm:text-sm text-foreground-light truncate">require-approval</span>
          </div>
          <Badge variant="warning" className="text-[10px] px-1.5 shrink-0">REVIEW</Badge>
        </div>
        <div className="mt-2 pt-2 border-t border-border-muted/50">
          <span className="font-mono text-[11px] text-foreground-muted">
            namespace: production <span className="text-foreground-muted/60 mx-1">{'->'}</span> requires human review
          </span>
        </div>
      </div>
    </div>
  </motion.div>
)

const StageApproval = () => {
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setApproved(true), 1400)
    return () => {
      clearTimeout(timer)
      setApproved(false)
    }
  }, [])

  return (
    <motion.div {...contentTransition} className="space-y-4">
      <div className="flex items-center gap-3 mb-5">
        <div className={cn('h-2 w-2 rounded-full', approved ? 'bg-brand' : 'bg-warning animate-pulse')} />
        <span className="font-mono text-xs text-foreground-muted uppercase tracking-wider">
          {approved ? 'Decision recorded' : 'Awaiting approval'}
        </span>
      </div>
      <div className="bg-surface-200/50 border border-border-muted rounded-lg p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider shrink-0 w-12">Action</span>
            <span className="font-mono text-xs sm:text-sm text-foreground-light">k8s:deploy (app:v2.4.1 {'->'} production)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider shrink-0 w-12">Reason</span>
            <span className="font-mono text-xs sm:text-sm text-foreground-lighter">Production deployments require review</span>
          </div>
        </div>
        <div className="h-px bg-border-muted/50" />
        <AnimatePresence mode="wait">
          {!approved ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex items-center gap-2 pt-1"
            >
              <motion.button
                animate={{
                  boxShadow: [
                    '0 0 0 0 hsl(var(--brand-default) / 0)',
                    '0 0 0 4px hsl(var(--brand-default) / 0.15)',
                    '0 0 0 0 hsl(var(--brand-default) / 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="px-4 py-1.5 rounded-md bg-brand text-background font-mono text-xs uppercase tracking-wider"
              >
                Approve
              </motion.button>
              <button className="px-4 py-1.5 rounded-md border border-border-muted text-foreground-muted font-mono text-xs uppercase tracking-wider">
                Deny
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="approved"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
              className="flex items-center gap-2 pt-1"
            >
              <div className="flex items-center gap-2 text-brand">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <motion.path
                    d="M3 8.5L6.5 12L13 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </svg>
                <span className="font-mono text-xs uppercase tracking-wider">Approved</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const StageExecution = () => {
  const [phase, setPhase] = useState<'running' | 'done'>('running')

  useEffect(() => {
    const timer = setTimeout(() => setPhase('done'), 800)
    return () => {
      clearTimeout(timer)
      setPhase('running')
    }
  }, [])

  return (
    <motion.div {...contentTransition} className="space-y-4">
      <div className="flex items-center gap-3 mb-5">
        <div className={cn('h-2 w-2 rounded-full', phase === 'done' ? 'bg-brand' : 'bg-brand animate-pulse')} />
        <span className="font-mono text-xs text-foreground-muted uppercase tracking-wider">
          {phase === 'done' ? 'Execution complete' : 'Executing action'}
        </span>
      </div>
      <div className="bg-surface-200/50 border border-border-muted rounded-lg p-4 space-y-3">
        <AnimatePresence mode="wait">
          {phase === 'running' ? (
            <motion.div
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="h-3.5 w-3.5 rounded-full border-2 border-brand border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
                <span className="font-mono text-xs sm:text-sm text-foreground-light">
                  Calling kubectl apply -f deployment.yaml...
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1 bg-surface-300 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand shrink-0" viewBox="0 0 16 16" fill="none">
                  <motion.path
                    d="M3 8.5L6.5 12L13 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </svg>
                <span className="font-mono text-xs sm:text-sm text-foreground-light">Action executed</span>
              </div>
              <div className="pl-6 space-y-1">
                <CodeLine dimmed>
                  Duration: <span className="text-foreground-light">1.2s</span>
                </CodeLine>
                <CodeLine dimmed>
                  Result: <span className="text-foreground-light">deployment/app scaled to 3 replicas</span>
                </CodeLine>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const StageReceipt = () => (
  <motion.div {...contentTransition} className="space-y-4">
    <div className="flex items-center gap-3 mb-5">
      <div className="h-2 w-2 rounded-full bg-brand" />
      <span className="font-mono text-xs text-foreground-muted uppercase tracking-wider">Signed receipt</span>
    </div>
    <div className="bg-surface-200/50 border border-border-muted rounded-lg p-4">
      <div className="space-y-2.5">
        {[
          { key: 'trace_id', value: 'tr_8x2k4m9n1p' },
          { key: 'decision', value: 'APPROVED', highlight: true },
          { key: 'hmac', value: 'sha256:7f3a...e91d' },
          { key: 'timestamp', value: '2025-01-15T14:32:07Z' },
        ].map((row, i) => (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.25, ease: [0.24, 0.25, 0.05, 1] }}
            className="flex items-baseline gap-4"
          >
            <span className="font-mono text-[10px] sm:text-xs text-foreground-muted w-20 sm:w-24 shrink-0 text-right">{row.key}</span>
            <span className={cn(
              'font-mono text-xs sm:text-sm',
              row.highlight ? 'text-brand' : 'text-foreground-light'
            )}>
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>
      {/* HMAC seal visual */}
      <div className="mt-4 pt-3 border-t border-border-muted/50 flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-brand shrink-0" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L2 4v4c0 3.3 2.6 6.4 6 7 3.4-.6 6-3.7 6-7V4L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-mono text-[10px] text-foreground-muted">Tamper-evident receipt sealed</span>
      </div>
    </div>
  </motion.div>
)

const STAGE_COMPONENTS = [StageToolCall, StagePolicyGate, StageApproval, StageExecution, StageReceipt]

// =============================================================================
// VERTICAL STEPPER (DESKTOP) & MOBILE DOT INDICATORS
// =============================================================================

const VerticalStepper = ({ activeIndex }: { activeIndex: number }) => (
  <div className="flex flex-col gap-0 h-full justify-center">
    {STAGES.map((stage, i) => {
      const isActive = i === activeIndex
      const isVisited = i < activeIndex

      return (
        <div key={stage.id}>
          <div className="flex items-center gap-3">
            {/* Node circle - opaque bg, no line bleed */}
            <div
              className={cn(
                'relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300',
                isActive
                  ? 'border-brand bg-brand'
                  : isVisited
                    ? 'border-brand bg-surface-75'
                    : 'border-border-muted bg-surface-200'
              )}
            >
              {isVisited && (
                <svg className="w-3 h-3 text-brand" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {isActive && <div className="w-2 h-2 rounded-full bg-background" />}
            </div>
            {/* Label */}
            <span
              className={cn(
                'font-mono text-xs whitespace-nowrap transition-colors duration-300',
                isActive ? 'text-brand' : isVisited ? 'text-foreground-light' : 'text-foreground-muted'
              )}
            >
              {stage.label}
            </span>
          </div>
          {/* Connecting line between nodes (not after last) */}
          {i < STAGES.length - 1 && (
            <div className="ml-[11px] w-px h-6 bg-border-muted relative">
              {i < activeIndex && <div className="absolute inset-0 bg-brand" />}
            </div>
          )}
        </div>
      )
    })}
  </div>
)

const MobileDots = ({ activeIndex }: { activeIndex: number }) => (
  <div className="flex items-center justify-center gap-4 p-4 border-b border-border-muted">
    {STAGES.map((stage, i) => (
      <div
        key={stage.id}
        className={cn(
          'w-3 h-3 rounded-full transition-colors duration-300',
          i === activeIndex ? 'bg-brand' : i < activeIndex ? 'bg-brand/50' : 'bg-border-muted'
        )}
      />
    ))}
  </div>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const ProductProofSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.2 })
  const [activeStage, setActiveStage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const progressValue = useMotionValue('0%')
  const progressRef = useRef(0)
  const speedRef = useRef(1)
  const rafRef = useRef<number>()
  const lastFrameRef = useRef<number | null>(null)

  speedRef.current = isHovered ? HOVER_SPEED : 1

  // Auto-advance through stages with rAF for smooth progress
  useEffect(() => {
    if (!isInView) {
      progressRef.current = 0
      progressValue.set('0%')
      return
    }

    const tick = (time: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = time
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const delta = time - lastFrameRef.current
      lastFrameRef.current = time

      progressRef.current += (delta / STAGE_DURATION) * speedRef.current

      if (progressRef.current >= 1) {
        progressRef.current = 0
        progressValue.set('0%')
        lastFrameRef.current = null
        setActiveStage(s => (s + 1) % STAGES.length)
        return
      }

      progressValue.set(`${progressRef.current * 100}%`)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastFrameRef.current = null
    }
  }, [isInView, activeStage])

  const ActiveContent = STAGE_COMPONENTS[activeStage]

  return (
    <SectionContainer>
      <motion.div
        initial={INITIAL_BOTTOM}
        animate={getAnimation({ delay: 0.1 })}
      >
        {/* Section header */}
        <div className="max-w-xl mb-8 lg:mb-12">
          <span className="font-mono text-xs text-brand uppercase tracking-widest">
            See it work
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mt-3">
            One tool call, end to end
          </h2>
        </div>

        {/* Main pipeline visualization */}
        <div
          ref={ref}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Panel
            outerClassName="w-full"
            innerClassName="p-0 overflow-hidden"
            hasShimmer
            hasActiveOnHover
            activeColor="brand"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[400px]">
              {/* Mobile: horizontal dot indicators */}
              <div className="lg:hidden">
                <MobileDots activeIndex={activeStage} />
              </div>

              {/* Desktop: vertical stepper sidebar */}
              <div className="hidden lg:flex flex-col justify-center border-r border-border-muted p-6 bg-surface-75">
                <VerticalStepper activeIndex={activeStage} />
              </div>

              {/* Stage content area */}
              <div className="relative flex-1 flex flex-col justify-center p-6 sm:p-8">
                <div className="max-w-lg">
                  <AnimatePresence mode="wait">
                    <ActiveContent key={activeStage} />
                  </AnimatePresence>
                </div>

                {/* Progress bar at bottom of content area */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-surface-300">
                  <motion.div
                    className="h-full bg-brand/60"
                    style={{ width: progressValue }}
                  />
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Demo link */}
        <div className="mt-6">
          <Link
            href="/demo"
            className="text-brand hover:text-brand-400 transition-colors text-sm inline-flex items-center gap-1.5 group/link"
          >
            Try the full interactive demo
            <span className="transition-transform group-hover/link:translate-x-0.5">{'->'}</span>
          </Link>
        </div>
      </motion.div>
    </SectionContainer>
  )
}

export default ProductProofSection

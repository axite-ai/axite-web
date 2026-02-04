'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion, useInView, useAnimation, LazyMotion, domAnimation, m } from 'framer-motion'
import { useBreakpoint } from 'common'
import { Swiper, SwiperSlide } from 'swiper/react'
import { cn, Badge } from 'ui'
import { Check, Shield, Bot } from 'lucide-react'
import dayjs from 'dayjs'
import SectionContainer from '~/components/Layouts/SectionContainer'
import Panel from '~/components/Panel'

import 'swiper/css'

// =============================================================================
// INTERCEPT VISUALIZATION
// =============================================================================

const interceptedCalls = [
  { tool: 'stripe:refund', params: '{ amount: 847 }', env: 'production' },
  { tool: 'kubectl:apply', params: '{ manifest: deploy.yml }', env: 'production' },
  { tool: 'terraform:plan', params: '{ workspace: prod }', env: 'production' },
  { tool: 'aws:s3_delete', params: '{ bucket: logs-2024 }', env: 'staging' },
  { tool: 'github:merge', params: '{ pr: 1482 }', env: 'production' },
]

const InterceptViz = ({ isActive, isInView }: { isActive?: boolean; isInView?: boolean }) => {
  const [mounted, setMounted] = useState(false)
  const isPlaying = isActive && isInView
  const [callIndex, setCallIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCallIndex(prev => (prev + 1) % interceptedCalls.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying])

  if (!mounted) return null

  const currentCall = interceptedCalls[callIndex]

  return (
    <div className="absolute inset-0 bottom-8 overflow-hidden px-4 flex flex-col items-center justify-center">
      {/* Connection diagram */}
      <div className="relative w-full flex items-center justify-between px-4 mb-8">
        {/* Agent node */}
        <div className="flex flex-col items-center gap-1.5 z-10">
          <div className="w-10 h-10 rounded-full bg-surface-200 border border-border flex items-center justify-center">
            <Bot className="w-5 h-5 text-foreground-muted" />
          </div>
          <span className="font-mono text-xs text-foreground-muted">Agent</span>
        </div>

        {/* Dashed line with animated dot */}
        <div className="absolute left-16 right-16 top-5 flex items-center">
          <div className="w-full border-t border-dashed border-border-muted" />
          {isPlaying && (
            <motion.div
              className="absolute w-2 h-2 bg-brand rounded-full"
              animate={{ left: ['0%', '100%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>

        {/* Gateway node */}
        <div className="flex flex-col items-center gap-1.5 z-10">
          <div className="w-10 h-10 rounded-full bg-surface-200 border border-brand/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-brand" />
          </div>
          <span className="font-mono text-xs text-foreground-muted">Gateway</span>
        </div>
      </div>

      {/* Intercepted call details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={callIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-xs space-y-1 bg-surface-100 border border-border/50 rounded-md px-3 py-2.5"
        >
          <div className="font-mono text-xs text-foreground-light">
            <span className="text-brand">{currentCall.tool}</span>
            <span className="text-foreground-muted"> {currentCall.params}</span>
          </div>
          <div className="font-mono text-xs text-foreground-muted">
            env: {currentCall.env}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// =============================================================================
// REALTIME POLICY LOGS
// =============================================================================

const policyActions = [
  { tool: 'aws:delete_bucket', status: 'BLOCK' },
  { tool: 'zendesk:update_ticket', status: 'ALLOW' },
  { tool: 'file:read_secrets', status: 'BLOCK' },
  { tool: 'github:create_pr', status: 'ALLOW' },
  { tool: 'slack:post_message', status: 'ALLOW' },
  { tool: 'stripe:refund', status: 'REVIEW' },
  { tool: 'notion:delete_page', status: 'BLOCK' },
  { tool: 'jira:create_issue', status: 'ALLOW' },
  { tool: 'db:drop_table', status: 'BLOCK' },
  { tool: 'email:send_bulk', status: 'REVIEW' },
]

function createPolicyLog(offset?: number) {
  const t = new Date()
  t.setSeconds(t.getSeconds() - (offset ?? 0))
  const action = policyActions[Math.floor(Math.random() * policyActions.length)]

  return {
    id: crypto.randomUUID(),
    timestamp: t,
    ...action,
  }
}

const PolicyLogs = ({ isActive, isInView }: { isActive?: boolean; isInView?: boolean }) => {
  const [mounted, setMounted] = useState(false)
  const isPlaying = isActive && isInView
  const INTERVAL = 550

  const [activeLogs, setActiveLogs] = useState(() =>
    Array.from({ length: 10 }, (_, i) => createPolicyLog(i * 1000))
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      if (Math.random() > 0.6) return
      setActiveLogs(prev => [createPolicyLog(), ...prev.slice(0, 14)])
    }, INTERVAL)

    return () => clearInterval(interval)
  }, [isPlaying])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 bottom-8 overflow-hidden">
      <div className="absolute z-20 pointer-events-none inset-0 top-auto h-32 bg-[linear-gradient(to_top,hsl(var(--background-surface-75))_0%,transparent_100%)]" />
      <motion.ul
        layout
        transition={{ delay: -0.22, duration: 0.1, staggerChildren: 0.2 }}
        className="relative z-10 w-full h-auto flex flex-col px-4 overflow-y-auto"
      >
        <AnimatePresence>
          {activeLogs.map((log, i) => (
            <motion.li
              layout
              key={log.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.03, duration: 0.15 } }}
              className="py-2 md:px-4 pointer-events-auto border-b border-border/50 hover:bg-selection/20 first:border-t w-full font-mono text-xs flex gap-4 items-center"
            >
              <span className="shrink-0 text-foreground-muted">{dayjs(log.timestamp).format('D MMM HH:mm:ss')}</span>
              <span>
                <Badge
                  variant={log.status === 'ALLOW' ? 'default' : log.status === 'BLOCK' ? 'destructive' : 'warning'}
                  className="text-[10px] px-1.5"
                >
                  {log.status}
                </Badge>
              </span>
              <span className="truncate text-foreground-light">{log.tool}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

// =============================================================================
// APPROVAL VISUALIZATION
// =============================================================================

const ApprovalViz = ({ isActive, isInView }: { isActive?: boolean; isInView?: boolean }) => {
  const [mounted, setMounted] = useState(false)
  const isPlaying = isActive && isInView
  const [phase, setPhase] = useState<'form' | 'highlight' | 'click' | 'approved'>('form')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      setPhase('form')
      return
    }

    let timeout: ReturnType<typeof setTimeout>

    const runCycle = () => {
      setPhase('form')

      timeout = setTimeout(() => {
        setPhase('highlight')

        timeout = setTimeout(() => {
          setPhase('click')

          timeout = setTimeout(() => {
            setPhase('approved')

            timeout = setTimeout(() => {
              runCycle()
            }, 2000)
          }, 800)
        }, 1000)
      }, 2000)
    }

    runCycle()

    return () => clearTimeout(timeout)
  }, [isPlaying])

  if (!mounted) return null

  const isApproved = phase === 'approved'

  return (
    <div className="absolute inset-0 bottom-8 overflow-hidden px-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-surface-100 border border-border/50 rounded-md overflow-hidden">
        {/* Header */}
        <div className="px-3 py-2 border-b border-border/50">
          <span className="font-mono text-xs text-warning">Approval Required</span>
        </div>

        {/* Body */}
        <div className="px-3 py-3 space-y-2">
          <div className="font-mono text-xs">
            <span className="text-foreground-muted">Action: </span>
            <span className="text-foreground-light">k8s:deploy (app:v2.4.1 {'->'} production)</span>
          </div>
          <div className="font-mono text-xs">
            <span className="text-foreground-muted">Reason: </span>
            <span className="text-foreground-light">Production deployments require review</span>
          </div>
          <div className="font-mono text-xs">
            <span className="text-foreground-muted">Rule: </span>
            <span className="text-foreground-light">require-approval-prod-001</span>
          </div>
        </div>

        {/* Actions / Result */}
        <div className="px-3 py-2.5 border-t border-border/50">
          <AnimatePresence mode="wait">
            {!isApproved ? (
              <motion.div
                key="buttons"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2"
              >
                <motion.div
                  animate={
                    phase === 'highlight'
                      ? { opacity: [0.7, 1, 0.7], scale: [1, 1.03, 1] }
                      : phase === 'click'
                        ? { scale: [1, 0.92, 1.05, 1] }
                        : {}
                  }
                  transition={
                    phase === 'highlight'
                      ? { duration: 1, repeat: Infinity }
                      : phase === 'click'
                        ? { duration: 0.4 }
                        : {}
                  }
                  className="px-3 py-1.5 bg-brand text-white text-xs font-mono rounded cursor-default"
                >
                  APPROVE
                </motion.div>
                <div className="px-3 py-1.5 bg-surface-200 text-foreground-muted text-xs font-mono rounded cursor-default">
                  DENY
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="receipt"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand" />
                  <span className="font-mono text-xs text-brand">Approved</span>
                </div>
                <div className="font-mono text-[10px] text-foreground-muted leading-relaxed">
                  Receipt: sha256:7f3a...e91d (15m TTL, 3 uses)
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// EVIDENCE VISUALIZATION
// =============================================================================

const evidenceEntries = [
  { traceId: 'tr_8x2k4m9n1p', decision: 'APPROVED', actor: 'ops-lead@acme.com', hmac: 'sha256:7f3a...e91d' },
  { traceId: 'tr_3j7m2p5q8r', decision: 'ALLOW', actor: 'policy-engine', hmac: 'sha256:2b4c...f8a3' },
  { traceId: 'tr_9d1f4h6k2n', decision: 'BLOCK', actor: 'policy-engine', hmac: 'sha256:c5e7...3d2a' },
  { traceId: 'tr_5g8j1m3p6r', decision: 'APPROVED', actor: 'admin@acme.com', hmac: 'sha256:1a9b...7c4e' },
  { traceId: 'tr_2c4f7h9k1m', decision: 'ALLOW', actor: 'policy-engine', hmac: 'sha256:8d6f...2e5a' },
  { traceId: 'tr_6e9h2k4m7p', decision: 'BLOCK', actor: 'policy-engine', hmac: 'sha256:4b3c...9f1d' },
]

function createEvidenceEntry(offset?: number) {
  const t = new Date()
  t.setSeconds(t.getSeconds() - (offset ?? 0))
  const entry = evidenceEntries[Math.floor(Math.random() * evidenceEntries.length)]

  return {
    id: crypto.randomUUID(),
    timestamp: t,
    ...entry,
  }
}

const EvidenceViz = ({ isActive, isInView }: { isActive?: boolean; isInView?: boolean }) => {
  const [mounted, setMounted] = useState(false)
  const isPlaying = isActive && isInView
  const INTERVAL = 800

  const [activeEntries, setActiveEntries] = useState(() =>
    Array.from({ length: 8 }, (_, i) => createEvidenceEntry(i * 1000))
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      if (Math.random() > 0.5) return
      setActiveEntries(prev => [createEvidenceEntry(), ...prev.slice(0, 12)])
    }, INTERVAL)

    return () => clearInterval(interval)
  }, [isPlaying])

  if (!mounted) return null

  const decisionVariant = (decision: string) => {
    if (decision === 'BLOCK') return 'destructive'
    if (decision === 'APPROVED') return 'success'
    return 'default'
  }

  return (
    <div className="absolute inset-0 bottom-8 overflow-hidden">
      <div className="absolute z-20 pointer-events-none inset-0 top-auto h-32 bg-[linear-gradient(to_top,hsl(var(--background-surface-75))_0%,transparent_100%)]" />
      <motion.ul
        layout
        transition={{ delay: -0.22, duration: 0.1, staggerChildren: 0.2 }}
        className="relative z-10 w-full h-auto flex flex-col px-4 overflow-y-auto"
      >
        <AnimatePresence>
          {activeEntries.map((entry, i) => (
            <motion.li
              layout
              key={entry.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.03, duration: 0.15 } }}
              className="py-2 md:px-4 pointer-events-auto border-b border-border/50 hover:bg-selection/20 first:border-t w-full font-mono text-xs space-y-0.5"
            >
              {/* Line 1: trace_id + decision + timestamp */}
              <div className="flex items-center gap-3">
                <span className="shrink-0 text-foreground-muted">{entry.traceId}</span>
                <Badge
                  variant={decisionVariant(entry.decision)}
                  className="text-[10px] px-1.5"
                >
                  {entry.decision}
                </Badge>
                <span className="ml-auto shrink-0 text-foreground-muted">
                  {dayjs(entry.timestamp).format('HH:mm:ss')}
                </span>
              </div>
              {/* Line 2: actor + hmac */}
              <div className="flex items-center gap-3 text-foreground-muted">
                <span className="truncate">{entry.actor}</span>
                <span className="ml-auto shrink-0">{entry.hmac}</span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

// =============================================================================
// TIMED PANEL (matching Axite exactly)
// =============================================================================

interface PanelProps {
  id: string
  label: string | React.ReactNode
  paragraph?: string
  icon?: React.ReactNode
  isActive?: boolean
  isInView?: boolean
  onClick?: VoidFunction
  progress?: number | undefined
  intervalDuration?: number
  image?: any
}

const TimedPanel = ({
  isActive,
  label,
  paragraph,
  onClick,
  progress,
  intervalDuration,
  image,
  isInView,
}: PanelProps) => {
  const isSm = useBreakpoint()
  const Image: any = image ?? null

  return (
    <button
      onMouseEnter={() => !isSm && onClick && onClick()}
      onClick={() => isSm && onClick && onClick()}
      className={cn(
        'relative hover:text-foreground w-full h-[500px] text-left text-lg flex flex-col group transition-all',
        isActive ? 'text-foreground md:flex-[2]' : 'text-foreground-light md:flex-[1]'
      )}
      aria-selected={isActive}
      role="tab"
    >
      <Panel outerClassName="w-full h-full mb-4" innerClassName="p-4">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <h3
            className={cn(
              'font-mono text-sm uppercase transition-colors',
              isActive && 'text-foreground'
            )}
          >
            {label}
          </h3>
          <p
            className={cn(
              'pt-2 text-foreground-lighter text-sm max-w-[220px] md:opacity-0 transition-opacity lg:opacity-100',
              isActive && '!opacity-100'
            )}
          >
            {paragraph}
          </p>
        </div>
        <div
          className={cn(
            'absolute h-[calc(100%-150px)] mt-14 inset-0 m-auto flex items-center justify-center transition-opacity',
            isActive ? 'opacity-100' : 'opacity-25'
          )}
        >
          <div
            className={cn(
              'absolute z-20 w-full h-full inset-0 bg-gradient-to-r from-transparent to-background-surface-100 transition-opacity pointer-events-none',
              isActive && 'opacity-0'
            )}
          />
          <Image isActive={isActive} isInView={isInView} />
        </div>
      </Panel>
      {!isSm && isActive && (
        <div className="opacity-0 animate-fade-in absolute bottom-0 w-full h-[1px] bg-border-strong group-hover:opacity-100 rounded-full overflow-hidden">
          <LazyMotion features={domAnimation}>
            <m.div
              className={cn(
                'absolute inset-0 w-full right-full bg-foreground h-full transition-opacity',
                progress! > 99.7 ? 'opacity-0' : 'opacity-100'
              )}
              style={{ x: `${progress! - 100}%` }}
              transition={{ duration: intervalDuration }}
            />
          </LazyMotion>
        </div>
      )}
    </button>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const panels = [
  {
    id: 'intercept',
    label: '1. Intercept',
    paragraph: 'Agent issues a tool call. Axite intercepts it at the gateway before execution. Deploy as an MCP gateway or CI/CD execution gate.',
    image: InterceptViz,
  },
  {
    id: 'evaluate',
    label: '2. Evaluate',
    paragraph: 'RBAC checks identity. Policy engine evaluates rules. Decision: allow, block, or review.',
    image: PolicyLogs,
  },
  {
    id: 'approve',
    label: '3. Approve',
    paragraph: 'Flagged actions pause for human review. Approval is HMAC-signed and bound to the original request.',
    image: ApprovalViz,
  },
  {
    id: 'evidence',
    label: '4. Evidence',
    paragraph: 'Signed receipt with full decision trace. Tamper-evident timeline exportable as JSON.',
    image: EvidenceViz,
  },
]

const HowItWorksSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-25%' })
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(0)
  const [apiSwiper, setApiSwiper] = useState<any>(undefined)
  const controls = useAnimation()
  const intervalDuration = 10
  const updateFrequency = 10

  useEffect(() => {
    if (!apiSwiper) return
    apiSwiper.slideTo(activeTab)
  }, [activeTab, apiSwiper])

  const restartInterval = (tabIndex: number) => {
    setProgress(0)
    setActiveTab(tabIndex)
  }

  const animation = {
    width: '100%',
    transition: { duration: intervalDuration, ease: 'linear' },
  }

  useEffect(() => {
    if (!isInView) {
      controls.stop()
      setProgress(progress)
      return
    }

    const progressIncrement = (100 / intervalDuration) * (updateFrequency / 1000)
    controls.start(animation)
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + progressIncrement) % 101)
    }, updateFrequency)

    return () => {
      clearInterval(progressInterval)
      setProgress(0)
    }
  }, [isInView])

  useEffect(() => {
    if (progress >= 100.9) {
      setActiveTab((prevActiveTab) => (prevActiveTab === panels.length - 1 ? 0 : prevActiveTab + 1))
    }
  }, [progress])

  const handleTabClick = (tabIndex: number) => {
    if (tabIndex === activeTab) return
    restartInterval(tabIndex)
  }

  return (
    <SectionContainer>
      {/* Section header */}
      <div className="max-w-xl mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-4">
          How it works
        </h2>
        <p className="text-foreground-lighter text-lg">
          Four stages. Every tool call. Fully auditable.
        </p>
      </div>

      {/* Timed panels */}
      <div ref={ref} className="flex flex-col gap-8 xl:gap-32 justify-between">
        <div className="hidden md:flex gap-4" role="tablist">
          {panels.map((panel, index) => (
            <TimedPanel
              key={index}
              isActive={index === activeTab}
              isInView={isInView}
              onClick={() => handleTabClick(index)}
              progress={index === activeTab ? progress : undefined}
              intervalDuration={intervalDuration}
              {...panel}
            />
          ))}
        </div>
        <div className="md:hidden relative w-full lg:w-1/2 min-h-[300px] overflow-visible">
          <Swiper
            onSwiper={setApiSwiper}
            style={{ zIndex: 0, overflow: 'visible' }}
            initialSlide={0}
            spaceBetween={10}
            onSlideChange={(s) => handleTabClick(s.activeIndex)}
            slidesPerView={1.1}
            speed={300}
          >
            {panels.map((panel, index) => (
              <SwiperSlide key={index}>
                <TimedPanel
                  isActive={index === activeTab}
                  isInView={isInView}
                  onClick={() => handleTabClick(index)}
                  progress={index === activeTab ? progress : undefined}
                  intervalDuration={intervalDuration}
                  {...panel}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </SectionContainer>
  )
}

export default HowItWorksSection

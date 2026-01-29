'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion, useInView, useAnimation, LazyMotion, domAnimation, m } from 'framer-motion'
import { useBreakpoint } from 'common'
import { Swiper, SwiperSlide } from 'swiper/react'
import { cn, Badge } from 'ui'
import { Check, X, Clock } from 'lucide-react'
import dayjs from 'dayjs'
import SectionContainer from '~/components/Layouts/SectionContainer'
import Panel from '~/components/Panel'

import 'swiper/css'

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
// IDENTITY & ACCESS TABLE
// =============================================================================

const agents = [
  { name: 'support-bot', read: true, write: false, delete: false, admin: false },
  { name: 'data-agent', read: true, write: true, delete: false, admin: false },
  { name: 'admin-agent', read: true, write: true, delete: true, admin: true },
  { name: 'sales-bot', read: true, write: false, delete: false, admin: false },
  { name: 'deploy-agent', read: true, write: true, delete: false, admin: false },
]

const IdentityAccess = ({ isActive, isInView }: { isActive?: boolean; isInView?: boolean }) => {
  const [mounted, setMounted] = useState(false)
  const isPlaying = isActive && isInView
  const [activeRow, setActiveRow] = useState(-1)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const interval = setInterval(() => {
      setActiveRow(prev => (prev + 1) % agents.length)
    }, 1500)

    return () => clearInterval(interval)
  }, [isPlaying])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 bottom-8 overflow-hidden px-4">
      <div className="absolute z-20 pointer-events-none inset-0 top-auto h-32 bg-[linear-gradient(to_top,hsl(var(--background-surface-75))_0%,transparent_100%)]" />
      <div className="relative z-10 w-full font-mono text-xs">
        {/* Header */}
        <div className="grid grid-cols-5 gap-2 py-2 border-b border-border/50 text-foreground-muted">
          <span>Agent</span>
          <span className="text-center">Read</span>
          <span className="text-center">Write</span>
          <span className="text-center">Delete</span>
          <span className="text-center">Admin</span>
        </div>
        {/* Rows */}
        {agents.map((agent, i) => (
          <motion.div
            key={agent.name}
            animate={{
              backgroundColor: activeRow === i ? 'hsl(var(--background-selection) / 0.3)' : 'transparent'
            }}
            className="grid grid-cols-5 gap-2 py-2.5 border-b border-border/50 items-center"
          >
            <span className="text-foreground-light truncate">{agent.name}</span>
            <span className="flex justify-center">
              {agent.read ? <Check className="w-3.5 h-3.5 text-brand" /> : <X className="w-3.5 h-3.5 text-foreground-muted" />}
            </span>
            <span className="flex justify-center">
              {agent.write ? <Check className="w-3.5 h-3.5 text-brand" /> : <X className="w-3.5 h-3.5 text-foreground-muted" />}
            </span>
            <span className="flex justify-center">
              {agent.delete ? <Check className="w-3.5 h-3.5 text-brand" /> : <X className="w-3.5 h-3.5 text-foreground-muted" />}
            </span>
            <span className="flex justify-center">
              {agent.admin ? <Check className="w-3.5 h-3.5 text-brand" /> : <X className="w-3.5 h-3.5 text-foreground-muted" />}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// AUDIT TRAIL METRICS
// =============================================================================

const AuditMetrics = ({ isActive, isInView }: { isActive?: boolean; isInView?: boolean }) => {
  const [mounted, setMounted] = useState(false)
  const isPlaying = isActive && isInView
  const [metrics, setMetrics] = useState({
    total: 12847,
    allowed: 11542,
    review: 892,
    blocked: 413,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      const newAction = Math.random()
      setMetrics(prev => {
        const total = prev.total + 1
        if (newAction > 0.95) {
          return { ...prev, total, blocked: prev.blocked + 1 }
        } else if (newAction > 0.85) {
          return { ...prev, total, review: prev.review + 1 }
        } else {
          return { ...prev, total, allowed: prev.allowed + 1 }
        }
      })
    }, 800)

    return () => clearInterval(interval)
  }, [isPlaying])

  if (!mounted) return null

  const percentage = (value: number) => ((value / metrics.total) * 100).toFixed(1)

  return (
    <div className="absolute inset-0 bottom-8 overflow-hidden px-4">
      <div className="absolute z-20 pointer-events-none inset-0 top-auto h-32 bg-[linear-gradient(to_top,hsl(var(--background-surface-75))_0%,transparent_100%)]" />
      <div className="relative z-10 w-full space-y-4">
        {/* Period selector */}
        <div className="flex items-center gap-2 text-xs font-mono text-foreground-muted">
          <Clock className="w-3.5 h-3.5" />
          <span>Last 7 days</span>
        </div>

        {/* Total */}
        <div className="space-y-1">
          <span className="text-xs text-foreground-muted font-mono">Total actions</span>
          <motion.div
            key={metrics.total}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-mono text-foreground"
          >
            {metrics.total.toLocaleString()}
          </motion.div>
        </div>

        {/* Breakdown */}
        <div className="space-y-3 pt-2">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-brand">Allowed</span>
              <span className="text-foreground-light">{metrics.allowed.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-surface-300 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage(metrics.allowed)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-warning">Review</span>
              <span className="text-foreground-light">{metrics.review.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-surface-300 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-warning rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage(metrics.review)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-destructive">Blocked</span>
              <span className="text-foreground-light">{metrics.blocked.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-surface-300 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-destructive rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage(metrics.blocked)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
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
    id: 'realtime-policy',
    label: 'Realtime Policy',
    paragraph: 'Every tool call is evaluated against your policies. Allow, block, or require approval.',
    image: PolicyLogs,
  },
  {
    id: 'identity-access',
    label: 'Identity & Access',
    paragraph: 'Every agent has an identity with explicit permissions. No implicit access.',
    image: IdentityAccess,
  },
  {
    id: 'audit-trail',
    label: 'Audit Trail',
    paragraph: 'Complete decision traces for every action. Export-ready compliance reports.',
    image: AuditMetrics,
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
          Complete visibility and control over every agent action.
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

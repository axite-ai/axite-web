'use client'

import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useInterval } from 'react-use'
import { Badge, cn } from 'ui'
import SectionContainer from '~/components/Layouts/SectionContainer'

// ============================================================================
// POLICY LOGS (Column 1)
// ============================================================================

interface LogEntry {
  id: string
  timestamp: Date
  decision: 'ALLOWED' | 'BLOCKED' | 'REVIEW'
  agent: string
  tool: string
}

const agents = ['support-agent', 'claude-agent', 'data-agent', 'sales-bot', 'ops-agent']
const allowedTools = [
  'zendesk:update_ticket',
  'github:create_pr',
  'postgres:select',
  'jira:create_issue',
  'linear:update_issue',
  'slack:post_message',
]
const blockedTools = ['slack:dm_ceo', 'file:read_secrets', 'aws:delete_bucket']
const reviewTools = ['stripe:refund', 'postgres:delete', 'github:merge_pr', 's3:delete_object']

function createLog(offset?: number): LogEntry {
  const t = new Date()
  t.setMilliseconds(t.getMilliseconds() - (offset ?? 0))
  const rand = Math.random()
  const agent = agents[Math.floor(Math.random() * agents.length)]

  let decision: 'ALLOWED' | 'BLOCKED' | 'REVIEW'
  let tool: string

  if (rand > 0.85) {
    decision = 'BLOCKED'
    tool = blockedTools[Math.floor(Math.random() * blockedTools.length)]
  } else if (rand > 0.70) {
    decision = 'REVIEW'
    tool = reviewTools[Math.floor(Math.random() * reviewTools.length)]
  } else {
    decision = 'ALLOWED'
    tool = allowedTools[Math.floor(Math.random() * allowedTools.length)]
  }

  return {
    id: crypto.randomUUID(),
    timestamp: t,
    decision,
    agent,
    tool,
  }
}

const PolicyLogs: FC<{ className?: string }> = ({ className }) => {
  const [mounted, setMounted] = useState(false)
  const INTERVAL = 550

  const initialLogs = [
    createLog(),
    createLog(2000),
    createLog(3000),
    createLog(4000),
    createLog(5000),
    createLog(6000),
    createLog(7000),
    createLog(8000),
  ]

  const [activeLogs, setActiveLogs] = useState(initialLogs)

  useInterval(() => {
    const skip = Math.random() > 0.6
    if (skip) return
    const newLog = createLog()
    setActiveLogs([newLog, ...activeLogs.slice(0, 9)])
  }, INTERVAL)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={cn('relative h-full overflow-hidden', className)}>
      <div className="absolute z-20 pointer-events-none inset-0 top-auto h-24 bg-[linear-gradient(to_top,hsl(var(--background-surface-75))_0%,transparent_100%)]" />
      <motion.ul
        layout
        transition={{ delay: -0.22, duration: 0.1, staggerChildren: 0.2 }}
        className="relative z-10 w-full h-auto flex flex-col overflow-y-auto"
      >
        <AnimatePresence>
          {activeLogs.map((log, i) => (
            <motion.li
              layout
              key={log.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.03, duration: 0.15 } }}
              className="py-2 px-1 border-b border-muted/30 first:border-t w-full font-mono text-xs flex gap-3 items-center"
            >
              <span className="shrink-0 text-foreground-muted">
                {dayjs(log.timestamp).format('D MMM HH:mm:ss')}
              </span>
              <Badge
                variant={
                  log.decision === 'ALLOWED'
                    ? 'default'
                    : log.decision === 'REVIEW'
                      ? 'warning'
                      : 'destructive'
                }
                className="text-[10px] px-1.5 py-0"
              >
                {log.decision === 'ALLOWED' ? 'ALLOW' : log.decision === 'REVIEW' ? 'REVIEW' : 'BLOCK'}
              </Badge>
              <span className="truncate text-foreground-muted">{log.tool}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

// ============================================================================
// IDENTITY MATRIX (Column 2)
// ============================================================================

const PermissionCell = ({ allowed }: { allowed: boolean }) => (
  <td className="px-2 py-1.5 text-center">
    <span
      className={cn(
        'inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px]',
        allowed
          ? 'bg-green-500/20 text-green-500'
          : 'bg-foreground-muted/20 text-foreground-muted'
      )}
    >
      {allowed ? '✓' : '×'}
    </span>
  </td>
)

const IdentityMatrix: FC<{ className?: string }> = ({ className }) => {
  const agentPermissions = [
    { name: 'support-bot', permissions: [true, false, false, false] },
    { name: 'data-agent', permissions: [true, true, false, false] },
    { name: 'admin-agent', permissions: [true, true, true, true] },
    { name: 'sales-bot', permissions: [true, false, false, false] },
  ]
  const headers = ['Read', 'Write', 'Delete', 'Admin']

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-muted/50">
            <th className="px-2 py-1.5 text-left font-mono text-foreground-muted font-normal">
              Agent
            </th>
            {headers.map((h) => (
              <th key={h} className="px-2 py-1.5 text-center font-mono text-foreground-muted font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agentPermissions.map((agent) => (
            <tr key={agent.name} className="border-b border-muted/30 last:border-b-0">
              <td className="px-2 py-1.5 font-mono text-foreground-light">{agent.name}</td>
              {agent.permissions.map((allowed, idx) => (
                <PermissionCell key={idx} allowed={allowed} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ============================================================================
// AUDIT METRICS (Column 3)
// ============================================================================

const AuditMetrics: FC<{ className?: string }> = ({ className }) => {
  const stats = [
    { label: 'Total actions', value: '12,847' },
    { label: 'Allowed', value: '11,542', pct: 90, variant: 'success' as const },
    { label: 'Review', value: '892', pct: 7, variant: 'warning' as const },
    { label: 'Blocked', value: '413', pct: 3, variant: 'destructive' as const },
  ]

  return (
    <div className={cn('space-y-0', className)}>
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-muted/50">
        <span className="font-mono text-xs text-foreground-muted">Period:</span>
        <span className="font-mono text-xs text-foreground-light">Last 7 days</span>
      </div>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center justify-between py-1.5 border-b border-muted/30 last:border-b-0"
        >
          <span className="text-xs text-foreground-muted">{stat.label}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">{stat.value}</span>
            {stat.pct !== undefined && (
              <div className="w-12 h-1 bg-muted/50 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full',
                    stat.variant === 'success' ? 'bg-green-500' : 'bg-amber-500'
                  )}
                  style={{ width: `${stat.pct}%` }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// PILLAR COLUMN COMPONENT
// ============================================================================

interface PillarColumnProps {
  title: string
  description: string
  children: React.ReactNode
  className?: string
}

const PillarColumn: FC<PillarColumnProps> = ({ title, description, children, className }) => (
  <div
    className={cn(
      'flex flex-col rounded-lg border border-muted/50 bg-surface-75 overflow-hidden',
      className
    )}
  >
    {/* Header */}
    <div className="px-4 pt-4 pb-3">
      <h3 className="font-mono text-xs text-foreground-light uppercase tracking-wider mb-1">
        {title}
      </h3>
      <p className="text-xs text-foreground-muted leading-relaxed">{description}</p>
    </div>
    {/* Content */}
    <div className="flex-1 px-4 pb-4 min-h-[280px]">{children}</div>
  </div>
)

// ============================================================================
// MAIN SECTION
// ============================================================================

const PillarsSection = () => {
  return (
    <SectionContainer>
      {/* Section Header */}
      <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-8">
        How it works
      </h2>

      {/* Three Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Policy Column */}
        <PillarColumn
          title="Realtime Policy"
          description="Every tool call is evaluated against your policies. Allow, block, or require approval."
        >
          <PolicyLogs />
        </PillarColumn>

        {/* Identity Column */}
        <PillarColumn
          title="Identity & Access"
          description="Every agent has an identity with explicit permissions. No implicit access."
        >
          <IdentityMatrix />
        </PillarColumn>

        {/* Audit Column */}
        <PillarColumn
          title="Audit Trail"
          description="Complete decision traces for every action. Export-ready compliance reports."
        >
          <AuditMetrics />
        </PillarColumn>
      </div>
    </SectionContainer>
  )
}

export default PillarsSection

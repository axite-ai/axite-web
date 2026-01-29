'use client'

import { memo } from 'react'
import { Check, ShieldX, Clock, AlertTriangle } from 'lucide-react'
import { cn, Badge } from 'ui'
import dayjs from 'dayjs'
import type { PolicyEvent } from '../types'

interface TracePanelProps {
  event: PolicyEvent | null
  isOpen: boolean
  onClose: () => void
}

type BadgeVariant = 'default' | 'destructive' | 'warning' | 'success'

function getDecisionIcon(decision: PolicyEvent['finalDecision']) {
  switch (decision) {
    case 'ALLOW':
    case 'APPROVED':
      return <Check className="w-4 h-4 text-brand" />
    case 'DENY_RBAC':
    case 'BLOCK_POLICY':
    case 'DENIED':
      return <ShieldX className="w-4 h-4 text-destructive" />
    case 'REVIEW':
      return <Clock className="w-4 h-4 text-warning" />
    default:
      return <AlertTriangle className="w-4 h-4 text-foreground-muted" />
  }
}

function getDecisionBadge(decision: PolicyEvent['finalDecision']): { label: string; variant: BadgeVariant } {
  switch (decision) {
    case 'ALLOW':
    case 'APPROVED':
      return { label: decision, variant: 'success' }
    case 'DENY_RBAC':
    case 'BLOCK_POLICY':
    case 'DENIED':
      return { label: decision === 'DENIED' ? 'DENIED' : decision.replace('_', ' '), variant: 'destructive' }
    case 'REVIEW':
      return { label: 'REVIEW', variant: 'warning' }
    default:
      return { label: String(decision), variant: 'default' }
  }
}

const TraceStep = memo(function TraceStep({
  icon,
  title,
  status,
  detail,
  variant = 'default',
}: {
  icon: React.ReactNode
  title: string
  status: string
  detail?: string
  variant?: 'success' | 'destructive' | 'warning' | 'default'
}) {
  const colors = {
    success: 'border-brand/30 bg-brand/5',
    destructive: 'border-destructive/30 bg-destructive/5',
    warning: 'border-warning/30 bg-warning/5',
    default: 'border-border bg-surface-200',
  }

  return (
    <div className={cn('flex items-start gap-2 p-2 rounded-md border', colors[variant])}>
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-foreground">{title}</span>
          <Badge variant={variant === 'default' ? 'default' : variant} className="text-[9px] px-1.5">
            {status}
          </Badge>
        </div>
        {detail && <div className="text-[11px] text-foreground-lighter mt-0.5">{detail}</div>}
      </div>
    </div>
  )
})

export const TracePanel = memo(function TracePanel({ event, isOpen, onClose }: TracePanelProps) {
  if (!isOpen || !event) return null

  const badge = getDecisionBadge(event.finalDecision)

  return (
    <div className="space-y-4">
      {/* Header info */}
      <div className="flex items-start gap-3">
        {getDecisionIcon(event.finalDecision)}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground truncate">{event.action}</div>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-foreground-muted">
            <span className="font-mono">{event.traceId}</span>
            <span>{dayjs(event.timestamp).format('HH:mm:ss')}</span>
          </div>
        </div>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-foreground-muted mb-0.5">Agent</div>
          <div className="text-foreground font-mono">{event.agent}</div>
        </div>
        <div>
          <div className="text-foreground-muted mb-0.5">Role</div>
          <div className="text-foreground capitalize">{event.agentRole}</div>
        </div>
      </div>

      {/* Inputs */}
      <div>
        <div className="text-xs text-foreground-muted mb-1">Inputs</div>
        <div className="bg-surface-200 rounded p-2 font-mono text-[11px] text-foreground-light overflow-x-auto max-h-20">
          <pre className="whitespace-pre-wrap">{JSON.stringify(event.inputs, null, 2)}</pre>
        </div>
      </div>

      {/* Decision chain */}
      <div className="space-y-1.5">
        <div className="text-xs text-foreground-muted">Decision Chain</div>

        <TraceStep
          icon={event.rbacCheck.allowed ? <Check className="w-3.5 h-3.5 text-brand" /> : <ShieldX className="w-3.5 h-3.5 text-destructive" />}
          title="RBAC Check"
          status={event.rbacCheck.allowed ? 'PASS' : 'FAIL'}
          detail={event.rbacCheck.reason}
          variant={event.rbacCheck.allowed ? 'success' : 'destructive'}
        />

        <TraceStep
          icon={
            event.policyCheck.decision === 'ALLOW' ? (
              <Check className="w-3.5 h-3.5 text-brand" />
            ) : event.policyCheck.decision === 'REVIEW' ? (
              <Clock className="w-3.5 h-3.5 text-warning" />
            ) : (
              <ShieldX className="w-3.5 h-3.5 text-destructive" />
            )
          }
          title="Policy Check"
          status={event.policyCheck.decision}
          detail={event.policyCheck.ruleId ? `${event.policyCheck.ruleId}: ${event.policyCheck.reason}` : event.policyCheck.reason}
          variant={
            event.policyCheck.decision === 'ALLOW' ? 'success' : event.policyCheck.decision === 'REVIEW' ? 'warning' : 'destructive'
          }
        />

        <TraceStep
          icon={getDecisionIcon(event.finalDecision)}
          title="Final Decision"
          status={badge.label}
          variant={badge.variant}
        />
      </div>

      {/* Approval record */}
      {event.approval && (
        <div className="bg-surface-200 rounded-md p-2 border border-border">
          <div className="text-xs text-foreground-muted mb-1.5">Approval Record</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-foreground-lighter">Approver</span>
              <span className="text-foreground font-mono">{event.approval.approver}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground-lighter">Action</span>
              <Badge variant={event.approval.action === 'APPROVE' ? 'success' : 'destructive'} className="text-[9px] px-1.5">
                {event.approval.action}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-lighter">Time</span>
              <span className="text-foreground font-mono">{dayjs(event.approval.timestamp).format('HH:mm:ss')}</span>
            </div>
            <div className="pt-1 border-t border-border mt-1">
              <span className="text-foreground-lighter">Justification</span>
              <div className="text-foreground mt-0.5 italic">"{event.approval.justification}"</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

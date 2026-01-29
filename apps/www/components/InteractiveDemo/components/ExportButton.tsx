'use client'

import { Download } from 'lucide-react'
import { cn } from 'ui'
import type { DemoState, ExportBundle } from '../types'
import { getBundleById } from '../data'

interface ExportButtonProps {
  state: DemoState
  disabled?: boolean
}

function generateExportBundle(state: DemoState): ExportBundle {
  const bundle = getBundleById(state.selectedBundle)

  return {
    exportedAt: new Date().toISOString(),
    bundle: bundle?.agentName || state.selectedBundle,
    configuration: {
      agentRole: state.agentRole,
      policies: state.policies,
    },
    events: state.events.map(event => ({
      traceId: event.traceId,
      timestamp: event.timestamp.toISOString(),
      action: event.action,
      inputs: event.inputs,
      agent: event.agent,
      agentRole: event.agentRole,
      rbacCheck: event.rbacCheck,
      policyCheck: event.policyCheck,
      finalDecision: String(event.finalDecision),
      ...(event.approval && {
        approval: {
          approver: event.approval.approver,
          action: event.approval.action,
          justification: event.approval.justification,
          timestamp: event.approval.timestamp.toISOString(),
        },
      }),
    })),
  }
}

function downloadJson(data: ExportBundle, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function ExportButton({ state, disabled }: ExportButtonProps) {
  const handleExport = () => {
    const exportData = generateExportBundle(state)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    const filename = `axite-audit-${state.selectedBundle}-${timestamp}.json`
    downloadJson(exportData, filename)
  }

  const hasEvents = state.events.length > 0

  return (
    <button
      onClick={handleExport}
      disabled={disabled || !hasEvents}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
        'border border-border',
        hasEvents && !disabled
          ? 'bg-surface-200 text-foreground hover:bg-surface-300'
          : 'bg-surface-200 text-foreground-muted cursor-not-allowed opacity-50'
      )}
    >
      <Download className="w-4 h-4" />
      Export Bundle
    </button>
  )
}

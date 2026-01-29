'use client'

import { memo } from 'react'
import { cn } from 'ui'
import type { PolicyConfig, BundlePolicies } from '../types'

interface PolicyControlsProps {
  policies: PolicyConfig
  applicablePolicies: BundlePolicies
  onChange: (policies: Partial<PolicyConfig>) => void
  disabled?: boolean
}

interface ToggleProps {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

const Toggle = memo(function Toggle({ label, description, checked, onChange, disabled }: ToggleProps) {
  return (
    <label
      className={cn(
        'flex items-start gap-3 p-2 rounded-md cursor-pointer transition-colors',
        checked ? 'bg-surface-200' : 'hover:bg-surface-200',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={cn(
          'relative w-9 h-5 rounded-full transition-colors mt-0.5 shrink-0',
          checked ? 'bg-brand' : 'bg-surface-300'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm',
            checked && 'translate-x-4'
          )}
        />
      </button>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-foreground">{label}</div>
        <div className="text-xs text-foreground-lighter">{description}</div>
      </div>
    </label>
  )
})

export const PolicyControls = memo(function PolicyControls({
  policies,
  applicablePolicies,
  onChange,
  disabled,
}: PolicyControlsProps) {
  // Count how many policies are applicable
  const applicableCount = Object.values(applicablePolicies).filter(Boolean).length

  if (applicableCount === 0) {
    return (
      <div className="space-y-2">
        <label className="text-xs font-mono text-foreground-muted uppercase tracking-wider">
          Policies
        </label>
        <p className="text-sm text-foreground-lighter">No policies apply to this bundle.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-foreground-muted uppercase tracking-wider">
        Policies
      </label>
      <div className="space-y-1">
        {applicablePolicies.blockDestructive && (
          <Toggle
            label="Block destructive ops"
            description="delete, drop"
            checked={policies.blockDestructive}
            onChange={checked => onChange({ blockDestructive: checked })}
            disabled={disabled}
          />
        )}

        {applicablePolicies.blockSecrets && (
          <Toggle
            label="Block secrets access"
            description="read_secrets, get_env"
            checked={policies.blockSecrets}
            onChange={checked => onChange({ blockSecrets: checked })}
            disabled={disabled}
          />
        )}

        {applicablePolicies.reviewRefunds && (
          <>
            <Toggle
              label="Review refunds"
              description="Above threshold"
              checked={policies.reviewRefunds}
              onChange={checked => onChange({ reviewRefunds: checked })}
              disabled={disabled}
            />
            {policies.reviewRefunds && (
              <div className="pl-12 pr-2 pb-2">
                <div className="flex items-center justify-between text-xs text-foreground-muted mb-1">
                  <span>Threshold</span>
                  <span className="font-mono">${policies.refundThreshold}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1000}
                  step={50}
                  value={policies.refundThreshold}
                  onChange={e => onChange({ refundThreshold: parseInt(e.target.value) })}
                  disabled={disabled}
                  className="w-full h-1.5 bg-surface-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-foreground-lighter mt-0.5">
                  <span>$100</span>
                  <span>$1000</span>
                </div>
              </div>
            )}
          </>
        )}

        {applicablePolicies.reviewBulkComms && (
          <Toggle
            label="Review bulk comms"
            description="Channel posts, bulk sends"
            checked={policies.reviewBulkComms}
            onChange={checked => onChange({ reviewBulkComms: checked })}
            disabled={disabled}
          />
        )}

        {applicablePolicies.reviewHighImpact && (
          <Toggle
            label="Review high-impact"
            description="Production deploys, rollbacks"
            checked={policies.reviewHighImpact}
            onChange={checked => onChange({ reviewHighImpact: checked })}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  )
})

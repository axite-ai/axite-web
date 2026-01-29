'use client'

import { memo } from 'react'
import { cn } from 'ui'
import type { AgentRole } from '../types'

interface RoleSelectorProps {
  value: AgentRole
  onChange: (value: AgentRole) => void
  disabled?: boolean
}

const ROLES: { id: AgentRole; label: string; description: string }[] = [
  { id: 'viewer', label: 'Viewer', description: 'Read only' },
  { id: 'editor', label: 'Editor', description: 'Read + Write' },
  { id: 'admin', label: 'Admin', description: 'Full access' },
]

export const RoleSelector = memo(function RoleSelector({ value, onChange, disabled }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-foreground-muted uppercase tracking-wider">Agent Role</label>
      <div className="space-y-1">
        {ROLES.map(role => (
          <label
            key={role.id}
            className={cn(
              'flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors',
              value === role.id ? 'bg-brand/10 border border-brand/30' : 'hover:bg-surface-200',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              type="radio"
              name="agentRole"
              value={role.id}
              checked={value === role.id}
              onChange={() => onChange(role.id)}
              disabled={disabled}
              className="sr-only"
            />
            <div
              className={cn(
                'w-3 h-3 rounded-full border-2 flex items-center justify-center',
                value === role.id ? 'border-brand' : 'border-foreground-muted'
              )}
            >
              {value === role.id && <div className="w-1.5 h-1.5 rounded-full bg-brand" />}
            </div>
            <div className="flex-1">
              <div className="text-sm text-foreground">{role.label}</div>
              <div className="text-xs text-foreground-lighter">{role.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
})

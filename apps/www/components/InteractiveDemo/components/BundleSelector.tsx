'use client'

import { memo } from 'react'
import { ChevronDown } from 'lucide-react'
import { bundles } from '../data'
import type { BundleId } from '../types'

interface BundleSelectorProps {
  value: BundleId
  onChange: (value: BundleId) => void
  disabled?: boolean
}

export const BundleSelector = memo(function BundleSelector({ value, onChange, disabled }: BundleSelectorProps) {
  const selectedBundle = bundles.find(b => b.id === value)

  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-foreground-muted uppercase tracking-wider">Bundle</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value as BundleId)}
          disabled={disabled}
          className="w-full appearance-none bg-surface-200 border border-border rounded-md px-3 py-2 pr-8 text-sm text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {bundles.map(bundle => (
            <option key={bundle.id} value={bundle.id}>
              {bundle.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted pointer-events-none" />
      </div>
      {selectedBundle && <p className="text-xs text-foreground-lighter">{selectedBundle.description}</p>}
    </div>
  )
})

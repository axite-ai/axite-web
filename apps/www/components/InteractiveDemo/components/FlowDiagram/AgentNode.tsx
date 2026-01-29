'use client'

import { memo } from 'react'

interface AgentNodeProps {
  name: string
  x: number
  y: number
  isActive?: boolean
}

export const AgentNode = memo(function AgentNode({ name, x, y, isActive }: AgentNodeProps) {
  return (
    <g>
      {/* Agent circle */}
      <circle
        cx={x}
        cy={y}
        r={32}
        className="fill-surface-200"
        stroke={isActive ? 'hsl(var(--brand-accent))' : 'hsl(var(--border))'}
        strokeWidth={isActive ? 2.5 : 2}
      />

      {/* Inner icon circle */}
      <circle cx={x} cy={y} r={18} className="fill-brand/10" />

      {/* Bot icon */}
      <g transform={`translate(${x - 10}, ${y - 10})`}>
        <rect x={4} y={2} width={12} height={12} rx={2} className="fill-none stroke-brand" strokeWidth={1.5} />
        <circle cx={7} cy={7} r={1.5} className="fill-brand" />
        <circle cx={13} cy={7} r={1.5} className="fill-brand" />
        <path d="M7 11h6" className="stroke-brand" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M10 2V0M4 6H2M18 6h-2" className="stroke-brand" strokeWidth={1.5} strokeLinecap="round" />
      </g>

      {/* Label */}
      <text x={x} y={y + 48} textAnchor="middle" className="fill-foreground-light text-xs font-mono">
        {name}
      </text>
    </g>
  )
})

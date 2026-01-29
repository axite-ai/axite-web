'use client'

import { memo } from 'react'
import type { Decision } from '../../types'

interface GatewayNodeProps {
  x: number
  y: number
  currentDecision?: Decision | null
  isPulsing?: boolean
}

const DECISION_COLORS: Record<Decision, string> = {
  ALLOW: 'hsl(var(--brand-accent))',
  DENY_RBAC: 'hsl(var(--destructive))',
  BLOCK_POLICY: 'hsl(var(--destructive))',
  REVIEW: 'hsl(var(--warning))',
}

export const GatewayNode = memo(function GatewayNode({ x, y, currentDecision, isPulsing }: GatewayNodeProps) {
  const decisionColor = currentDecision ? DECISION_COLORS[currentDecision] : undefined

  return (
    <g>
      {/* Pulsing ring when reviewing */}
      {isPulsing && (
        <circle cx={x} cy={y} r={45} fill="none" stroke="hsl(var(--warning))" strokeWidth={2} opacity={0.4}>
          <animate attributeName="r" values="42;50;42" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Outer hexagon (shield shape) */}
      <path
        d={`M ${x} ${y - 40} L ${x + 35} ${y - 20} L ${x + 35} ${y + 20} L ${x} ${y + 40} L ${x - 35} ${y + 20} L ${x - 35} ${y - 20} Z`}
        className="fill-surface-200"
        stroke={decisionColor || 'hsl(var(--border))'}
        strokeWidth={2}
      />

      {/* Inner circle */}
      <circle cx={x} cy={y} r={22} className="fill-surface-300" />

      {/* Shield icon */}
      <g transform={`translate(${x - 12}, ${y - 14})`}>
        <path
          d="M12 2L4 6v4c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
          className="fill-none stroke-brand"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" className="fill-none stroke-brand" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Label */}
      <text x={x} y={y + 56} textAnchor="middle" className="fill-foreground-light text-xs font-mono">
        Gateway
      </text>

      {/* Decision label */}
      {currentDecision && (
        <g>
          <rect x={x - 45} y={y + 62} width={90} height={18} rx={4} fill={decisionColor} fillOpacity={0.15} />
          <text x={x} y={y + 74} textAnchor="middle" className="text-[10px] font-mono font-medium" fill={decisionColor}>
            {currentDecision}
          </text>
        </g>
      )}
    </g>
  )
})

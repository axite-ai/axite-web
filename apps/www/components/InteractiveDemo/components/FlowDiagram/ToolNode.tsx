'use client'

import { memo } from 'react'
import type { Tool } from '../../types'

interface ToolNodeProps {
  tool: Tool
  x: number
  y: number
  index: number
  isTarget?: boolean
  isRunning?: boolean
}

// Simple SVG icons for each tool type
function ToolIcon({ icon, x, y }: { icon: string; x: number; y: number }) {
  const props = {
    className: 'stroke-foreground-light fill-none',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  const icons: Record<string, JSX.Element> = {
    stripe: (
      <g transform={`translate(${x - 8}, ${y - 8})`}>
        <path d="M2 10a8 8 0 0 1 16 0v4a8 8 0 0 1-16 0v-4z" {...props} />
        <path d="M6 8v8M10 6v10M14 8v8" {...props} />
      </g>
    ),
    salesforce: (
      <g transform={`translate(${x - 8}, ${y - 8})`}>
        <circle cx="8" cy="8" r="6" {...props} />
        <path d="M5 8h6M8 5v6" {...props} />
      </g>
    ),
    slack: (
      <g transform={`translate(${x - 8}, ${y - 8})`}>
        <rect x="3" y="3" width="4" height="10" rx="1" {...props} />
        <rect x="9" y="3" width="4" height="10" rx="1" {...props} />
        <path d="M3 7h10M3 10h10" {...props} />
      </g>
    ),
    file: (
      <g transform={`translate(${x - 8}, ${y - 8})`}>
        <path d="M4 2h8l4 4v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" {...props} />
        <path d="M12 2v4h4" {...props} />
      </g>
    ),
    zendesk: (
      <g transform={`translate(${x - 8}, ${y - 8})`}>
        <path d="M2 14l6-12v12H2zM8 2h6l-6 12" {...props} />
      </g>
    ),
    notion: (
      <g transform={`translate(${x - 8}, ${y - 8})`}>
        <rect x="2" y="2" width="12" height="12" rx="2" {...props} />
        <path d="M5 5h6M5 8h4" {...props} />
      </g>
    ),
    github: (
      <g transform={`translate(${x - 8}, ${y - 8})`}>
        <circle cx="8" cy="8" r="6" {...props} />
        <path d="M8 11c-2 0-3-1-3-2s1-1 3-1 3 0 3 1-1 2-3 2z" {...props} />
      </g>
    ),
    deploy: (
      <g transform={`translate(${x - 8}, ${y - 8})`}>
        <path d="M8 2v12M4 6l4-4 4 4M2 14h12" {...props} />
      </g>
    ),
  }

  return icons[icon] || (
    <g transform={`translate(${x - 8}, ${y - 8})`}>
      <rect x="2" y="2" width="12" height="12" rx="2" {...props} />
    </g>
  )
}

export const ToolNode = memo(function ToolNode({ tool, x, y, index, isTarget, isRunning }: ToolNodeProps) {
  return (
    <g>
      {/* Running indicator - pulsing ring */}
      {isRunning && (
        <>
          <circle cx={x} cy={y} r={30} fill="none" stroke="hsl(var(--brand-accent))" strokeWidth={2} opacity={0.4}>
            <animate attributeName="r" values="26;34;26" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="0.8s" repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={y} r={26} fill="hsl(var(--brand-accent))" opacity={0.1}>
            <animate attributeName="opacity" values="0.15;0.05;0.15" dur="0.8s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Tool circle */}
      <circle
        cx={x}
        cy={y}
        r={24}
        className="fill-surface-200"
        stroke={isTarget || isRunning ? 'hsl(var(--brand-accent))' : 'hsl(var(--border))'}
        strokeWidth={isTarget || isRunning ? 2 : 1.5}
      />

      {/* Tool icon */}
      <ToolIcon icon={tool.icon} x={x} y={y} />

      {/* Label */}
      <text x={x} y={y + 36} textAnchor="middle" className="fill-foreground-lighter text-[10px] font-mono">
        {tool.icon}
      </text>

      {/* Running label */}
      {isRunning && (
        <text x={x} y={y + 48} textAnchor="middle" className="fill-brand-accent text-[9px] font-mono">
          executing...
        </text>
      )}
    </g>
  )
})

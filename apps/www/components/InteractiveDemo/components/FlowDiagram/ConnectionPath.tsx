'use client'

import { memo } from 'react'

interface ConnectionPathProps {
  startX: number
  startY: number
  endX: number
  endY: number
  isActive?: boolean
}

export const ConnectionPath = memo(function ConnectionPath({ startX, startY, endX, endY, isActive }: ConnectionPathProps) {
  // Bezier curve control points
  const midX = (startX + endX) / 2
  const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`

  return (
    <g>
      {/* Background dashed path */}
      <path d={pathD} fill="none" stroke="hsl(var(--border))" strokeWidth={2} strokeDasharray="4 4" opacity={0.5} />

      {/* Active path overlay */}
      {isActive && <path d={pathD} fill="none" stroke="hsl(var(--brand-accent))" strokeWidth={2} />}

      {/* End dot */}
      <circle cx={endX} cy={endY} r={3} fill={isActive ? 'hsl(var(--brand-accent))' : 'hsl(var(--border))'} />
    </g>
  )
})

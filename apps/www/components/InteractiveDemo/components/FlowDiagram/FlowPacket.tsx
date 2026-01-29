'use client'

import { memo } from 'react'
import type { Packet, Decision } from '../../types'

interface FlowPacketProps {
  packet: Packet
  agentX: number
  agentY: number
  gatewayX: number
  gatewayY: number
  toolX: number
  toolY: number
}

const DECISION_COLORS: Record<Decision, string> = {
  ALLOW: 'hsl(var(--brand-accent))',
  DENY_RBAC: 'hsl(var(--destructive))',
  BLOCK_POLICY: 'hsl(var(--destructive))',
  REVIEW: 'hsl(var(--warning))',
}

// Easing function for smoother motion
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * easeOutCubic(t)
}

function getPacketPosition(
  packet: Packet,
  agentX: number,
  agentY: number,
  gatewayX: number,
  gatewayY: number,
  toolX: number,
  toolY: number
): { x: number; y: number } {
  const { phase, progress } = packet

  switch (phase) {
    case 'traveling':
      // Smooth travel from agent to gateway
      return {
        x: lerp(agentX + 32, gatewayX, progress),
        y: lerp(agentY, gatewayY, progress),
      }
    case 'at-gateway':
      return { x: gatewayX, y: gatewayY }
    case 'to-tool':
      // Smooth travel from gateway to tool
      return {
        x: lerp(gatewayX, toolX, progress),
        y: lerp(gatewayY, toolY, progress),
      }
    case 'at-tool':
      return { x: toolX, y: toolY }
    case 'bouncing':
      // Bounce back to the left
      return {
        x: lerp(gatewayX, agentX + 60, progress),
        y: gatewayY,
      }
    case 'done':
      return { x: toolX, y: toolY }
    default:
      return { x: agentX, y: agentY }
  }
}

export const FlowPacket = memo(function FlowPacket({
  packet,
  agentX,
  agentY,
  gatewayX,
  gatewayY,
  toolX,
  toolY,
}: FlowPacketProps) {
  const color = DECISION_COLORS[packet.decision]
  const { x, y } = getPacketPosition(packet, agentX, agentY, gatewayX, gatewayY, toolX, toolY)

  if (packet.phase === 'done') return null

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Pulsing ring when paused for review */}
      {packet.isPaused && (
        <>
          <circle cx={0} cy={0} r={16} fill="none" stroke={color} strokeWidth={2} opacity={0.3}>
            <animate attributeName="r" values="12;20;12" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx={0} cy={0} r={20} fill="none" stroke={color} strokeWidth={1} opacity={0.2}>
            <animate attributeName="r" values="16;24;16" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Glow effect */}
      <circle cx={0} cy={0} r={14} fill={color} opacity={0.2} />

      {/* Main packet */}
      <circle cx={0} cy={0} r={10} fill={color} />

      {/* Inner highlight */}
      <circle cx={-2} cy={-2} r={4} fill="white" opacity={0.4} />
    </g>
  )
})

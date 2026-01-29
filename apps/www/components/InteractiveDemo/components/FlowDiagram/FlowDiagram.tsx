'use client'

import { useMemo, memo } from 'react'
import { Play, StepForward, RotateCcw, Square } from 'lucide-react'
import { cn } from 'ui'
import { AgentNode } from './AgentNode'
import { GatewayNode } from './GatewayNode'
import { ToolNode } from './ToolNode'
import { FlowPacket } from './FlowPacket'
import { ConnectionPath } from './ConnectionPath'
import type { Bundle, Packet, Decision } from '../../types'

interface FlowDiagramProps {
  bundle: Bundle
  packets: Packet[]
  currentDecision?: Decision | null
  hasPendingReview: boolean
  isRunning: boolean
  isComplete: boolean
  activeToolIndex: number | null
  onRun: () => void
  onStep: () => void
  onReset: () => void
  onStop: () => void
}

// Layout constants
const SVG_WIDTH = 600
const SVG_HEIGHT = 320
const AGENT_X = 80
const AGENT_Y = 160
const GATEWAY_X = 280
const GATEWAY_Y = 160
const TOOLS_START_X = 480
const TOOLS_START_Y = 60
const TOOL_SPACING = 65

export const FlowDiagram = memo(function FlowDiagram({
  bundle,
  packets,
  currentDecision,
  hasPendingReview,
  isRunning,
  isComplete,
  activeToolIndex,
  onRun,
  onStep,
  onReset,
  onStop,
}: FlowDiagramProps) {
  // Calculate tool positions
  const toolPositions = useMemo(() => {
    return bundle.tools.slice(0, 4).map((tool, i) => ({
      tool,
      x: TOOLS_START_X,
      y: TOOLS_START_Y + i * TOOL_SPACING,
    }))
  }, [bundle.tools])

  // Get the active packet's target tool
  const activePacket = packets[0]
  const targetToolIndex = activePacket?.toolIndex ?? -1

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-1 relative">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Connection: Agent to Gateway */}
          <ConnectionPath
            startX={AGENT_X + 32}
            startY={AGENT_Y}
            endX={GATEWAY_X - 35}
            endY={GATEWAY_Y}
            isActive={activePacket?.phase === 'traveling'}
          />

          {/* Connections: Gateway to Tools */}
          {toolPositions.map((pos, i) => (
            <ConnectionPath
              key={pos.tool.id}
              startX={GATEWAY_X + 35}
              startY={GATEWAY_Y}
              endX={pos.x - 24}
              endY={pos.y}
              isActive={targetToolIndex === i && (activePacket?.phase === 'to-tool' || activePacket?.phase === 'at-tool')}
            />
          ))}

          {/* Agent Node */}
          <AgentNode
            name={bundle.agentName}
            x={AGENT_X}
            y={AGENT_Y}
            isActive={activePacket?.phase === 'traveling'}
          />

          {/* Gateway Node */}
          <GatewayNode
            x={GATEWAY_X}
            y={GATEWAY_Y}
            currentDecision={currentDecision}
            isPulsing={hasPendingReview}
          />

          {/* Tool Nodes */}
          {toolPositions.map((pos, i) => (
            <ToolNode
              key={pos.tool.id}
              tool={pos.tool}
              x={pos.x}
              y={pos.y}
              index={i}
              isTarget={targetToolIndex === i && activePacket?.phase === 'to-tool'}
              isRunning={activeToolIndex === i}
            />
          ))}

          {/* Animated packets */}
          {packets.map(packet => {
            const targetPos = toolPositions[packet.toolIndex] || toolPositions[0]
            return (
              <FlowPacket
                key={packet.id}
                packet={packet}
                agentX={AGENT_X}
                agentY={AGENT_Y}
                gatewayX={GATEWAY_X}
                gatewayY={GATEWAY_Y}
                toolX={targetPos?.x || TOOLS_START_X}
                toolY={targetPos?.y || TOOLS_START_Y}
              />
            )
          })}
        </svg>

        {/* Completion overlay */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-75/80 backdrop-blur-sm rounded-lg">
            <div className="text-center">
              <div className="text-foreground font-medium mb-2">Scenario Complete</div>
              <button onClick={onReset} className="text-sm text-brand hover:underline">
                Reset to run again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-center gap-2 pt-4 border-t border-border">
        {!isRunning && !isComplete ? (
          <>
            <button
              onClick={onRun}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                'bg-brand text-white hover:bg-brand/90'
              )}
            >
              <Play className="w-4 h-4" />
              Run
            </button>
            <button
              onClick={onStep}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                'bg-surface-200 text-foreground hover:bg-surface-300'
              )}
            >
              <StepForward className="w-4 h-4" />
              Step
            </button>
          </>
        ) : isRunning ? (
          <button
            onClick={onStop}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
              'bg-surface-200 text-foreground hover:bg-surface-300'
            )}
          >
            <Square className="w-4 h-4" />
            Stop
          </button>
        ) : null}

        <button
          onClick={onReset}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
            'text-foreground-muted hover:text-foreground hover:bg-surface-200'
          )}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
})

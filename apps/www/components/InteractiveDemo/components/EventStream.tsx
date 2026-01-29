'use client'

import { useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn, Badge } from 'ui'
import dayjs from 'dayjs'
import type { PolicyEvent, Decision } from '../types'

interface EventStreamProps {
  events: PolicyEvent[]
  selectedTraceId: string | null
  onSelectEvent: (traceId: string) => void
}

type BadgeVariant = 'default' | 'destructive' | 'warning' | 'success'

function getDecisionBadge(decision: PolicyEvent['finalDecision']): {
  label: string
  variant: BadgeVariant
} {
  switch (decision) {
    case 'ALLOW':
    case 'APPROVED':
      return { label: decision, variant: 'success' }
    case 'DENY_RBAC':
    case 'BLOCK_POLICY':
    case 'DENIED':
      return { label: decision === 'DENIED' ? 'DENIED' : decision.replace('_', ' '), variant: 'destructive' }
    case 'REVIEW':
      return { label: 'REVIEW', variant: 'warning' }
    default:
      return { label: String(decision), variant: 'default' }
  }
}

export function EventStream({ events, selectedTraceId, onSelectEvent }: EventStreamProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new events are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [events.length])

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-border">
        <h3 className="text-xs font-mono text-foreground-muted uppercase tracking-wider">
          Event Stream
        </h3>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
      >
        {events.length === 0 ? (
          <div className="flex items-center justify-center h-full text-foreground-muted text-sm">
            Events will appear here
          </div>
        ) : (
          <div className="relative">
            {/* Gradient fade at bottom */}
            <div className="sticky top-0 z-10 pointer-events-none h-4 bg-gradient-to-b from-surface-75 to-transparent" />

            <AnimatePresence>
              {events.map((event, i) => {
                const badge = getDecisionBadge(event.finalDecision)
                const isSelected = event.traceId === selectedTraceId

                return (
                  <motion.button
                    key={event.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => onSelectEvent(event.traceId)}
                    className={cn(
                      'w-full text-left px-3 py-2 border-b border-border/50 hover:bg-selection/20 transition-colors',
                      isSelected && 'bg-selection/30 border-l-2 border-l-brand'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={badge.variant} className="text-[9px] px-1.5">
                        {badge.label}
                      </Badge>
                      <span className="text-[10px] text-foreground-muted font-mono">
                        {dayjs(event.timestamp).format('HH:mm:ss')}
                      </span>
                    </div>
                    <div className="text-xs text-foreground-light font-mono truncate">
                      {event.action}
                    </div>
                  </motion.button>
                )
              })}
            </AnimatePresence>

            {/* Gradient fade at top */}
            <div className="sticky bottom-0 z-10 pointer-events-none h-8 bg-gradient-to-t from-surface-75 to-transparent" />
          </div>
        )}
      </div>
    </div>
  )
}

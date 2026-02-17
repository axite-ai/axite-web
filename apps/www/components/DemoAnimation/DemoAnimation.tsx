'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { FlowSVG } from './FlowSVG'
import { SlackCard } from './SlackCard'
import { scenarios } from './scenarios'
import type { AnimationPhase } from './types'

// Phase durations in ms
const PHASE_TIMING: Record<AnimationPhase, number> = {
  idle: 300,
  sending: 900,
  evaluating: 800,
  decided: 1200,
  'slack-in': 1500,
  'slack-approved': 1200,
  executing: 900,
  receipt: 1800,
  'fade-out': 600,
}

function getNextPhase(phase: AnimationPhase, decision: string): AnimationPhase {
  switch (phase) {
    case 'idle': return 'sending'
    case 'sending': return 'evaluating'
    case 'evaluating': return 'decided'
    case 'decided':
      if (decision === 'APPROVAL_REQUIRED') return 'slack-in'
      if (decision === 'BLOCKED') return 'receipt'
      return 'executing' // ALLOWED
    case 'slack-in': return 'slack-approved'
    case 'slack-approved': return 'executing'
    case 'executing': return 'receipt'
    case 'receipt': return 'fade-out'
    case 'fade-out': return 'idle'
    default: return 'idle'
  }
}

export function DemoAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-10%' })
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [phase, setPhase] = useState<AnimationPhase>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const scenario = scenarios[scenarioIndex]

  const advancePhase = useCallback(() => {
    setPhase((prev) => {
      const next = getNextPhase(prev, scenario.decision)
      if (next === 'idle') {
        // Move to next scenario
        setScenarioIndex((i) => (i + 1) % scenarios.length)
      }
      return next
    })
  }, [scenario.decision])

  useEffect(() => {
    if (!isInView) return

    timeoutRef.current = setTimeout(advancePhase, PHASE_TIMING[phase])
    return () => clearTimeout(timeoutRef.current)
  }, [phase, isInView, advancePhase])

  // Start the loop when component comes into view
  useEffect(() => {
    if (isInView && phase === 'idle') {
      timeoutRef.current = setTimeout(advancePhase, PHASE_TIMING.idle)
      return () => clearTimeout(timeoutRef.current)
    }
  }, [isInView])

  const showSlack = scenario.decision === 'APPROVAL_REQUIRED' &&
    ['slack-in', 'slack-approved', 'executing', 'receipt'].includes(phase)
  const isSlackApproved = ['slack-approved', 'executing', 'receipt'].includes(phase)

  return (
    <div ref={ref} className="relative w-full max-w-4xl mx-auto">
      {/* SVG Flow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
          style={{ minHeight: 280 }}
        >
          <FlowSVG scenario={scenario} phase={phase} />

          {/* Environment badge */}
          <div className="absolute top-2 right-2 font-mono text-[10px] text-amber-400/60 bg-amber-500/5 border border-amber-500/10 rounded px-1.5 py-0.5">
            {scenario.environment}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slack card overlay - centered below flow */}
      {scenario.slackApproval && (
        <div className="flex justify-center mt-4">
          <SlackCard
            channel={scenario.slackApproval.channel}
            requestedBy={scenario.slackApproval.requestedBy}
            approvedBy={scenario.slackApproval.approvedBy}
            approverAvatar={scenario.slackApproval.approverAvatar}
            message={scenario.slackApproval.message}
            isApproved={isSlackApproved}
            isVisible={showSlack}
          />
        </div>
      )}

      {/* Spacer for non-slack scenarios to prevent layout shift */}
      {!showSlack && <div style={{ height: 20 }} />}

      {/* Scenario indicator dots */}
      <div className="flex justify-center gap-2 mt-6">
        {scenarios.map((s, i) => (
          <div
            key={s.id}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              i === scenarioIndex ? 'bg-emerald-400' : 'bg-zinc-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

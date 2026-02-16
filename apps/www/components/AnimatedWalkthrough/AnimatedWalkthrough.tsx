'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SCENARIO, TOTAL_DURATION_MS } from './data'
import { TerminalRenderer } from './components/TerminalRenderer'
import { SlackCard } from './components/SlackCard'
import { EvidenceReceipt } from './components/EvidenceReceipt'
import Link from 'next/link'
import BookACallButton from '~/components/BookACallButton'
import { Button } from 'ui'

export function AnimatedWalkthrough() {
  const [currentBeat, setCurrentBeat] = useState(-1) // -1 = not started
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const beatTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const startTimeRef = useRef<number>(0)

  const play = useCallback(() => {
    // Clear any existing timers
    if (timerRef.current) clearInterval(timerRef.current)
    beatTimersRef.current.forEach(clearTimeout)
    beatTimersRef.current = []

    setCurrentBeat(0)
    setElapsedMs(0)
    setIsPlaying(true)
    setHasFinished(false)
    startTimeRef.current = Date.now()

    // Progress tracker
    const progressInterval = setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current)
    }, 100)
    timerRef.current = progressInterval

    // Schedule beat transitions
    let cumulative = 0
    SCENARIO.forEach((beat, i) => {
      if (i === 0) return // First beat starts immediately
      cumulative += SCENARIO[i - 1].durationMs
      const t = setTimeout(() => setCurrentBeat(i), cumulative)
      beatTimersRef.current.push(t)
    })

    // End
    cumulative += SCENARIO[SCENARIO.length - 1].durationMs
    const endTimer = setTimeout(() => {
      setIsPlaying(false)
      setHasFinished(true)
      clearInterval(progressInterval)
    }, cumulative)
    beatTimersRef.current.push(endTimer)
  }, [])

  // Intersection Observer — auto-play on scroll
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && currentBeat === -1 && !hasFinished) {
          play()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [currentBeat, hasFinished, play])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      beatTimersRef.current.forEach(clearTimeout)
    }
  }, [])

  const progress = Math.min(elapsedMs / TOTAL_DURATION_MS, 1)
  const activeBeat = currentBeat >= 0 ? SCENARIO[currentBeat] : null

  // Collect all terminal lines up to current beat for persistent display
  const allTerminalLines = SCENARIO.slice(0, currentBeat + 1).flatMap((b) => b.lines ?? [])

  return (
    <div ref={containerRef} className="relative">
      {/* Terminal window chrome */}
      <div className="rounded-xl border border-neutral-700/50 bg-[#0a0a0f] shadow-2xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800/50 border-b border-neutral-700/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-xs text-neutral-500 font-mono ml-2">
            axite — change control
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 min-h-[400px] font-mono text-sm relative">
          {/* Terminal lines — persistent across beats */}
          {currentBeat >= 0 && (
            <TerminalRenderer lines={allTerminalLines} active={isPlaying} />
          )}

          {/* Slack card overlay — beat 3 */}
          {activeBeat?.id === 'slack-approval' && <SlackCard active={true} />}

          {/* Evidence receipt — beat 5 */}
          {activeBeat?.id === 'evidence' && <EvidenceReceipt active={true} />}

          {/* CTA — beat 6 */}
          {activeBeat?.id === 'cta' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center py-8 gap-4"
            >
              <p className="text-neutral-400 text-base mb-2">
                Every agent action. Controlled. Approved. Receipted.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <BookACallButton
                  label="Start your 30-day pilot"
                  type="primary"
                  size="medium"
                />
                <Button asChild size="medium" type="default">
                  <Link href="https://cal.com/axite/30min">Book a call</Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Not started state */}
          {currentBeat === -1 && !hasFinished && (
            <div className="flex items-center justify-center h-full min-h-[350px]">
              <p className="text-neutral-600 text-sm">Scroll to play demo...</p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {(isPlaying || hasFinished) && (
          <div className="relative h-1 bg-neutral-800">
            <motion.div
              className="absolute left-0 top-0 h-full bg-violet-500/70"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
            {/* Beat markers */}
            <div className="absolute inset-0 flex">
              {SCENARIO.map((beat, i) => {
                const offset =
                  SCENARIO.slice(0, i).reduce((s, b) => s + b.durationMs, 0) /
                  TOTAL_DURATION_MS
                return beat.label ? (
                  <div
                    key={beat.id}
                    className="absolute top-2 text-[10px] text-neutral-600 font-mono whitespace-nowrap"
                    style={{ left: `${offset * 100}%` }}
                  >
                    {beat.label}
                  </div>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>

      {/* Replay button */}
      {hasFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-4"
        >
          <button
            onClick={play}
            className="text-sm text-neutral-500 hover:text-neutral-300 font-mono transition-colors"
          >
            ↻ Replay
          </button>
        </motion.div>
      )}
    </div>
  )
}

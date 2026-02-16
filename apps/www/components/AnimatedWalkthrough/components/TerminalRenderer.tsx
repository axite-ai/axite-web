// apps/www/components/AnimatedWalkthrough/components/TerminalRenderer.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalLine } from '../types'

const colorMap: Record<string, string> = {
  green: 'text-emerald-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  blue: 'text-sky-400',
  dim: 'text-neutral-500',
  white: 'text-neutral-200',
  brand: 'text-violet-400',
}

function TypedLine({ line, onComplete }: { line: TerminalLine; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState(line.instant ? line.text : '')
  const speed = line.typeSpeed ?? 30
  const indexRef = useRef(0)

  useEffect(() => {
    if (line.instant) {
      onComplete?.()
      return
    }
    indexRef.current = 0
    setDisplayed('')
    const interval = setInterval(() => {
      indexRef.current++
      setDisplayed(line.text.slice(0, indexRef.current))
      if (indexRef.current >= line.text.length) {
        clearInterval(interval)
        onComplete?.()
      }
    }, speed)
    return () => clearInterval(interval)
  }, [line.text, line.instant, speed])

  const colorClass = colorMap[line.color ?? 'white'] ?? 'text-neutral-200'

  return (
    <div className={`${colorClass} min-h-[1.5em] whitespace-pre font-mono text-sm leading-relaxed`}>
      {displayed}
      {!line.instant && displayed.length < line.text.length && (
        <span className="animate-pulse text-neutral-400">▊</span>
      )}
    </div>
  )
}

interface Props {
  lines: TerminalLine[]
  active: boolean
}

export function TerminalRenderer({ lines, active }: Props) {
  const [visibleCount, setVisibleCount] = useState(0)
  const timerRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    if (!active) return
    setVisibleCount(0)
    timerRef.current.forEach(clearTimeout)
    timerRef.current = []

    let cumulative = 0
    lines.forEach((line, i) => {
      cumulative += line.delay ?? 0
      const t = setTimeout(() => setVisibleCount(i + 1), cumulative)
      timerRef.current.push(t)
      // Add typing duration to cumulative
      if (!line.instant) {
        cumulative += (line.typeSpeed ?? 30) * line.text.length
      }
    })

    return () => timerRef.current.forEach(clearTimeout)
  }, [active, lines])

  return (
    <div className="space-y-0">
      <AnimatePresence>
        {lines.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={`${i}-${line.text}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <TypedLine line={line} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

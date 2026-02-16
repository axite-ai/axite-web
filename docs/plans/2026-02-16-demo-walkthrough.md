# Demo Walkthrough Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an auto-playing animated terminal walkthrough on `/demo` showing a K8s deployment flowing through Axite's change control pipeline.

**Architecture:** A single `<AnimatedWalkthrough>` component using framer-motion for animations, Intersection Observer for auto-play, and a step-based state machine that advances through 5 beats. Each beat renders different visual content (terminal output, Slack card, evidence receipt). The component lives below the existing Loom video on the demo page.

**Tech Stack:** React, TypeScript, framer-motion (already installed), Tailwind CSS, Intersection Observer API

**Design doc:** `docs/plans/2026-02-16-demo-walkthrough-design.md`

**IMPORTANT — Visual design:** Read and follow the frontend-design skill at `/data/skills/frontend-design/SKILL.md` for all UI work. This must look distinctive and polished — no generic AI aesthetics. Terminal aesthetic: dark background, monospace fonts (use Google Fonts: JetBrains Mono or Fira Code), character-by-character typing, colored output (green/amber/red), subtle glow effects.

---

### Task 1: Create the walkthrough data & types

**Files:**
- Create: `apps/www/components/AnimatedWalkthrough/types.ts`
- Create: `apps/www/components/AnimatedWalkthrough/data.ts`

**Step 1: Create types**

```typescript
// apps/www/components/AnimatedWalkthrough/types.ts

export type BeatId = 'agent-acts' | 'intercept' | 'slack-approval' | 'execution' | 'evidence' | 'cta'

export interface TerminalLine {
  text: string
  color?: 'green' | 'amber' | 'red' | 'blue' | 'dim' | 'white' | 'brand'
  delay?: number      // ms before this line starts typing
  typeSpeed?: number  // ms per character (default 30)
  instant?: boolean   // render immediately, no typing animation
}

export interface Beat {
  id: BeatId
  durationMs: number
  label: string        // for progress bar
  lines?: TerminalLine[]
}
```

**Step 2: Create scenario data**

```typescript
// apps/www/components/AnimatedWalkthrough/data.ts
import { Beat } from './types'

export const SCENARIO: Beat[] = [
  {
    id: 'agent-acts',
    durationMs: 5000,
    label: 'Agent acts',
    lines: [
      { text: '$ payment-agent running...', color: 'dim', typeSpeed: 0, instant: true },
      { text: '', delay: 300, instant: true },
      { text: '[payment-agent] Deploying payments service v2.4.1', color: 'white', delay: 500 },
      { text: '', delay: 200, instant: true },
      { text: '> kubectl apply -f deploy-payments-v2.yaml --namespace production', color: 'green', delay: 800, typeSpeed: 35 },
    ],
  },
  {
    id: 'intercept',
    durationMs: 8000,
    label: 'Axite intercepts',
    lines: [
      { text: '', instant: true },
      { text: '⚡ axite gateway — intercepted', color: 'brand', delay: 300, typeSpeed: 25 },
      { text: '', delay: 200, instant: true },
      { text: '  identity     payment-agent', color: 'dim', delay: 400, instant: true },
      { text: '  action       kubectl apply', color: 'dim', delay: 200, instant: true },
      { text: '  namespace    production', color: 'dim', delay: 200, instant: true },
      { text: '  policy       prod-deploy-policy', color: 'dim', delay: 200, instant: true },
      { text: '', delay: 300, instant: true },
      { text: '  evaluating policy...', color: 'amber', delay: 500, typeSpeed: 40 },
      { text: '', delay: 800, instant: true },
      { text: '  result       REQUIRES_APPROVAL', color: 'amber', delay: 400, typeSpeed: 20 },
      { text: '  → notifying #platform-approvals on Slack', color: 'dim', delay: 600 },
    ],
  },
  {
    id: 'slack-approval',
    durationMs: 10000,
    label: 'Slack approval',
    lines: [], // This beat renders a Slack card component instead of terminal lines
  },
  {
    id: 'execution',
    durationMs: 7000,
    label: 'Execution',
    lines: [
      { text: '', instant: true },
      { text: '✓ approved by sarah@acme.com', color: 'green', delay: 300 },
      { text: '  justification: "Reviewed diff — LGTM"', color: 'dim', delay: 400, instant: true },
      { text: '', delay: 300, instant: true },
      { text: '⚡ axite gateway — releasing action', color: 'brand', delay: 500 },
      { text: '', delay: 400, instant: true },
      { text: '> kubectl apply -f deploy-payments-v2.yaml --namespace production', color: 'green', delay: 300, typeSpeed: 40 },
      { text: '  deployment.apps/payments-v2 configured', color: 'green', delay: 800, instant: true },
      { text: '  rollout status: 3/3 replicas updated', color: 'green', delay: 400, instant: true },
    ],
  },
  {
    id: 'evidence',
    durationMs: 10000,
    label: 'Evidence receipt',
    lines: [], // This beat renders an evidence receipt card
  },
  {
    id: 'cta',
    durationMs: 5000,
    label: '',
    lines: [], // This beat renders CTA buttons
  },
]

export const TOTAL_DURATION_MS = SCENARIO.reduce((sum, b) => sum + b.durationMs, 0)
```

**Step 3: Commit**

```bash
cd /data/axite-web
git add apps/www/components/AnimatedWalkthrough/
git commit -m "feat(demo): add walkthrough types and scenario data"
```

---

### Task 2: Build the TerminalRenderer component

**Files:**
- Create: `apps/www/components/AnimatedWalkthrough/components/TerminalRenderer.tsx`

**Step 1: Build the component**

This component takes an array of `TerminalLine[]` and renders them with typing animations. Each line appears after its `delay` and types out character-by-character at `typeSpeed`. Uses framer-motion for fade-in and a custom hook for the typing effect.

```typescript
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
```

**Step 2: Commit**

```bash
cd /data/axite-web
git add apps/www/components/AnimatedWalkthrough/components/
git commit -m "feat(demo): add TerminalRenderer with typing animation"
```

---

### Task 3: Build the SlackCard component

**Files:**
- Create: `apps/www/components/AnimatedWalkthrough/components/SlackCard.tsx`

**Step 1: Build the component**

A styled recreation of a Slack approval notification. Animates in, then after a delay the "Approve" button gets clicked with a visual press effect.

```typescript
// apps/www/components/AnimatedWalkthrough/components/SlackCard.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  active: boolean
}

export function SlackCard({ active }: Props) {
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    if (!active) { setApproved(false); return }
    const t = setTimeout(() => setApproved(true), 6000) // 6s into the beat
    return () => clearTimeout(t)
  }, [active])

  if (!active) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-auto max-w-lg my-6"
    >
      <div className="rounded-lg border border-neutral-700 bg-neutral-800/80 backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Slack header */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-700/50 bg-neutral-800">
          <div className="w-5 h-5 rounded bg-violet-500/20 flex items-center justify-center">
            <span className="text-violet-400 text-xs font-bold">A</span>
          </div>
          <span className="text-xs text-neutral-400 font-mono">axite</span>
          <span className="text-xs text-neutral-600 mx-1">→</span>
          <span className="text-xs text-neutral-400 font-mono">#platform-approvals</span>
        </div>

        {/* Message body */}
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-violet-400 text-sm">⚡</span>
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-neutral-200">Axite</span>
                <span className="text-xs text-neutral-500">11:42 AM</span>
              </div>
              <p className="text-sm text-neutral-300">
                <strong className="text-amber-400">Approval required</strong> for production deployment
              </p>

              {/* Attachment */}
              <div className="border-l-2 border-amber-500 pl-3 py-1 space-y-1">
                <div className="text-xs text-neutral-400">
                  <span className="text-neutral-500">Agent:</span> payment-agent
                </div>
                <div className="text-xs text-neutral-400">
                  <span className="text-neutral-500">Action:</span> kubectl apply -f deploy-payments-v2.yaml
                </div>
                <div className="text-xs text-neutral-400">
                  <span className="text-neutral-500">Namespace:</span> production
                </div>
                <div className="text-xs text-neutral-400">
                  <span className="text-neutral-500">Policy:</span> prod-deploy-policy
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-1">
                <motion.button
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    approved
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                  animate={approved ? { scale: [1, 0.95, 1] } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {approved ? '✓ Approved' : 'Approve'}
                </motion.button>
                {!approved && (
                  <button className="px-3 py-1.5 rounded text-xs font-medium bg-neutral-700 text-neutral-300">
                    Deny
                  </button>
                )}
              </div>

              {/* Justification (appears after approval) */}
              {approved && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-neutral-500 italic"
                >
                  sarah@acme.com: &quot;Reviewed diff — LGTM&quot;
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
```

**Step 2: Commit**

```bash
cd /data/axite-web
git add apps/www/components/AnimatedWalkthrough/components/SlackCard.tsx
git commit -m "feat(demo): add SlackCard approval component"
```

---

### Task 4: Build the EvidenceReceipt component

**Files:**
- Create: `apps/www/components/AnimatedWalkthrough/components/EvidenceReceipt.tsx`

**Step 1: Build the component**

The "money shot" — a tamper-evident audit receipt that animates in with staggered rows. Clean, structured, feels like a real audit artifact.

```typescript
// apps/www/components/AnimatedWalkthrough/components/EvidenceReceipt.tsx
'use client'

import { motion } from 'framer-motion'

interface Props {
  active: boolean
}

const receiptRows = [
  { label: 'Hash', value: 'sha256:e3b0c44298fc...a495991b7852b855', mono: true },
  { label: 'Requested', value: '2026-02-16T11:42:03Z' },
  { label: 'Approved', value: '2026-02-16T11:42:47Z' },
  { label: 'Executed', value: '2026-02-16T11:42:48Z' },
  { label: 'Requester', value: 'payment-agent (service-account)' },
  { label: 'Approver', value: 'sarah@acme.com' },
  { label: 'Action', value: 'kubectl apply -f deploy-payments-v2.yaml' },
  { label: 'Namespace', value: 'production' },
  { label: 'Policy', value: 'prod-deploy-policy' },
  { label: 'Decision', value: 'APPROVED → EXECUTED', highlight: true },
]

export function EvidenceReceipt({ active }: Props) {
  if (!active) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto max-w-lg my-6"
    >
      <div className="rounded-lg border border-neutral-700 bg-neutral-900/90 backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-violet-400 text-sm">⚡</span>
            <span className="text-sm font-semibold text-neutral-200">Evidence Receipt</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400/70 bg-emerald-400/10 px-2 py-0.5 rounded">
            TAMPER-EVIDENT
          </span>
        </div>

        {/* Rows */}
        <div className="px-5 py-4 space-y-0">
          {receiptRows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
              className="flex justify-between py-1.5 border-b border-neutral-800/50 last:border-0"
            >
              <span className="text-xs text-neutral-500 uppercase tracking-wider w-24 flex-shrink-0">
                {row.label}
              </span>
              <span
                className={`text-xs text-right ${
                  row.highlight
                    ? 'text-emerald-400 font-semibold'
                    : row.mono
                    ? 'text-neutral-400 font-mono'
                    : 'text-neutral-300'
                }`}
              >
                {row.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
```

**Step 2: Commit**

```bash
cd /data/axite-web
git add apps/www/components/AnimatedWalkthrough/components/EvidenceReceipt.tsx
git commit -m "feat(demo): add EvidenceReceipt component"
```

---

### Task 5: Build the main AnimatedWalkthrough component

**Files:**
- Create: `apps/www/components/AnimatedWalkthrough/AnimatedWalkthrough.tsx`
- Create: `apps/www/components/AnimatedWalkthrough/index.tsx`

**Step 1: Build the main orchestrator**

This component manages the state machine: which beat is active, auto-advances through beats, handles play/replay, and renders the correct sub-components per beat. Uses Intersection Observer to auto-play.

```typescript
// apps/www/components/AnimatedWalkthrough/AnimatedWalkthrough.tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SCENARIO, TOTAL_DURATION_MS } from './data'
import { TerminalRenderer } from './components/TerminalRenderer'
import { SlackCard } from './components/SlackCard'
import { EvidenceReceipt } from './components/EvidenceReceipt'
import { BeatId } from './types'
import Link from 'next/link'
import BookACallButton from '~/components/BookACallButton'
import { Button } from 'ui'

export function AnimatedWalkthrough() {
  const [currentBeat, setCurrentBeat] = useState(-1) // -1 = not started
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  const play = useCallback(() => {
    setCurrentBeat(0)
    setElapsedMs(0)
    setIsPlaying(true)
    setHasFinished(false)
    startTimeRef.current = Date.now()

    // Progress tracker
    const progressInterval = setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current)
    }, 100)

    // Schedule beat transitions
    let cumulative = 0
    SCENARIO.forEach((beat, i) => {
      if (i === 0) return // First beat starts immediately
      cumulative += SCENARIO[i - 1].durationMs
      setTimeout(() => setCurrentBeat(i), cumulative)
    })

    // End
    cumulative += SCENARIO[SCENARIO.length - 1].durationMs
    setTimeout(() => {
      setIsPlaying(false)
      setHasFinished(true)
      clearInterval(progressInterval)
    }, cumulative)

    timerRef.current = progressInterval as unknown as NodeJS.Timeout
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
    }
  }, [])

  const progress = Math.min(elapsedMs / TOTAL_DURATION_MS, 1)
  const activeBeat = currentBeat >= 0 ? SCENARIO[currentBeat] : null

  // Collect all terminal lines up to current beat for persistent display
  const allTerminalLines = SCENARIO
    .slice(0, currentBeat + 1)
    .flatMap(b => b.lines ?? [])

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
          <span className="text-xs text-neutral-500 font-mono ml-2">axite — change control</span>
        </div>

        {/* Terminal body */}
        <div className="p-5 min-h-[400px] font-mono text-sm relative">
          {/* Terminal lines — persistent across beats */}
          {currentBeat >= 0 && (
            <TerminalRenderer
              lines={allTerminalLines}
              active={isPlaying}
            />
          )}

          {/* Slack card overlay — beat 3 */}
          {activeBeat?.id === 'slack-approval' && (
            <SlackCard active={true} />
          )}

          {/* Evidence receipt — beat 5 */}
          {activeBeat?.id === 'evidence' && (
            <EvidenceReceipt active={true} />
          )}

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
                <BookACallButton label="Start your 30-day pilot" type="primary" size="medium" />
                <Button asChild size="medium" type="default">
                  <Link href="https://cal.com/axite/30min">Book a call</Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Not started / replay state */}
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
                const offset = SCENARIO.slice(0, i).reduce((s, b) => s + b.durationMs, 0) / TOTAL_DURATION_MS
                return beat.label ? (
                  <div
                    key={beat.id}
                    className="absolute top-2 text-[10px] text-neutral-600 font-mono"
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
```

**Step 2: Create index file**

```typescript
// apps/www/components/AnimatedWalkthrough/index.tsx
export { AnimatedWalkthrough } from './AnimatedWalkthrough'
```

**Step 3: Commit**

```bash
cd /data/axite-web
git add apps/www/components/AnimatedWalkthrough/
git commit -m "feat(demo): add AnimatedWalkthrough orchestrator component"
```

---

### Task 6: Update the demo page

**Files:**
- Modify: `apps/www/pages/demo.tsx`

**Step 1: Add the AnimatedWalkthrough below the Loom video**

Replace the existing InteractiveDemo import and section with AnimatedWalkthrough. Keep the Loom video section as-is.

In `apps/www/pages/demo.tsx`:
- Remove the `InteractiveDemo` dynamic import
- Add: `const AnimatedWalkthrough = dynamic(() => import('~/components/AnimatedWalkthrough').then(mod => ({ default: mod.AnimatedWalkthrough })), { ssr: false })`
- Replace the entire "Interactive Demo Section" (from the `<SectionContainer>` with `border-t` to its closing tag) with:

```tsx
{/* Animated Walkthrough Section */}
<SectionContainer className="pt-8 pb-16 md:pt-12 md:pb-24 border-t border-muted">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-8">
      <span className="font-mono text-xs text-brand uppercase tracking-widest">
        Interactive Walkthrough
      </span>
      <h2 className="text-2xl sm:text-3xl font-normal text-foreground mt-4 mb-4">
        See it in action
      </h2>
      <p className="text-foreground-lighter text-lg max-w-2xl mx-auto">
        Watch an AI agent deploy to production — intercepted, approved, and receipted.
      </p>
    </div>
    <AnimatedWalkthrough />
  </div>
</SectionContainer>
```

- Remove the "How to use" help text section (no longer relevant)

**Step 2: Add Google Font for JetBrains Mono**

In `apps/www/pages/_document.tsx` (or wherever fonts are loaded), add:
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

And in `apps/www/tailwind.config.js`, extend fontFamily:
```js
fontFamily: {
  mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
}
```

**Step 3: Commit**

```bash
cd /data/axite-web
git add apps/www/pages/demo.tsx apps/www/pages/_document.tsx apps/www/tailwind.config.js
git commit -m "feat(demo): integrate AnimatedWalkthrough on demo page"
```

---

### Task 7: Polish and test

**Step 1: Visual polish pass**

- Verify the terminal background color matches the site's dark theme
- Check that the font loads correctly (JetBrains Mono)
- Test the typing animation speed feels natural
- Verify Slack card and Evidence receipt animate smoothly
- Check mobile responsiveness (stack layout, readable text sizes)
- Ensure the progress bar beat labels don't overlap on small screens

**Step 2: Run build**

```bash
cd /data/axite-web
pnpm install
pnpm run build
```

Fix any TypeScript errors.

**Step 3: Commit final polish**

```bash
cd /data/axite-web
git add -A
git commit -m "feat(demo): polish walkthrough animations and mobile layout"
```

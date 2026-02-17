# Demo Page Redesign: Animated Intercept Demo

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the complex interactive demo on axite.ai/demo with an autoplay animated intercept visualization + link to the static dashboard at demo.axite.dev.

**Architecture:** Single `DemoAnimation` component using SVG for the flow visualization (agent → gateway → tool) and framer-motion for animations. A hyper-realistic Slack approval card (styled div with foreignObject in SVG) slides in for approval scenarios. The component cycles through 4 scenarios on a timer. The page structure becomes: animation hero → CTA to dashboard → Loom video.

**Tech Stack:** React 18, TypeScript, framer-motion (already installed), SVG, Tailwind CSS, Next.js Pages Router

---

### Task 1: Create scenario data and types

**Files:**
- Create: `apps/www/components/DemoAnimation/types.ts`
- Create: `apps/www/components/DemoAnimation/scenarios.ts`

**Step 1: Create the types file**

```typescript
// apps/www/components/DemoAnimation/types.ts

export type Decision = 'ALLOWED' | 'BLOCKED' | 'APPROVAL_REQUIRED'

export interface Scenario {
  id: string
  agentName: string
  agentIcon: 'terminal' | 'cloud' | 'git' | 'credit-card'
  toolCall: string
  toolName: string
  environment: string
  decision: Decision
  policyRule: string
  /** Only present for APPROVAL_REQUIRED scenarios */
  slackApproval?: {
    channel: string
    requestedBy: string
    approvedBy: string
    approverAvatar: string
    message: string
  }
  /** Audit receipt shown after resolution */
  receipt: {
    traceId: string
    hmac: string
  }
}

export type AnimationPhase =
  | 'idle'
  | 'sending'        // packet moving from agent to gateway
  | 'evaluating'     // gateway pulse
  | 'decided'        // decision badge appears
  | 'slack-in'       // slack card slides in (approval only)
  | 'slack-approved'  // checkmark on slack card (approval only)
  | 'executing'      // packet moving from gateway to tool (allow/approved only)
  | 'receipt'        // audit receipt fades in
  | 'fade-out'       // scenario fading out before next
```

**Step 2: Create the scenarios file**

```typescript
// apps/www/components/DemoAnimation/scenarios.ts
import type { Scenario } from './types'

export const scenarios: Scenario[] = [
  {
    id: 'kubectl-delete',
    agentName: 'k8s-deployer',
    agentIcon: 'terminal',
    toolCall: 'kubectl delete pod api-server-7d4f',
    toolName: 'Kubernetes',
    environment: 'production',
    decision: 'APPROVAL_REQUIRED',
    policyRule: 'require-approval-destructive-prod',
    slackApproval: {
      channel: '#prod-approvals',
      requestedBy: 'k8s-deployer',
      approvedBy: 'Sarah Chen',
      approverAvatar: 'SC',
      message: 'k8s-deployer wants to delete pod api-server-7d4f in production',
    },
    receipt: { traceId: 'tr_8x2k4m9n', hmac: 'sha256:7f3a...e91d' },
  },
  {
    id: 's3-delete',
    agentName: 'cleanup-agent',
    agentIcon: 'cloud',
    toolCall: 's3:DeleteBucket logs-2024-archive',
    toolName: 'AWS S3',
    environment: 'production',
    decision: 'BLOCKED',
    policyRule: 'block-destructive-s3-prod',
    receipt: { traceId: 'tr_3j7m2p5q', hmac: 'sha256:2b4c...f8a3' },
  },
  {
    id: 'github-merge',
    agentName: 'ci-bot',
    agentIcon: 'git',
    toolCall: 'github:merge-pr #1482 → main',
    toolName: 'GitHub',
    environment: 'production',
    decision: 'ALLOWED',
    policyRule: 'allow-ci-merge-with-approval',
    receipt: { traceId: 'tr_9d1f4h6k', hmac: 'sha256:c5e7...3d2a' },
  },
  {
    id: 'stripe-refund',
    agentName: 'support-agent',
    agentIcon: 'credit-card',
    toolCall: 'stripe:refund $4,200 → cus_L4x9mK',
    toolName: 'Stripe',
    environment: 'production',
    decision: 'APPROVAL_REQUIRED',
    policyRule: 'review-refunds-over-1000',
    slackApproval: {
      channel: '#finance-approvals',
      requestedBy: 'support-agent',
      approvedBy: 'Mike Torres',
      approverAvatar: 'MT',
      message: 'support-agent wants to refund $4,200 to cus_L4x9mK',
    },
    receipt: { traceId: 'tr_5g8j1m3p', hmac: 'sha256:1a9b...7c4e' },
  },
]
```

**Step 3: Commit**

```bash
git add apps/www/components/DemoAnimation/types.ts apps/www/components/DemoAnimation/scenarios.ts
git commit -m "feat(demo): add scenario data and types for animated demo"
```

---

### Task 2: Create the SVG flow visualization

**Files:**
- Create: `apps/www/components/DemoAnimation/FlowSVG.tsx`

This is the core SVG with three nodes (agent, gateway, tool) connected by paths, plus an animated packet dot.

**Step 1: Create FlowSVG component**

```tsx
// apps/www/components/DemoAnimation/FlowSVG.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Cloud, GitBranch, CreditCard, Shield, Server } from 'lucide-react'
import type { Scenario, AnimationPhase, Decision } from './types'

const agentIcons = {
  terminal: Terminal,
  cloud: Cloud,
  git: GitBranch,
  'credit-card': CreditCard,
}

const decisionColors: Record<Decision, { bg: string; text: string; border: string; label: string }> = {
  ALLOWED: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'ALLOWED' },
  BLOCKED: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', label: 'BLOCKED' },
  APPROVAL_REQUIRED: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', label: 'APPROVAL REQUIRED' },
}

interface FlowSVGProps {
  scenario: Scenario
  phase: AnimationPhase
}

export function FlowSVG({ scenario, phase }: FlowSVGProps) {
  const AgentIcon = agentIcons[scenario.agentIcon]
  const showPacketToGateway = phase === 'sending'
  const showGatewayPulse = phase === 'evaluating'
  const showDecision = ['decided', 'slack-in', 'slack-approved', 'executing', 'receipt'].includes(phase)
  const showPacketToTool = phase === 'executing'
  const showReceipt = phase === 'receipt'
  const isBlocked = scenario.decision === 'BLOCKED'

  return (
    <div className="relative w-full" style={{ maxWidth: 720, margin: '0 auto' }}>
      <svg viewBox="0 0 720 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Connection paths */}
        <line x1="130" y1="80" x2="310" y2="80" stroke="hsl(240 3.7% 25%)" strokeWidth="1" strokeDasharray="6 4" />
        <line x1="410" y1="80" x2="590" y2="80" stroke="hsl(240 3.7% 25%)" strokeWidth="1" strokeDasharray="6 4" />

        {/* Animated packet: agent → gateway */}
        {showPacketToGateway && (
          <motion.circle
            cx="130" cy="80" r="4"
            fill="hsl(153 60% 53%)"
            filter="url(#glow)"
            animate={{ cx: [130, 310] }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        )}

        {/* Animated packet: gateway → tool */}
        {showPacketToTool && !isBlocked && (
          <motion.circle
            cx="410" cy="80" r="4"
            fill="hsl(153 60% 53%)"
            filter="url(#glow)"
            animate={{ cx: [410, 590] }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        )}

        {/* Gateway pulse */}
        {showGatewayPulse && (
          <motion.circle
            cx="360" cy="80" r="36"
            fill="none"
            stroke="hsl(153 60% 53%)"
            strokeWidth="1"
            initial={{ r: 36, opacity: 0.6 }}
            animate={{ r: [36, 52], opacity: [0.6, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}

        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* HTML overlay nodes (positioned absolutely over SVG) */}
      <div className="absolute inset-0" style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Agent node */}
        <div className="absolute flex flex-col items-center" style={{ left: '10%', top: '50%', transform: 'translate(-50%, -70%)' }}>
          <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-700/50 flex items-center justify-center mb-2">
            <AgentIcon className="w-6 h-6 text-zinc-400" />
          </div>
          <span className="font-mono text-[11px] text-zinc-500">{scenario.agentName}</span>
        </div>

        {/* Gateway node */}
        <div className="absolute flex flex-col items-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -70%)' }}>
          <motion.div
            className="w-14 h-14 rounded-xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-center mb-2"
            animate={showGatewayPulse ? { borderColor: ['hsla(153,60%,53%,0.3)', 'hsla(153,60%,53%,0.7)', 'hsla(153,60%,53%,0.3)'] } : {}}
            transition={showGatewayPulse ? { duration: 1, repeat: Infinity } : {}}
          >
            <Shield className="w-6 h-6 text-emerald-400" />
          </motion.div>
          <span className="font-mono text-[11px] text-zinc-500">axite gateway</span>
        </div>

        {/* Tool node */}
        <div className="absolute flex flex-col items-center" style={{ left: '90%', top: '50%', transform: 'translate(-50%, -70%)' }}>
          <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-700/50 flex items-center justify-center mb-2">
            <Server className="w-6 h-6 text-zinc-400" />
          </div>
          <span className="font-mono text-[11px] text-zinc-500">{scenario.toolName}</span>
        </div>

        {/* Tool call label */}
        <AnimatePresence>
          {['sending', 'evaluating', 'decided', 'slack-in', 'slack-approved', 'executing', 'receipt'].includes(phase) && (
            <motion.div
              className="absolute font-mono text-xs text-zinc-400 bg-zinc-900/80 border border-zinc-800 rounded px-2 py-1"
              style={{ left: '50%', top: '10%', transform: 'translateX(-50%)' }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-zinc-500">$ </span>{scenario.toolCall}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decision badge */}
        <AnimatePresence>
          {showDecision && (
            <motion.div
              className={`absolute font-mono text-[11px] font-medium px-2.5 py-1 rounded-full border ${decisionColors[scenario.decision].bg} ${decisionColors[scenario.decision].text} ${decisionColors[scenario.decision].border}`}
              style={{ left: '50%', top: '78%', transform: 'translateX(-50%)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {decisionColors[scenario.decision].label}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blocked X on connection path */}
        <AnimatePresence>
          {showDecision && isBlocked && (
            <motion.div
              className="absolute text-red-400 font-bold text-lg"
              style={{ left: '70%', top: '42%', transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              ✕
            </motion.div>
          )}
        </AnimatePresence>

        {/* Receipt */}
        <AnimatePresence>
          {showReceipt && (
            <motion.div
              className="absolute font-mono text-[10px] text-zinc-500 bg-zinc-900/60 border border-zinc-800/50 rounded px-2 py-1"
              style={{ left: '50%', bottom: '2%', transform: 'translateX(-50%)' }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              receipt: {scenario.receipt.traceId} · {scenario.receipt.hmac}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/www/components/DemoAnimation/FlowSVG.tsx
git commit -m "feat(demo): add SVG flow visualization component"
```

---

### Task 3: Create hyper-realistic Slack approval card

**Files:**
- Create: `apps/www/components/DemoAnimation/SlackCard.tsx`

Pixel-accurate replica of a real Slack notification. Must nail: the Slack bot avatar, channel pill, message body, action buttons (green "Approve" / red "Deny"), timestamp, border-left accent, Slack's exact color palette (#1264A3 blue, #2EB67D green, #E01E5A red, #ECB22E yellow, #36C5F0 teal), and the approved checkmark state.

**Step 1: Create SlackCard component**

```tsx
// apps/www/components/DemoAnimation/SlackCard.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlackCardProps {
  channel: string
  requestedBy: string
  approvedBy: string
  approverAvatar: string
  message: string
  isApproved: boolean
  isVisible: boolean
}

export function SlackCard({
  channel,
  requestedBy,
  approvedBy,
  approverAvatar,
  message,
  isApproved,
  isVisible,
}: SlackCardProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-[380px] rounded-lg overflow-hidden shadow-2xl shadow-black/40"
          style={{ backgroundColor: '#1A1D21' }}
        >
          {/* Slack header bar */}
          <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: '#1A1D21', borderBottom: '1px solid #313338' }}>
            {/* Slack logo */}
            <svg width="16" height="16" viewBox="0 0 54 54" className="shrink-0">
              <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"/>
              <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"/>
              <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E"/>
              <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.249a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A"/>
            </svg>
            <span className="text-[13px] font-bold" style={{ color: '#D1D2D3' }}>Axite</span>
            <span className="text-[11px] ml-auto" style={{ color: '#ABABAD' }}>
              {channel}
            </span>
          </div>

          {/* Message body */}
          <div className="px-3 py-3" style={{ borderLeft: '3px solid #2EB67D' }}>
            {/* Bot info line */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0" style={{ backgroundColor: '#2EB67D' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <span className="text-[13px] font-bold" style={{ color: '#D1D2D3' }}>Axite</span>
                <span className="text-[11px] ml-1.5 px-1 py-0.5 rounded" style={{ color: '#ABABAD', backgroundColor: '#313338' }}>APP</span>
                <div className="text-[11px]" style={{ color: '#ABABAD' }}>Today at {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}</div>
              </div>
            </div>

            {/* Action request */}
            <div className="text-[13px] leading-relaxed mb-3" style={{ color: '#D1D2D3' }}>
              <span className="font-medium" style={{ color: '#E8912D' }}>Approval Required</span>
              <br />
              <span style={{ color: '#ABABAD' }}>{message}</span>
            </div>

            {/* Details block */}
            <div className="rounded px-2.5 py-2 mb-3 text-[12px] space-y-1" style={{ backgroundColor: '#222529', border: '1px solid #313338' }}>
              <div className="flex justify-between">
                <span style={{ color: '#ABABAD' }}>Requested by</span>
                <span className="font-mono" style={{ color: '#D1D2D3' }}>{requestedBy}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#ABABAD' }}>Environment</span>
                <span className="font-mono" style={{ color: '#E8912D' }}>production</span>
              </div>
            </div>

            {/* Action buttons / Approved state */}
            <AnimatePresence mode="wait">
              {!isApproved ? (
                <motion.div
                  key="buttons"
                  className="flex gap-2"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.button
                    className="px-4 py-1.5 rounded text-[13px] font-medium text-white"
                    style={{ backgroundColor: '#2EB67D' }}
                    animate={{ opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Approve
                  </motion.button>
                  <button
                    className="px-4 py-1.5 rounded text-[13px] font-medium"
                    style={{ backgroundColor: '#313338', color: '#D1D2D3' }}
                  >
                    Deny
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="approved"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#2EB67D"/>
                      <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[13px] font-medium" style={{ color: '#2EB67D' }}>Approved</span>
                  </div>
                  <span className="text-[11px]" style={{ color: '#ABABAD' }}>
                    by {approvedBy}
                  </span>
                  <div className="w-5 h-5 rounded-full text-[10px] font-medium flex items-center justify-center ml-1" style={{ backgroundColor: '#4A154B', color: '#D1D2D3' }}>
                    {approverAvatar}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Step 2: Commit**

```bash
git add apps/www/components/DemoAnimation/SlackCard.tsx
git commit -m "feat(demo): add hyper-realistic Slack approval card"
```

---

### Task 4: Create the animation orchestrator

**Files:**
- Create: `apps/www/components/DemoAnimation/DemoAnimation.tsx`
- Create: `apps/www/components/DemoAnimation/index.tsx`

This is the main component that manages the scenario loop and animation phase state machine.

**Step 1: Create the orchestrator**

```tsx
// apps/www/components/DemoAnimation/DemoAnimation.tsx
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
```

**Step 2: Create the barrel export**

```tsx
// apps/www/components/DemoAnimation/index.tsx
export { DemoAnimation } from './DemoAnimation'
```

**Step 3: Commit**

```bash
git add apps/www/components/DemoAnimation/DemoAnimation.tsx apps/www/components/DemoAnimation/index.tsx
git commit -m "feat(demo): add animation orchestrator with phase state machine"
```

---

### Task 5: Update the demo page

**Files:**
- Modify: `apps/www/pages/demo.tsx`

Replace the entire page to use the new structure: animation hero → CTA → Loom video.

**Step 1: Rewrite demo.tsx**

```tsx
// apps/www/pages/demo.tsx
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Layout from '~/components/Layouts/Default'
import SectionContainer from '~/components/Layouts/SectionContainer'

const DemoAnimation = dynamic(
  () => import('~/components/DemoAnimation').then(mod => ({ default: mod.DemoAnimation })),
  { ssr: false }
)

export default function DemoPage() {
  return (
    <>
      <NextSeo
        title="Demo | Axite"
        description="See how Axite intercepts every AI agent action before execution — approve via Slack, block destructive operations, and get tamper-evident receipts."
        openGraph={{
          title: 'Demo | Axite',
          description:
            'See how Axite intercepts every AI agent action before execution — approve via Slack, block destructive operations, and get tamper-evident receipts.',
          url: 'https://axite.ai/demo',
          type: 'website',
        }}
      />
      <Layout>
        {/* Hero: Animated Demo */}
        <SectionContainer className="pt-8 pb-8 md:pt-16 md:pb-12">
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-brand uppercase tracking-widest">
              Demo
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mt-4 mb-4">
              Every agent action. Intercepted.
            </h1>
            <p className="text-foreground-lighter text-lg max-w-xl mx-auto">
              Approve, block, or require sign-off — before execution. With receipts.
            </p>
          </div>

          <DemoAnimation />
        </SectionContainer>

        {/* CTA: Explore full dashboard */}
        <SectionContainer className="pt-0 pb-8 md:pt-0 md:pb-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-foreground-lighter text-sm mb-4">
              See the full product: agents, approval queues, policy editor, and audit timeline.
            </p>
            <a
              href="https://demo.axite.dev/demo/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-white font-medium text-sm hover:bg-brand/90 transition-colors"
            >
              Explore the dashboard
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </SectionContainer>

        {/* Loom Video (supporting content) */}
        <SectionContainer className="pt-8 pb-16 md:pt-12 md:pb-24 border-t border-muted">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-normal text-foreground mb-2">
                Watch the walkthrough
              </h2>
              <p className="text-foreground-lighter text-sm">
                3-minute narrated demo of Axite in action.
              </p>
            </div>
            <div className="relative w-full rounded-lg overflow-hidden border border-muted bg-surface-100">
              <div style={{ position: 'relative', paddingBottom: '64.86%', height: 0 }}>
                <iframe
                  src="https://www.loom.com/embed/b790d4f7728b43afa7ae342a6c596176?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
                  frameBorder={0}
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
            </div>
          </div>
        </SectionContainer>
      </Layout>
    </>
  )
}
```

**Step 2: Commit**

```bash
git add apps/www/pages/demo.tsx
git commit -m "feat(demo): rewrite demo page with animation hero + CTA + loom"
```

---

### Task 6: Delete old InteractiveDemo directory

**Files:**
- Delete: `apps/www/components/InteractiveDemo/` (entire directory — 23 files)

**Step 1: Delete the directory**

```bash
rm -rf apps/www/components/InteractiveDemo
```

**Step 2: Verify no remaining imports**

Search the codebase for any remaining references to `InteractiveDemo`:

```bash
grep -r "InteractiveDemo" apps/www/ --include="*.tsx" --include="*.ts"
```

Expected: No results (the only consumer was `pages/demo.tsx` which was rewritten in Task 5).

**Step 3: Commit**

```bash
git add -A apps/www/components/InteractiveDemo
git commit -m "chore(demo): delete old InteractiveDemo component (23 files)"
```

---

### Task 7: Verify build and visual test

**Step 1: Run the build**

```bash
cd apps/www && pnpm build
```

Expected: Build succeeds with no errors.

**Step 2: Run dev server and visually verify**

```bash
cd apps/www && pnpm dev
```

Open `http://localhost:3000/demo` and verify:
- [ ] Animation auto-plays when scrolled into view
- [ ] 4 scenarios cycle correctly with proper phase transitions
- [ ] Slack card slides in for approval scenarios and looks realistic
- [ ] Blocked scenarios show red badge + X on path, no packet to tool
- [ ] Allowed scenarios show green badge + packet reaches tool
- [ ] Receipt fades in at bottom after each scenario
- [ ] Scenario dots at bottom update correctly
- [ ] CTA button links to demo.axite.dev
- [ ] Loom video loads below CTA
- [ ] No layout shift between scenarios (especially slack vs non-slack)
- [ ] Homepage (`/`) still works — HowItWorksSection is unaffected

**Step 3: Commit any fixes, then final commit**

```bash
git add -A
git commit -m "feat(demo): animated intercept demo — replaces interactive sandbox"
```

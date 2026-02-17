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

const decisionStyles: Record<Decision, { style: React.CSSProperties; label: string }> = {
  ALLOWED: {
    style: { background: 'rgba(16, 185, 129, 0.35)', color: '#a7f3d0', border: '1px solid rgba(52, 211, 153, 0.8)' },
    label: 'ALLOWED',
  },
  BLOCKED: {
    style: { background: 'rgba(239, 68, 68, 0.35)', color: '#fecaca', border: '1px solid rgba(248, 113, 113, 0.8)' },
    label: 'BLOCKED',
  },
  APPROVAL_REQUIRED: {
    style: { background: 'rgba(245, 158, 11, 0.35)', color: '#fde68a', border: '1px solid rgba(251, 191, 36, 0.8)' },
    label: 'APPROVAL REQUIRED',
  },
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
  const isActive = phase !== 'idle' && phase !== 'fade-out'
  const ds = decisionStyles[scenario.decision]

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Tool call label — fixed height slot */}
      <div className="h-7 flex items-center">
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="font-mono text-sm text-foreground-light bg-surface-100 border border-border rounded-md px-3 py-1"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-foreground-muted">$ </span>
              {scenario.toolCall}
              <span className="text-foreground-muted ml-2 text-xs">({scenario.environment})</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Flow diagram — SVG with HTML node overlays */}
      <div className="relative w-full" style={{ maxWidth: 640, height: 120 }}>
        <svg viewBox="0 0 640 120" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Connection paths — aligned to HTML node centers (10%=64, 50%=320, 90%=576 of 640) */}
          <line x1="88" y1="50" x2="296" y2="50" stroke="hsl(var(--border-strong))" strokeWidth="1" strokeDasharray="6 4" />
          <line x1="344" y1="50" x2="552" y2="50" stroke="hsl(var(--border-strong))" strokeWidth="1" strokeDasharray="6 4" />

          {/* Animated packet: agent → gateway */}
          {showPacketToGateway && (
            <motion.circle
              cx="88" cy="50" r="4"
              fill="hsl(153 60% 53%)"
              filter="url(#glow)"
              animate={{ cx: [88, 296] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}

          {/* Animated packet: gateway → tool */}
          {showPacketToTool && !isBlocked && (
            <motion.circle
              cx="344" cy="50" r="4"
              fill="hsl(153 60% 53%)"
              filter="url(#glow)"
              animate={{ cx: [344, 552] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}

          {/* Gateway pulse */}
          {showGatewayPulse && (
            <motion.circle
              cx="320" cy="50" r="32"
              fill="none"
              stroke="hsl(153 60% 53%)"
              strokeWidth="1"
              initial={{ r: 32, opacity: 0.6 }}
              animate={{ r: [32, 48], opacity: [0.6, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}

          {/* Blocked X */}
          {showDecision && isBlocked && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <line x1="438" y1="40" x2="458" y2="60" stroke="hsl(0 84% 60%)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="458" y1="40" x2="438" y2="60" stroke="hsl(0 84% 60%)" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
          )}

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

        {/* HTML node overlays */}
        {/* Agent node — left */}
        <div className="absolute flex flex-col items-center" style={{ left: '10%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className="w-12 h-12 rounded-lg bg-surface-200 border border-border flex items-center justify-center">
            <AgentIcon className="w-5 h-5 text-foreground-muted" />
          </div>
          <span className="font-mono text-[10px] text-foreground-muted mt-1.5">{scenario.agentName}</span>
        </div>

        {/* Gateway node — center */}
        <div className="absolute flex flex-col items-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <motion.div
            className="w-12 h-12 rounded-lg bg-surface-200 border border-brand/30 flex items-center justify-center"
            animate={showGatewayPulse ? { borderColor: ['hsla(153,60%,53%,0.3)', 'hsla(153,60%,53%,0.7)', 'hsla(153,60%,53%,0.3)'] } : {}}
            transition={showGatewayPulse ? { duration: 1, repeat: Infinity } : {}}
          >
            <Shield className="w-5 h-5 text-brand" />
          </motion.div>
          <span className="font-mono text-[10px] text-foreground-muted mt-1.5">axite gateway</span>
        </div>

        {/* Tool node — right */}
        <div className="absolute flex flex-col items-center" style={{ left: '90%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className="w-12 h-12 rounded-lg bg-surface-200 border border-border flex items-center justify-center">
            <Server className="w-5 h-5 text-foreground-muted" />
          </div>
          <span className="font-mono text-[10px] text-foreground-muted mt-1.5">{scenario.toolName}</span>
        </div>
      </div>

      {/* Decision badge + receipt — fixed height slot */}
      <div className="h-14 flex flex-col items-center justify-start gap-1.5">
        <AnimatePresence>
          {showDecision && (
            <motion.div
              className="font-mono text-sm font-semibold px-4 py-1.5 rounded-full"
              style={ds.style}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {ds.label}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showReceipt && (
            <motion.div
              className="font-mono text-[10px] text-foreground-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {scenario.receipt.traceId} · {scenario.receipt.hmac}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

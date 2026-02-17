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

const decisionStyles: Record<Decision, { bg: string; text: string; border: string; label: string }> = {
  ALLOWED: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/40', label: 'ALLOWED' },
  BLOCKED: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40', label: 'BLOCKED' },
  APPROVAL_REQUIRED: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/40', label: 'APPROVAL REQUIRED' },
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
          {/* Connection paths */}
          <line x1="100" y1="45" x2="270" y2="45" stroke="hsl(var(--border-strong))" strokeWidth="1" strokeDasharray="6 4" />
          <line x1="370" y1="45" x2="540" y2="45" stroke="hsl(var(--border-strong))" strokeWidth="1" strokeDasharray="6 4" />

          {/* Animated packet: agent → gateway */}
          {showPacketToGateway && (
            <motion.circle
              cx="100" cy="45" r="4"
              fill="hsl(153 60% 53%)"
              filter="url(#glow)"
              animate={{ cx: [100, 270] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}

          {/* Animated packet: gateway → tool */}
          {showPacketToTool && !isBlocked && (
            <motion.circle
              cx="370" cy="45" r="4"
              fill="hsl(153 60% 53%)"
              filter="url(#glow)"
              animate={{ cx: [370, 540] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}

          {/* Gateway pulse */}
          {showGatewayPulse && (
            <motion.circle
              cx="320" cy="45" r="32"
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
              <line x1="445" y1="35" x2="465" y2="55" stroke="hsl(0 84% 60%)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="465" y1="35" x2="445" y2="55" stroke="hsl(0 84% 60%)" strokeWidth="2.5" strokeLinecap="round" />
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
              className={`font-mono text-xs font-medium px-3 py-1 rounded-full border ${ds.bg} ${ds.text} ${ds.border}`}
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

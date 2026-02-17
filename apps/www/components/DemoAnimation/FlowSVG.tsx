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

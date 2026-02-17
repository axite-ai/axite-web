'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Cloud, GitBranch, CreditCard } from 'lucide-react'
import { useTheme } from 'next-themes'
import type { Scenario, AnimationPhase, Decision } from './types'

// =============================================================================
// ICONS
// =============================================================================

const agentIcons = {
  terminal: Terminal,
  cloud: Cloud,
  git: GitBranch,
  'credit-card': CreditCard,
}

/** Axite pixelated X — used for the gateway node */
function AxiteLogo({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 50 50" className={className} fill="currentColor">
      <path d="M0 0 C3.96 0 7.92 0 12 0 C12 1.32 12 2.64 12 4 C13.32 4 14.64 4 16 4 C16 5.32 16 6.64 16 8 C17.32 8 18.64 8 20 8 C20 9.32 20 10.64 20 12 C21.32 12 22.64 12 24 12 C24 13.32 24 14.64 24 16 C25.32 16 26.64 16 28 16 C28 17.32 28 18.64 28 20 C26.68 20 25.36 20 24 20 C24 21.32 24 22.64 24 24 C22.68 24 21.36 24 20 24 C20 25.32 20 26.64 20 28 C18.68 28 17.36 28 16 28 C16 29.32 16 30.64 16 32 C14.68 32 13.36 32 12 32 C12 33.32 12 34.64 12 36 C8.04 36 4.08 36 0 36 C0 34.68 0 33.36 0 32 C1.32 32 2.64 32 4 32 C4 30.68 4 29.36 4 28 C5.32 28 6.64 28 8 28 C8 26.68 8 25.36 8 24 C9.32 24 10.64 24 12 24 C12 22.68 12 21.36 12 20 C13.32 20 14.64 20 16 20 C16 18.68 16 17.36 16 16 C14.68 16 13.36 16 12 16 C12 14.68 12 13.36 12 12 C10.68 12 9.36 12 8 12 C8 10.68 8 9.36 8 8 C6.68 8 5.36 8 4 8 C4 6.68 4 5.36 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(2,6)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(42,38)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(34,38)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(38,34)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(30,34)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(34,30)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(26,30)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(30,26)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(30,18)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(34,14)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(26,14)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(38,10)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(30,10)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(42,6)" />
      <path d="M0 0 C1.32 0 2.64 0 4 0 C4 1.32 4 2.64 4 4 C2.68 4 1.36 4 0 4 C0 2.68 0 1.36 0 0Z" transform="translate(34,6)" />
    </svg>
  )
}

/** Tool integration logos — actual company marks */
const toolIcons: Record<string, JSX.Element> = {
  kubernetes: (
    <svg width="22" height="22" viewBox="0 0 128 128" fill="currentColor">
      <g>
        <path d="M56.484 55.098c.37.27.82.43 1.31.43 1.2 0 2.18-.95 2.23-2.13l.05-.03.75-13.26c-.9.11-1.8.26-2.7.46-4.93 1.12-9.2 3.55-12.54 6.83l10.87 7.71.03-.01zM55.034 74.528a2.218 2.218 0 00-2.58-1.69l-.02-.03-13.05 2.21a26.15 26.15 0 0010.51 13.15l5.06-12.22-.04-.05c.17-.42.23-.89.12-1.37zM50.694 65.118c.44-.12.85-.38 1.16-.76.75-.94.62-2.29-.28-3.07l.01-.05-9.93-8.88a26.07 26.07 0 00-3.7 16.48l12.73-3.67.01-.05zM60.334 69.018l3.66 1.76 3.66-1.75.9-3.95-2.53-3.16h-4.06l-2.54 3.16zM67.934 53.348c.02.46.18.91.49 1.29.75.94 2.1 1.11 3.06.41l.04.02 10.8-7.66c-4.08-3.99-9.4-6.6-15.15-7.3l.75 13.24h.01zM75.514 72.778c-.17-.03-.34-.05-.51-.04-.29.01-.58.09-.85.22a2.23 2.23 0 00-1.08 2.89l-.02.02 5.11 12.34c4.93-3.14 8.61-7.83 10.54-13.24l-13.16-2.23-.03.04zM65.954 79.318a2.246 2.246 0 00-2.04-1.17c-.77.03-1.5.46-1.89 1.18h-.01l-6.42 11.6a26.16 26.16 0 0014.27.73c.88-.2 1.74-.44 2.57-.72l-6.43-11.63h-.05z" />
        <path d="M124.544 76.788l-10.44-45.33a8.012 8.012 0 00-4.37-5.43l-42.24-20.18a8.157 8.157 0 00-3.92-.78 8.15 8.15 0 00-3.1.78l-42.24 20.18a8.055 8.055 0 00-4.37 5.43l-10.41 45.34a7.92 7.92 0 001.1 6.14c.14.22.3.43.46.64l29.24 36.35a8.087 8.087 0 006.32 3.01l46.89-.01c2.46 0 4.78-1.11 6.32-3.01l29.23-36.36a7.981 7.981 0 001.53-6.77zm-16.07-.55c-.31 1.35-1.76 2.17-3.26 1.85-.01 0-.03 0-.04-.01-.02 0-.03-.01-.05-.02-.21-.05-.47-.09-.65-.14-.86-.23-1.49-.58-2.27-.88-1.67-.6-3.06-1.1-4.41-1.3-.69-.05-1.04.27-1.42.52-.18-.04-.75-.14-1.08-.19-2.42 7.61-7.58 14.21-14.57 18.33.12.29.33.91.42 1.02-.16.43-.4.83-.19 1.49.49 1.27 1.28 2.52 2.24 4.01.46.69.94 1.22 1.36 2.02.1.19.23.48.33.68.65 1.39.17 2.99-1.08 3.59-1.26.61-2.82-.03-3.5-1.43-.1-.2-.23-.46-.31-.65-.36-.82-.48-1.52-.73-2.32-.57-1.68-1.05-3.07-1.73-4.25-.39-.57-.86-.64-1.29-.78-.08-.14-.38-.69-.54-.97-1.4.53-2.84.97-4.34 1.31-6.56 1.49-13.13.89-18.99-1.37l-.57 1.04c-.43.11-.84.23-1.09.53-.92 1.1-1.29 2.86-1.96 4.54-.25.79-.37 1.5-.73 2.32-.08.19-.22.45-.31.64v.01l-.01.01c-.67 1.39-2.23 2.03-3.49 1.43-1.25-.6-1.72-2.2-1.08-3.59.1-.2.22-.49.32-.68.42-.79.89-1.33 1.36-2.02.96-1.5 1.8-2.84 2.29-4.11.12-.42-.06-1-.22-1.43l.46-1.1c-6.73-3.99-12.04-10.34-14.58-18.21l-1.1.19c-.3-.17-.89-.56-1.45-.51-1.35.2-2.74.7-4.41 1.3-.78.3-1.4.64-2.27.87-.18.05-.44.1-.65.15-.02 0-.03.01-.05.02-.01 0-.03 0-.04.01-1.5.32-2.95-.5-3.26-1.85-.31-1.35.65-2.72 2.14-3.08.01 0 .03-.01.04-.01.01 0 .01 0 .02-.01.21-.05.48-.12.68-.16.88-.17 1.6-.13 2.43-.19 1.77-.19 3.23-.34 4.53-.75.41-.17.81-.74 1.09-1.1l1.06-.31c-1.19-8.22.82-16.28 5.16-22.81l-.81-.72c-.05-.32-.12-1.04-.51-1.46-.99-.93-2.25-1.71-3.76-2.64-.72-.42-1.38-.69-2.1-1.23-.15-.11-.36-.29-.52-.42-.01-.01-.03-.02-.04-.03-1.21-.97-1.49-2.64-.62-3.73.49-.61 1.24-.92 2.01-.89.6.02 1.23.24 1.76.66.17.14.41.32.56.45.68.58 1.09 1.16 1.66 1.77 1.25 1.27 2.28 2.32 3.41 3.08.59.35 1.05.21 1.5.15.15.11.63.46.91.65 4.3-4.57 9.96-7.95 16.52-9.44 1.53-.35 3.05-.58 4.57-.7l.06-1.07c.34-.33.71-.79.82-1.31.11-1.36-.07-2.82-.28-4.59-.12-.82-.31-1.51-.35-2.4-.01-.18 0-.44.01-.65 0-.02-.01-.05-.01-.07 0-1.55 1.13-2.81 2.53-2.81s2.53 1.26 2.53 2.81c0 .22.01.52.01.72-.03.89-.23 1.58-.35 2.4-.21 1.76-.4 3.23-.29 4.59.1.68.5.95.83 1.26.01.18.04.79.06 1.13 8.04.71 15.5 4.39 20.99 10.14l.96-.69c.33.02 1.04.12 1.53-.17 1.13-.76 2.16-1.82 3.41-3.08.57-.61.99-1.18 1.67-1.77.15-.13.39-.31.56-.45 1.21-.97 2.9-.86 3.77.23s.59 2.76-.62 3.73c-.17.14-.39.33-.56.45-.72.53-1.38.8-2.1 1.23-1.51.93-2.77 1.71-3.76 2.64-.47.5-.43.98-.48 1.43-.14.13-.63.57-.9.8a32.75 32.75 0 014.74 10.95c.92 3.99 1.06 7.97.53 11.8l1.02.3c.18.26.56.89 1.09 1.1 1.3.41 2.76.56 4.53.75.83.07 1.55.03 2.43.19.21.04.52.12.73.17 1.5.37 2.45 1.74 2.14 3.09z" />
        <path d="M86.274 52.358l-9.88 8.84.01.03c-.34.3-.6.7-.71 1.18-.27 1.17.44 2.33 1.58 2.65l.01.05 12.79 3.68c.27-2.76.11-5.62-.55-8.48-.66-2.89-1.77-5.56-3.25-7.95z" />
      </g>
    </svg>
  ),
  'aws-s3': (
    <svg width="22" height="22" viewBox="0 0 256 312" fill="currentColor">
      <path d="m 168.32,289.02 -40.19,22.56 0,-46.74 40.19,19.44 z m 7.72,-5.04 0,-40.46 -47.95,-23.19 0,45.28 -0.03,0 0,41.82 48.02,-26.96 z m -96.07,5.04 40.19,22.56 0,-46.74 -40.19,19.44 z m -7.72,-5.04 0,-40.46 47.95,-23.19 0,45.28 0.03,0 0,41.82 -48.02,-26.96 z" />
      <path d="m 174.89,145.88 -46.89,22.67 -46.89,-22.67 46.89,-22.67 z" />
      <path d="M 128,0 17.94,61.58 17.94,249.92 128,311.5 238.06,249.92 238.06,61.58 Z m 93.67,240.8 L 128,293.48 34.33,240.8 34.33,70.7 128,18.02 221.67,70.7 Z" />
    </svg>
  ),
  github: (
    <svg width="22" height="22" viewBox="0 0 128 128" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" />
    </svg>
  ),
  stripe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
    </svg>
  ),
}

// =============================================================================
// DECISION STYLES
// =============================================================================

function getDecisionStyles(isDark: boolean): Record<Decision, { style: React.CSSProperties; label: string }> {
  if (isDark) {
    return {
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
  }
  return {
    ALLOWED: {
      style: { background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' },
      label: 'ALLOWED',
    },
    BLOCKED: {
      style: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' },
      label: 'BLOCKED',
    },
    APPROVAL_REQUIRED: {
      style: { background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' },
      label: 'APPROVAL REQUIRED',
    },
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

interface FlowSVGProps {
  scenario: Scenario
  phase: AnimationPhase
}

export function FlowSVG({ scenario, phase }: FlowSVGProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme?.includes('dark') ?? true
  const AgentIcon = agentIcons[scenario.agentIcon]
  const ToolIcon = toolIcons[scenario.toolIcon]
  const showPacketToGateway = phase === 'sending'
  const showGatewayPulse = phase === 'evaluating'
  const showDecision = ['decided', 'slack-in', 'slack-approved', 'executing', 'receipt'].includes(phase)
  const showPacketToTool = phase === 'executing'
  const showReceipt = phase === 'receipt'
  const toolActivated = ['receipt', 'fade-out'].includes(phase) && scenario.decision !== 'BLOCKED'
  const isBlocked = scenario.decision === 'BLOCKED'
  const isActive = phase !== 'idle' && phase !== 'fade-out'
  const ds = getDecisionStyles(isDark)[scenario.decision]

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

        {/* Gateway node — center (Axite logo) */}
        <div className="absolute flex flex-col items-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <motion.div
            className="w-12 h-12 rounded-lg bg-surface-200 border border-brand/30 flex items-center justify-center"
            animate={showGatewayPulse ? { borderColor: ['hsla(153,60%,53%,0.3)', 'hsla(153,60%,53%,0.7)', 'hsla(153,60%,53%,0.3)'] } : {}}
            transition={showGatewayPulse ? { duration: 1, repeat: Infinity } : {}}
          >
            <AxiteLogo className="text-brand" />
          </motion.div>
          <span className="font-mono text-[10px] text-foreground-muted mt-1.5">axite gateway</span>
        </div>

        {/* Tool node — right (actual company logo, activates on packet arrival) */}
        <div className="absolute flex flex-col items-center" style={{ left: '90%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <motion.div
            className="w-12 h-12 rounded-lg bg-surface-200 flex items-center justify-center"
            animate={
              toolActivated
                ? {
                    borderColor: 'hsla(153,60%,53%,0.7)',
                    boxShadow: '0 0 12px 2px hsla(153,60%,53%,0.3)',
                  }
                : {
                    borderColor: 'hsla(var(--border), 1)',
                    boxShadow: '0 0 0px 0px hsla(153,60%,53%,0)',
                  }
            }
            style={{ border: '1px solid' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={toolActivated ? 'text-foreground-light' : 'text-foreground-muted'}
              animate={
                toolActivated
                  ? { rotate: 360, scale: [1, 1.1, 1] }
                  : { rotate: 0, scale: 1 }
              }
              transition={
                toolActivated
                  ? { rotate: { duration: 1.5, ease: 'linear', repeat: Infinity }, scale: { duration: 0.5 } }
                  : { duration: 0.2 }
              }
            >
              {ToolIcon}
            </motion.div>
          </motion.div>
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

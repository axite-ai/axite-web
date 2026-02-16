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

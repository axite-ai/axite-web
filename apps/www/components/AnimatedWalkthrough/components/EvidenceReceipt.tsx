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

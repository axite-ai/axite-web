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
                <svg width="16" height="16" viewBox="0 0 50 50" fill="white">
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

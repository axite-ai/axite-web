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

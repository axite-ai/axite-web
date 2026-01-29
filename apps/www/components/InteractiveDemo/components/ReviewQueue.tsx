'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, AlertTriangle } from 'lucide-react'
import { cn, Badge } from 'ui'
import type { ReviewItem, ApprovalAction } from '../types'

interface ReviewQueueProps {
  items: ReviewItem[]
  onReview: (eventId: string, action: ApprovalAction, justification: string) => void
}

interface ReviewItemCardProps {
  item: ReviewItem
  onReview: (action: ApprovalAction, justification: string) => void
}

function ReviewItemCard({ item, onReview }: ReviewItemCardProps) {
  const [justification, setJustification] = useState('')
  const [showError, setShowError] = useState(false)

  const handleAction = (action: ApprovalAction) => {
    if (justification.length < 10) {
      setShowError(true)
      return
    }
    setShowError(false)
    onReview(action, justification)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="bg-surface-200 border border-warning/30 rounded-lg p-3"
    >
      {/* Header */}
      <div className="flex items-start gap-2 mb-2">
        <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-mono text-foreground truncate">
            {item.action}
          </div>
          <div className="text-[10px] text-foreground-lighter mt-0.5">
            {item.reason}
          </div>
        </div>
      </div>

      {/* Inputs preview */}
      <div className="bg-surface-300 rounded px-2 py-1.5 mb-2 text-[10px] font-mono text-foreground-light overflow-hidden">
        <div className="truncate">
          {JSON.stringify(item.inputs).slice(0, 50)}
          {JSON.stringify(item.inputs).length > 50 && '...'}
        </div>
      </div>

      {/* Justification input */}
      <div className="mb-2">
        <input
          type="text"
          value={justification}
          onChange={e => {
            setJustification(e.target.value)
            if (e.target.value.length >= 10) setShowError(false)
          }}
          placeholder="Enter justification (min 10 chars)..."
          className={cn(
            'w-full bg-surface-300 border rounded px-2 py-1.5 text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-1',
            showError
              ? 'border-destructive focus:ring-destructive'
              : 'border-border focus:ring-brand'
          )}
        />
        {showError && (
          <p className="text-[10px] text-destructive mt-1">
            Justification must be at least 10 characters
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => handleAction('APPROVE')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors',
            'bg-brand/10 text-brand hover:bg-brand/20 border border-brand/30'
          )}
        >
          <Check className="w-3.5 h-3.5" />
          Approve
        </button>
        <button
          onClick={() => handleAction('DENY')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors',
            'bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30'
          )}
        >
          <X className="w-3.5 h-3.5" />
          Deny
        </button>
      </div>
    </motion.div>
  )
}

export function ReviewQueue({ items, onReview }: ReviewQueueProps) {
  if (items.length === 0) return null

  return (
    <div className="border-t border-border">
      <div className="px-3 py-2 border-b border-border bg-warning/5">
        <div className="flex items-center gap-2">
          <Badge variant="warning" className="text-[9px] px-1.5">
            {items.length}
          </Badge>
          <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider">
            Review Queue
          </span>
        </div>
      </div>

      <div className="p-3 space-y-2 max-h-[300px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {items.map(item => (
            <ReviewItemCard
              key={item.eventId}
              item={item}
              onReview={(action, justification) => onReview(item.eventId, action, justification)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

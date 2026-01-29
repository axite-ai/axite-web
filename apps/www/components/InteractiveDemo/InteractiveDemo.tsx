'use client'

import { useMemo, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Panel from '~/components/Panel'
import { useDemoState } from './hooks/useDemoState'
import { useScenario } from './hooks/useScenario'
import { getBundleById } from './data'
import { BundleSelector } from './components/BundleSelector'
import { RoleSelector } from './components/RoleSelector'
import { PolicyControls } from './components/PolicyControls'
import { FlowDiagram } from './components/FlowDiagram'
import { EventStream } from './components/EventStream'
import { ReviewQueue } from './components/ReviewQueue'
import { TracePanel } from './components/TracePanel'
import { ExportButton } from './components/ExportButton'

export function InteractiveDemo() {
  const { state, dispatch, actions } = useDemoState()
  const { isComplete, hasPendingReview, handleReviewComplete } = useScenario({ state, dispatch })

  const bundle = useMemo(() => getBundleById(state.selectedBundle), [state.selectedBundle])

  const currentDecision = useMemo(() => {
    const activePacket = state.packets[0]
    if (!activePacket) return null
    if (activePacket.phase === 'at-gateway' || activePacket.phase === 'to-tool') {
      return activePacket.decision
    }
    return null
  }, [state.packets])

  const selectedEvent = useMemo(() => {
    if (!state.selectedTraceId) return null
    return state.events.find(e => e.traceId === state.selectedTraceId) || null
  }, [state.selectedTraceId, state.events])

  const handleReview = useCallback(
    (eventId: string, action: 'APPROVE' | 'DENY', justification: string) => {
      dispatch({ type: 'HANDLE_REVIEW', payload: { eventId, action, justification } })
      handleReviewComplete(eventId, action === 'APPROVE')
    },
    [dispatch, handleReviewComplete]
  )

  const closeTracePanel = useCallback(() => {
    actions.selectTrace(null)
  }, [actions])

  if (!bundle) return null

  const isControlsDisabled = state.isRunning
  const showTraceOverlay = selectedEvent !== null

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-foreground">Axite Sandbox</h2>
        <ExportButton state={state} disabled={state.isRunning} />
      </div>

      {/* Main 3-column layout */}
      <Panel outerClassName="w-full" innerClassName="p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] min-h-[500px]">
          {/* Left column - Controls */}
          <div className="border-b lg:border-b-0 lg:border-r border-border p-4 space-y-6 bg-surface-75">
            <BundleSelector
              value={state.selectedBundle}
              onChange={actions.setBundle}
              disabled={isControlsDisabled}
            />

            <RoleSelector
              value={state.agentRole}
              onChange={actions.setRole}
              disabled={isControlsDisabled}
            />

            <div className="border-t border-border pt-4">
              <PolicyControls
                policies={state.policies}
                applicablePolicies={bundle.applicablePolicies}
                onChange={actions.setPolicy}
                disabled={isControlsDisabled}
              />
            </div>
          </div>

          {/* Center column - Flow Diagram with Trace Overlay */}
          <div className="relative border-b lg:border-b-0 lg:border-r border-border p-4 bg-surface-75">
            <FlowDiagram
              bundle={bundle}
              packets={state.packets}
              currentDecision={currentDecision}
              hasPendingReview={hasPendingReview}
              isRunning={state.isRunning}
              isComplete={isComplete}
              activeToolIndex={state.activeToolIndex}
              onRun={actions.startRun}
              onStep={actions.step}
              onReset={actions.reset}
              onStop={actions.stop}
            />

            {/* Trace Panel Overlay in Center */}
            <AnimatePresence>
              {showTraceOverlay && selectedEvent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-4 bg-surface-100 border border-border rounded-lg shadow-lg overflow-auto z-10"
                >
                  <div className="sticky top-0 flex items-center justify-between p-3 border-b border-border bg-surface-100">
                    <h3 className="text-sm font-medium text-foreground">Event Details</h3>
                    <button
                      onClick={closeTracePanel}
                      className="p-1 rounded hover:bg-surface-200 text-foreground-muted hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <TracePanel event={selectedEvent} isOpen={true} onClose={closeTracePanel} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right column - Event Stream + Review Queue */}
          <div className="flex flex-col bg-surface-75">
            <div className="flex-1 min-h-0">
              <EventStream
                events={state.events}
                selectedTraceId={state.selectedTraceId}
                onSelectEvent={actions.selectTrace}
              />
            </div>
            <ReviewQueue items={state.reviewQueue} onReview={handleReview} />
          </div>
        </div>
      </Panel>
    </div>
  )
}

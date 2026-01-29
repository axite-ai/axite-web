import { useCallback, useEffect, useRef } from 'react'
import type { DemoState, DemoAction, Decision, PolicyEvent, ReviewItem, Packet, RbacCheck, PolicyCheck, ScriptedAction } from '../types'
import { getScenarioForBundle, getBundleById, rbacPermissions, tools, generateTraceId, getToolIndexForAction } from '../data'

// Animation timing constants
const TRAVEL_DURATION = 800
const GATEWAY_PAUSE = 300
const TOOL_EXECUTION_TIME = 600
const BOUNCE_DURATION = 500

function checkRbac(action: ScriptedAction, role: DemoState['agentRole']): RbacCheck {
  const tool = tools[action.tool]
  if (!tool) return { allowed: false, reason: 'Unknown tool' }

  const permissions = rbacPermissions[role]
  const allowed = permissions[tool.category] === true
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1)

  return {
    allowed,
    reason: allowed
      ? `${roleLabel} can ${tool.category} to ${tool.icon}`
      : `${roleLabel} cannot ${tool.category} to ${tool.icon}`,
  }
}

function checkPolicy(action: ScriptedAction, policies: DemoState['policies']): PolicyCheck {
  if (policies.blockDestructive && action.triggerPolicy === 'blockDestructive') {
    return { decision: 'BLOCK_POLICY', ruleId: 'block-destructive', reason: 'Destructive operations blocked' }
  }
  if (policies.blockSecrets && action.triggerPolicy === 'blockSecrets') {
    return { decision: 'BLOCK_POLICY', ruleId: 'block-secrets', reason: 'Secrets access blocked' }
  }
  if (policies.reviewRefunds && action.thresholdSensitive && action.tool === 'stripe:refund') {
    const amount = (action.inputs.amount as number) || 0
    if (amount > policies.refundThreshold) {
      return { decision: 'REVIEW', ruleId: 'refund-threshold', reason: `$${amount} > $${policies.refundThreshold}` }
    }
  }
  if (policies.reviewBulkComms && action.triggerPolicy === 'reviewBulkComms') {
    return { decision: 'REVIEW', ruleId: 'review-bulk-comms', reason: 'Bulk comms require approval' }
  }
  if (policies.reviewHighImpact && action.triggerPolicy === 'reviewHighImpact') {
    return { decision: 'REVIEW', ruleId: 'review-high-impact', reason: 'High-impact action requires approval' }
  }
  return { decision: 'ALLOW', reason: 'No policy restrictions' }
}

function computeDecision(
  action: ScriptedAction,
  role: DemoState['agentRole'],
  policies: DemoState['policies']
): { rbacCheck: RbacCheck; policyCheck: PolicyCheck; decision: Decision } {
  const rbacCheck = checkRbac(action, role)
  if (!rbacCheck.allowed) {
    return { rbacCheck, policyCheck: { decision: 'DENY_RBAC', reason: 'RBAC denied' }, decision: 'DENY_RBAC' }
  }
  const policyCheck = checkPolicy(action, policies)
  return { rbacCheck, policyCheck, decision: policyCheck.decision }
}

interface UseScenarioOptions {
  state: DemoState
  dispatch: React.Dispatch<DemoAction>
}

export function useScenario({ state, dispatch }: UseScenarioOptions) {
  const animationRef = useRef<number | null>(null)
  const isProcessingRef = useRef(false)

  const scenario = getScenarioForBundle(state.selectedBundle)
  const bundle = getBundleById(state.selectedBundle)
  const currentAction = scenario[state.scriptIndex]
  const isComplete = state.scriptIndex >= scenario.length
  const hasPendingReview = state.reviewQueue.length > 0

  const processAction = useCallback(() => {
    if (!currentAction || !bundle || isProcessingRef.current || hasPendingReview) return
    isProcessingRef.current = true

    const traceId = generateTraceId()
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const packetId = `pkt_${Date.now()}`
    const toolIndex = getToolIndexForAction(bundle, currentAction.tool)
    const { rbacCheck, policyCheck, decision } = computeDecision(currentAction, state.agentRole, state.policies)

    // Create packet with smooth animation state
    const packet: Packet = {
      id: packetId,
      eventId,
      tool: currentAction.tool,
      toolIndex,
      decision,
      phase: 'traveling',
      progress: 0,
      isPaused: false,
    }
    dispatch({ type: 'ADD_PACKET', payload: packet })

    // Animate travel to gateway
    const startTime = performance.now()

    const animateToGateway = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / TRAVEL_DURATION, 1)

      dispatch({ type: 'UPDATE_PACKET', payload: { id: packetId, updates: { progress } } })

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateToGateway)
      } else {
        // Arrived at gateway
        dispatch({ type: 'UPDATE_PACKET', payload: { id: packetId, updates: { phase: 'at-gateway', progress: 0 } } })

        // Create event
        const event: PolicyEvent = {
          id: eventId,
          traceId,
          timestamp: new Date(),
          tool: currentAction.tool,
          action: currentAction.action,
          inputs: currentAction.inputs,
          agent: bundle.agentName,
          agentRole: state.agentRole,
          rbacCheck,
          policyCheck,
          finalDecision: decision,
        }
        dispatch({ type: 'ADD_EVENT', payload: event })

        setTimeout(() => {
          if (decision === 'REVIEW') {
            dispatch({ type: 'UPDATE_PACKET', payload: { id: packetId, updates: { isPaused: true } } })
            dispatch({
              type: 'ADD_REVIEW',
              payload: {
                eventId,
                traceId,
                tool: currentAction.tool,
                action: currentAction.action,
                inputs: currentAction.inputs,
                reason: policyCheck.reason,
                timestamp: new Date(),
              },
            })
            isProcessingRef.current = false
          } else if (decision === 'ALLOW') {
            animateToTool(packetId, toolIndex)
          } else {
            animateBounce(packetId)
          }
        }, GATEWAY_PAUSE)
      }
    }

    const animateToTool = (pktId: string, tIndex: number) => {
      dispatch({ type: 'UPDATE_PACKET', payload: { id: pktId, updates: { phase: 'to-tool', progress: 0 } } })
      const toolStart = performance.now()

      const animateTool = (now: number) => {
        const elapsed = now - toolStart
        const progress = Math.min(elapsed / TRAVEL_DURATION, 1)
        dispatch({ type: 'UPDATE_PACKET', payload: { id: pktId, updates: { progress } } })

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateTool)
        } else {
          // Arrived at tool - show running state
          dispatch({ type: 'UPDATE_PACKET', payload: { id: pktId, updates: { phase: 'at-tool', progress: 0 } } })
          dispatch({ type: 'SET_ACTIVE_TOOL', payload: tIndex })

          setTimeout(() => {
            dispatch({ type: 'SET_ACTIVE_TOOL', payload: null })
            dispatch({ type: 'UPDATE_PACKET', payload: { id: pktId, updates: { phase: 'done' } } })

            setTimeout(() => {
              dispatch({ type: 'REMOVE_PACKET', payload: pktId })
              dispatch({ type: 'ADVANCE_SCRIPT' })
              isProcessingRef.current = false
            }, 200)
          }, TOOL_EXECUTION_TIME)
        }
      }
      animationRef.current = requestAnimationFrame(animateTool)
    }

    const animateBounce = (pktId: string) => {
      dispatch({ type: 'UPDATE_PACKET', payload: { id: pktId, updates: { phase: 'bouncing', progress: 0 } } })
      const bounceStart = performance.now()

      const animateBounceFrame = (now: number) => {
        const elapsed = now - bounceStart
        const progress = Math.min(elapsed / BOUNCE_DURATION, 1)
        dispatch({ type: 'UPDATE_PACKET', payload: { id: pktId, updates: { progress } } })

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateBounceFrame)
        } else {
          dispatch({ type: 'REMOVE_PACKET', payload: pktId })
          dispatch({ type: 'ADVANCE_SCRIPT' })
          isProcessingRef.current = false
        }
      }
      animationRef.current = requestAnimationFrame(animateBounceFrame)
    }

    animationRef.current = requestAnimationFrame(animateToGateway)
  }, [currentAction, bundle, state.agentRole, state.policies, dispatch, hasPendingReview])

  const handleReviewComplete = useCallback(
    (eventId: string, approved: boolean) => {
      const packet = state.packets.find(p => p.eventId === eventId)
      if (!packet) return

      dispatch({ type: 'UPDATE_PACKET', payload: { id: packet.id, updates: { isPaused: false } } })

      if (approved) {
        // Continue to tool with smooth animation
        dispatch({ type: 'UPDATE_PACKET', payload: { id: packet.id, updates: { phase: 'to-tool', progress: 0 } } })
        const toolStart = performance.now()

        const animate = (now: number) => {
          const elapsed = now - toolStart
          const progress = Math.min(elapsed / TRAVEL_DURATION, 1)
          dispatch({ type: 'UPDATE_PACKET', payload: { id: packet.id, updates: { progress } } })

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate)
          } else {
            dispatch({ type: 'UPDATE_PACKET', payload: { id: packet.id, updates: { phase: 'at-tool', progress: 0 } } })
            dispatch({ type: 'SET_ACTIVE_TOOL', payload: packet.toolIndex })

            setTimeout(() => {
              dispatch({ type: 'SET_ACTIVE_TOOL', payload: null })
              dispatch({ type: 'UPDATE_PACKET', payload: { id: packet.id, updates: { phase: 'done' } } })

              setTimeout(() => {
                dispatch({ type: 'REMOVE_PACKET', payload: packet.id })
                dispatch({ type: 'ADVANCE_SCRIPT' })
              }, 200)
            }, TOOL_EXECUTION_TIME)
          }
        }
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Bounce back
        dispatch({ type: 'UPDATE_PACKET', payload: { id: packet.id, updates: { phase: 'bouncing', progress: 0 } } })
        const bounceStart = performance.now()

        const animate = (now: number) => {
          const elapsed = now - bounceStart
          const progress = Math.min(elapsed / BOUNCE_DURATION, 1)
          dispatch({ type: 'UPDATE_PACKET', payload: { id: packet.id, updates: { progress } } })

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate)
          } else {
            dispatch({ type: 'REMOVE_PACKET', payload: packet.id })
            dispatch({ type: 'ADVANCE_SCRIPT' })
          }
        }
        animationRef.current = requestAnimationFrame(animate)
      }
    },
    [state.packets, dispatch]
  )

  // Auto-run effect
  useEffect(() => {
    if (!state.isRunning || isComplete || hasPendingReview) return
    if (state.isStepMode) {
      processAction()
      dispatch({ type: 'STOP' })
      return
    }

    const delay = isProcessingRef.current ? 100 : 1200
    const timeout = setTimeout(() => {
      if (!isProcessingRef.current) processAction()
    }, delay)

    return () => clearTimeout(timeout)
  }, [state.isRunning, state.isStepMode, state.scriptIndex, isComplete, hasPendingReview, processAction, dispatch])

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return { scenario, currentAction, isComplete, hasPendingReview, processAction, handleReviewComplete }
}

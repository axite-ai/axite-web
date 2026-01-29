import { useReducer, useCallback } from 'react'
import type { DemoState, DemoAction, PolicyConfig, BundleId, AgentRole } from '../types'

const initialPolicies: PolicyConfig = {
  blockDestructive: true,
  blockSecrets: true,
  reviewRefunds: true,
  refundThreshold: 500,
  reviewBulkComms: true,
  reviewHighImpact: true,
}

const initialState: DemoState = {
  selectedBundle: 'payment',
  agentRole: 'admin',
  policies: initialPolicies,
  isRunning: false,
  isStepMode: false,
  scriptIndex: 0,
  packets: [],
  events: [],
  reviewQueue: [],
  activeToolIndex: null,
  selectedTraceId: null,
}

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'SET_BUNDLE':
      return {
        ...state,
        selectedBundle: action.payload,
        isRunning: false,
        scriptIndex: 0,
        packets: [],
        events: [],
        reviewQueue: [],
        activeToolIndex: null,
        selectedTraceId: null,
      }

    case 'SET_ROLE':
      return { ...state, agentRole: action.payload }

    case 'SET_POLICY':
      return { ...state, policies: { ...state.policies, ...action.payload } }

    case 'START_RUN':
      return { ...state, isRunning: true, isStepMode: false }

    case 'STEP':
      return { ...state, isRunning: true, isStepMode: true }

    case 'STOP':
      return { ...state, isRunning: false, isStepMode: false }

    case 'RESET':
      return {
        ...state,
        isRunning: false,
        isStepMode: false,
        scriptIndex: 0,
        packets: [],
        events: [],
        reviewQueue: [],
        activeToolIndex: null,
        selectedTraceId: null,
      }

    case 'ADD_PACKET':
      return { ...state, packets: [...state.packets, action.payload] }

    case 'UPDATE_PACKET':
      return {
        ...state,
        packets: state.packets.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload.updates } : p
        ),
      }

    case 'REMOVE_PACKET':
      return { ...state, packets: state.packets.filter(p => p.id !== action.payload) }

    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] }

    case 'ADD_REVIEW':
      return { ...state, reviewQueue: [...state.reviewQueue, action.payload] }

    case 'REMOVE_REVIEW':
      return { ...state, reviewQueue: state.reviewQueue.filter(r => r.eventId !== action.payload) }

    case 'HANDLE_REVIEW': {
      const { eventId, action: reviewAction, justification } = action.payload
      const approval = {
        eventId,
        action: reviewAction,
        approver: 'you@demo',
        justification,
        timestamp: new Date(),
      }
      return {
        ...state,
        events: state.events.map(e =>
          e.id === eventId
            ? { ...e, finalDecision: reviewAction === 'APPROVE' ? 'APPROVED' : 'DENIED', approval }
            : e
        ),
        reviewQueue: state.reviewQueue.filter(r => r.eventId !== eventId),
      }
    }

    case 'SELECT_TRACE':
      return { ...state, selectedTraceId: action.payload }

    case 'SET_ACTIVE_TOOL':
      return { ...state, activeToolIndex: action.payload }

    case 'ADVANCE_SCRIPT':
      return { ...state, scriptIndex: state.scriptIndex + 1 }

    default:
      return state
  }
}

export function useDemoState() {
  const [state, dispatch] = useReducer(demoReducer, initialState)

  const setBundle = useCallback((bundle: BundleId) => {
    dispatch({ type: 'SET_BUNDLE', payload: bundle })
  }, [])

  const setRole = useCallback((role: AgentRole) => {
    dispatch({ type: 'SET_ROLE', payload: role })
  }, [])

  const setPolicy = useCallback((policies: Partial<PolicyConfig>) => {
    dispatch({ type: 'SET_POLICY', payload: policies })
  }, [])

  const startRun = useCallback(() => dispatch({ type: 'START_RUN' }), [])
  const step = useCallback(() => dispatch({ type: 'STEP' }), [])
  const stop = useCallback(() => dispatch({ type: 'STOP' }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])

  const selectTrace = useCallback((traceId: string | null) => {
    dispatch({ type: 'SELECT_TRACE', payload: traceId })
  }, [])

  return {
    state,
    dispatch,
    actions: { setBundle, setRole, setPolicy, startRun, step, stop, reset, selectTrace },
  }
}

export type DemoStateHook = ReturnType<typeof useDemoState>

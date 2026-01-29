// =============================================================================
// INTERACTIVE DEMO TYPES
// =============================================================================

export type BundleId = 'payment' | 'support' | 'dev'
export type AgentRole = 'viewer' | 'editor' | 'admin'
export type Decision = 'ALLOW' | 'DENY_RBAC' | 'BLOCK_POLICY' | 'REVIEW'
export type ApprovalAction = 'APPROVE' | 'DENY'

// Tool definitions
export interface Tool {
  id: string
  name: string
  icon: string
  category: 'read' | 'write' | 'delete' | 'admin'
}

// Which policies apply to which bundles
export interface BundlePolicies {
  blockDestructive: boolean
  blockSecrets: boolean
  reviewRefunds: boolean
  reviewBulkComms: boolean
  reviewHighImpact: boolean // For deploys, etc.
}

// Bundle definitions
export interface Bundle {
  id: BundleId
  name: string
  description: string
  tools: Tool[]
  agentName: string
  applicablePolicies: BundlePolicies
}

// Scripted action in a scenario
export interface ScriptedAction {
  tool: string
  action: string
  inputs: Record<string, unknown>
  expectedDecision: Decision
  triggerPolicy?: string
  thresholdSensitive?: boolean
}

// Policy configuration
export interface PolicyConfig {
  blockDestructive: boolean
  blockSecrets: boolean
  reviewRefunds: boolean
  refundThreshold: number
  reviewBulkComms: boolean
  reviewHighImpact: boolean
}

// RBAC check result
export interface RbacCheck {
  allowed: boolean
  reason: string
}

// Policy check result
export interface PolicyCheck {
  decision: Decision
  ruleId?: string
  reason: string
}

// Approval event when REVIEW is handled
export interface ApprovalEvent {
  eventId: string
  action: ApprovalAction
  approver: string
  justification: string
  timestamp: Date
}

// A single policy event in the stream
export interface PolicyEvent {
  id: string
  traceId: string
  timestamp: Date
  tool: string
  action: string
  inputs: Record<string, unknown>
  agent: string
  agentRole: AgentRole
  rbacCheck: RbacCheck
  policyCheck: PolicyCheck
  finalDecision: Decision | 'APPROVED' | 'DENIED'
  approval?: ApprovalEvent
}

// Review queue item
export interface ReviewItem {
  eventId: string
  traceId: string
  tool: string
  action: string
  inputs: Record<string, unknown>
  reason: string
  timestamp: Date
}

// Animation progress (0-1) for smooth packet motion
export interface Packet {
  id: string
  eventId: string
  tool: string
  toolIndex: number // Which tool in the display list
  decision: Decision
  phase: 'traveling' | 'at-gateway' | 'to-tool' | 'at-tool' | 'bouncing' | 'done'
  progress: number // 0-1 for smooth animation
  isPaused: boolean
}

// Main demo state
export interface DemoState {
  // Configuration
  selectedBundle: BundleId
  agentRole: AgentRole
  policies: PolicyConfig

  // Runtime
  isRunning: boolean
  isStepMode: boolean
  scriptIndex: number
  packets: Packet[]
  events: PolicyEvent[]
  reviewQueue: ReviewItem[]
  activeToolIndex: number | null // Tool currently "running"

  // UI
  selectedTraceId: string | null
}

// Actions for reducer
export type DemoAction =
  | { type: 'SET_BUNDLE'; payload: BundleId }
  | { type: 'SET_ROLE'; payload: AgentRole }
  | { type: 'SET_POLICY'; payload: Partial<PolicyConfig> }
  | { type: 'START_RUN' }
  | { type: 'STEP' }
  | { type: 'STOP' }
  | { type: 'RESET' }
  | { type: 'ADD_PACKET'; payload: Packet }
  | { type: 'UPDATE_PACKET'; payload: { id: string; updates: Partial<Packet> } }
  | { type: 'REMOVE_PACKET'; payload: string }
  | { type: 'ADD_EVENT'; payload: PolicyEvent }
  | { type: 'ADD_REVIEW'; payload: ReviewItem }
  | { type: 'REMOVE_REVIEW'; payload: string }
  | { type: 'HANDLE_REVIEW'; payload: { eventId: string; action: ApprovalAction; justification: string } }
  | { type: 'SELECT_TRACE'; payload: string | null }
  | { type: 'SET_ACTIVE_TOOL'; payload: number | null }
  | { type: 'ADVANCE_SCRIPT' }

// Export bundle format
export interface ExportBundle {
  exportedAt: string
  bundle: string
  configuration: {
    agentRole: AgentRole
    policies: PolicyConfig
  }
  events: Array<{
    traceId: string
    timestamp: string
    action: string
    inputs: Record<string, unknown>
    agent: string
    agentRole: AgentRole
    rbacCheck: RbacCheck
    policyCheck: PolicyCheck
    finalDecision: string
    approval?: {
      approver: string
      action: ApprovalAction
      justification: string
      timestamp: string
    }
  }>
}

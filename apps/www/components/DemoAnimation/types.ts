export type Decision = 'ALLOWED' | 'BLOCKED' | 'APPROVAL_REQUIRED'

export interface Scenario {
  id: string
  agentName: string
  agentIcon: 'terminal' | 'cloud' | 'git' | 'credit-card'
  toolCall: string
  toolName: string
  toolIcon: 'kubernetes' | 'aws-s3' | 'github' | 'stripe'
  environment: string
  decision: Decision
  policyRule: string
  /** Only present for APPROVAL_REQUIRED scenarios */
  slackApproval?: {
    channel: string
    requestedBy: string
    approvedBy: string
    approverAvatar: string
    message: string
  }
  /** Audit receipt shown after resolution */
  receipt: {
    traceId: string
    hmac: string
  }
}

export type AnimationPhase =
  | 'idle'
  | 'sending'        // packet moving from agent to gateway
  | 'evaluating'     // gateway pulse
  | 'decided'        // decision badge appears
  | 'slack-in'       // slack card slides in (approval only)
  | 'slack-approved'  // checkmark on slack card (approval only)
  | 'executing'      // packet moving from gateway to tool (allow/approved only)
  | 'receipt'        // audit receipt fades in
  | 'fade-out'       // scenario fading out before next

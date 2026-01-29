import type { Bundle, ScriptedAction, Tool } from './types'

// =============================================================================
// TOOLS - Organized by service
// =============================================================================

export const tools: Record<string, Tool> = {
  // Stripe tools
  'stripe:get_balance': { id: 'stripe:get_balance', name: 'Get Balance', icon: 'stripe', category: 'read' },
  'stripe:refund': { id: 'stripe:refund', name: 'Refund', icon: 'stripe', category: 'write' },
  'stripe:update_subscription': { id: 'stripe:update_subscription', name: 'Update Subscription', icon: 'stripe', category: 'write' },
  'stripe:delete_customer': { id: 'stripe:delete_customer', name: 'Delete Customer', icon: 'stripe', category: 'delete' },

  // Salesforce tools
  'salesforce:get_account': { id: 'salesforce:get_account', name: 'Get Account', icon: 'salesforce', category: 'read' },
  'salesforce:update_account': { id: 'salesforce:update_account', name: 'Update Account', icon: 'salesforce', category: 'write' },

  // Slack tools
  'slack:post_channel': { id: 'slack:post_channel', name: 'Post to Channel', icon: 'slack', category: 'write' },

  // File tools
  'file:read_secrets': { id: 'file:read_secrets', name: 'Read Secrets', icon: 'file', category: 'admin' },

  // Zendesk tools
  'zendesk:get_ticket': { id: 'zendesk:get_ticket', name: 'Get Ticket', icon: 'zendesk', category: 'read' },
  'zendesk:update_ticket': { id: 'zendesk:update_ticket', name: 'Update Ticket', icon: 'zendesk', category: 'write' },
  'zendesk:close_ticket': { id: 'zendesk:close_ticket', name: 'Close Ticket', icon: 'zendesk', category: 'write' },
  'zendesk:delete_ticket': { id: 'zendesk:delete_ticket', name: 'Delete Ticket', icon: 'zendesk', category: 'delete' },

  // Notion tools
  'notion:get_page': { id: 'notion:get_page', name: 'Get Page', icon: 'notion', category: 'read' },
  'notion:update_page': { id: 'notion:update_page', name: 'Update Page', icon: 'notion', category: 'write' },
  'notion:delete_page': { id: 'notion:delete_page', name: 'Delete Page', icon: 'notion', category: 'delete' },

  // GitHub tools
  'github:get_repo': { id: 'github:get_repo', name: 'Get Repo', icon: 'github', category: 'read' },
  'github:create_pr': { id: 'github:create_pr', name: 'Create PR', icon: 'github', category: 'write' },
  'github:merge_pr': { id: 'github:merge_pr', name: 'Merge PR', icon: 'github', category: 'write' },
  'github:delete_branch': { id: 'github:delete_branch', name: 'Delete Branch', icon: 'github', category: 'delete' },

  // Deploy tools
  'deploy:preview': { id: 'deploy:preview', name: 'Preview Deploy', icon: 'deploy', category: 'write' },
  'deploy:production': { id: 'deploy:production', name: 'Production Deploy', icon: 'deploy', category: 'admin' },
  'deploy:rollback': { id: 'deploy:rollback', name: 'Rollback', icon: 'deploy', category: 'admin' },
}

// =============================================================================
// BUNDLES - Each with distinct tools shown in diagram
// =============================================================================

export const bundles: Bundle[] = [
  {
    id: 'payment',
    name: 'Payment Agent',
    description: 'Handles refunds, billing changes, and customer data',
    agentName: 'payment-agent',
    // Show 4 distinct tool types in the diagram
    tools: [
      tools['stripe:refund'],
      tools['salesforce:get_account'],
      tools['slack:post_channel'],
      tools['file:read_secrets'],
    ],
    applicablePolicies: {
      blockDestructive: true,
      blockSecrets: true,
      reviewRefunds: true,
      reviewBulkComms: true,
      reviewHighImpact: false,
    },
  },
  {
    id: 'support',
    name: 'Support Agent',
    description: 'Manages tickets, documentation, and customer communication',
    agentName: 'support-agent',
    tools: [
      tools['zendesk:update_ticket'],
      tools['notion:get_page'],
      tools['slack:post_channel'],
      tools['file:read_secrets'],
    ],
    applicablePolicies: {
      blockDestructive: true,
      blockSecrets: true,
      reviewRefunds: false,
      reviewBulkComms: true,
      reviewHighImpact: false,
    },
  },
  {
    id: 'dev',
    name: 'Dev Agent',
    description: 'Handles code changes, deployments, and infrastructure',
    agentName: 'dev-agent',
    tools: [
      tools['github:create_pr'],
      tools['deploy:production'],
      tools['slack:post_channel'],
      tools['file:read_secrets'],
    ],
    applicablePolicies: {
      blockDestructive: true,
      blockSecrets: true,
      reviewRefunds: false,
      reviewBulkComms: true,
      reviewHighImpact: true,
    },
  },
]

// =============================================================================
// SCRIPTED SCENARIOS
// Each uses tools at different indices (0-3) to show different paths
// =============================================================================

export const paymentScenario: ScriptedAction[] = [
  {
    tool: 'salesforce:get_account',
    action: 'salesforce:get_account',
    inputs: { accountId: 'acc_7x8k2m' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'slack:post_channel',
    action: 'slack:post_channel',
    inputs: { channel: '#billing-updates', message: 'Processing refund batch...' },
    expectedDecision: 'REVIEW',
    triggerPolicy: 'reviewBulkComms',
  },
  {
    tool: 'stripe:refund',
    action: 'stripe:refund',
    inputs: { amount: 320, customerId: 'cus_4n2p8x', reason: 'duplicate_charge' },
    expectedDecision: 'ALLOW',
    thresholdSensitive: true,
  },
  {
    tool: 'salesforce:update_account',
    action: 'salesforce:update_account',
    inputs: { accountId: 'acc_7x8k2m', status: 'active' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'stripe:refund',
    action: 'stripe:refund',
    inputs: { amount: 847, customerId: 'cus_2m5k9x', reason: 'service_not_provided' },
    expectedDecision: 'REVIEW',
    triggerPolicy: 'reviewRefunds',
    thresholdSensitive: true,
  },
  {
    tool: 'salesforce:update_account',
    action: 'salesforce:update_account',
    inputs: { accountId: 'acc_7x8k2m', status: 'churned' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'stripe:delete_customer',
    action: 'stripe:delete_customer',
    inputs: { customerId: 'cus_8x2k4m' },
    expectedDecision: 'BLOCK_POLICY',
    triggerPolicy: 'blockDestructive',
  },
  {
    tool: 'stripe:refund',
    action: 'stripe:refund',
    inputs: { amount: 650, customerId: 'cus_5n7p3x', reason: 'customer_request' },
    expectedDecision: 'REVIEW',
    triggerPolicy: 'reviewRefunds',
    thresholdSensitive: true,
  },
  {
    tool: 'file:read_secrets',
    action: 'file:read_secrets',
    inputs: { path: '/etc/stripe/api_key' },
    expectedDecision: 'BLOCK_POLICY',
    triggerPolicy: 'blockSecrets',
  },
  {
    tool: 'stripe:get_balance',
    action: 'stripe:get_balance',
    inputs: { accountId: 'acct_main' },
    expectedDecision: 'ALLOW',
  },
]

export const supportScenario: ScriptedAction[] = [
  {
    tool: 'zendesk:get_ticket',
    action: 'zendesk:get_ticket',
    inputs: { ticketId: 'TKT-4892' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'slack:post_channel',
    action: 'slack:post_channel',
    inputs: { channel: '#support-updates', message: 'Escalating ticket batch...' },
    expectedDecision: 'REVIEW',
    triggerPolicy: 'reviewBulkComms',
  },
  {
    tool: 'zendesk:update_ticket',
    action: 'zendesk:update_ticket',
    inputs: { ticketId: 'TKT-4892', status: 'in_progress', assignee: 'agent@company.com' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'notion:get_page',
    action: 'notion:get_page',
    inputs: { pageId: 'doc_runbook_escalation' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'zendesk:close_ticket',
    action: 'zendesk:close_ticket',
    inputs: { ticketId: 'TKT-4892', resolution: 'Issue resolved via runbook' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'notion:update_page',
    action: 'notion:update_page',
    inputs: { pageId: 'doc_runbook_escalation', content: 'Updated procedure' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'zendesk:delete_ticket',
    action: 'zendesk:delete_ticket',
    inputs: { ticketId: 'TKT-3721' },
    expectedDecision: 'BLOCK_POLICY',
    triggerPolicy: 'blockDestructive',
  },
  {
    tool: 'notion:delete_page',
    action: 'notion:delete_page',
    inputs: { pageId: 'doc_obsolete' },
    expectedDecision: 'BLOCK_POLICY',
    triggerPolicy: 'blockDestructive',
  },
  {
    tool: 'file:read_secrets',
    action: 'file:read_secrets',
    inputs: { path: '/etc/zendesk/api_token' },
    expectedDecision: 'BLOCK_POLICY',
    triggerPolicy: 'blockSecrets',
  },
  {
    tool: 'zendesk:get_ticket',
    action: 'zendesk:get_ticket',
    inputs: { ticketId: 'TKT-5001' },
    expectedDecision: 'ALLOW',
  },
]

export const devScenario: ScriptedAction[] = [
  {
    tool: 'github:get_repo',
    action: 'github:get_repo',
    inputs: { repo: 'company/main-app' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'slack:post_channel',
    action: 'slack:post_channel',
    inputs: { channel: '#deployments', message: 'Starting deployment sequence...' },
    expectedDecision: 'REVIEW',
    triggerPolicy: 'reviewBulkComms',
  },
  {
    tool: 'github:create_pr',
    action: 'github:create_pr',
    inputs: { repo: 'company/main-app', branch: 'feature/new-auth', title: 'Add OAuth support' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'deploy:preview',
    action: 'deploy:preview',
    inputs: { branch: 'feature/new-auth', environment: 'staging' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'github:merge_pr',
    action: 'github:merge_pr',
    inputs: { repo: 'company/main-app', prNumber: 847, mergeMethod: 'squash' },
    expectedDecision: 'ALLOW',
  },
  {
    tool: 'deploy:production',
    action: 'deploy:production',
    inputs: { version: 'v2.4.0', environment: 'production' },
    expectedDecision: 'REVIEW',
    triggerPolicy: 'reviewHighImpact',
  },
  {
    tool: 'github:delete_branch',
    action: 'github:delete_branch',
    inputs: { repo: 'company/main-app', branch: 'feature/old-experiment' },
    expectedDecision: 'BLOCK_POLICY',
    triggerPolicy: 'blockDestructive',
  },
  {
    tool: 'deploy:rollback',
    action: 'deploy:rollback',
    inputs: { targetVersion: 'v2.3.9', environment: 'production' },
    expectedDecision: 'REVIEW',
    triggerPolicy: 'reviewHighImpact',
  },
  {
    tool: 'file:read_secrets',
    action: 'file:read_secrets',
    inputs: { path: '/etc/deploy/aws_credentials' },
    expectedDecision: 'BLOCK_POLICY',
    triggerPolicy: 'blockSecrets',
  },
  {
    tool: 'github:get_repo',
    action: 'github:get_repo',
    inputs: { repo: 'company/infrastructure' },
    expectedDecision: 'ALLOW',
  },
]

export const scenarios: Record<string, ScriptedAction[]> = {
  payment: paymentScenario,
  support: supportScenario,
  dev: devScenario,
}

// =============================================================================
// RBAC PERMISSIONS
// =============================================================================

export const rbacPermissions: Record<string, Record<string, boolean>> = {
  viewer: { read: true, write: false, delete: false, admin: false },
  editor: { read: true, write: true, delete: false, admin: false },
  admin: { read: true, write: true, delete: true, admin: true },
}

// =============================================================================
// HELPERS
// =============================================================================

export function generateTraceId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = 'tr_'
  for (let i = 0; i < 10; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

export function getBundleById(id: string): Bundle | undefined {
  return bundles.find(b => b.id === id)
}

export function getScenarioForBundle(bundleId: string): ScriptedAction[] {
  return scenarios[bundleId] || []
}

// Find which displayed tool index a scenario tool maps to
export function getToolIndexForAction(bundle: Bundle, toolId: string): number {
  // Extract the service prefix (e.g., "stripe" from "stripe:refund")
  const servicePrefix = toolId.split(':')[0]

  // Find index in displayed tools by matching icon (service name)
  const index = bundle.tools.findIndex(t => t.icon === servicePrefix)
  return index >= 0 ? index : 0
}

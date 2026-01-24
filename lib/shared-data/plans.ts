export type PlanId = 'sandbox' | 'enterprise'

export interface PricingInformation {
  id: string
  planId: PlanId
  name: string
  nameBadge?: string
  costUnit?: string
  href: string
  priceLabel?: string
  priceMonthly: number | string
  warning?: string
  warningTooltip?: string
  description: string
  preface: string
  features: (string | string[])[]
  footer?: string
  cta: string
}

export const plans: PricingInformation[] = [
  {
    id: 'tier_sandbox',
    planId: 'sandbox',
    name: 'Sandbox',
    nameBadge: '',
    costUnit: '/ month',
    href: '/docs/quickstart',
    priceLabel: '',
    priceMonthly: 0,
    description: 'All features, rate-limited. Perfect for development and proof of concepts.',
    preface: 'Everything you need to get started:',
    features: [
      'Full policy engine',
      'Identity & RBAC controls',
      'Complete audit trails',
      'MCP gateway proxy',
      ['Rate-limited API calls', '1,000 requests/day'],
      ['Decision trace retention', '7 days'],
      'Community support',
    ],
    footer: 'No credit card required. Upgrade anytime.',
    cta: 'Try the sandbox',
  },
  {
    id: 'tier_enterprise',
    planId: 'enterprise',
    name: 'Enterprise',
    href: '/contact/sales',
    description: 'For production deployments with dedicated support and flexible deployment options.',
    features: [
      'Unlimited API requests',
      'Extended audit retention',
      'Dedicated support manager',
      'SLA guarantees',
      'SSO integration',
      'Custom deployment options',
      ['Managed Cloud', 'Available now'],
      ['Private Deployment', 'By request'],
      ['Customer-Managed', 'Design partner'],
    ],
    priceLabel: '',
    priceMonthly: 'Custom',
    preface: 'Everything in Sandbox, plus:',
    cta: 'Book a security review',
  },
] as const

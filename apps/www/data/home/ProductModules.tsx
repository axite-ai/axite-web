export type ProductModuleType = {
  [key: string]: {
    name: string
    icon: string
    description: string | JSX.Element
    description_short: string
    label: string
    url: string
  }
}

// Axite governance pillars for homepage
const ProductModules: ProductModuleType = {
  policy: {
    name: 'Policy Enforcement',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    description: (
      <>
        <strong>Allow, deny, or require approval</strong> for any agent action at the gateway level. Centralized rules, enforced consistently.
      </>
    ),
    description_short: 'Control what agents can do',
    label: '',
    url: '/product#policy',
  },
  identity: {
    name: 'Identity & RBAC',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    description: (
      <>
        <strong>Role-based access control</strong> for agents, tools, and actions. Least-privilege by default, escalation when needed.
      </>
    ),
    description_short: 'RBAC for agents and tools',
    label: '',
    url: '/product#identity',
  },
  audit: {
    name: 'Audit Trails',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    description: (
      <>
        <strong>Complete decision traces</strong> and logs for every agent action. Compliance-ready evidence your security team needs.
      </>
    ),
    description_short: 'Audit-grade evidence and logs',
    label: '',
    url: '/product#audit',
  },
}

export default ProductModules

import { Shield, Users, ClipboardList, ArrowRight, Server, Zap } from 'lucide-react'

export default {
  metadata: {
    metaTitle: 'Agent Governance Platform | Axite',
    metaDescription:
      'Axite is the control plane for AI agents. Policy enforcement, identity management, and audit trails for every agent action.',
  },
  heroSection: {
    id: 'hero',
    title: 'Agent Governance Platform',
    h1: (
      <>
        The control plane
        <span className="block text-transparent bg-clip-text bg-gradient-to-br from-[#3B63F3] to-[#00B3A4]">for AI agents</span>
      </>
    ),
    subheader: [
      <>
        Axite sits between your agents and their tools. Every action flows through our MCP gateway,
        where policies are enforced, identities are verified, and decisions are logged.
      </>,
    ],
  },
  howItWorks: {
    id: 'how-it-works',
    label: 'How it works',
    heading: <>Agent to tools, governed</>,
    subheading:
      'Your agents connect to Axite instead of directly to tools. Axite proxies requests through the MCP gateway, applies your policies, and logs every decision.',
    steps: [
      {
        icon: Zap,
        title: 'Agent requests action',
        description: 'Your AI agent wants to call a tool (read file, send email, query database).',
      },
      {
        icon: Shield,
        title: 'Axite evaluates policy',
        description: 'The request flows through Axite. Policies check: is this allowed? Does it need approval?',
      },
      {
        icon: ArrowRight,
        title: 'Action executes (or not)',
        description: 'Allowed actions proceed to the tool. Denied actions are blocked. Approvals wait for human input.',
      },
      {
        icon: ClipboardList,
        title: 'Everything is logged',
        description: 'Every request, decision, and outcome is recorded with full context for audit.',
      },
    ],
  },
  features: {
    id: 'features',
    label: 'Core capabilities',
    sections: [
      {
        id: 'policy',
        icon: Shield,
        title: 'Policy Enforcement',
        heading: 'Allow, deny, or require approval',
        description:
          'Define what your agents can and cannot do. Policies are evaluated at the gateway before any action reaches a tool.',
        highlights: [
          'Allow/deny rules by agent, tool, or action type',
          'Require human approval for sensitive operations',
          'Time-based and context-aware policy conditions',
          'Policy-as-code with version control',
        ],
        url: '/product#policy',
      },
      {
        id: 'identity',
        icon: Users,
        title: 'Identity & RBAC',
        heading: 'Role-based access for agents',
        description:
          'Agents have identities. Tools have permissions. RBAC ensures each agent only accesses what it needs.',
        highlights: [
          'Agent identity verification',
          'Role-based tool access',
          'Least-privilege defaults',
          'Escalation workflows',
        ],
        url: '/product#identity',
      },
      {
        id: 'audit',
        icon: ClipboardList,
        title: 'Audit Trails',
        heading: 'Complete decision traces',
        description:
          'Every action, every decision, every outcome. Audit logs with full context for compliance and debugging.',
        highlights: [
          'Full request/response logging',
          'Decision trace with policy evaluation',
          'Searchable audit history',
          'Export for compliance reporting',
        ],
        url: '/product#audit',
      },
    ],
  },
  gateway: {
    id: 'gateway',
    icon: Server,
    label: 'MCP Gateway',
    heading: 'Native MCP support',
    description:
      'Axite speaks MCP natively. Connect any MCP-compatible agent or tool through our governed proxy. No code changes required for compliant tools.',
    highlights: [
      'Drop-in MCP proxy',
      'Works with Claude, GPT, and other agents',
      'Pre-built connectors for common tools',
      'Custom MCP server support',
    ],
    url: '/product#gateway',
  },
  cta: {
    heading: 'Ready to govern your agents?',
    subheading: 'Start with our free Sandbox tier. All features, rate-limited.',
    primaryCta: {
      label: 'Try the sandbox',
      url: '/docs/quickstart',
    },
    secondaryCta: {
      label: 'Book a security review',
      url: '/contact/sales',
    },
  },
}

// apps/www/components/AnimatedWalkthrough/data.ts
import { Beat } from './types'

export const SCENARIO: Beat[] = [
  {
    id: 'agent-acts',
    durationMs: 5000,
    label: 'Agent acts',
    lines: [
      { text: '$ payment-agent running...', color: 'dim', typeSpeed: 0, instant: true },
      { text: '', delay: 300, instant: true },
      { text: '[payment-agent] Deploying payments service v2.4.1', color: 'white', delay: 500 },
      { text: '', delay: 200, instant: true },
      { text: '> kubectl apply -f deploy-payments-v2.yaml --namespace production', color: 'green', delay: 800, typeSpeed: 35 },
    ],
  },
  {
    id: 'intercept',
    durationMs: 8000,
    label: 'Axite intercepts',
    lines: [
      { text: '', instant: true },
      { text: '⚡ axite gateway — intercepted', color: 'brand', delay: 300, typeSpeed: 25 },
      { text: '', delay: 200, instant: true },
      { text: '  identity     payment-agent', color: 'dim', delay: 400, instant: true },
      { text: '  action       kubectl apply', color: 'dim', delay: 200, instant: true },
      { text: '  namespace    production', color: 'dim', delay: 200, instant: true },
      { text: '  policy       prod-deploy-policy', color: 'dim', delay: 200, instant: true },
      { text: '', delay: 300, instant: true },
      { text: '  evaluating policy...', color: 'amber', delay: 500, typeSpeed: 40 },
      { text: '', delay: 800, instant: true },
      { text: '  result       REQUIRES_APPROVAL', color: 'amber', delay: 400, typeSpeed: 20 },
      { text: '  → notifying #platform-approvals on Slack', color: 'dim', delay: 600 },
    ],
  },
  {
    id: 'slack-approval',
    durationMs: 10000,
    label: 'Slack approval',
    lines: [], // This beat renders a Slack card component instead of terminal lines
  },
  {
    id: 'execution',
    durationMs: 7000,
    label: 'Execution',
    lines: [
      { text: '', instant: true },
      { text: '✓ approved by sarah@acme.com', color: 'green', delay: 300 },
      { text: '  justification: "Reviewed diff — LGTM"', color: 'dim', delay: 400, instant: true },
      { text: '', delay: 300, instant: true },
      { text: '⚡ axite gateway — releasing action', color: 'brand', delay: 500 },
      { text: '', delay: 400, instant: true },
      { text: '> kubectl apply -f deploy-payments-v2.yaml --namespace production', color: 'green', delay: 300, typeSpeed: 40 },
      { text: '  deployment.apps/payments-v2 configured', color: 'green', delay: 800, instant: true },
      { text: '  rollout status: 3/3 replicas updated', color: 'green', delay: 400, instant: true },
    ],
  },
  {
    id: 'evidence',
    durationMs: 10000,
    label: 'Evidence receipt',
    lines: [], // This beat renders an evidence receipt card
  },
  {
    id: 'cta',
    durationMs: 5000,
    label: '',
    lines: [], // This beat renders CTA buttons
  },
]

export const TOTAL_DURATION_MS = SCENARIO.reduce((sum, b) => sum + b.durationMs, 0)

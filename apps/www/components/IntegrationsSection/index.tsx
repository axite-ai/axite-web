'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn, Badge } from 'ui'
import SectionContainer from '~/components/Layouts/SectionContainer'
import Panel from '~/components/Panel'
import { INITIAL_BOTTOM, getAnimation } from '~/lib/animations'

// =============================================================================
// INTEGRATION LOGOS
// =============================================================================

const integrations = [
  {
    name: 'Kubernetes',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="16" r="11" />
        <circle cx="16" cy="16" r="2" />
        <line x1="16" y1="5" x2="16" y2="10" />
        <line x1="16" y1="22" x2="16" y2="27" />
        <line x1="6.5" y1="10.5" x2="11" y2="13.5" />
        <line x1="21" y1="18.5" x2="25.5" y2="21.5" />
        <line x1="6.5" y1="21.5" x2="11" y2="18.5" />
        <line x1="21" y1="13.5" x2="25.5" y2="10.5" />
      </svg>
    ),
  },
  {
    name: 'Terraform',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <rect x="12.5" y="2" width="8" height="8" rx="0.5" />
        <rect x="12.5" y="12" width="8" height="8" rx="0.5" />
        <rect x="2" y="12" width="8" height="8" rx="0.5" />
        <rect x="12.5" y="22" width="8" height="8" rx="0.5" />
        <rect x="23" y="12" width="8" height="8" rx="0.5" />
      </svg>
    ),
  },
  {
    name: 'ArgoCD',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="14" r="10" />
        <circle cx="16" cy="14" r="4" />
        <path d="M10 24 Q12 30 16 30 Q20 30 22 24" />
        <path d="M6 22 Q4 28 8 28" />
        <path d="M26 22 Q28 28 24 28" />
      </svg>
    ),
  },
  {
    name: 'GitHub Actions',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 2C8.265 2 2 8.265 2 16c0 6.195 4.008 11.427 9.572 13.282.7.128.96-.303.96-.672 0-.332-.013-1.434-.019-2.602-3.893.846-4.715-1.654-4.715-1.654-.636-1.616-1.553-2.046-1.553-2.046-1.27-.868.096-.85.096-.85 1.404.098 2.143 1.44 2.143 1.44 1.248 2.138 3.272 1.52 4.07 1.162.126-.906.487-1.52.886-1.87-3.108-.353-6.374-1.554-6.374-6.916 0-1.527.547-2.776 1.44-3.756-.144-.354-.624-1.777.138-3.703 0 0 1.174-.376 3.846 1.434A13.387 13.387 0 0116 9.57c1.19.006 2.388.161 3.507.47 2.67-1.81 3.84-1.434 3.84-1.434.765 1.926.285 3.35.14 3.703.897.98 1.44 2.23 1.44 3.756 0 5.376-3.272 6.558-6.388 6.903.503.432.95 1.285.95 2.592 0 1.87-.017 3.38-.017 3.838 0 .373.254.808.964.67C25.996 27.42 30 22.193 30 16c0-7.735-6.265-14-14-14z"
        />
      </svg>
    ),
  },
  {
    name: 'Slack',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="10" y1="6" x2="10" y2="14" />
        <line x1="6" y1="10" x2="14" y2="10" />
        <line x1="22" y1="6" x2="22" y2="14" />
        <line x1="18" y1="10" x2="26" y2="10" />
        <line x1="10" y1="18" x2="10" y2="26" />
        <line x1="6" y1="22" x2="14" y2="22" />
        <line x1="22" y1="18" x2="22" y2="26" />
        <line x1="18" y1="22" x2="26" y2="22" />
      </svg>
    ),
  },
]

// =============================================================================
// EXAMPLE CARD DATA
// =============================================================================

interface CardRow {
  key: string
  value: string | React.ReactNode
}

interface ExampleCard {
  title: string
  rows: CardRow[]
  divider: true
  policyRows: CardRow[]
}

const exampleCards: ExampleCard[] = [
  {
    title: 'Kubernetes Deployment',
    rows: [
      { key: 'Agent', value: 'deploy-agent' },
      { key: 'Action', value: 'kubectl apply -f deployment.yaml' },
      { key: 'Environment', value: 'production' },
    ],
    divider: true,
    policyRows: [
      {
        key: 'Policy',
        value: (
          <span>
            require-approval{' '}
            <span className="text-foreground-muted">(namespace: production)</span>
          </span>
        ),
      },
      {
        key: 'Decision',
        value: (
          <span className="inline-flex items-center gap-2">
            <span className="text-foreground-light">REVIEW</span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="text-foreground-light">APPROVED</span>
            <Badge variant="default" className="text-[10px] px-1.5 ml-1">
              APPROVED
            </Badge>
          </span>
        ),
      },
      {
        key: 'Receipt',
        value: (
          <span className="text-foreground-muted">sha256:a3f2c9e8d1b7...</span>
        ),
      },
    ],
  },
  {
    title: 'Terraform Plan',
    rows: [
      { key: 'Agent', value: 'infra-agent' },
      { key: 'Action', value: 'terraform apply -auto-approve' },
      { key: 'Environment', value: 'production' },
    ],
    divider: true,
    policyRows: [
      { key: 'Policy', value: 'block-auto-approve' },
      {
        key: 'Decision',
        value: (
          <span className="inline-flex items-center gap-2">
            <span className="text-foreground-light">BLOCK</span>
            <Badge variant="destructive" className="text-[10px] px-1.5 ml-1">
              BLOCKED
            </Badge>
          </span>
        ),
      },
      {
        key: 'Reason',
        value: (
          <span className="text-foreground-lighter">
            -auto-approve flag not permitted in production
          </span>
        ),
      },
    ],
  },
]

// =============================================================================
// INTEGRATION LOGO COMPONENT
// =============================================================================

const IntegrationLogo = ({
  integration,
  index,
  isInView,
}: {
  integration: (typeof integrations)[number]
  index: number
  isInView: boolean
}) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 group"
      initial={INITIAL_BOTTOM}
      animate={isInView ? getAnimation({ delay: 0.1 + index * 0.05 }) : INITIAL_BOTTOM}
    >
      <div
        className={cn(
          'text-foreground-muted opacity-40 grayscale',
          'group-hover:text-foreground group-hover:opacity-100 group-hover:grayscale-0',
          'transition-all duration-300'
        )}
      >
        {integration.icon}
      </div>
      <span className="font-mono text-xs text-foreground-muted group-hover:text-foreground-light transition-colors duration-300">
        {integration.name}
      </span>
    </motion.div>
  )
}

// =============================================================================
// EXAMPLE CARD COMPONENT
// =============================================================================

const ExampleCardPanel = ({
  card,
  index,
  isInView,
}: {
  card: ExampleCard
  index: number
  isInView: boolean
}) => {
  return (
    <motion.div
      initial={INITIAL_BOTTOM}
      animate={isInView ? getAnimation({ delay: 0.3 + index * 0.1 }) : INITIAL_BOTTOM}
    >
      <Panel hasActiveOnHover innerClassName="p-5">
        <div className="relative z-10">
          <h3 className="font-mono text-sm text-foreground mb-4">{card.title}</h3>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-xs">
            {card.rows.map((row) => (
              <Row key={row.key} label={row.key} value={row.value} />
            ))}
          </div>

          {card.divider && (
            <div className="border-t border-muted my-4" />
          )}

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-xs">
            {card.policyRows.map((row) => (
              <Row key={row.key} label={row.key} value={row.value} />
            ))}
          </div>
        </div>
      </Panel>
    </motion.div>
  )
}

const Row = ({
  label,
  value,
}: {
  label: string
  value: string | React.ReactNode
}) => (
  <>
    <span className="text-foreground-muted whitespace-nowrap">{label}</span>
    <span className="text-foreground-light break-all">{value}</span>
  </>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const IntegrationsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <SectionContainer>
      <div ref={ref}>
        {/* Section header */}
        <div className="max-w-xl mb-8 lg:mb-12">
          <span className="font-mono text-xs text-brand uppercase tracking-widest">
            Integrations
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mt-3 mb-4">
            Works with your stack
          </h2>
        </div>

        {/* Logo row */}
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 mb-12 lg:mb-16">
          {integrations.map((integration, index) => (
            <IntegrationLogo
              key={integration.name}
              integration={integration}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Example cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exampleCards.map((card, index) => (
            <ExampleCardPanel
              key={card.title}
              card={card}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export default IntegrationsSection

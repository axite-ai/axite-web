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
      <svg width="32" height="32" viewBox="0 0 128 128">
        <g fill="currentColor">
          <path d="M56.484 55.098c.37.27.82.43 1.31.43 1.2 0 2.18-.95 2.23-2.13l.05-.03.75-13.26c-.9.11-1.8.26-2.7.46-4.93 1.12-9.2 3.55-12.54 6.83l10.87 7.71.03-.01zM55.034 74.528a2.218 2.218 0 00-2.58-1.69l-.02-.03-13.05 2.21a26.15 26.15 0 0010.51 13.15l5.06-12.22-.04-.05c.17-.42.23-.89.12-1.37zM50.694 65.118c.44-.12.85-.38 1.16-.76.75-.94.62-2.29-.28-3.07l.01-.05-9.93-8.88a26.07 26.07 0 00-3.7 16.48l12.73-3.67.01-.05zM60.334 69.018l3.66 1.76 3.66-1.75.9-3.95-2.53-3.16h-4.06l-2.54 3.16zM67.934 53.348c.02.46.18.91.49 1.29.75.94 2.1 1.11 3.06.41l.04.02 10.8-7.66c-4.08-3.99-9.4-6.6-15.15-7.3l.75 13.24h.01zM75.514 72.778c-.17-.03-.34-.05-.51-.04-.29.01-.58.09-.85.22a2.23 2.23 0 00-1.08 2.89l-.02.02 5.11 12.34c4.93-3.14 8.61-7.83 10.54-13.24l-13.16-2.23-.03.04zM65.954 79.318a2.246 2.246 0 00-2.04-1.17c-.77.03-1.5.46-1.89 1.18h-.01l-6.42 11.6a26.16 26.16 0 0014.27.73c.88-.2 1.74-.44 2.57-.72l-6.43-11.63h-.05z" />
          <path d="M124.544 76.788l-10.44-45.33a8.012 8.012 0 00-4.37-5.43l-42.24-20.18a8.157 8.157 0 00-3.92-.78 8.15 8.15 0 00-3.1.78l-42.24 20.18a8.055 8.055 0 00-4.37 5.43l-10.41 45.34a7.92 7.92 0 001.1 6.14c.14.22.3.43.46.64l29.24 36.35a8.087 8.087 0 006.32 3.01l46.89-.01c2.46 0 4.78-1.11 6.32-3.01l29.23-36.36a7.981 7.981 0 001.53-6.77zm-16.07-.55c-.31 1.35-1.76 2.17-3.26 1.85-.01 0-.03 0-.04-.01-.02 0-.03-.01-.05-.02-.21-.05-.47-.09-.65-.14-.86-.23-1.49-.58-2.27-.88-1.67-.6-3.06-1.1-4.41-1.3-.69-.05-1.04.27-1.42.52-.18-.04-.75-.14-1.08-.19-2.42 7.61-7.58 14.21-14.57 18.33.12.29.33.91.42 1.02-.16.43-.4.83-.19 1.49.49 1.27 1.28 2.52 2.24 4.01.46.69.94 1.22 1.36 2.02.1.19.23.48.33.68.65 1.39.17 2.99-1.08 3.59-1.26.61-2.82-.03-3.5-1.43-.1-.2-.23-.46-.31-.65-.36-.82-.48-1.52-.73-2.32-.57-1.68-1.05-3.07-1.73-4.25-.39-.57-.86-.64-1.29-.78-.08-.14-.38-.69-.54-.97-1.4.53-2.84.97-4.34 1.31-6.56 1.49-13.13.89-18.99-1.37l-.57 1.04c-.43.11-.84.23-1.09.53-.92 1.1-1.29 2.86-1.96 4.54-.25.79-.37 1.5-.73 2.32-.08.19-.22.45-.31.64v.01l-.01.01c-.67 1.39-2.23 2.03-3.49 1.43-1.25-.6-1.72-2.2-1.08-3.59.1-.2.22-.49.32-.68.42-.79.89-1.33 1.36-2.02.96-1.5 1.8-2.84 2.29-4.11.12-.42-.06-1-.22-1.43l.46-1.1c-6.73-3.99-12.04-10.34-14.58-18.21l-1.1.19c-.3-.17-.89-.56-1.45-.51-1.35.2-2.74.7-4.41 1.3-.78.3-1.4.64-2.27.87-.18.05-.44.1-.65.15-.02 0-.03.01-.05.02-.01 0-.03 0-.04.01-1.5.32-2.95-.5-3.26-1.85-.31-1.35.65-2.72 2.14-3.08.01 0 .03-.01.04-.01.01 0 .01 0 .02-.01.21-.05.48-.12.68-.16.88-.17 1.6-.13 2.43-.19 1.77-.19 3.23-.34 4.53-.75.41-.17.81-.74 1.09-1.1l1.06-.31c-1.19-8.22.82-16.28 5.16-22.81l-.81-.72c-.05-.32-.12-1.04-.51-1.46-.99-.93-2.25-1.71-3.76-2.64-.72-.42-1.38-.69-2.1-1.23-.15-.11-.36-.29-.52-.42-.01-.01-.03-.02-.04-.03-1.21-.97-1.49-2.64-.62-3.73.49-.61 1.24-.92 2.01-.89.6.02 1.23.24 1.76.66.17.14.41.32.56.45.68.58 1.09 1.16 1.66 1.77 1.25 1.27 2.28 2.32 3.41 3.08.59.35 1.05.21 1.5.15.15.11.63.46.91.65 4.3-4.57 9.96-7.95 16.52-9.44 1.53-.35 3.05-.58 4.57-.7l.06-1.07c.34-.33.71-.79.82-1.31.11-1.36-.07-2.82-.28-4.59-.12-.82-.31-1.51-.35-2.4-.01-.18 0-.44.01-.65 0-.02-.01-.05-.01-.07 0-1.55 1.13-2.81 2.53-2.81s2.53 1.26 2.53 2.81c0 .22.01.52.01.72-.03.89-.23 1.58-.35 2.4-.21 1.76-.4 3.23-.29 4.59.1.68.5.95.83 1.26.01.18.04.79.06 1.13 8.04.71 15.5 4.39 20.99 10.14l.96-.69c.33.02 1.04.12 1.53-.17 1.13-.76 2.16-1.82 3.41-3.08.57-.61.99-1.18 1.67-1.77.15-.13.39-.31.56-.45 1.21-.97 2.9-.86 3.77.23s.59 2.76-.62 3.73c-.17.14-.39.33-.56.45-.72.53-1.38.8-2.1 1.23-1.51.93-2.77 1.71-3.76 2.64-.47.5-.43.98-.48 1.43-.14.13-.63.57-.9.8a32.75 32.75 0 014.74 10.95c.92 3.99 1.06 7.97.53 11.8l1.02.3c.18.26.56.89 1.09 1.1 1.3.41 2.76.56 4.53.75.83.07 1.55.03 2.43.19.21.04.52.12.73.17 1.5.37 2.45 1.74 2.14 3.09z" />
          <path d="M86.274 52.358l-9.88 8.84.01.03c-.34.3-.6.7-.71 1.18-.27 1.17.44 2.33 1.58 2.65l.01.05 12.79 3.68c.27-2.76.11-5.62-.55-8.48-.66-2.89-1.77-5.56-3.25-7.95z" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Terraform',
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128">
        <g fill="currentColor" fillRule="evenodd">
          <path d="M77.941 44.5v36.836L46.324 62.918V26.082zm0 0" />
          <path d="M81.41 81.336l31.633-18.418V26.082L81.41 44.5zm0 0" opacity="0.7" />
          <path d="M11.242 42.36L42.86 60.776V23.941L11.242 5.523zm0 0M77.941 85.375L46.324 66.957v36.82l31.617 18.418zm0 0" />
        </g>
      </svg>
    ),
  },
  {
    name: 'ArgoCD',
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128">
        <path
          d="M109.926 47.508c0 25.355-20.555 45.91-45.91 45.91-25.356 0-45.91-20.555-45.91-45.91 0-25.352 20.554-45.906 45.91-45.906 25.355 0 45.91 20.554 45.91 45.906zm0 0"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M108.227 47.508c0 24.418-19.793 44.21-44.211 44.21-24.414 0-44.207-19.792-44.207-44.21C19.809 23.094 39.602 3.3 64.016 3.3c24.418 0 44.21 19.793 44.21 44.207zm0 0"
          fill="currentColor"
          opacity="0.5"
        />
        <path
          d="M100.148 48.36c0 19.956-16.175 36.132-36.132 36.132-19.954 0-36.133-16.176-36.133-36.133 0-19.953 16.18-36.132 36.133-36.132 19.957 0 36.132 16.18 36.132 36.132zm0 0"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M42.762 65.363s2.976 48.035 2.976 48.887c0 .422.426 1.273-1.703 2.125-2.125.848-8.926 2.55-8.926 2.55h10.203c4.676 0 4.676-3.827 4.676-4.675 0-.852 1.274-19.129 1.274-19.129s.425 21.68.425 22.527c0 .852-.425 2.125-3.398 2.977-2.125.426-8.504 1.7-8.504 1.7h9.778c5.953 0 5.953-3.825 5.953-3.825l1.273-19.129s.426 19.129.426 21.254c0 1.7-1.274 2.977-5.953 3.824-2.973.852-6.801 1.703-6.801 1.703h11.055c5.523-.425 6.375-4.254 6.375-4.254l9.351-47.609zm0 0"
          fill="currentColor"
        />
        <path
          d="M85.27 65.363s-2.973 48.035-2.973 48.887c0 .422-.426 1.273 1.7 2.125 2.124.848 8.925 2.55 8.925 2.55H82.719c-4.676 0-4.676-3.827-4.676-4.675 0-.852-1.273-19.129-1.273-19.129s-.426 21.68-.426 22.527c0 .852.426 2.125 3.402 2.977l8.5 1.7H78.47c-5.95 0-5.95-3.825-5.95-3.825l-1.277-19.129s-.426 19.129-.426 21.254c0 1.7 1.278 2.977 5.954 3.824 2.976.852 6.8 1.703 6.8 1.703H72.52c-5.528-.425-6.38-4.254-6.38-4.254L56.79 74.29zm.425-23.379c0 11.903-9.777 21.254-21.254 21.254-11.476 0-21.254-9.777-21.254-21.254 0-11.476 9.778-21.254 21.254-21.254 11.477 0 21.254 9.352 21.254 21.254zm0 0"
          fill="currentColor"
        />
        <circle cx="49" cy="54" r="8" fill="currentColor" opacity="0.5" />
        <circle cx="79" cy="54" r="8" fill="currentColor" opacity="0.5" />
        <circle cx="49" cy="53" r="3" fill="currentColor" />
        <circle cx="79" cy="53" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'GitHub Actions',
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128">
        <g fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
          />
          <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Slack',
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128">
        <path
          d="M27.255 80.719c0 7.33-5.978 13.317-13.309 13.317C6.616 94.036.63 88.049.63 80.719s5.987-13.317 13.317-13.317h13.309zm6.709 0c0-7.33 5.987-13.317 13.317-13.317s13.317 5.986 13.317 13.317v33.335c0 7.33-5.986 13.317-13.317 13.317-7.33 0-13.317-5.987-13.317-13.317zm0 0"
          fill="currentColor"
        />
        <path
          d="M47.281 27.255c-7.33 0-13.317-5.978-13.317-13.309C33.964 6.616 39.951.63 47.281.63s13.317 5.987 13.317 13.317v13.309zm0 6.709c7.33 0 13.317 5.987 13.317 13.317s-5.986 13.317-13.317 13.317H13.946C6.616 60.598.63 54.612.63 47.281c0-7.33 5.987-13.317 13.317-13.317zm0 0"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M100.745 47.281c0-7.33 5.978-13.317 13.309-13.317 7.33 0 13.317 5.987 13.317 13.317s-5.987 13.317-13.317 13.317h-13.309zm-6.709 0c0 7.33-5.987 13.317-13.317 13.317s-13.317-5.986-13.317-13.317V13.946C67.402 6.616 73.388.63 80.719.63c7.33 0 13.317 5.987 13.317 13.317zm0 0"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M80.719 100.745c7.33 0 13.317 5.978 13.317 13.309 0 7.33-5.987 13.317-13.317 13.317s-13.317-5.987-13.317-13.317v-13.309zm0-6.709c-7.33 0-13.317-5.987-13.317-13.317s5.986-13.317 13.317-13.317h33.335c7.33 0 13.317 5.986 13.317 13.317 0 7.33-5.987 13.317-13.317 13.317zm0 0"
          fill="currentColor"
          opacity="0.4"
        />
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
  footnote?: string
}

const exampleCards: ExampleCard[] = [
  {
    title: 'Terraform Apply',
    rows: [
      { key: 'Agent', value: 'infra-agent' },
      { key: 'Action', value: 'terraform apply' },
      { key: 'Environment', value: 'production' },
    ],
    divider: true,
    policyRows: [
      {
        key: 'Policy',
        value: (
          <span>
            require-approval{' '}
            <span className="text-foreground-muted">(workspace: production)</span>
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
    footnote: 'Approve the exact plan. Apply requires the receipt.',
  },
  {
    title: 'Terraform Block',
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

          {card.footnote && (
            <p className="mt-4 pt-3 border-t border-muted font-mono text-xs text-foreground-muted">
              {card.footnote}
            </p>
          )}
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

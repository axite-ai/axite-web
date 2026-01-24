import Panel from '~/components/Panel'
import { Badge, cn } from 'ui'

interface DecisionTraceProps {
  policy: string
  rule: string
  identity: string
  reason?: string
}

const DecisionTrace = ({ policy, rule, identity, reason }: DecisionTraceProps) => (
  <div className="space-y-1.5 font-mono text-xs">
    <div className="flex gap-2">
      <span className="text-foreground-lighter">Policy:</span>
      <span className="text-foreground-light">{policy}</span>
    </div>
    <div className="flex gap-2">
      <span className="text-foreground-lighter">Rule:</span>
      <span className="text-foreground-light">{rule}</span>
    </div>
    <div className="flex gap-2">
      <span className="text-foreground-lighter">Identity:</span>
      <span className="text-foreground-light">{identity}</span>
    </div>
    {reason && (
      <div className="flex gap-2">
        <span className="text-foreground-lighter">Reason:</span>
        <span className="text-foreground-light">{reason}</span>
      </div>
    )}
  </div>
)

interface DecisionPanelProps {
  title: string
  timestamp: string
  action: string
  result: 'Allowed' | 'Blocked'
  trace: DecisionTraceProps
}

const DecisionPanel = ({ title, timestamp, action, result, trace }: DecisionPanelProps) => (
  <Panel innerClassName="flex flex-col" outerClassName="h-full">
    {/* Header with window dots */}
    <div className="px-4 py-3 border-b border-border flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-border" />
        <div className="w-2.5 h-2.5 rounded-full bg-border" />
        <div className="w-2.5 h-2.5 rounded-full bg-border" />
      </div>
      <span className="text-sm text-foreground ml-2">{title}</span>
    </div>

    {/* Content */}
    <div className="flex-1 p-4 space-y-4">
      {/* Timestamp */}
      <div className="font-mono text-xs text-foreground-lighter">{timestamp}</div>

      {/* Action description */}
      <div className="text-sm text-foreground-light">{action}</div>

      {/* Result badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-foreground-lighter">Result:</span>
        <Badge variant={result === 'Allowed' ? 'success' : 'destructive'}>{result}</Badge>
      </div>

      {/* Trace details */}
      <div className="pt-2 border-t border-border">
        <DecisionTrace {...trace} />
      </div>
    </div>
  </Panel>
)

const PolicyDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
      {/* Left: Allowed scenario */}
      <DecisionPanel
        title="Allowed Action"
        timestamp="2024-01-24 09:15:32 UTC"
        action="Read customer profile for support ticket #4521"
        result="Allowed"
        trace={{
          policy: 'sales-team-read-only',
          rule: 'allow-customer-read',
          identity: 'agent:support-bot',
        }}
      />

      {/* Right: Blocked scenario */}
      <DecisionPanel
        title="Blocked Action"
        timestamp="2024-01-24 09:15:47 UTC"
        action="Access SSN field in customer record"
        result="Blocked"
        trace={{
          policy: 'pii-protection',
          rule: 'deny-sensitive-fields',
          identity: 'agent:support-bot',
          reason: 'Action outside permitted scope',
        }}
      />
    </div>
  )
}

export default PolicyDemo

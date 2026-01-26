import Panel from '~/components/Panel'
import { Badge } from 'ui'

interface DecisionLineProps {
  timestamp: string
  action: string
  result: 'Allowed' | 'Blocked'
}

const DecisionLine = ({ timestamp, action, result }: DecisionLineProps) => (
  <div className="flex items-center gap-3 py-2 border-b border-border last:border-b-0">
    <span className="font-mono text-xs text-foreground-lighter whitespace-nowrap">{timestamp}</span>
    <span className="text-sm text-foreground-light flex-1 truncate">{action}</span>
    <Badge variant={result === 'Allowed' ? 'success' : 'destructive'} className="shrink-0">
      {result}
    </Badge>
  </div>
)

const PolicyPillar = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Content */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Enforceable Policy</h3>
        <p className="text-foreground-light text-sm">
          Define what agents can and cannot do. Policies evaluate every tool call before execution.
        </p>
      </div>

      {/* Mini Policy Demo */}
      <Panel innerClassName="flex flex-col flex-1" outerClassName="flex-1">
        {/* Header with window dots */}
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <span className="text-sm text-foreground ml-2">Policy Decisions</span>
        </div>

        {/* Decision lines */}
        <div className="p-4">
          <DecisionLine
            timestamp="09:15:32"
            action="Read customer profile"
            result="Allowed"
          />
          <DecisionLine
            timestamp="09:15:47"
            action="Access SSN field"
            result="Blocked"
          />
          <DecisionLine
            timestamp="09:16:03"
            action="Update support ticket"
            result="Allowed"
          />
        </div>
      </Panel>
    </div>
  )
}

export default PolicyPillar

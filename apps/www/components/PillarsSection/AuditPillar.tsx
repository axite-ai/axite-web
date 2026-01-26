import Panel from '~/components/Panel'

interface StatRowProps {
  label: string
  value: string | number
  percentage?: number
  variant?: 'default' | 'success' | 'warning'
}

const StatRow = ({ label, value, percentage, variant = 'default' }: StatRowProps) => (
  <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
    <span className="text-sm text-foreground-lighter">{label}</span>
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-foreground">{value}</span>
      {percentage !== undefined && (
        <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              variant === 'success'
                ? 'bg-success-500'
                : variant === 'warning'
                  ? 'bg-warning-500'
                  : 'bg-foreground-muted'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  </div>
)

const AuditPillar = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Content */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Audit-Grade Evidence</h3>
        <p className="text-foreground-light text-sm">
          Complete decision traces for every action. Export-ready compliance reports.
        </p>
      </div>

      {/* Report Preview */}
      <Panel innerClassName="flex flex-col flex-1" outerClassName="flex-1">
        {/* Header with window dots */}
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <span className="text-sm text-foreground ml-2">Audit Report</span>
        </div>

        {/* Report content */}
        <div className="p-4">
          {/* Time range */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span className="font-mono text-xs text-foreground-lighter">Period:</span>
            <span className="font-mono text-xs text-foreground-light">Last 7 days</span>
          </div>

          {/* Stats */}
          <div className="space-y-1">
            <StatRow label="Total Actions" value="12,847" />
            <StatRow label="Allowed" value="12,124" percentage={94} variant="success" />
            <StatRow label="Blocked" value="723" percentage={6} variant="warning" />
            <StatRow label="Unique Agents" value="8" />
          </div>
        </div>
      </Panel>
    </div>
  )
}

export default AuditPillar

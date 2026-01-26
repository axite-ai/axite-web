import Panel from '~/components/Panel'
import { cn } from 'ui'

interface PermissionCellProps {
  allowed: boolean
}

const PermissionCell = ({ allowed }: PermissionCellProps) => (
  <td className="px-3 py-2 text-center">
    <span
      className={cn(
        'inline-flex items-center justify-center w-5 h-5 rounded-full text-xs',
        allowed
          ? 'bg-success-200 text-success-600 dark:bg-success-600/20 dark:text-success-400'
          : 'bg-destructive-200 text-destructive-600 dark:bg-destructive-600/20 dark:text-destructive-400'
      )}
    >
      {allowed ? '\u2713' : '\u2715'}
    </span>
  </td>
)

const IdentityPillar = () => {
  const agents = [
    { name: 'support-bot', permissions: [true, false, false, false] },
    { name: 'data-agent', permissions: [true, true, false, false] },
    { name: 'admin-agent', permissions: [true, true, true, true] },
  ]

  const permissionHeaders = ['Read', 'Write', 'Delete', 'Admin']

  return (
    <div className="flex flex-col h-full">
      {/* Content */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Identity & Least Privilege</h3>
        <p className="text-foreground-light text-sm">
          Every agent has an identity. Every identity has explicit permissions. No implicit access.
        </p>
      </div>

      {/* Permission Matrix */}
      <Panel innerClassName="flex flex-col flex-1" outerClassName="flex-1">
        {/* Header with window dots */}
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <span className="text-sm text-foreground ml-2">Permissions</span>
        </div>

        {/* Matrix table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2 text-left font-mono text-xs text-foreground-lighter">
                  Agent
                </th>
                {permissionHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-3 py-2 text-center font-mono text-xs text-foreground-lighter"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.name} className="border-b border-border last:border-b-0">
                  <td className="px-3 py-2 font-mono text-xs text-foreground-light">
                    {agent.name}
                  </td>
                  {agent.permissions.map((allowed, index) => (
                    <PermissionCell key={index} allowed={allowed} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}

export default IdentityPillar

import { Shield, Lock, Key, Eye, Server, Globe } from 'lucide-react'
import SectionContainer from '~/components/Layouts/SectionContainer'
import SectionHeader from '~/components/UI/SectionHeader'
import Panel from '~/components/Panel/Panel'
import Button from '~/components/Button'

interface SecurityItem {
  icon: React.ReactNode
  title: string
  description: string
}

const securityItems: SecurityItem[] = [
  {
    icon: <Shield className="w-5 h-5 text-brand-500" />,
    title: 'SOC 2 Type II',
    description: 'Controls implemented, audit in progress.',
  },
  {
    icon: <Lock className="w-5 h-5 text-brand-500" />,
    title: 'Data Encryption',
    description: 'AES-256 at rest, TLS 1.3 in transit.',
  },
  {
    icon: <Key className="w-5 h-5 text-brand-500" />,
    title: 'Access Controls',
    description: 'RBAC for users and agents.',
  },
  {
    icon: <Eye className="w-5 h-5 text-brand-500" />,
    title: 'Audit Logging',
    description: 'Immutable, encrypted, exportable.',
  },
  {
    icon: <Globe className="w-5 h-5 text-brand-500" />,
    title: 'Data Residency',
    description: 'US default, EU available.',
  },
  {
    icon: <Server className="w-5 h-5 text-brand-500" />,
    title: 'Secrets Management',
    description: 'Never logged, always encrypted.',
  },
]

const SecurityCard = ({ item }: { item: SecurityItem }) => {
  return (
    <Panel innerClassName="p-5">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
        <div>
          <h4 className="text-foreground font-medium mb-1">{item.title}</h4>
          <p className="text-sm text-foreground-lighter">{item.description}</p>
        </div>
      </div>
    </Panel>
  )
}

const SecuritySection = () => {
  return (
    <SectionContainer>
      <SectionHeader
        subtitle="Enterprise-ready"
        title="Security & Compliance"
        paragraph="Built with security-first principles for enterprise agent governance."
      />

      {/* Security posture grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityItems.map((item) => (
          <SecurityCard key={item.title} item={item} />
        ))}
      </div>

      {/* Data handling summary */}
      <div className="mt-10 border-t border-default pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div>
            <h4 className="text-foreground font-medium mb-2">What we store</h4>
            <p className="text-foreground-lighter">
              Agent requests, policy decisions, audit logs
            </p>
          </div>
          <div>
            <h4 className="text-foreground font-medium mb-2">What we don't store</h4>
            <p className="text-foreground-lighter">
              Secrets, credentials, unnecessary PII
            </p>
          </div>
        </div>
      </div>

      {/* Trust Center link */}
      <div className="mt-10">
        <Button type="secondary" text="View Trust Center" url="/trust" />
      </div>
    </SectionContainer>
  )
}

export default SecuritySection

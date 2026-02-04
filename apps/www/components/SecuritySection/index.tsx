import Link from 'next/link'
import { Clock, Lock, FileSearch, ShieldCheck } from 'lucide-react'
import SectionContainer from '~/components/Layouts/SectionContainer'
import Panel from '~/components/Panel'

const trustSignals = [
  {
    icon: Clock,
    title: 'SOC 2 Type II',
    description: 'In Progress',
  },
  {
    icon: Lock,
    title: 'Encryption',
    description: 'AES-256 at rest, TLS 1.3 in transit',
  },
  {
    icon: FileSearch,
    title: 'Audit Trails',
    description: 'Immutable, append-only, exportable',
  },
  {
    icon: ShieldCheck,
    title: 'HMAC Receipts',
    description: 'Tamper-evident decision binding',
  },
]

const SecuritySection = () => {
  return (
    <SectionContainer>
      <div className="max-w-xl mb-8 lg:mb-12">
        <span className="font-mono text-xs text-brand uppercase tracking-widest">
          Security
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mt-3 mb-4">
          Built for compliance teams
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trustSignals.map((signal) => (
          <Panel key={signal.title} outerClassName="w-full" innerClassName="p-5">
            <div className="relative z-10 flex flex-col gap-3">
              <signal.icon className="w-5 h-5 text-brand" />
              <div>
                <h3 className="font-mono text-sm text-foreground mb-1">{signal.title}</h3>
                <p className="text-foreground-lighter text-sm">{signal.description}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <div className="flex items-center gap-6 mt-8 text-sm">
        <Link
          href="/trust"
          className="text-brand hover:text-brand-400 transition-colors"
        >
          Read our Trust Center
        </Link>
        <Link
          href="/security"
          className="text-brand hover:text-brand-400 transition-colors"
        >
          Security details
        </Link>
      </div>
    </SectionContainer>
  )
}

export default SecuritySection

import { Check } from 'lucide-react'

import SectionContainer from '~/components/Layouts/SectionContainer'
import ProductCard from './ProductCard'

import ProductModules from '~/data/home/ProductModules'
import { useSendTelemetryEvent } from '~/lib/telemetry'

interface Props {
  products?: any
}

const Products: React.FC<Props> = () => {
  const _sendTelemetryEvent = useSendTelemetryEvent()

  const sendTelemetryEvent = async (product: string) => {
    return await _sendTelemetryEvent({
      action: 'homepage_product_card_clicked',
      properties: { product },
    })
  }

  return (
    <SectionContainer className="!pt-0 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 xl:gap-3 2xl:gap-6 md:grid-cols-12">
      {/* Overview Card - spans full width on mobile, 6 cols on desktop */}
      <ProductCard
        className="col-span-6 md:col-span-12 xl:col-span-6"
        alignLeft
        url="/product"
        icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        title="Agent Governance Platform"
        subtitle={
          <>
            The <strong>control plane for AI agents</strong>. Policy enforcement, identity management, and audit trails in one platform.
          </>
        }
        highlights={
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <Check className="inline h-4 w-4" /> MCP-native gateway
            </li>
            <li>
              <Check className="inline h-4 w-4" /> Works with any agent framework
            </li>
            <li>
              <Check className="inline h-4 w-4" /> Deploy anywhere
            </li>
          </ul>
        }
        onClick={() => sendTelemetryEvent('overview')}
      />

      {/* Policy Enforcement */}
      <ProductCard
        className="col-span-6 xl:col-span-3"
        alignLeft
        url={ProductModules.policy.url}
        icon={ProductModules.policy.icon}
        title={ProductModules.policy.name}
        subtitle={ProductModules.policy.description}
        onClick={() => sendTelemetryEvent('policy')}
      />

      {/* Identity & RBAC */}
      <ProductCard
        className="col-span-6 xl:col-span-3"
        alignLeft
        url={ProductModules.identity.url}
        icon={ProductModules.identity.icon}
        title={ProductModules.identity.name}
        subtitle={ProductModules.identity.description}
        onClick={() => sendTelemetryEvent('identity')}
      />

      {/* Audit Trails */}
      <ProductCard
        className="col-span-6 xl:col-span-3"
        alignLeft
        url={ProductModules.audit.url}
        icon={ProductModules.audit.icon}
        title={ProductModules.audit.name}
        subtitle={ProductModules.audit.description}
        onClick={() => sendTelemetryEvent('audit')}
      />

      {/* MCP Gateway Card */}
      <ProductCard
        className="col-span-6 xl:col-span-3"
        alignLeft
        url="/product#gateway"
        icon="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
        title="MCP Gateway"
        subtitle={
          <>
            <strong>Route all agent-to-tool communication</strong> through a governed MCP proxy with built-in policy checks.
          </>
        }
        onClick={() => sendTelemetryEvent('gateway')}
      />

      <p className="text-xl sm:text-2xl text-foreground-lighter col-span-full tracking-[-.01rem]">
        <span className="text-foreground">One platform.</span> Policy, identity, and audit for every agent action.
      </p>
    </SectionContainer>
  )
}

export default Products

import { ProductType } from './MainProducts'

const ProductModules: ProductType = {
  mcpServers: {
    name: 'MCP Servers',
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2',
    description: (
      <>
        <strong>Pre-built MCP servers</strong> for common integrations via ContextForge.
      </>
    ),
    description_short: 'Pre-built MCP server catalog',
    label: '',
    url: '/product/mcp-servers',
  },
  integrations: {
    name: 'Integrations',
    icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
    description: (
      <>
        Connect to <strong>databases, APIs, and services</strong> through governed channels.
      </>
    ),
    description_short: 'Governed tool connections',
    label: '',
    url: '/product/integrations',
  },
  docs: {
    name: 'Documentation',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    description: (
      <>
        Guides and API reference for <strong>implementing Axite</strong> in your stack.
      </>
    ),
    description_short: 'Guides and API reference',
    label: '',
    url: '/docs',
  },
}

export default ProductModules

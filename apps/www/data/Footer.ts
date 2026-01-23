import { PrivacySettings } from 'ui-patterns/PrivacySettings'

const footerData = [
  {
    title: 'Product',
    links: [
      {
        text: 'Overview',
        url: '/product',
      },
      {
        text: 'Policy Enforcement',
        url: '/product/policy',
      },
      {
        text: 'Identity & RBAC',
        url: '/product/identity',
      },
      {
        text: 'Audit Trails',
        url: '/product/audit',
      },
      {
        text: 'MCP Servers',
        url: '/product/mcp-servers',
      },
      {
        text: 'Integrations',
        url: '/product/integrations',
      },
      {
        text: 'Pricing',
        url: '/pricing',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        text: 'Documentation',
        url: '/docs',
      },
      {
        text: 'Blog',
        url: '/blog',
      },
      {
        text: 'Changelog',
        url: '/changelog',
      },
      {
        text: 'Support',
        url: '/support',
      },
      {
        text: 'System Status',
        url: '/status',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        text: 'About',
        url: '/about',
      },
      {
        text: 'Enterprise',
        url: '/enterprise',
      },
      {
        text: 'Trust Center',
        url: '/trust',
      },
      {
        text: 'Careers',
        url: '/careers',
      },
      {
        text: 'Contact',
        url: '/contact/sales',
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        text: 'Terms of Service',
        url: '/terms',
      },
      {
        text: 'Privacy Policy',
        url: '/privacy',
      },
      {
        text: 'Privacy Settings',
        component: PrivacySettings,
      },
      {
        text: 'Security',
        url: '/security',
      },
      {
        text: 'DPA',
        url: '/legal/dpa',
      },
    ],
  },
]

export default footerData

import { PrivacySettings } from 'ui-patterns/PrivacySettings'

const footerData = [
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
        text: 'Trust Center',
        url: '/trust',
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
  {
    title: 'Contact',
    links: [
      {
        text: 'hello@axite.ai',
        url: 'mailto:hello@axite.ai',
      },
    ],
  },
]

export default footerData

import '@code-hike/mdx/styles'
import 'config/code-hike.scss'
import '../styles/index.css'

import { Metadata } from 'next'
import { APP_NAME, DEFAULT_META_DESCRIPTION } from '~/lib/constants'
import Providers from './providers'
import type { Viewport } from 'next'

const site_title = `${APP_NAME} | Agent Governance Platform`

export const metadata: Metadata = {
  title: site_title,
  description: DEFAULT_META_DESCRIPTION,
  openGraph: {
    type: 'website',
    url: 'https://axite.ai/',
    siteName: 'Axite',
    images: [
      {
        url: 'https://axite.ai/images/og/axite-og.png',
        width: 800,
        height: 600,
        alt: 'Axite Og Image',
      },
    ],
  },
  twitter: {
    creator: '@axaborator',
    site: '@axaborator',
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/favicon.ico',
  },
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

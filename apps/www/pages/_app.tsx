import '@code-hike/mdx/styles'
import 'config/code-hike.scss'
import '../styles/index.css'

import {
  AuthProvider,
  FeatureFlagProvider,
  IS_PLATFORM,
  PageTelemetry,
  TelemetryTagManager,
  ThemeProvider,
  useThemeSandbox,
} from 'common'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SonnerToaster, themes, TooltipProvider } from 'ui'
import { CommandProvider } from 'ui-patterns/CommandMenu'
import { useConsentToast } from 'ui-patterns/consent'

import MetaFaviconsPagesRouter, {
  DEFAULT_FAVICON_ROUTE,
  DEFAULT_FAVICON_THEME_COLOR,
} from 'common/MetaFavicons/pages-router'
import { WwwCommandMenu } from '~/components/CommandMenu'
import { API_URL, APP_NAME, DEFAULT_META_DESCRIPTION } from '~/lib/constants'
import { useWwwCommandMenuTelemetry } from '../hooks/useWwwCommandMenuTelemetry'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { hasAcceptedConsent } = useConsentToast()
  const { onTelemetry } = useWwwCommandMenuTelemetry()

  useThemeSandbox()

  const site_title = `${APP_NAME} | Agent Governance Platform`
  const { basePath } = useRouter()

  const applicationName = 'Axite'
  const faviconRoute = DEFAULT_FAVICON_ROUTE
  const themeColor = DEFAULT_FAVICON_THEME_COLOR

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MetaFaviconsPagesRouter
        applicationName={applicationName}
        route={faviconRoute}
        themeColor={themeColor}
        includeManifest
        includeMsApplicationConfig
        includeRssXmlFeed
      />
      <DefaultSeo
        title={site_title}
        description={DEFAULT_META_DESCRIPTION}
        openGraph={{
          type: 'website',
          url: 'https://axite.ai/',
          site_name: 'Axite',
          images: [
            {
              url: `https://axite.ai${basePath}/images/og/axite-og.png`,
              width: 800,
              height: 600,
              alt: 'Axite Og Image',
            },
          ],
        }}
        twitter={{
          handle: '@axaborator',
          site: '@axaborator',
          cardType: 'summary_large_image',
        }}
      />

      <AuthProvider>
        {/* [TODO] I think we need to deconflict with the providers in layout.tsx? */}
        <FeatureFlagProvider API_URL={API_URL} enabled={{ cc: true, ph: false }}>
          <ThemeProvider
            themes={themes.map((theme) => theme.value)}
            enableSystem
            disableTransitionOnChange
            forcedTheme={undefined}
          >
            <TooltipProvider delayDuration={0}>
              <CommandProvider app="www" onTelemetry={onTelemetry}>
                <SonnerToaster position="top-right" />
                <Component {...pageProps} />
                <WwwCommandMenu />
                <PageTelemetry
                  API_URL={API_URL}
                  hasAcceptedConsent={hasAcceptedConsent}
                  enabled={IS_PLATFORM}
                />
              </CommandProvider>
            </TooltipProvider>
          </ThemeProvider>
        </FeatureFlagProvider>
      </AuthProvider>
      <TelemetryTagManager />
    </>
  )
}

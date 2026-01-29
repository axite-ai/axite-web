import bundleAnalyzer from '@next/bundle-analyzer'
import nextMdx from '@next/mdx'

import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import redirects from './lib/redirects.js'
import remotePatterns from './lib/remotePatterns.js'
import rewrites from './lib/rewrites.js'

import { remarkCodeHike } from '@code-hike/mdx'
import codeHikeTheme from 'config/code-hike.theme.json' with { type: 'json' }

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [
        remarkCodeHike,
        {
          theme: codeHikeTheme,
          lineNumbers: true,
          showCopyButton: true,
        },
      ],
      remarkGfm,
    ],
    rehypePlugins: [rehypeSlug],
    // This is required for `MDXProvider` component
    providerImportSource: '@mdx-js/react',
  },
})

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: '',
  assetPrefix: getAssetPrefix(),
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  trailingSlash: false,
  transpilePackages: [
    // Local lib/ packages need transpilation when resolved via pnpm file: links
    'ui',
    'ui-patterns',
    'common',
    'config',
    'shared-data',
    // External packages:
    '@octokit/plugin-paginate-graphql',
  ],
  experimental: {
    // needed to make the octokit packages work in /changelog
    esmExternals: 'loose',
  },
  /**
   * Exclude huge directories from being traced into serverless functions
   * to avoid the max size limit for Serverless Functions on Vercel:
   * https://vercel.com/guides/troubleshooting-function-250mb-limit
   */
  outputFileTracingExcludes: {
    '*': [
      // Next.js build artifacts
      '.next/cache/**/*',
      '.next/static/**/*',
      // Static assets
      'public/**/*',
    ],
  },
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: false,
    remotePatterns,
  },
  async headers() {
    return [
      // Allow CMS preview iframe embedding by omitting X-Frame-Options for blog routes
      {
        source: '/blog/:slug*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all',
          },
          // No X-Frame-Options header to allow iframe embedding
        ],
      },
      {
        source: '/api-v2/cms/preview',
        headers: [
          {
            key: 'content-type',
            value: 'text/html',
          },
          // No X-Frame-Options header to allow iframe embedding
        ],
      },
      // Default X-Frame-Options for all other paths
      {
        source: '/((?!blog|api-v2/cms/preview).*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
      {
        source: '/.well-known/vercel/flags',
        headers: [
          {
            key: 'content-type',
            value: 'application/json',
          },
        ],
      },
      {
        source: '/favicon/:slug*',
        headers: [{ key: 'cache-control', value: 'public, max-age=86400' }],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: '', // Configure in production deployment (Vercel headers or middleware)
          },
        ],
      },
    ]
  },
  async rewrites() {
    return rewrites
  },
  async redirects() {
    return redirects
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // We are already running linting via GH action, this will skip linting during production build on Vercel.
    ignoreDuringBuilds: true,
  },
}

// Export the composed configuration
const configExport = () => {
  const plugins = [withMDX, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), nextConfig)
}

export default configExport()

/**
 * Returns asset prefix for CDN hosting.
 * Disabled for standalone project - no CDN asset prefix needed.
 */
function getAssetPrefix() {
  return undefined
}

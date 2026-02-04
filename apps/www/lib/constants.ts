export const APP_NAME = 'Axite'
export const DEFAULT_META_DESCRIPTION =
  'Change control for AI agent actions in production. Policy enforcement, approval binding, and tamper-evident audit trails for every tool call.'
export const IS_PROD = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
export const IS_PREVIEW = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
export const API_URL = process.env.NEXT_PUBLIC_API_URL!

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://axite.ai'
    : process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
      : 'http://localhost:3000'

export const CMS_SITE_ORIGIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? // In production, use the actual CMS domain
      process.env.CMS_SITE_ORIGIN || 'https://cms.axite.ai'
    : process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL &&
        typeof process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL === 'string'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL.replace('zone-www-dot-com-git-', 'cms-git-')}`
      : 'http://localhost:3030'

export const SITE_NAME = 'Axite'

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

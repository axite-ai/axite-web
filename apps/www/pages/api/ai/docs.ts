/**
 * AI Docs API endpoint - Disabled
 *
 * This endpoint was part of Supabase's AI documentation assistant.
 * The ai-commands package dependency has been removed as it was
 * Supabase-specific functionality not needed for this marketing site.
 */
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify({
      error: 'AI documentation assistant is not available in this deployment.',
    }),
    {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

// Instrumentation disabled - Sentry removed per Phase 3 decision
// Original: imported @sentry/nextjs and initialized server/edge configs
// Can be re-implemented with own Sentry account if needed

export async function register() {
  // No-op - instrumentation disabled
}

export function onRequestError(
  _error: unknown,
  _request: unknown,
  _context: unknown
): void | Promise<void> {
  // No-op - error capture disabled
  // To re-enable: install @sentry/nextjs and configure DSN
}

export default function WhereWeFitSection() {
  return (
    <section className="bg-muted dark:bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Where Axite fits in the MCP stack
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Build the workflows first, then decide on a gateway.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <p className="text-sm font-semibold">Use a gateway when you already have MCP servers</p>
            <p className="mt-3 text-sm text-muted-foreground">
              MintMCP is a gateway/governance layer for enterprise deployment, SSO, observability,
              and policy controls when the MCP servers already exist.
            </p>
          </div>
          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <p className="text-sm font-semibold">Use Axite when you need workflows built</p>
            <p className="mt-3 text-sm text-muted-foreground">
              We design the workflows, build MCP servers, and ship the agent app experience so
              customers can actually complete real work in your product.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

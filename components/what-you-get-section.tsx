export default function WhatYouGetSection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            What you get
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Productized deliverables your team can run, extend, and own.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border bg-muted/40 p-6">
            <h3 className="text-xl font-semibold">Core MCP build</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>MCP server repo + deployment pipeline</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>Tool catalog with validated schemas</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>Workflow playbooks for agent execution</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>Permissions model + confirmation gates</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-muted/40 p-6">
            <h3 className="text-xl font-semibold">Operational readiness</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>Agent app or ChatGPT-style demo UI</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>Monitoring + logging hooks</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>Runbook and handoff for internal teams</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">✓</span>
                <span>Delivery in 4-6 weeks, end-to-end</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          You own the code, infra, and workflows. No black-box automation.
        </p>
      </div>
    </section>
  )
}

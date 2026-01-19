export default function WhoSection() {
    return (
        <section className="bg-muted dark:bg-background py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                        Who this is for
                    </h2>
                    <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
                        API-first companies with revenue-critical workflows and real transactions.
                    </p>
                    <div className="mt-10 grid gap-8 text-left lg:grid-cols-2">
                        <div className="rounded-2xl border bg-background p-6 shadow-sm">
                            <p className="font-medium mb-4">Best fit for teams shipping:</p>
                            <ul className="text-muted-foreground space-y-2">
                                <li className="flex gap-3">
                                    <span className="text-foreground">✓</span>
                                    <span>Payments and invoicing workflows</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-foreground">✓</span>
                                    <span>Order fulfillment and logistics steps</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-foreground">✓</span>
                                    <span>Support triage and CRM updates</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border bg-background p-6 shadow-sm">
                            <p className="font-medium mb-4">Not a fit if you only need:</p>
                            <ul className="text-muted-foreground space-y-2">
                                <li className="flex gap-3">
                                    <span className="text-foreground">×</span>
                                    <span>Internal-only automation with no public API</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-foreground">×</span>
                                    <span>A single script or one-off integration</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-foreground">×</span>
                                    <span>Only an MCP gateway for existing servers</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

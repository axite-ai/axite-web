export default function WhoSection() {
    return (
        <section className="bg-muted dark:bg-background py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                        Who We Work With
                    </h2>
                    <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
                        API-first companies building products with real workflows and transactions.
                    </p>
                    <div className="mt-8 text-left mx-auto max-w-xl">
                        <p className="font-medium mb-4">Perfect fit if you want agents to automate:</p>
                        <ul className="text-muted-foreground space-y-2">
                            <li className="flex gap-3">
                                <span className="text-foreground">✓</span>
                                <span>Transactions</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">✓</span>
                                <span>Workflows</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">✓</span>
                                <span>Search + retrieval</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">✓</span>
                                <span>Syncing</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">✓</span>
                                <span>Updates</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">✓</span>
                                <span>Analytics</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

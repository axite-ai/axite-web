import Image from 'next/image'

export default function ProblemSection() {
    return (
        <section className="bg-muted dark:bg-background py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                            Your product wasn't built for AI agents. And it shows.
                        </h2>
                        <p className="mt-6 text-lg font-medium">
                            This is why most "MCP implementations" break instantly.
                        </p>
                        <p className="mt-3 text-base text-muted-foreground">
                            If you've tried connecting agents to your product, you've already felt these.
                        </p>
                        <ul className="mt-6 space-y-3 text-muted-foreground">
                            <li className="flex gap-3">
                                <span className="text-foreground">×</span>
                                <span>Agents hallucinate your inputs</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">×</span>
                                <span>Your API is too granular for agent workflows</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">×</span>
                                <span>Security risks block you from exposing write actions</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">×</span>
                                <span>Every new agent platform needs a custom integration</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">×</span>
                                <span>Real automation never ships because the surface area is unsafe</span>
                            </li>
                        </ul>
                    </div>
                    <div className="relative flex items-center justify-center">
                        <Image
                            src="/product-images/light-laptop.png"
                            alt="Agent integration challenges"
                            width={600}
                            height={400}
                            className="dark:hidden"
                        />
                        <Image
                            src="/product-images/dark-laptop.png"
                            alt="Agent integration challenges"
                            width={600}
                            height={400}
                            className="hidden dark:block"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

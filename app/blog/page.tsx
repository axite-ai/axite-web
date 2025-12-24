import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Axite",
  description:
    "Research and analysis on enterprise AI infrastructure, MCP governance, and production-grade agent workflows.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Axite Blog
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold md:text-5xl">
            Enterprise AI infrastructure research and MCP insights
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Deep dives on governance, security, and production-ready agent workflows for
            enterprise teams.
          </p>
        </header>

        <section className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-2xl border bg-card p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">{post.description}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

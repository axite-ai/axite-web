import Link from "next/link";
import { notFound } from "next/navigation";
import {
  generateTableOfContents,
  getAllPosts,
  getFaqStructuredData,
  getPostBySlug,
  getPostStructuredData,
} from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Axite`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og.png"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = getPostStructuredData(post);
  const faqJsonLd = getFaqStructuredData(post);
  const toc = generateTableOfContents(post);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: "https://axite.ai/blog",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: `https://axite.ai/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="text-sm font-semibold text-muted-foreground hover:underline">
          ← Back to Blog
        </Link>

        <article className="mt-8">
          <header>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              ·{" "}
              <Link href={post.author.url} className="hover:text-foreground">
                {post.author.name}
              </Link>
              {post.author.role ? ` · ${post.author.role}` : ""}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">{post.description}</p>
            {post.seo?.uniqueInsight ? (
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">What's new here:</span>{" "}
                {post.seo.uniqueInsight}
              </p>
            ) : null}
          </header>

          <section className="mt-10 rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-semibold">Key takeaways</h2>
            <ul className="mt-4 space-y-2 text-base text-muted-foreground">
              {post.keyTakeaways.map((takeaway) => (
                <li key={takeaway}>• {takeaway}</li>
              ))}
            </ul>
          </section>

          <nav className="mt-10 rounded-2xl border bg-muted/40 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Table of contents
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {toc.map((entry) => (
                <li
                  key={`${entry.id}-${entry.level}`}
                  className={entry.level === 1 ? "pl-4" : undefined}
                >
                  <a className="hover:text-foreground" href={`#${entry.id}`}>
                    {entry.title}
                  </a>
                </li>
              ))}
              <li>
                <a className="hover:text-foreground" href="#faq">
                  Frequently asked questions
                </a>
              </li>
            </ul>
          </nav>

          {post.sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-10">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base text-muted-foreground">
                  {normalizeParagraph(paragraph)}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-base text-muted-foreground">
                  {section.bullets.map((bullet) => {
                    const parsed = parseBullet(bullet);
                    return (
                      <li key={bullet}>
                        • {parsed.text}
                        {parsed.sources.length ? (
                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            {parsed.sources.map((source) => (
                              <a
                                key={source.url}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground underline-offset-4 hover:underline"
                              >
                                {source.label}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              {section.subsections?.length
                ? section.subsections.map((subsection) => {
                    const subsectionId = `${section.id}-${slugify(subsection.title)}`;
                    return (
                      <div key={subsectionId} id={subsectionId} className="mt-6">
                        <h3 className="text-lg font-semibold">{subsection.title}</h3>
                        {subsection.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="mt-3 text-base text-muted-foreground">
                            {normalizeParagraph(paragraph)}
                          </p>
                        ))}
                        {subsection.bullets?.length ? (
                          <ul className="mt-3 space-y-2 text-base text-muted-foreground">
                            {subsection.bullets.map((bullet) => {
                              const parsed = parseBullet(bullet);
                              return (
                                <li key={bullet}>
                                  • {parsed.text}
                                  {parsed.sources.length ? (
                                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                                      {parsed.sources.map((source) => (
                                        <a
                                          key={source.url}
                                          href={source.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="hover:text-foreground underline-offset-4 hover:underline"
                                        >
                                          {source.label}
                                        </a>
                                      ))}
                                    </div>
                                  ) : null}
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </div>
                    );
                  })
                : null}
            </section>
          ))}

          <section id="faq" className="mt-12">
            <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
            <div className="mt-6 space-y-6 text-muted-foreground">
              {post.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="text-base font-semibold text-foreground">{item.question}</h3>
                  <p className="mt-2 text-sm">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeParagraph(text: string) {
  let value = text.replace(/^answer-first:\\s*/i, "").trim();
  if (!value) return value;
  if (/^[a-z]/.test(value)) {
    value = value[0].toUpperCase() + value.slice(1);
  }
  return value;
}

function parseBullet(bullet: string) {
  const urlRegex = /https?:\/\/[^\s|)]+/g;
  const sources = Array.from(new Set(bullet.match(urlRegex) ?? []));
  let text = bullet.replace(/^cite:\\s*/i, "");

  const sourceIndex = text.toLowerCase().indexOf("source:");
  const sourcesIndex = text.toLowerCase().indexOf("sources:");
  const cutIndex =
    sourceIndex === -1
      ? sourcesIndex
      : sourcesIndex === -1
        ? sourceIndex
        : Math.min(sourceIndex, sourcesIndex);

  if (cutIndex !== -1) {
    text = text.slice(0, cutIndex).trim();
  }

  return {
    text,
    sources: sources.map((url, index) => ({
      url,
      label: formatSourceLabel(url, index + 1),
    })),
  };
}

function formatSourceLabel(url: string, index: number) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\\./, "");
    return hostname || `Source ${index}`;
  } catch {
    return `Source ${index}`;
  }
}

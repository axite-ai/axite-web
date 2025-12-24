import { getAllPosts } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://axite.ai";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      return `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <description>${escapeXml(post.description)}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <guid>${siteUrl}/blog/${post.slug}</guid>
      </item>
    `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Axite Blog</title>
        <link>${siteUrl}/blog</link>
        <description>Enterprise AI infrastructure, MCP governance, and agent workflow research.</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

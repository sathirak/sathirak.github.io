import { getAllBlogPosts } from "@/modules/shared/utils/blog";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
	const posts = await getAllBlogPosts();

	// Build RSS feed XML
	let rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sathira's Grotto</title>
    <link>https://sathirak.com</link>
    <atom:link href="https://sathirak.com/feed.xml" rel="self" type="application/rss+xml" />
    <description>Stories about life and engineering</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
`;

	// Add posts to RSS feed
	for (const post of posts) {
		const postPath = path.join(
			process.cwd(),
			"public/content",
			post.slug,
			"main.mdx",
		);

		let content = "";
		if (fs.existsSync(postPath)) {
			try {
				const rawContent = fs.readFileSync(postPath, "utf-8");
				// Extract content after metadata (skip the export const metadata block)
				const contentStart = rawContent.indexOf("export const metadata");
				const contentEnd = rawContent.indexOf("};", contentStart);
				if (contentEnd !== -1) {
					content = rawContent.slice(contentEnd + 2).trim();
				}
				// Escape XML special characters
				content = content
					.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")
					.replace(/"/g, "&quot;")
					.replace(/'/g, "&apos;");
			} catch (error) {
				console.warn(`Error reading content for ${post.slug}:`, error);
			}
		}

		const postDate = post.date.toUTCString();
		rssContent += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://sathirak.com/devlog/${post.slug}/</link>
      <guid>https://sathirak.com/devlog/${post.slug}/</guid>
      <pubDate>${postDate}</pubDate>
      <description><![CDATA[${content}]]></description>
    </item>
`;
	}

	rssContent += `
  </channel>
</rss>`;

	return new Response(rssContent, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

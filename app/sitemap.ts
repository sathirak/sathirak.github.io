import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/modules/shared/utils/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Get all blog posts
	const posts = await getAllBlogPosts();

	// Static routes
	const routes: MetadataRoute.Sitemap = [
		{
			url: "https://sathirak.com",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: "https://sathirak.com/bio",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];

	// Dynamic blog post routes
	const postRoutes = posts.map((post) => ({
		url: `https://sathirak.com/devlog/${post.slug}/`,
		lastModified: post.date,
		changeFrequency: "never" as const,
		priority: 0.8,
	}));

	return [...routes, ...postRoutes];
}

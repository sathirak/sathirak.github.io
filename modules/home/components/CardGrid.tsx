import { Card } from "@/modules/home/components/Card";
import { getAllBlogPosts } from "@/lib/blog";
import fs from "fs";
import path from "path";

/**
 * Estimate reading time based on word count
 * Assumes ~200 words per minute
 */
function estimateReadTime(content: string): string {
	const wordCount = content.split(/\s+/).length;
	const minutes = Math.ceil(wordCount / 200);
	return `${minutes} min read`;
}

export const CardGrid = async () => {
	const posts = await getAllBlogPosts();
	const contentDir = path.join(process.cwd(), "public/content");

	const cardData = posts.map((post) => {
		// Read the MDX file to estimate read time
		const mdxPath = path.join(contentDir, post.slug, "main.mdx");
		let readTime = "5 min read"; // default

		try {
			const content = fs.readFileSync(mdxPath, "utf-8");
			readTime = estimateReadTime(content);
		} catch {
			// fallback to default if file can't be read
		}

		return {
			title: post.title,
			date: post.date,
			readTime,
			slug: post.slug,
			image: {
				alt: `${post.title} cover image`,
			},
		};
	});

	return (
		<section className="w-full lg:w-3/4 grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 xl:grid-cols-3 my-8 sm:my-12 px-4 sm:px-0">
			{cardData.map((card) => (
				<Card key={card.slug} {...card} />
			))}
		</section>
	);
};

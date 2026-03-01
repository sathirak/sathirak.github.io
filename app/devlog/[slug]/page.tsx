import { Devlog } from "@/modules/devlog/pages/Devlog";
import { getPublishedSlugs, getAllBlogPosts } from "@/modules/shared/utils/blog";
import type { Metadata, ResolvingMetadata } from "next/types";

export const dynamicParams = false;

export async function generateStaticParams() {
	// Automatically discover all blog posts from public/content/
	const slugs = await getPublishedSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const slug = (await props.params).slug;

	const { default: DevlogContent, ...metadata } = await import(
		`@/public/content/${slug}/main.mdx`
	);
	return {
		title: `${metadata.metadata.title} | Devlog`,
	};
}
interface Props {
	params: Promise<{ slug: string }>;
}

export default async function Page(props: Props) {
	const slug = (await props.params).slug;

	const { default: DevlogContent, ...metadata } = await import(
		`@/public/content/${slug}/main.mdx`
	);

	// Get reading time from blog utility
	const posts = await getAllBlogPosts();
	const post = posts.find((p) => p.slug === slug);
	const readingTimeMinutes = post?.readingTimeMinutes ?? 5;

	return (
		<Devlog slug={slug} readingTimeMinutes={readingTimeMinutes} {...metadata.metadata}>
			<DevlogContent />
		</Devlog>
	);
}

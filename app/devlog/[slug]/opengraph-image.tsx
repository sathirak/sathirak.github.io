import { ImageResponse } from "next/og";
import { getAllBlogPosts, getPublishedSlugs } from "@/modules/shared/utils/blog";

export const runtime = "nodejs";
export const contentType = "image/png";
export const dynamic = "force-static";

// Generate static params for all blog posts
export async function generateStaticParams() {
	const slugs = await getPublishedSlugs();
	return slugs.flatMap((slug) => [
		{ slug, __metadata_id__: "og-image" }
	]);
}

// Generate OG images for each blog post
export async function generateImageMetadata({ params }: { params: { slug: string } }) {
	const posts = await getAllBlogPosts();
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		return [];
	}

	return [
		{
			id: "og-image",
			size: { width: 1200, height: 630 },
			type: "image/png",
		},
	];
}

export default async function Image({ params }: { params: { slug: string } }) {
	const posts = await getAllBlogPosts();
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		return new ImageResponse(
			(
				<div
					style={{
						fontSize: 64,
						background:
							"linear-gradient(to right, #14b8a6, #f97316, #eab308)",
						width: "100%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "white",
						fontWeight: "bold",
						fontFamily: "system-ui",
					}}
				>
					Post Not Found
				</div>
			),
			{
				width: 1200,
				height: 630,
			},
		);
	}

	const formattedDate = post.date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 64,
					background:
						"linear-gradient(135deg, #14b8a6 0%, #f97316 50%, #eab308 100%)",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontWeight: "bold",
					fontFamily: "system-ui",
					padding: "60px",
				}}
			>
				<div
					style={{
						textAlign: "center",
						display: "flex",
						flexDirection: "column",
						gap: "30px",
						maxWidth: "90%",
					}}
				>
					<div
						style={{
							fontSize: 56,
							lineHeight: 1.2,
						}}
					>
						{post.title}
					</div>
					<div
						style={{
							fontSize: 32,
							opacity: 0.9,
							color: "rgba(255, 255, 255, 0.8)",
						}}
					>
						{formattedDate} • {post.readingTimeMinutes} min read
					</div>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}

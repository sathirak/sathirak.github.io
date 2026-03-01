import { Card } from "@/modules/home/components/Card";
import { getAllBlogPosts } from "@/modules/shared/utils/blog";

export const CardGrid = async () => {
	const posts = await getAllBlogPosts();

	const cardData = posts.map((post) => {
		const readTime = post.readingTimeMinutes === 1 ? "1 min read" : `${post.readingTimeMinutes} min read`;

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

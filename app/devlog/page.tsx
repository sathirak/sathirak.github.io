import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = {
	title: "Devlog",
	description: "Read my latest blog posts and devlogs.",
};

export default async function DevlogPage() {
	const posts = await getAllBlogPosts();

	return (
		<main className="flex flex-col items-center px-4 sm:px-0">
			<div className="w-full lg:w-3/4">
				<h1 className="text-2xl sm:text-3xl mt-8 sm:mt-16 font-medium">
					All Stories
				</h1>

				{/* Blog Posts List */}
				{posts.length === 0 ? (
					<div className="text-center py-12 text-zinc-600">
						<p>No blog posts yet. Check back soon!</p>
					</div>
				) : (
					<div className="space-y-6 my-8 sm:my-12">
						{posts.map((post) => (
							<Link
								key={post.slug}
								href={`/devlog/${post.slug}`}
								className="block group"
							>
								<article className="rounded-lg border border-zinc-200 bg-white p-6 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<h2 className="text-lg font-medium text-zinc-800 group-hover:text-black transition-colors">
												{post.title}
											</h2>
											<time className="text-sm text-zinc-500 mt-2 block">
												{new Date(post.date).toLocaleDateString("en-US", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</time>
										</div>
										<div className="text-zinc-400 group-hover:text-zinc-600 transition-colors flex-shrink-0">
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</div>
									</div>
								</article>
							</Link>
						))}
					</div>
				)}
			</div>
		</main>
	);
}

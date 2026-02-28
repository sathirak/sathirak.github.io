import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = {
	title: "Devlog",
	description: "Read my latest blog posts and devlogs.",
};

export default async function DevlogPage() {
	const posts = await getAllBlogPosts();

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
			<div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
				{/* Header */}
				<div className="mb-12">
					<h1 className="text-4xl font-bold tracking-tight mb-2">Devlog</h1>
					<p className="text-slate-400">
						Thoughts on software, infrastructure, and side projects.
					</p>
				</div>

				{/* Blog Posts List */}
				{posts.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-slate-400">No blog posts yet. Check back soon!</p>
					</div>
				) : (
					<div className="space-y-6">
						{posts.map((post) => (
							<Link
								key={post.slug}
								href={`/devlog/${post.slug}`}
								className="block group"
							>
								<article className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-6 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<h2 className="text-xl font-semibold text-slate-100 group-hover:text-white transition-colors">
												{post.title}
											</h2>
											<time className="text-sm text-slate-400 mt-2 block">
												{new Date(post.date).toLocaleDateString("en-US", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</time>
										</div>
										<div className="text-slate-600 group-hover:text-slate-400 transition-colors">
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

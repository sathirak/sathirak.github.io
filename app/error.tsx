"use client";

import Link from "next/link";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-0">
			<div className="text-center w-full max-w-2xl">
				<h1 className="text-6xl sm:text-8xl font-bold mb-4">
					<span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary text-transparent bg-clip-text">
						500
					</span>
				</h1>

				<h2 className="text-2xl sm:text-3xl font-medium mb-4 text-zinc-800">
					Something Went Wrong
				</h2>

				<p className="text-zinc-600 text-base sm:text-lg mb-8 leading-relaxed">
					Oof, I hit an error while trying to render this page. This isn't supposed
					to happen—my apologies! The good news is, I've been notified (well, I'll
					see it in the logs eventually).
				</p>

				{error.digest && (
					<p className="text-xs text-zinc-500 mb-4 font-mono bg-zinc-100 p-2 rounded">
						Error ID: {error.digest}
					</p>
				)}

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<button
						onClick={reset}
						className="px-6 py-3 rounded-lg bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors font-medium"
					>
						Try Again
					</button>
					<Link
						href="/"
						className="px-6 py-3 rounded-lg border border-brand-primary text-brand-primary hover:bg-brand-primary-light transition-colors font-medium"
					>
						Go Home
					</Link>
				</div>

				<div className="mt-12 pt-8 border-t border-zinc-200">
					<p className="text-sm text-zinc-500">
						If this keeps happening, feel free to reach out on{" "}
						<a
							href="https://github.com/sathirak"
							target="_blank"
							rel="noopener noreferrer"
							className="text-brand-primary hover:text-brand-secondary"
						>
							GitHub
						</a>
						.
					</p>
				</div>
			</div>
		</main>
	);
}

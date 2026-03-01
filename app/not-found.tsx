import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-0">
			<div className="text-center w-full max-w-2xl">
				<h1 className="text-6xl sm:text-8xl font-bold mb-4">
					<span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary text-transparent bg-clip-text">
						404
					</span>
				</h1>

				<h2 className="text-2xl sm:text-3xl font-medium mb-4 text-zinc-800">
					Page Not Found
				</h2>

				<p className="text-zinc-600 text-base sm:text-lg mb-8 leading-relaxed">
					Hmm, looks like this page doesn't exist. Maybe it wandered off into the
					digital abyss, or perhaps I reorganized things and forgot to leave a
					forwarding address. Either way, sorry about that!
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/"
						className="px-6 py-3 rounded-lg bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors font-medium"
					>
						Back to Home
					</Link>
					<Link
						href="/bio"
						className="px-6 py-3 rounded-lg border border-brand-primary text-brand-primary hover:bg-brand-primary-light transition-colors font-medium"
					>
						About Me
					</Link>
				</div>

				<div className="mt-12 pt-8 border-t border-zinc-200">
					<p className="text-sm text-zinc-500 mb-4">What were you looking for?</p>
					<div className="space-y-2 text-sm">
						<p>
							<Link href="/" className="text-brand-primary hover:text-brand-secondary">
								Homepage
							</Link>
							{" "}- Latest posts and projects
						</p>
						<p>
							<Link href="/bio" className="text-brand-primary hover:text-brand-secondary">
								Bio
							</Link>
							{" "}- Learn more about me
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

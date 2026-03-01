export const Footer = () => {
	return (
		<footer className="border-t mt-16 flex justify-between items-center p-4 w-full bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 backdrop-saturate-100 backdrop-contrast-100">
			<div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-zinc-600">
				<div className="flex items-center gap-3">
					<span>© 2026 Sathira</span>
					<span className="text-zinc-400">•</span>
					<a
						href="https://github.com/sathirak/grotto/releases/tag/v1.0.0"
						target="_blank"
						rel="noopener noreferrer"
						className="text-zinc-500 hover:text-zinc-800 transition-colors font-mono text-xs"
					>
						v1.0.0
					</a>
				</div>
				<div className="flex gap-4">
					<a
						href="https://github.com/sathirak"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-zinc-800 transition-colors"
					>
						GitHub
					</a>
					<a
						href="https://linkedin.com/in/sathirak"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-zinc-800 transition-colors"
					>
						LinkedIn
					</a>
					<a
						href="/feed.xml"
						className="hover:text-zinc-800 transition-colors"
					>
						RSS
					</a>
				</div>
			</div>
		</footer>
	);
};

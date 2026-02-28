import Link from "next/link";
import Image from "next/image";

export const metadata = {
	title: "Bio",
	description: "Learn more about Sathira",
};

export default function BioPage() {
	return (
		<main className="flex flex-col items-center px-4 sm:px-0">
			<div className="w-full lg:w-3/4 mt-8 sm:mt-16">
				<h1 className="text-2xl sm:text-3xl font-medium mb-8 sm:mb-12">
					<span
						className="bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text inline-block"
						style={{ display: 'inline-block', whiteSpace: 'pre' }}
					>
						Sathira
					</span>
				</h1>

				<div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
					{/* Left Column - Bio and Connect */}
					<div className="flex-1 max-w-md">
						{/* Bio Section */}
						<section className="mb-12 leading-relaxed text-zinc-800">
							<p className="mb-4">
								I am an Engineer specializing in Systems Engineering and DevOps.
							</p>
							<p className="mb-4">
								Currently pursuing my undergraduate degree at SLIIT, my engineering 
								journey began early with server management and programming. This 
								foundation has since evolved into a specialization in Computer 
								Architecture and Infrastructure.
							</p>
							<p>
								With a particular passion for low-level systems, a Rustacean and a 
								Kubestronaut. Also a great cook!
							</p>
						</section>

						{/* Links Section */}
						<section className="border-t border-zinc-200 pt-8">
							<h2 className="text-lg font-medium mb-6">Connect</h2>
							<div className="space-y-4">
								<div>
									<a
										href="https://github.com/sathirak"
										target="_blank"
										rel="noopener noreferrer"
										className="text-teal-600 hover:text-teal-700 hover:underline transition-colors"
									>
										GitHub
									</a>
								</div>
								<div>
									<a
										href="https://linkedin.com/in/sathirak"
										target="_blank"
										rel="noopener noreferrer"
										className="text-teal-600 hover:text-teal-700 hover:underline transition-colors"
									>
										LinkedIn
									</a>
								</div>
							</div>
						</section>
					</div>

					{/* Right Column - Large Profile Image */}
					<div className="flex-1 lg:max-w-2xl">
						<div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br from-teal-100 via-orange-100 to-yellow-100 sticky top-8">
							<Image
								src="/profile.jpg"
								alt="Profile photo"
								width={4284}
								height={5712}
								className="w-full h-full object-cover"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

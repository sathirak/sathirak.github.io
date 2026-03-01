"use client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState } from "react";

interface Props {
	title: string;
	date: Date;
	readTime: string;
	slug: string;
	image: {
		alt: string;
	};
}

export const Card = (data: Props) => {
	const [isLoading, setIsLoading] = useState(true);
	const relativeDate = formatDistanceToNow(data.date, { addSuffix: true });

	return (
		<a href={`devlog/${data.slug}`} className="group">
			<article className="flex flex-col gap-2 sm:gap-3" id={data.slug}>
				<div className="relative overflow-hidden">
					{isLoading && (
						<div className="bg-gradient-to-r from-brand-primary-light via-brand-secondary-light to-brand-tertiary-light animate-pulse rounded-md aspect-video w-full" />
					)}

					<Image
						className={`select-none rounded-md aspect-video object-cover border border-solid  ${
							isLoading ? "hidden" : "block"
						}`}
						loading="eager"
						onLoadingComplete={() => setIsLoading(false)}
						src={`/content/${data.slug}/assets/main.jpg`}
						alt={data.image.alt}
						width={900}
						height={400}
					/>
					<div className="select-none bg-white w-full px-3 py-1.5 sm:px-4 sm:py-2 absolute group-hover:bottom-0 -bottom-10 sm:-bottom-12 rounded-b-md border border-solid transition-all duration-75 text-sm sm:text-base">
						{`${relativeDate} / ${data.readTime}`}
					</div>
				</div>

				<p className="font-medium px-3 sm:px-6 text-sm sm:text-base">{data.title}</p>
			</article>
		</a>
	);
};

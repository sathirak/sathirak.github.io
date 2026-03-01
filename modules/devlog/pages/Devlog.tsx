"use client";

import { ContentHeader } from "@/modules/devlog/components/ContentHeader";
import { ScrollGuide } from '@/modules/devlog/components/ScrollGuide';
import { redHatText } from "@/modules/layout/fonts";

interface Props {
	children: React.ReactNode;
	slug: string;
	title: string;
	description: string;
}

export const Devlog = (props: Props) => {
	return (
		<main className={"flex flex-col items-center relative"}>
			<ScrollGuide />
			<ContentHeader
				slug={props.slug}
				title={props.title}
				description={props.description}
			/>
			<section
				className={`w-full max-w-3xl px-6 sm:px-8 lg:px-10 my-8 text-base sm:text-lg leading-relaxed ${redHatText.className}`}
			>
				{props.children}
			</section>
		</main>
	);
};

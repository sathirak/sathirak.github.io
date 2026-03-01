import { CardGrid } from "@/modules/home/components/CardGrid";
import Link from "next/link";

export const Home = () => {

	return (
		<>
			<main className="flex flex-col items-center px-4 sm:px-0">
				<h1 className="w-full lg:w-3/4 text-2xl sm:text-3xl mt-8 sm:mt-16 font-medium">
					Stories about life <br />
					and engineering, by{" "}
					<Link href="/bio" className="group">
					<span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary text-transparent bg-clip-text inline-block whitespace-pre hover:opacity-80 transition-opacity cursor-pointer">
							Sathira.
						</span>
					</Link>
				</h1>
				<CardGrid />
			</main>
		</>
	);
};

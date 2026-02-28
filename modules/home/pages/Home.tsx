import { CardGrid } from "@/modules/home/components/CardGrid";

export const Home = () => {

	return (
		<>
			<main className="flex flex-col items-center px-4 sm:px-0">
				<h1 className="w-full lg:w-3/4 text-2xl sm:text-3xl mt-8 sm:mt-16 font-medium">
					Stories about life <br />
					and engineering, by{" "}
					<span
						className="bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text inline-block"
						style={{ display: 'inline-block', whiteSpace: 'pre' }}
					>
						Sathira.
					</span>
				</h1>
				<CardGrid />
			</main>
		</>
	);
};

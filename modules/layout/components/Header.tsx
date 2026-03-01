import { SeasonalIcon } from "@/modules/layout/components/SeasonalIcon";

export const Header = () => {
	return (
		<header className="border-b z-10 top-0 sticky flex justify-between items-center p-4 w-full bg-white bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-40 backdrop-saturate-100 backdrop-contrast-100">
			<div className="flex items-center gap-4 select-none">
				<SeasonalIcon className="size-10" alt="Grotto Logo" />
				<a href="/" className="font-medium text-2xl select-none cursor-pointer">
					Grotto
				</a>
			</div>
		</header>
	);
};

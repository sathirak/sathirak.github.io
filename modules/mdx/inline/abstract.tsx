import type { HTMLAttributes } from "react";

const titleBase = "text-2xl sm:text-3xl font-medium bg-clip-text text-transparent inline-block";

export const Abstract = (props: HTMLAttributes<HTMLElement>) => (
	<section className="mx-auto my-8 w-full max-w-3xl border-y border-zinc-200 py-8 text-center">
		<div className="mb-4 flex flex-col items-center leading-none">
			<span className={`${titleBase} bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500`}>
				Abstract
			</span>
		</div>
		<div className="mx-auto max-w-2xl text-md text-left text-zinc-700 leading-relaxed" {...props} />
	</section>
);

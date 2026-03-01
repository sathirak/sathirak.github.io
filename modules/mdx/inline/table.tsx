import type {
	TableHTMLAttributes,
	TdHTMLAttributes,
	ThHTMLAttributes,
} from "react";

export const Table = ({
	children,
	...props
}: TableHTMLAttributes<HTMLTableElement>) => (
	<div className="my-6 w-full min-w-0 overflow-hidden max-w-[calc(100vw-3rem)]">
		<div className="w-full min-w-0 overflow-x-auto overflow-y-hidden max-w-full [overflow-scrolling:touch]">
			<table
				className="border-collapse w-max min-w-full max-w-full table-auto text-[0.88rem]"
				{...props}
			>
				{children}
			</table>
		</div>
	</div>
);

export const THead = (props: TableHTMLAttributes<HTMLTableSectionElement>) => (
	<thead {...props} />
);

export const TBody = (props: TableHTMLAttributes<HTMLTableSectionElement>) => (
	<tbody {...props} />
);

export const TR = (props: TableHTMLAttributes<HTMLTableRowElement>) => (
	<tr {...props} />
);

export const TH = (props: ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
	<th
		className="border border-gray-300/[0.96] p-2 px-2.5 text-left align-top break-words whitespace-normal box-border font-semibold"
		{...props}
	/>
);

export const TD = (props: TdHTMLAttributes<HTMLTableCellElement>) => (
	<td
		className="border border-gray-300/[0.96] p-2 px-2.5 text-left align-top break-words whitespace-normal box-border"
		{...props}
	/>
);

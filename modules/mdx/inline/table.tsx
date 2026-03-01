import type { TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

const cellStyle = {
	border: '1px solid #d1d5db',
	padding: '0.5rem 0.6rem',
	textAlign: 'left' as const,
	verticalAlign: 'top' as const,
	overflowWrap: 'anywhere' as const,
	wordBreak: 'break-word' as const,
	whiteSpace: 'normal' as const,
};

const headerCellStyle = {
	...cellStyle,
	fontWeight: '600' as const,
};

export const Table = ({ children, ...props }: TableHTMLAttributes<HTMLTableElement>) => (
	<div
		className="my-6 w-full max-w-full overflow-x-auto rounded-md"
		style={{ WebkitOverflowScrolling: 'touch' }}
	>
		<table
			style={{
				borderCollapse: 'collapse',
				width: '100%',
				maxWidth: '100%',
				tableLayout: 'fixed',
				fontSize: '0.88rem',
			}}
			{...props}
		>
			{children}
		</table>
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
	<th style={headerCellStyle} {...props} />
);

export const TD = (props: TdHTMLAttributes<HTMLTableCellElement>) => (
	<td style={cellStyle} {...props} />
);

import type { TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

const tableStyle = {
	borderCollapse: 'collapse' as const,
	width: '100%',
	margin: '1rem 0',
};

const cellStyle = {
	border: '1px solid #d1d5db',
	padding: '0.75rem 1rem',
	textAlign: 'left' as const,
};

const headerCellStyle = {
	...cellStyle,
	fontWeight: '600' as const,
};

export const Table = (props: TableHTMLAttributes<HTMLTableElement>) => (
	<table style={tableStyle} {...props} />
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

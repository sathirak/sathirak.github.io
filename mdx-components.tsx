/**
 * MDX Component Customization
 *
 * This file defines custom components used to render MDX content.
 * When you write markdown in blog posts, these components override the default HTML elements.
 *
 * How it works:
 * 1. MDX processes markdown files (public/content/**\/main.mdx)
 * 2. For each HTML element (h1, p, a, etc.), MDX looks up the corresponding component here
 * 3. Our custom components apply Tailwind styling and brand identity
 *
 * Example: When you write `# Heading` in MDX, it renders using our H1 component
 * with brand gradient styling instead of a plain <h1>.
 *
 * To add a new override:
 * 1. Create component in modules/mdx/inline/
 * 2. Import it here
 * 3. Map it to an HTML element name in useMDXComponents()
 *
 * See STYLEGUIDE.md > MDX Customization for detailed patterns.
 */
import "katex/dist/katex.min.css";
import { Code } from "@/modules/mdx/inline/code";
import { H1, H2, H3, H4, H5, H6 } from "@/modules/mdx/inline/h";
import { P } from "@/modules/mdx/inline/p";
import { Pre } from "@/modules/mdx/inline/pre";
import { A } from "@/modules/mdx/inline/a";
import { Strong } from "@/modules/mdx/inline/strong";
import { Abstract } from "@/modules/mdx/inline/abstract";
import { Table, THead, TBody, TR, TH, TD } from "@/modules/mdx/inline/table";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Code blocks
		code: Code,
		pre: Pre,

		// Headings - styled with consistent typography
		h1: H1,
		h2: H2,
		h3: H3,
		h4: H4,
		h5: H5,
		h6: H6,

		// Text elements
		p: P,
		a: A, // Links styled with brand colors
		strong: Strong,

		// Custom components (use in MDX as <Abstract>)
		Abstract,

		// Tables - fully styled with Tailwind
		table: Table,
		thead: THead,
		tbody: TBody,
		tr: TR,
		th: TH,
		td: TD,

		// Allow additional component overrides from props
		...components,
	};
}
/**
 * Tailwind CSS Configuration
 *
 * Brand Color System:
 * The signature teal → orange → yellow gradient is the core brand identity.
 * All brand colors are defined as semantic tokens (brand-primary, brand-secondary, brand-tertiary)
 * to ensure consistency across the site.
 *
 * Usage:
 * - Main gradient: from-brand-primary via-brand-secondary to-brand-tertiary
 * - Light gradient (backgrounds): from-brand-primary-light via-brand-secondary-light to-brand-tertiary-light
 * - Links: text-brand-primary hover:text-brand-secondary
 * - Hover states: text-brand-primary-hover hover:text-brand-primary-dark
 *
 * IMPORTANT: The Abstract component intentionally uses a DIFFERENT gradient
 * (emerald → amber → orange) to create visual distinction. Don't change it!
 *
 * See STYLEGUIDE.md > Brand Identity for full color reference.
 */
import type { Config } from "tailwindcss";

export default {
	content: [
		"./modules/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Brand identity: teal → orange → yellow gradient system
				brand: {
					// Primary brand color (teal)
					primary: {
						DEFAULT: "#14b8a6", // teal-500
						light: "#ccfbf1", // teal-100
						hover: "#0d9488", // teal-600
						dark: "#0f766e", // teal-700
					},
					// Secondary brand color (orange)
					secondary: {
						DEFAULT: "#f97316", // orange-500
						light: "#ffedd5", // orange-100
						hover: "#ea580c", // orange-600
						dark: "#c2410c", // orange-700
					},
					// Tertiary brand color (yellow)
					tertiary: {
						DEFAULT: "#eab308", // yellow-500
						light: "#fef9c3", // yellow-100
						hover: "#ca8a04", // yellow-600
						dark: "#a16207", // yellow-700
					},
				},
				// Scrollbar colors - extracted from globals.css
				scrollbar: {
					track: "#f1f1f1",
					thumb: "#e0e0e0",
					"thumb-hover": "#d3d3d3",
				},
				// Abstract component uses different gradient (intentional)
				abstract: {
					from: "#10b981", // emerald-500
					via: "#f59e0b", // amber-500
					to: "#f97316", // orange-500
				},
			},
			fontFamily: {
				// Font tokens from modules/layout/fonts.ts
				sans: ["Red_Hat_Text", "sans-serif"],
				mono: ["Red_Hat_Mono", "monospace"],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
} satisfies Config;

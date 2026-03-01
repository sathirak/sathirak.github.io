import type { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/_next",
		},
		sitemap: "https://sathirak.com/sitemap.xml",
	};
}

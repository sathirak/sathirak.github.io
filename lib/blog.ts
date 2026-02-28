import fs from 'fs';
import path from 'path';

export interface BlogPost {
	slug: string;
	title: string;
	date: Date;
}

/**
 * Get all published blog slugs sorted by date (newest first)
 * Reads metadata from MDX files in public/content/{slug}/main.mdx
 */
export async function getPublishedSlugs(): Promise<string[]> {
	const contentDir = path.join(process.cwd(), 'public/content');

	try {
		const folders = fs.readdirSync(contentDir, { withFileTypes: true });
		const posts: BlogPost[] = [];

		for (const folder of folders) {
			if (!folder.isDirectory()) continue;

			const mdxPath = path.join(contentDir, folder.name, 'main.mdx');

			// Check if main.mdx exists
			if (!fs.existsSync(mdxPath)) continue;

			try {
				// Read the MDX file as text to extract metadata
				const content = fs.readFileSync(mdxPath, 'utf-8');

				// Extract metadata from export statement
				// Matches: export const metadata = { ... }
				const metadataMatch = content.match(
					/export const metadata = ({[\s\S]*?});/
				);

				if (metadataMatch) {
					// Parse the metadata object
					const metadataStr = metadataMatch[1];
					// Use Function constructor to safely evaluate the object literal
					const metadata = (new Function(`return ${metadataStr}`))();

					// Get file modification time as fallback
					const stats = fs.statSync(mdxPath);
					const date = metadata.date
						? new Date(metadata.date)
						: new Date(stats.mtime);

					posts.push({
						slug: folder.name,
						title: metadata.title || folder.name,
						date,
					});
				}
			} catch (error) {
				console.warn(`Error parsing metadata for ${folder.name}:`, error);
			}
		}

		// Sort by date descending (newest first)
		return posts.sort((a, b) => b.date.getTime() - a.date.getTime()).map((p) => p.slug);
	} catch (error) {
		console.error('Error reading blog posts:', error);
		return [];
	}
}

/**
 * Get all blog posts with metadata
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
	const contentDir = path.join(process.cwd(), 'public/content');

	try {
		const folders = fs.readdirSync(contentDir, { withFileTypes: true });
		const posts: BlogPost[] = [];

		for (const folder of folders) {
			if (!folder.isDirectory()) continue;

			const mdxPath = path.join(contentDir, folder.name, 'main.mdx');

			if (!fs.existsSync(mdxPath)) continue;

			try {
				const content = fs.readFileSync(mdxPath, 'utf-8');
				const metadataMatch = content.match(
					/export const metadata = ({[\s\S]*?});/
				);

				if (metadataMatch) {
					const metadataStr = metadataMatch[1];
					const metadata = (new Function(`return ${metadataStr}`))();

					const stats = fs.statSync(mdxPath);
					const date = metadata.date
						? new Date(metadata.date)
						: new Date(stats.mtime);

					posts.push({
						slug: folder.name,
						title: metadata.title || folder.name,
						date,
					});
				}
			} catch (error) {
				console.warn(`Error parsing metadata for ${folder.name}:`, error);
			}
		}

		// Sort by date descending (newest first)
		return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	} catch (error) {
		console.error('Error reading blog posts:', error);
		return [];
	}
}

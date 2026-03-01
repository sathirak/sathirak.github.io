import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const contentType = "image/png";
export const dynamic = "force-static";

export async function generateImageMetadata() {
	return [
		{
			id: "og-image",
			size: { width: 1200, height: 630 },
			type: "image/png",
		},
	];
}

export async function generateStaticParams() {
	return [{ __metadata_id__: "og-image" }];
}

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 128,
					background:
						"linear-gradient(to right, #14b8a6, #f97316, #eab308)",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontWeight: "bold",
					fontFamily: "system-ui",
				}}
			>
				Sathira's Grotto
			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}

import { redHatMono } from "@/modules/layout/fonts";
import "./globals.css";
import { Header } from "@/modules/layout/components/Header";
import { Footer } from "@/modules/layout/components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					type="image/png"
					href="/favicon/favicon-96x96.png"
					sizes="96x96"
				/>
				<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
				<link rel="shortcut icon" href="/favicon/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-touch-icon.png"
				/>
				<link rel="manifest" href="/favicon/site.webmanifest" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.css"
				/>
			</head>
			<GoogleTagManager gtmId="G-EVEP2QMLHF" />
			<body
				className={`${redHatMono.className} w-full text-zinc-800 selection:bg-black selection:text-white flex flex-col min-h-screen`}
			>
				<Header />
				<div className="flex-grow">{children}</div>
				<Footer />
			</body>
		</html>
	);
}

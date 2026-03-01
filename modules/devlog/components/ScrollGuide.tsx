import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { animate, stagger } from "animejs";

export const ScrollGuide: React.FC = () => {
	const guideRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [pageHeight, setPageHeight] = useState(0);

	// Calculate page height and update on resize
	useEffect(() => {
		const updatePageHeight = () => {
			const documentHeight = Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight,
			);
			setPageHeight(documentHeight);
		};

		updatePageHeight();
		window.addEventListener("resize", updatePageHeight);

		return () => window.removeEventListener("resize", updatePageHeight);
	}, []);

	// Track active section based on scroll position (divide page into 10 parts)
	const handleScroll = useCallback(() => {
		if (pageHeight === 0) return;

		const scrollPosition = window.scrollY;
		const windowHeight = window.innerHeight;
		const maxScrollPosition = pageHeight - windowHeight;

		// Calculate which section (0-9) we're currently in
		const scrollPercentage = scrollPosition / maxScrollPosition;
		const currentSection = Math.min(Math.floor(scrollPercentage * 10), 9);

		setActiveIndex(currentSection);
	}, [pageHeight]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Initial check

		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	// Handle bar click to scroll to specific section
	const handleBarClick = (index: number) => {
		if (pageHeight === 0) return;

		const windowHeight = window.innerHeight;
		const maxScrollPosition = pageHeight - windowHeight;
		const targetScrollPosition = (index / 10) * maxScrollPosition;

		window.scrollTo({
			top: targetScrollPosition,
			behavior: "smooth",
		});
	};

	// Animate color and scale transitions with animejs
	useEffect(() => {
		if (!guideRef.current) return;
		const bars = guideRef.current.querySelectorAll(".scroll-guide-bar");
		bars.forEach((bar, idx) => {
			let targetColor = "#e5e7eb"; // gray-300
			let targetScale = 1;
			if (idx === activeIndex) {
				targetColor = "#14b8a6"; // teal-500
				targetScale = 1.1;
			} else if (
				Math.abs(idx - activeIndex) === 1 ||
				Math.abs(idx - activeIndex) === 2
			) {
				targetColor = "#2dd4bf"; // teal-300
				targetScale = 1.05;
			}
			animate(bar, {
				backgroundColor: targetColor,
				scale: targetScale,
				duration: 700,
				easing: "easeInOutQuart",
				delay: stagger(30, { start: 0 }),
			});
		});
	}, [activeIndex]);

	// Don't render if page height not calculated yet
	if (pageHeight === 0) return null;

	return (
		<div
			ref={guideRef}
			className="hidden lg:flex fixed right-6 top-1/4 flex-col gap-3 z-50"
			style={{ pointerEvents: "auto" }}
			data-active-index={activeIndex}
		>
			{Array.from({ length: 10 }, (_, idx) => {
				// Initial color for SSR/hydration, will be animated by animejs
				let barColor = "bg-gray-200";
				if (idx === activeIndex) {
					barColor = "bg-teal-500";
				} else if (
					Math.abs(idx - activeIndex) === 1 ||
					Math.abs(idx - activeIndex) === 2
				) {
					barColor = "bg-teal-200";
				}
				return (
					<button
						key={`scroll-guide-bar-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							idx
						}`}
						type="button"
						onClick={() => handleBarClick(idx)}
						data-index={idx}
						className={`scroll-guide-bar w-10 h-2 cursor-pointer ${barColor}`}
						aria-label={`Scroll to ${(idx + 1) * 10}% of page`}
						title={`${(idx + 1) * 10}% of page`}
					/>
				);
			})}
		</div>
	);
};

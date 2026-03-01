"use client";
import Image from "next/image";
import { animate } from "animejs";
import { useCallback, useEffect, useRef, useState } from "react";

import FarmlandImage from "@/public/assets/icons/farmland.png";
import NatureImage from "@/public/assets/icons/nature.png";
import SnowImage from "@/public/assets/icons/snow.png";
import MountainImage from "@/public/assets/icons/mountain.png";
import IceImage from "@/public/assets/icons/ice.png";
import CaveImage from "@/public/assets/icons/cave.png";

interface Props {
	className?: string;
	alt: string;
}

const icons = [
	FarmlandImage,
	NatureImage,
	SnowImage,
	MountainImage,
	IceImage,
	CaveImage,
];

const getRandomIndex = (excludeIndex: number) => {
	if (icons.length <= 1) return 0;

	let nextIndex = Math.floor(Math.random() * icons.length);
	while (nextIndex === excludeIndex) {
		nextIndex = Math.floor(Math.random() * icons.length);
	}

	return nextIndex;
};

export const SeasonalIcon = (props: Props) => {
	const iconWrapperRef = useRef<HTMLButtonElement>(null);
	const [currentIconIndex, setCurrentIconIndex] = useState(() =>
		Math.floor(Math.random() * icons.length),
	);

	const changeIcon = useCallback((withAnimation: boolean) => {
		setCurrentIconIndex((prevIndex) => {
			const nextIndex = getRandomIndex(prevIndex);

			if (withAnimation && iconWrapperRef.current) {
				animate(iconWrapperRef.current, {
					scale: [1, 0.82, 1.06, 1],
					rotate: ["0deg", "180deg", "360deg"],
					duration: 650,
					easing: "easeInOutQuart",
				});
			}

			return nextIndex;
		});
	}, []);

	useEffect(() => {
		const minuteTimer = window.setInterval(() => {
			changeIcon(true);
		}, 60_000);

		return () => {
			window.clearInterval(minuteTimer);
		};
	}, [changeIcon]);

	const currentIcon = icons[currentIconIndex];

	return (
		<button
			type="button"
			ref={iconWrapperRef}
			onClick={() => changeIcon(true)}
			aria-label="Randomize logo icon"
			className="shrink-0"
		>
			<Image src={currentIcon} width={100} height={100} {...props} />
		</button>
	);
};

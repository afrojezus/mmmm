"use client";
import classes from "@/styles/3d.module.css";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import Miku from "./Miku";

const MikuWrapper = () => {
	const [playbackRate] = useState(1);
	const [isHovered, setIsHovered] = useState(false);
	const [play, { stop, sound }] = useSound("/miku.mp3", {
		volume: 0.25,
		playbackRate,
		interrupt: true,
	});
	const mouse = useRef<[number, number]>([0, 0]);
	const onMouseMove = useCallback(
		({ clientX: x, clientY: y }: React.MouseEvent<HTMLElement>) => {
			mouse.current = [
				x - window.innerWidth / 2,
				y - window.innerHeight / 2,
			];
		},
		[],
	);

	const onHoverStart = () => {
		setIsHovered(true);
		play();
	};
	const onHoverEnd = () => {
		setIsHovered(false);
		stop();
	};

	useEffect(() => {
		if (isHovered && sound) {
			sound.on("end", () => {
				setIsHovered(false);
			});
		}
	}, [isHovered, sound]);

	useEffect(() => {
		return () => {
			stop();
		};
	}, [stop]);
	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: sound ? 1 : 0 }}
		>
			<motion.div
				onMouseMove={onMouseMove}
				onClick={() =>
					sound
						? isHovered
							? onHoverEnd()
							: onHoverStart()
						: undefined
				}
				layout
				className={[classes.canvas].filter(Boolean).join(" ")}
			>
				<Miku isHovered={isHovered} mouse={mouse} />
			</motion.div>
		</motion.main>
	);
};

export default MikuWrapper;

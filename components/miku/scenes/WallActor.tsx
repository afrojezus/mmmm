"use client";

import { motion } from "framer-motion-3d";
import { Suspense } from "react";
import { Wall } from "../Wall";
import { BackgroundActors } from "./BackgroundActors";

export const WallActor = ({ frame }: { frame: number }) => {
	const BOOM_FRAME = frame >= 0 && frame < 1;
	const LIT_FRAME = frame >= 12;
	const ZOOM_OUT_FRAME = frame >= 265;
	return (
		<Suspense fallback={null}>
			<motion.group
				animate={
					ZOOM_OUT_FRAME
						? "zoomOut"
						: BOOM_FRAME
						  ? "boom"
						  : LIT_FRAME
							  ? "lit"
							  : "idle"
				}
				variants={{
					idle: {
						scale: 1,
						z: -1,
					},
					boom: {
						scale: 1,
						z: -10,
					},
					lit: {
						scale: 1,
						z: -10,
					},
					zoomOut: {
						z: -500,
						transition: {
							duration: 30,
							ease: "easeInOut",
						},
					},
				}}
			>
				<Wall
					shaderProps={{
						animate: BOOM_FRAME
							? "boom"
							: LIT_FRAME
							  ? "lit"
							  : "idle",
						variants: {
							idle: {
								color: "#111",
							},
							boom: {
								color: "#003",
							},
							lit: {
								color: "#444",
							},
						},
					}}
				/>
				<BackgroundActors frame={frame} />
			</motion.group>
		</Suspense>
	);
};

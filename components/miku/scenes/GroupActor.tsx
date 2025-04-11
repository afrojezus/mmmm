"use client";

import { motion } from "framer-motion-3d";
import { Suspense } from "react";

export const GroupActor = ({
	frame,
	children,
}: { frame: number; children: React.ReactNode }) => {
	const CHORD1_FRAME = frame >= 16;
	const CHORD2_FRAME = frame >= 27;
	const CHORD3_FRAME = frame >= 45;
	const CHORD4_FRAME = frame >= 60;
	const CHORD5_FRAME = frame >= 79;
	const CHORD6_FRAME = frame >= 91;
	const CHORD7_FRAME = frame >= 110;
	const CHORD8_FRAME = frame >= 123;
	const CHORD9_FRAME = frame >= 140;
	const CHORD10_FRAME = frame > 253 && frame < 265;
	const CHORD11_FRAME = frame >= 265;
	return (
		<Suspense fallback={null}>
			<motion.group
				initial={{}}
				animate={
					CHORD11_FRAME
						? "chord11"
						: CHORD10_FRAME
						  ? "chord10"
						  : CHORD9_FRAME
							  ? "chord9"
							  : CHORD8_FRAME
								  ? "chord8"
								  : CHORD7_FRAME
									  ? "chord7"
									  : CHORD6_FRAME
										  ? "chord6"
										  : CHORD5_FRAME
											  ? "chord5"
											  : CHORD4_FRAME
												  ? "chord4"
												  : CHORD3_FRAME
													  ? "chord3"
													  : CHORD2_FRAME
														  ? "chord2"
														  : CHORD1_FRAME
															  ? "chord1"
															  : "idle"
				}
				variants={{
					idle: {
						rotateY: 0,
						rotateX: 0,
						rotateZ: 0,
						z: 0,
						x: 0,
						y: 0,
					},
					chord1: {
						rotateY: -0.5,
						rotateX: 0.5,
						rotateZ: 0,
					},
					chord2: {
						rotateY: 0.5,
						rotateX: -0.5,
						rotateZ: 0,
					},
					chord3: {
						rotateY: 0,
						rotateX: 0.5,
						rotateZ: 0,
					},
					chord4: {
						rotateY: 0,
						rotateX: -0.5,
						rotateZ: 0,
					},
					chord5: {
						rotateY: 0,
						rotateX: 0,
						rotateZ: 0.5,
					},
					chord6: {
						rotateY: 0,
						rotateX: 0,
						rotateZ: -0.5,
					},
					chord7: {
						rotateY: 0,
						rotateX: 0,
						rotateZ: 0,
						z: 2,
					},
					chord8: {
						rotateY: 0,
						rotateX: -1.5,
						rotateZ: 360,
						z: 0,
						transition: {
							rotateZ: {
								duration: 60,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							},
						},
					},
					chord9: {
						rotateY: 0,
						rotateX: 0,
						rotateZ: 0,
						z: 0,
						x: 0,
						y: 0,
					},
					chord10: {
						rotateY: 0,
						rotateX: 0,
						rotateZ: 0,
						z: 3,
					},
					chord11: {
						rotateY: 0,
						rotateX: 0,
						rotateZ: 0,
						z: 0,
						x: 0,
						y: 0,
					},
				}}
				transition={{
					duration: 0.1,
					ease: "easeInOut",
				}}
			>
				{children}
			</motion.group>
		</Suspense>
	);
};

"use client";
import { Canvas, type MeshProps, useLoader } from "@react-three/fiber";
import {
	Bloom,
	DepthOfField,
	EffectComposer,
} from "@react-three/postprocessing";
import { motion } from "framer-motion-3d";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StupidMarquees from "../StupidMarquees";
import MyonLyrics from "./MyonLyrics";

type CommonProps = {
	isHovered: boolean;
};

type MyonCubeProps = Parameters<typeof motion.mesh>[0] & {
	geometryProps?: Parameters<typeof motion.sphereGeometry>[0] &
		Parameters<typeof motion.boxGeometry>[0] &
		Parameters<typeof motion.planeGeometry>[0];
	shaderProps?: Parameters<typeof motion.meshStandardMaterial>[0];
} & CommonProps;

type MyonSceneProps = {
	mouse?: React.RefObject<[number, number]>;
} & CommonProps;

export const MyonCube = ({
	isHovered,
	geometryProps,
	shaderProps,
	...meshProps
}: MyonCubeProps) => {
	const ref = useRef<MeshProps>(null);
	const materialRef = useRef(null);
	const texture = useLoader(THREE.TextureLoader, "/myon.png");

	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.NearestFilter;

	return (
		<>
			<motion.mesh ref={ref} {...meshProps}>
				<motion.boxGeometry args={[1, 1, 1]} {...geometryProps} />
				<motion.meshStandardMaterial
					ref={materialRef}
					attach="material"
					map={texture}
					{...shaderProps}
				/>
			</motion.mesh>
		</>
	);
};

export const MyonPlane = ({
	isHovered,
	geometryProps,
	shaderProps,
	...meshProps
}: MyonCubeProps) => {
	const ref = useRef<MeshProps>(null);
	const materialRef = useRef(null);
	const texture = useLoader(THREE.TextureLoader, "/myon.png");

	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.NearestFilter;

	return (
		<>
			<motion.mesh ref={ref} {...meshProps}>
				<motion.planeGeometry
					args={[100, 100, 1, 1]}
					{...geometryProps}
				/>
				<motion.meshStandardMaterial
					ref={materialRef}
					attach="material"
					map={texture}
					{...shaderProps}
				/>
			</motion.mesh>
		</>
	);
};

const Scene = (props: MyonSceneProps) => {
	const { isHovered } = props;
	const [frame, setFrame] = useState(-1);
	const intervalRef = useRef<NodeJS.Timeout>();
	useEffect(() => {
		const interval = intervalRef.current;
		const cleanup = () => {
			clearInterval(interval);
			setFrame(-1);
		};
		if (!isHovered) return cleanup();
		const animate = () => {
			intervalRef.current = setInterval(() => {
				setFrame((prev) => prev + 1);
			}, 100);
		};
		animate();
		return cleanup();
	}, [isHovered]);

	const INITIAL_FRAME = frame < 0;
	const FLOAT_FRAME = frame >= 0;
	const FLOAT_FRAME_2 = frame > 150;
	const FLOAT_FRAME_3 = frame > 230;
	const FLOAT_FRAME_KINDA_4 = frame > 260 && frame <= 300;
	const FLOAT_FRAME_4 = frame > 290 && frame <= 300;
	const LYRICS_FRAME = frame > 300 && frame <= 605;
	const LYRICS_FRAME_SECOND = frame > 455 && frame <= 605;
	const ABOUT_TO_FINAL_FRAME = frame > 590;
	const FINAL_FRAME = frame > 605;
	const ALMOST_CONCLUDING_FRAME = frame > 755;
	const CONCLUDING_FRAME = frame > 910;

	return (
		<>
			<StupidMarquees
				direction="right"
				opacity={0.4}
				myon
				visible={FINAL_FRAME}
			/>
			<Canvas
				shadows
				gl={{
					antialias: false,
					alpha: true,
					logarithmicDepthBuffer: true,
					toneMapping: THREE.ACESFilmicToneMapping,
					toneMappingExposure: 1,
				}}
				dpr={0.5}
			>
				<motion.ambientLight
					initial={{ color: "black" }}
					animate={{
						color: "#a0a0a0",
						...(FLOAT_FRAME && {
							color: "#fff",
						}),
					}}
					intensity={2}
				/>
				<Suspense>
					<motion.pointLight
						position={[0, 0, 0]}
						intensity={13}
						distance={100}
						decay={0.3}
						initial={{ color: "#000000" }}
						animate={FINAL_FRAME ? "visible" : "hidden"}
						variants={{
							hidden: { color: "#000000" },
							visible: {
								color: ["#000000", "#abfaab", "#000000"],
							},
						}}
						transition={{
							color: {
								duration: 0.3,
								ease: "linear",
							},
							...(FINAL_FRAME && {
								color: {
									duration: 0.3,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}),
						}}
					/>
					<motion.group
						initial={{ scale: 0 }}
						animate={LYRICS_FRAME_SECOND ? "visible" : "hidden"}
						variants={{
							hidden: { scale: 0 },
							visible: { scale: 1 },
						}}
						transition={{
							duration: 0.1,
						}}
					>
						<MyonPlane
							isHovered={isHovered}
							position={[0, 0, -20]}
							animate={{
								x: [0, 7],
							}}
							geometryProps={{
								args: [100, 100, 1, 1],
							}}
							shaderProps={{
								initial: {
									color: "#000000",
								},
								color: "#000000",
								animate: {
									...(LYRICS_FRAME_SECOND && {
										color: "#555555",
									}),
								},
								transition: {
									duration: 1,
								},
							}}
							transition={{
								duration: 1,
								x: {
									duration: 10,
									ease: "linear",
								},
							}}
						/>
					</motion.group>
					<motion.group>
						<MyonCube
							isHovered={isHovered}
							position={[0, 0, 0]}
							animate={
								INITIAL_FRAME
									? "idle"
									: CONCLUDING_FRAME
									  ? "concluding"
									  : FINAL_FRAME
										  ? "fullSpin"
										  : ABOUT_TO_FINAL_FRAME
											  ? "float4"
											  : LYRICS_FRAME
												  ? "lyrics"
												  : FLOAT_FRAME_4
													  ? "float4"
													  : FLOAT_FRAME_3
														  ? "float3"
														  : FLOAT_FRAME_2
															  ? "float2"
															  : FLOAT_FRAME
																  ? "float1"
																  : "idle"
							}
							variants={{
								idle: {
									rotateX: 0,
									rotateY: 0,
									rotateZ: 0,
									y: 0,
									z: 0,
								},
								float1: {
									rotateX: 0.25,
									rotateY: [0, 180, 360],
								},
								float2: {
									rotateX: [0, 180, 360],
									rotateY: [0, 180, 360],
								},
								float3: {
									rotateX: [0, 180, 360],
									rotateY: [0, 180, 360],
									rotateZ: [0, 180, 360],
								},
								float4: {
									rotateX: 0,
									rotateY: 0,
									rotateZ: 0,
									y: 0,
									z: 3,
								},
								lyrics: {
									rotateX: 0.25,
									rotateY: [0, 180, 360],
									rotateZ: 0,
									y: [0, 0.5, 0, -0.5, 0],
								},
								fullSpin: {
									rotateX: [0, 180, 360],
									rotateY: [0, 180, 360],
									rotateZ: [0, 180, 360],
									y: 0,
								},
								concluding: {
									rotateX: 0,
									rotateY: 0,
									rotateZ: 0,
									y: 0,
									z: 0,
								},
							}}
							transition={{
								duration: 1,
								y: {
									duration: 0.1,
									ease: "linear",
								},
								...(isHovered && {
									y: {
										duration: 10,
										repeat: Number.POSITIVE_INFINITY,
										ease: "linear",
									},
									rotateX: {
										duration: 180,
										repeat: Number.POSITIVE_INFINITY,
										ease: "linear",
									},
									rotateZ: {
										duration: 180,
										repeat: Number.POSITIVE_INFINITY,
										ease: "linear",
									},
									rotateY: {
										duration: 180,
										repeat: Number.POSITIVE_INFINITY,
										ease: "linear",
									},
								}),
								...(INITIAL_FRAME && {
									rotateX: {
										duration: 0.1,
										repeat: 0,
										ease: "linear",
									},
									rotateY: {
										duration: 1,
										repeat: 0,
										ease: "linear",
									},
									rotateZ: {
										duration: 0.1,
										repeat: 0,
										ease: "linear",
									},
									y: {
										duration: 1,
										ease: "linear",
									},
								}),
								...(FLOAT_FRAME && {
									rotateX: {
										duration: 0.1,
										ease: "linear",
									},
								}),
								...((FLOAT_FRAME_4 || ABOUT_TO_FINAL_FRAME) && {
									rotateX: {
										duration: 0.1,
										ease: "easeIn",
									},
									rotateY: {
										duration: 0.1,
										ease: "easeIn",
									},
									rotateZ: {
										duration: 0.1,
										ease: "easeIn",
									},
									z: {
										duration: 0.1,
										ease: "easeIn",
									},
									y: {
										duration: 0.1,
										ease: "easeIn",
									},
								}),
								...(FINAL_FRAME && {
									rotateX: {
										duration: 20,
										repeat: Number.POSITIVE_INFINITY,
										ease: "linear",
									},
									rotateZ: {
										duration: 20,
										repeat: Number.POSITIVE_INFINITY,
										ease: "linear",
									},
									rotateY: {
										duration: 20,
										repeat: Number.POSITIVE_INFINITY,
										ease: "linear",
									},
								}),
								...(CONCLUDING_FRAME && {
									rotateX: {
										duration: 0.1,
										ease: "linear",
									},
									rotateZ: {
										duration: 0.1,
										ease: "linear",
									},
									rotateY: {
										duration: 15,
										ease: "linear",
									},
								}),
							}}
						/>
					</motion.group>
					<motion.group
						initial={{ scale: 0 }}
						animate={
							FLOAT_FRAME_KINDA_4 ||
							LYRICS_FRAME ||
							CONCLUDING_FRAME
								? "hidden"
								: FLOAT_FRAME_2
								  ? "spin"
								  : FLOAT_FRAME
									  ? "visible"
									  : "hidden"
						}
						variants={{
							hidden: { scale: 0, rotateY: [0, 180, 360] },
							visible: { scale: 1, rotateY: 0 },
							spin: {
								scale: 1,
								rotateY: [0, 180, 360],
							},
						}}
						transition={{
							duration: 0.1,
							...(FLOAT_FRAME_2 && {
								rotateY: {
									duration: 60,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}),
							...(FLOAT_FRAME_KINDA_4 && {
								duration: 3,
							}),
							...(CONCLUDING_FRAME && {
								duration: 15,
							}),
						}}
					>
						<MyonCube
							isHovered={isHovered}
							position={[-2, 0, -1]}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: 0.25,
							}}
							transition={{
								duration: 1,
								rotateY: {
									duration: 60,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}}
							shaderProps={{
								color: "#abfaab",
								animate: {
									...(FINAL_FRAME && {
										color: "#ffffff",
									}),
									...(FLOAT_FRAME_KINDA_4 && {
										color: "#000000",
									}),
									...(FLOAT_FRAME_2 && {
										color: "#ffffff",
									}),
								},
								transition: {
									duration: 3,
								},
							}}
						/>
						<MyonCube
							isHovered={isHovered}
							position={[2, 0, -1]}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: 0.25,
							}}
							transition={{
								duration: 1,
								rotateY: {
									duration: 60,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}}
							shaderProps={{
								color: "#abfaab",
								animate: {
									...(FINAL_FRAME && {
										color: "#ffffff",
									}),
									...(FLOAT_FRAME_KINDA_4 && {
										color: "#000000",
									}),
									...(FLOAT_FRAME_2 && {
										color: "#ffffff",
									}),
								},
								transition: {
									duration: 3,
								},
							}}
						/>
					</motion.group>
					<motion.group
						initial={{ scale: 0 }}
						animate={
							FLOAT_FRAME_KINDA_4 ||
							LYRICS_FRAME ||
							CONCLUDING_FRAME
								? "hidden"
								: FLOAT_FRAME_3
								  ? "spin"
								  : FLOAT_FRAME_2
									  ? "visible"
									  : "hidden"
						}
						variants={{
							hidden: {
								scale: 0,
								rotateY: [0, 180, 360],
								rotateZ: [0, 180, 360],
							},
							visible: { scale: 1, rotateZ: 0, rotateY: 0 },
							spin: {
								scale: 1,
								rotateY: [0, 180, 360],
								rotateZ: [0, 180, 360],
							},
						}}
						transition={{
							duration: 0.1,
							...(FLOAT_FRAME_3 && {
								rotateY: {
									duration: 180,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
								rotateZ: {
									duration: 180,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}),
							...(FLOAT_FRAME_KINDA_4 && {
								duration: 3,
							}),
							...(CONCLUDING_FRAME && {
								duration: 15,
							}),
						}}
					>
						<MyonCube
							isHovered={isHovered}
							position={[-2, 2, 1]}
							animate={{
								rotateX: [0, 180, 360],
							}}
							transition={{
								duration: 1,
								rotateX: {
									duration: 60,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}}
							shaderProps={{
								color: "#f2faab",
							}}
						/>
						<MyonCube
							isHovered={isHovered}
							position={[2, 2, 1]}
							animate={{
								rotateX: [0, 180, 360],
							}}
							transition={{
								duration: 1,
								rotateX: {
									duration: 60,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}}
							shaderProps={{
								color: "#abfaab",
							}}
						/>
						<MyonCube
							isHovered={isHovered}
							position={[-2, -2, 1]}
							animate={{
								rotateX: [0, 180, 360],
							}}
							transition={{
								duration: 1,
								rotateX: {
									duration: 60,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}}
							shaderProps={{
								color: "#abe7fa",
							}}
						/>
						<MyonCube
							isHovered={isHovered}
							position={[2, -2, 1]}
							animate={{
								rotateX: [0, 180, 360],
							}}
							transition={{
								duration: 1,
								rotateX: {
									duration: 60,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}}
							shaderProps={{
								color: "#faabab",
							}}
						/>
					</motion.group>
					<motion.group
						initial={{ scale: 0 }}
						animate={
							CONCLUDING_FRAME
								? "hidden"
								: FINAL_FRAME
								  ? "spin"
								  : "hidden"
						}
						variants={{
							hidden: { scale: 0, rotateZ: [0, 180, 360] },
							visible: { scale: 1, rotateZ: 0 },
							spin: {
								scale: 1,
								rotateZ: [0, 180, 360],
							},
						}}
						transition={{
							duration: 0.1,
							rotateZ: {
								duration: 60,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							},
							...(FLOAT_FRAME_KINDA_4 && {
								duration: 3,
							}),
							...(CONCLUDING_FRAME && {
								duration: 15,
							}),
						}}
					>
						<MyonCube
							isHovered={isHovered}
							position={[0, -2, -1]}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: 0.25,
							}}
							transition={{
								duration: 1,
								rotateY: {
									duration: 60,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}}
							shaderProps={{
								color: "#abfaab",
								animate: {
									...(FINAL_FRAME && {
										color: "#ffffff",
									}),
									...(FLOAT_FRAME_KINDA_4 && {
										color: "#000000",
									}),
									...(FLOAT_FRAME_2 && {
										color: "#ffffff",
									}),
								},
								transition: {
									duration: 3,
								},
							}}
						/>
						<MyonCube
							isHovered={isHovered}
							position={[0, 2, -1]}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: 0.25,
							}}
							transition={{
								duration: 1,
								rotateY: {
									duration: 60,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								},
							}}
							shaderProps={{
								color: "#abfaab",
								animate: {
									...(FINAL_FRAME && {
										color: "#ffffff",
									}),
									...(FLOAT_FRAME_KINDA_4 && {
										color: "#000000",
									}),
									...(FLOAT_FRAME_2 && {
										color: "#ffffff",
									}),
								},
								transition: {
									duration: 3,
								},
							}}
						/>
					</motion.group>
					<motion.group
						initial={{ scale: 0 }}
						animate={
							CONCLUDING_FRAME
								? "hidden"
								: FINAL_FRAME
								  ? "visible"
								  : "hidden"
						}
						variants={{
							hidden: { scale: 0 },
							visible: { scale: 1 },
						}}
						transition={{
							duration: 0.1,
							...(CONCLUDING_FRAME && {
								duration: 15,
							}),
						}}
					>
						<MyonCube
							isHovered={isHovered}
							position={[0, 0, -50]}
							scale={[30, 30, 30]}
							animate={{
								rotateY: [0, 180, 360],
								rotateZ: [0, 180, 360],
								rotateX: [0, 180, 360],
							}}
							transition={{
								duration: 360,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							}}
							shaderProps={{
								color: "#abfaab",
							}}
						/>
						<MyonCube
							isHovered={isHovered}
							position={[-30, 0, 0]}
							scale={[30, 30, 30]}
							animate={{
								rotateY: [0, 180, 360],
								rotateZ: [0, 180, 360],
								rotateX: [0, 180, 360],
							}}
							transition={{
								duration: 360,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							}}
							shaderProps={{
								color: "#abfaab",
								initial: {
									color: "#000000",
								},
								animate: {
									...(ALMOST_CONCLUDING_FRAME && {
										color: "#abfaab",
									}),
								},
							}}
						/>
						<MyonCube
							isHovered={isHovered}
							position={[30, 0, 0]}
							scale={[30, 30, 30]}
							animate={{
								rotateY: [0, 180, 360],
								rotateZ: [0, 180, 360],
								rotateX: [0, 180, 360],
							}}
							transition={{
								duration: 360,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							}}
							shaderProps={{
								color: "#abfaab",
								initial: {
									color: "#000000",
								},
								animate: {
									...(ALMOST_CONCLUDING_FRAME && {
										color: "#abfaab",
									}),
								},
							}}
						/>
					</motion.group>
				</Suspense>
				<EffectComposer multisampling={0}>
					<DepthOfField
						focusDistance={0.03}
						focalLength={0.3}
						bokehScale={400}
						height={FINAL_FRAME ? 2 : 0}
					/>
					<DepthOfField
						focusDistance={0.01}
						focalLength={0.04}
						bokehScale={10}
						height={1000}
					/>
					<Bloom
						luminanceThreshold={0.1}
						luminanceSmoothing={0.3}
						height={1000}
						opacity={isHovered ? 1 : 0}
					/>
				</EffectComposer>
			</Canvas>
			<StupidMarquees myon visible={FINAL_FRAME} />
			<MyonLyrics frame={frame} />
		</>
	);
};

export default Scene;

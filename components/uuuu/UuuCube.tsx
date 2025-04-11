"use client";

import txtStyles from "@/styles/text.module.scss";
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

type Common = {
	isHovered: boolean;
};

type UuuCubeProps = Common &
	Parameters<typeof motion.mesh>[0] & {
		sphere?: boolean;
		geometryProps?: Parameters<typeof motion.sphereGeometry>[0] &
			Parameters<typeof motion.boxGeometry>[0] &
			Parameters<typeof motion.planeGeometry>[0];
		shaderProps?: Parameters<typeof motion.meshStandardMaterial>[0];
	} & {
		type?: "uuuu" | "uuuu2";
	};

type UuuSceneProps = Common & {};

const uuuus = ["uuuu", "uuuu2"] as const;

const UuuCube = (props: UuuCubeProps) => {
	const {
		isHovered,
		sphere,
		geometryProps,
		shaderProps,
		type = "uuuu2",
		...meshProps
	} = props;
	const ref = useRef<MeshProps>(null);
	const materialRef = useRef<THREE.MeshStandardMaterial>(null);
	const texture = useLoader(THREE.TextureLoader, `/${type}.webp`);

	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.NearestFilter;

	return (
		<>
			<motion.mesh ref={ref} receiveShadow castShadow {...meshProps}>
				{sphere ? (
					<motion.sphereGeometry
						args={[1, 32, 32]}
						{...geometryProps}
					/>
				) : (
					<motion.boxGeometry args={[1, 1, 1]} {...geometryProps} />
				)}
				<motion.meshStandardMaterial
					ref={materialRef}
					map={texture}
					attach="material"
					{...shaderProps}
				/>
				<motion.pointLight intensity={1} position={[0, 0, 0]} />
			</motion.mesh>
		</>
	);
};

const UuuPlane = (props: UuuCubeProps) => {
	const { isHovered, sphere, geometryProps, shaderProps, ...meshProps } =
		props;
	const ref = useRef<MeshProps>(null);
	const materialRef = useRef<THREE.MeshStandardMaterial>(null);
	const texture = useLoader(THREE.TextureLoader, "/uuuu.webp");

	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.NearestFilter;

	return (
		<>
			<motion.mesh ref={ref} receiveShadow {...meshProps}>
				<motion.planeGeometry
					args={[512, 512, 64, 64]}
					{...geometryProps}
				/>
				<motion.meshStandardMaterial
					ref={materialRef}
					map={texture}
					attach="material"
					{...shaderProps}
				/>
			</motion.mesh>
		</>
	);
};

const UTitle = (props: { frame: number }) => {
	const { frame } = props;
	if (frame >= 8 && frame <= 13)
		return (
			<motion.h1
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{
					opacity: 0,
				}}
				className={txtStyles.uTitle1}
			>
				{"うーちゃんの物語"}
			</motion.h1>
		);

	return null;
};

const UuuScene = (props: UuuSceneProps) => {
	const { isHovered } = props;
	const [frame, setFrame] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout>();

	const uuuuType = useRef(
		uuuus[Math.floor(Math.random() * uuuus.length)],
	).current;

	useEffect(() => {
		const interval = intervalRef.current;
		const cleanup = () => {
			clearInterval(interval);
			setFrame(0);
		};
		if (!isHovered) return cleanup();
		const animate = () => {
			intervalRef.current = setInterval(() => {
				setFrame((prev) => prev + 1);
			}, 500);
		};
		animate();
		return cleanup();
	}, [isHovered]);

	const CHARGE_FRAME = frame >= 20 && frame <= 25;
	const FULL_FRAME = frame >= 26;
	const LOADING_FRAME = frame <= 0 && isHovered;
	const SPINNING_FRAME = frame >= 1;
	const FULL_FULL_FRAME = frame >= 63;

	const CHORD_1_FRAMES =
		frame === 2 ||
		frame === 14 ||
		frame === 26 ||
		frame === 32 ||
		frame === 38 ||
		frame === 44 ||
		frame === 51 ||
		frame === 57 ||
		frame === 63 ||
		frame === 69 ||
		frame === 75;
	const CHORD_2_FRAMES =
		frame === 3 ||
		frame === 15 ||
		frame === 27 ||
		frame === 33 ||
		frame === 39 ||
		frame === 45 ||
		frame === 52 ||
		frame === 58 ||
		frame === 64 ||
		frame === 70 ||
		frame === 76;
	const CHORD_3_FRAMES =
		frame === 4 ||
		frame === 16 ||
		frame === 28 ||
		frame === 34 ||
		frame === 40 ||
		frame === 46 ||
		frame === 53 ||
		frame === 59 ||
		frame === 65 ||
		frame === 71 ||
		frame === 77;

	if (!uuuuType) return null;

	return (
		<>
			<StupidMarquees alternative visible={FULL_FRAME} uuuu />
			<UTitle frame={frame} />
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
						color: "#fff",
					}}
					intensity={0.5}
				/>
				<motion.directionalLight
					animate={
						isHovered && frame <= 0
							? "loading"
							: frame >= 1
							  ? "spinning"
							  : "still"
					}
					variants={{
						still: {
							color: "#555",
						},
						loading: {
							color: "#fff",
						},
						spinning: {
							color: "#fff",
						},
					}}
					intensity={3}
					position={[0, 3, 10]}
					castShadow
				/>
				<UuuCube
					type={uuuuType}
					isHovered={isHovered}
					animate={
						LOADING_FRAME
							? "loading"
							: CHARGE_FRAME
							  ? "spinningCharge"
							  : SPINNING_FRAME
								  ? "spinning"
								  : "still"
					}
					variants={{
						still: {
							rotateY: 0,
							rotateZ: 0,
							rotateX: 0,
						},
						loading: {
							scale: 4,
						},
						spinningCharge: {
							rotateY: 0,
							rotateZ: 0,
							rotateX: 0,
							scale: 0.25,
						},
						spinning: {
							rotateY: [0, 180, 360],
							rotateZ: 0,
							rotateX: 0.25,
							scale: 1.5,
						},
					}}
					transition={{
						...(isHovered && {
							rotateY: {
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							},
						}),
						...(CHARGE_FRAME && {
							rotateY: {
								repeat: 0,
								duration: 4,
								ease: "linear",
							},
							scale: {
								duration: 4,
								ease: "linear",
							},
							rotateX: {
								duration: 4,
								ease: "linear",
							},
						}),
					}}
				/>
				<Suspense>
					<motion.group
						initial={{ scale: 0 }}
						animate={FULL_FRAME ? "visible" : "hidden"}
						variants={{
							visible: {
								scale: 1,
							},
							hidden: {
								scale: 0,
							},
						}}
					>
						<UuuCube
							type={uuuuType}
							sphere
							isHovered={isHovered}
							animate={{
								x: [-2, 0, 2, 0, -2],
								y: [2, 0, -2, 0, 2],
								z: [-2, 2, -2, -4, -2],
								scale: [0.25, 0.5, 0.25, 0.5, 0.25],
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 4,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 60,
									ease: "linear",
								},
							}}
							shaderProps={{
								initial: {
									color: "#f00",
								},
							}}
						/>
						<UuuCube
							type={uuuuType}
							sphere
							isHovered={isHovered}
							animate={{
								x: [-2, 0, 2, 0, -2],
								y: [-2, 0, 2, 0, -2],
								z: [-2, -4, -2, 2, -2],
								scale: [0.25, 0.5, 0.25, 0.5, 0.25],
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 4,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 60,
									ease: "linear",
								},
							}}
							shaderProps={{
								initial: {
									color: "#00f",
								},
							}}
						/>
						<UuuCube
							type={uuuuType}
							sphere
							isHovered={isHovered}
							position={[0, -3, -40]}
							scale={[20, 20, 20]}
							animate={{
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
						/>
						<UuuCube
							type={uuuuType}
							sphere
							isHovered={isHovered}
							position={[90, 90, -180]}
							scale={[20, 20, 20]}
							animate={{
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
						/>
						<UuuCube
							type={uuuuType}
							sphere
							isHovered={isHovered}
							position={[-300, 200, -500]}
							scale={[20, 20, 20]}
							animate={{
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
						/>
						<UuuPlane
							isHovered={isHovered}
							position={[0, -20, -50]}
							rotation={[-1.5, 0, 0]}
							animate={{
								rotateZ: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
							shaderProps={{
								color: "#7f7f7f",
							}}
						/>
					</motion.group>
					<motion.group
						initial={{ scale: 0 }}
						animate={FULL_FULL_FRAME ? "visible" : "hidden"}
						variants={{
							visible: {
								scale: 1,
							},
							hidden: {
								scale: 0,
							},
						}}
					>
						<UuuCube
							type={uuuuType}
							isHovered={isHovered}
							position={[-2, -2, -1]}
							animate={{
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
						/>
						<UuuCube
							type={uuuuType}
							isHovered={isHovered}
							position={[2, -2, -1]}
							animate={{
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
						/>
						<UuuCube
							type={uuuuType}
							isHovered={isHovered}
							position={[0, -4, -1]}
							animate={{
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
						/>
						<UuuCube
							type={uuuuType}
							isHovered={isHovered}
							position={[-2, 2, -1]}
							animate={{
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
						/>
						<UuuCube
							type={uuuuType}
							isHovered={isHovered}
							position={[2, 2, -1]}
							animate={{
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
						/>
						<UuuCube
							type={uuuuType}
							isHovered={isHovered}
							position={[0, 4, -1]}
							animate={{
								rotateY: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
						/>
						<UuuPlane
							isHovered={isHovered}
							position={[0, 0, -200]}
							rotation={[0, 0, 0]}
							animate={{
								rotateZ: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
						/>
					</motion.group>
					<motion.group
						initial={{ scale: 0 }}
						animate={CHORD_1_FRAMES ? "visible" : "hidden"}
						variants={{
							visible: {
								scale: 1,
							},
							hidden: {
								scale: 0,
							},
						}}
						transition={{
							duration: 0.1,
						}}
					>
						<UuuCube
							type={uuuuType}
							isHovered={isHovered}
							position={[-5, 0, -3]}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
							shaderProps={{
								color: "#f00",
							}}
						/>
					</motion.group>
					<motion.group
						initial={{ scale: 0 }}
						animate={CHORD_2_FRAMES ? "visible" : "hidden"}
						variants={{
							visible: {
								scale: 1,
							},
							hidden: {
								scale: 0,
							},
						}}
						transition={{
							duration: 0.1,
						}}
					>
						<UuuCube
							type={uuuuType}
							isHovered={isHovered}
							position={[5, 0, -3]}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
							shaderProps={{
								color: "#0f0",
							}}
						/>
					</motion.group>
					<motion.group
						initial={{ scale: 0 }}
						animate={CHORD_3_FRAMES ? "visible" : "hidden"}
						variants={{
							visible: {
								scale: 1,
							},
							hidden: {
								scale: 0,
							},
						}}
						transition={{
							duration: 0.1,
						}}
					>
						<UuuCube
							type={uuuuType}
							isHovered={isHovered}
							position={[0, 3, -3]}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: [0, 180, 360],
							}}
							transition={{
								repeat: Number.POSITIVE_INFINITY,
								duration: 180,
								ease: "linear",
							}}
							shaderProps={{
								color: "#00f",
							}}
						/>
					</motion.group>
				</Suspense>
				<EffectComposer>
					<DepthOfField
						focusDistance={0.01}
						focalLength={0.04}
						bokehScale={10}
						height={1000}
					/>
					<Bloom
						luminanceThreshold={0.5}
						luminanceSmoothing={1}
						height={1000}
						opacity={isHovered ? 0.9 : 0}
					/>
				</EffectComposer>
			</Canvas>
		</>
	);
};

export default UuuScene;

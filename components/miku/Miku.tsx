"use client";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
	Outline,
	Scanline,
	ShockWave,
	Vignette,
	WaterEffect,
} from "@react-three/postprocessing";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StupidMarquees from "../StupidMarquees";
import MikuLyrics from "./MikuLyrics";
import { GroupActor } from "./scenes/GroupActor";
import { MainActor } from "./scenes/MainActor";
import { WallActor } from "./scenes/WallActor";

export type CommonProps = {
	isHovered: boolean;
};

const Scene = (
	props: CommonProps & { mouse: React.RefObject<[number, number]> },
) => {
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

	const MARQUEES_VISIBLE = frame >= 265;
	const RAVE_MODE = frame >= 350;

	return (
		<>
			<MikuLyrics frame={frame} />
			<Canvas
				shadows="basic"
				gl={{
					antialias: false,
					alpha: true,
					logarithmicDepthBuffer: true,
					toneMapping: THREE.ACESFilmicToneMapping,
					toneMappingExposure: 1,
				}}
				dpr={window.devicePixelRatio}
				camera={{
					fov: 60,
					near: 0.1,
					far: 10000,
				}}
			>
				<motion.directionalLight
					castShadow
					position={[0, 400, 500]}
					initial={{
						color: "#000000",
					}}
					animate={{
						color: "#b0ebff",
					}}
				/>
				<motion.fogExp2
					attach="fog"
					animate={{
						color: "#ff2cb5",
						// @ts-expect-error
						density: 0.001,
						...(RAVE_MODE && {
							color: [
								"#ff1f80",
								"#38deff",
								"#ff1f80",
								"#38deff",
								"#ff1f80",
							],
							transition: {
								duration: 0.7,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							},
						}),
					}}
				/>
				<motion.hemisphereLight
					color="#00f7ff"
					groundColor="rgb(251, 0, 255)"
					intensity={3}
				/>
				<GroupActor frame={frame}>
					<WallActor frame={frame} />
					<MainActor frame={frame} />
				</GroupActor>
				<EffectComposer multisampling={0}>
					<Bloom
						luminanceThreshold={0.2}
						luminanceSmoothing={0.9}
						height={300}
						opacity={1}
						width={300}
					/>
					<ChromaticAberration
						offset={new THREE.Vector2(0.002, 0.002)}
						radialModulation={false}
						modulationOffset={0.1}
					/>
					<Vignette eskil={false} offset={0.2} darkness={0.8} />
				</EffectComposer>
			</Canvas>
			<StupidMarquees visible={MARQUEES_VISIBLE} miku alternative />
		</>
	);
};

export default Scene;

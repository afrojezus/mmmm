"use client";

import { type MeshProps, useLoader } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useRef } from "react";
import * as THREE from "three";

type MikuCubeProps = Parameters<typeof motion.mesh>[0] & {
	sphere?: boolean;
	geometryProps?: Parameters<typeof motion.sphereGeometry>[0] &
		Parameters<typeof motion.boxGeometry>[0] &
		Parameters<typeof motion.planeGeometry>[0];
	shaderProps?: Parameters<typeof motion.meshStandardMaterial>[0];
};

export const MikuCube = (props: MikuCubeProps) => {
	const { sphere, geometryProps, shaderProps, ...rest } = props;
	const ref = useRef<MeshProps>(null);
	const materialRef = useRef(null);
	const texture = useLoader(THREE.TextureLoader, "/miku.png");

	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.NearestFilter;

	return (
		<>
			<motion.mesh ref={ref} castShadow receiveShadow {...rest}>
				<motion.boxGeometry args={[1, 1, 1]} {...geometryProps} />
				<motion.meshStandardMaterial
					ref={materialRef}
					map={texture}
					attach="material"
					{...shaderProps}
				/>
				<motion.pointLight
					intensity={3}
					position={[1, 1, 1]}
					color="#7bfdff"
				/>
			</motion.mesh>
		</>
	);
};

"use client";

import { type MeshProps, useLoader } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useRef } from "react";
import * as THREE from "three";

type WallProps = Parameters<typeof motion.mesh>[0] & {
	geometryProps?: Parameters<typeof motion.planeGeometry>[0];
	shaderProps?: Parameters<typeof motion.meshStandardMaterial>[0];
};

export const Wall = (props: WallProps) => {
	const { geometryProps, shaderProps, ...rest } = props;
	const ref = useRef<MeshProps>(null);
	const materialRef = useRef(null);
	const texture = useLoader(THREE.TextureLoader, "/miku-w.png");

	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.NearestFilter;

	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(50, 50);
	texture.offset.set(0, 0);
	texture.needsUpdate = true;

	return (
		<>
			<motion.mesh ref={ref} receiveShadow {...rest}>
				<motion.planeGeometry args={[1000, 1000]} {...geometryProps} />
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

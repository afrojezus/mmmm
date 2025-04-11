"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const radialDistances = new Array(100).fill(0).map((_, i) => ({
	topLeft: new THREE.Vector3(-10, 10, i * 10),
	left: new THREE.Vector3(-10, 0, i * 10),
	bottomLeft: new THREE.Vector3(-10, -10, i * 10),
	bottom: new THREE.Vector3(0, -10, i * 10),
	bottomRight: new THREE.Vector3(10, -10, i * 10),
	right: new THREE.Vector3(10, 0, i * 10),
	topRight: new THREE.Vector3(10, 10, i * 10),
	top: new THREE.Vector3(0, 10, i * 10),
}));

const InstanciatedRadial = (props: Parameters<typeof motion.group>[0]) => {
	const topLeftMesh = useRef<THREE.InstancedMesh>(null);
	const topMesh = useRef<THREE.InstancedMesh>(null);
	const topRightMesh = useRef<THREE.InstancedMesh>(null);
	const bottomLeftMesh = useRef<THREE.InstancedMesh>(null);
	const bottomMesh = useRef<THREE.InstancedMesh>(null);
	const bottomRightMesh = useRef<THREE.InstancedMesh>(null);
	const leftMesh = useRef<THREE.InstancedMesh>(null);
	const rightMesh = useRef<THREE.InstancedMesh>(null);

	const texture = useLoader(THREE.TextureLoader, "/miku.png");

	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.NearestFilter;

	const dummies = useMemo(() => {
		const dummies = [];
		for (let i = 0; i < radialDistances.length; i++) {
			dummies.push({
				topLeft: new THREE.Object3D(),
				left: new THREE.Object3D(),
				bottomLeft: new THREE.Object3D(),
				bottom: new THREE.Object3D(),
				bottomRight: new THREE.Object3D(),
				right: new THREE.Object3D(),
				topRight: new THREE.Object3D(),
				top: new THREE.Object3D(),
			});
		}
		return dummies;
	}, []);

	useFrame(() => {
		const tl = topLeftMesh.current;
		const t = topMesh.current;
		const tr = topRightMesh.current;
		const bl = bottomLeftMesh.current;
		const b = bottomMesh.current;
		const br = bottomRightMesh.current;
		const l = leftMesh.current;
		const r = rightMesh.current;
		if (tl && t && tr && bl && b && br && l && r) {
			radialDistances.forEach((distance, i) => {
				const dummy = dummies[i];
				dummy.topLeft.position.copy(distance.topLeft);
				dummy.left.position.copy(distance.left);
				dummy.bottomLeft.position.copy(distance.bottomLeft);
				dummy.bottom.position.copy(distance.bottom);
				dummy.bottomRight.position.copy(distance.bottomRight);
				dummy.right.position.copy(distance.right);
				dummy.topRight.position.copy(distance.topRight);
				dummy.top.position.copy(distance.top);
				dummy.topLeft.updateMatrix();
				dummy.left.updateMatrix();
				dummy.bottomLeft.updateMatrix();
				dummy.bottom.updateMatrix();
				dummy.bottomRight.updateMatrix();
				dummy.right.updateMatrix();
				dummy.topRight.updateMatrix();
				dummy.top.updateMatrix();
				tl.setMatrixAt(i, dummy.topLeft.matrix);
				l.setMatrixAt(i, dummy.left.matrix);
				bl.setMatrixAt(i, dummy.bottomLeft.matrix);
				b.setMatrixAt(i, dummy.bottom.matrix);
				br.setMatrixAt(i, dummy.bottomRight.matrix);
				r.setMatrixAt(i, dummy.right.matrix);
				tr.setMatrixAt(i, dummy.topRight.matrix);
				t.setMatrixAt(i, dummy.top.matrix);
			});
			tl.instanceMatrix.needsUpdate = true;
			t.instanceMatrix.needsUpdate = true;
			tr.instanceMatrix.needsUpdate = true;
			bl.instanceMatrix.needsUpdate = true;
			b.instanceMatrix.needsUpdate = true;
			br.instanceMatrix.needsUpdate = true;
			l.instanceMatrix.needsUpdate = true;
			r.instanceMatrix.needsUpdate = true;
		}
	});

	return (
		<motion.group {...props}>
			<instancedMesh
				ref={topLeftMesh}
				args={[undefined, undefined, radialDistances.length]}
				castShadow
				receiveShadow
			>
				<motion.boxGeometry args={[1, 1, 1]} />
				<motion.meshStandardMaterial attach="material" map={texture} />
			</instancedMesh>
			<instancedMesh
				ref={topMesh}
				args={[undefined, undefined, radialDistances.length]}
				castShadow
				receiveShadow
			>
				<motion.boxGeometry args={[1, 1, 1]} />
				<motion.meshStandardMaterial attach="material" map={texture} />
			</instancedMesh>
			<instancedMesh
				ref={topRightMesh}
				args={[undefined, undefined, radialDistances.length]}
				castShadow
				receiveShadow
			>
				<motion.boxGeometry args={[1, 1, 1]} />
				<motion.meshStandardMaterial attach="material" map={texture} />
			</instancedMesh>
			<instancedMesh
				ref={leftMesh}
				args={[undefined, undefined, radialDistances.length]}
				castShadow
				receiveShadow
			>
				<motion.boxGeometry args={[1, 1, 1]} />
				<motion.meshStandardMaterial attach="material" map={texture} />
			</instancedMesh>
			<instancedMesh
				ref={rightMesh}
				args={[undefined, undefined, radialDistances.length]}
				castShadow
				receiveShadow
			>
				<motion.boxGeometry args={[1, 1, 1]} />
				<motion.meshStandardMaterial attach="material" map={texture} />
			</instancedMesh>
			<instancedMesh
				ref={bottomLeftMesh}
				args={[undefined, undefined, radialDistances.length]}
				castShadow
				receiveShadow
			>
				<motion.boxGeometry args={[1, 1, 1]} />
				<motion.meshStandardMaterial attach="material" map={texture} />
			</instancedMesh>
			<instancedMesh
				ref={bottomMesh}
				args={[undefined, undefined, radialDistances.length]}
				castShadow
				receiveShadow
			>
				<motion.boxGeometry args={[1, 1, 1]} />
				<motion.meshStandardMaterial attach="material" map={texture} />
			</instancedMesh>
			<instancedMesh
				ref={bottomRightMesh}
				args={[undefined, undefined, radialDistances.length]}
				castShadow
				receiveShadow
			>
				<motion.boxGeometry args={[1, 1, 1]} />
				<motion.meshStandardMaterial attach="material" map={texture} />
			</instancedMesh>
		</motion.group>
	);
};

export const BackgroundActors = ({ frame }: { frame: number }) => {
	const ON_FRAME = frame > 0 && frame < 265;
	const ON_SECOND_FRAME = frame > 265;
	return (
		<>
			<InstanciatedRadial
				animate={ON_FRAME ? "on" : ON_SECOND_FRAME ? "off" : "idle"}
				variants={{
					on: {
						rotateZ: 360,
						transition: {
							rotateZ: {
								duration: 180,
								ease: "linear",
								repeat: Number.POSITIVE_INFINITY,
							},
						},
					},
					off: {
						rotateZ: 360,
						transition: {
							rotateZ: {
								duration: 60,
								ease: "linear",
								repeat: Number.POSITIVE_INFINITY,
							},
						},
					},
					idle: {
						rotateY: 0,
					},
				}}
			/>
			<motion.pointLight
				color="#999999"
				decay={2}
				animate={ON_FRAME ? "on" : ON_SECOND_FRAME ? "off" : "idle"}
				variants={{
					on: {
						x: 0,
						y: 0,
						z: 1,
						// @ts-expect-error
						intensity: 500,
					},
					off: {
						x: 0,
						y: 0,
						z: 1,
						// @ts-expect-error
						intensity: 9999,
					},
					idle: {
						x: 0,
						y: 0,
						z: 0,
						// @ts-expect-error
						intensity: 0,
					},
				}}
			/>
			<motion.pointLight
				animate={ON_FRAME ? "on" : ON_SECOND_FRAME ? "off" : "idle"}
				decay={0.3}
				variants={{
					on: {
						x: 0,
						y: 0,
						z: 1,
						// @ts-expect-error
						intensity: 0,
					},
					off: {
						x: 0,
						y: 0,
						z: 20,
						// @ts-expect-error
						intensity: [9999, 0],
						color: ["#ff1f80", "#38deff", "#c8ff00", "#6fff00"],
						transition: {
							duration: 1,
							ease: "linear",
							repeat: Number.POSITIVE_INFINITY,
							repeatType: "reverse",
						},
					},
					idle: {
						x: 0,
						y: 0,
						z: 0,
						// @ts-expect-error
						intensity: 0,
					},
				}}
			/>
		</>
	);
};

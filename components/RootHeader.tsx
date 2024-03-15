"use client";

import styles from "@/styles/header.module.scss";
import Image from "next/image";
import Link from "next/link";
import Group from "./Group";
import Header from "./Header";

const RootHeader = () => {
	return (
		<Header>
			{(activeRoute) => (
				<>
					<Group>
						<Link
							className={
								activeRoute === "/" ? styles.active : undefined
							}
							href="/"
						>
							<Image
								src="/mmmm.webp"
								alt="mmmm"
								width={28}
								height={28}
							/>
							<span>mmmm</span>
						</Link>
						<Link
							className={
								activeRoute === "/uuuu"
									? styles.active
									: undefined
							}
							href="/uuuu"
						>
							<Image
								src="/uuuu.webp"
								alt="uuuu"
								width={28}
								height={28}
							/>
							<span>uuuu</span>
						</Link>
						<Link
							className={
								activeRoute === "/myon"
									? styles.active
									: undefined
							}
							href="/myon"
						>
							<Image
								src="/myon.png"
								alt="myon"
								width={28}
								height={28}
							/>
							<span>myon</span>
						</Link>
						<Link
							className={
								activeRoute === "/3d"
									? styles.active
									: undefined
							}
							href="/3d"
						>
							<Image
								src="/mmmm.webp"
								alt="mmmm"
								width={28}
								height={28}
							/>
							<span>3D</span>
						</Link>
					</Group>
				</>
			)}
		</Header>
	);
};

export default RootHeader;

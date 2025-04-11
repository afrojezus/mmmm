"use client";

import styles from "@/styles/header.module.scss";
import { getSeason } from "@/utils/season";
import Image from "next/image";
import Link from "next/link";
import Group from "./Group";
import Header from "./Header";

const RootHeader = () => {
	const season = getSeason();
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
							<span>ms</span>
						</Link>
						{season !== "winter" && (
							<Link
								className={
									activeRoute === "/winter"
										? styles.active
										: undefined
								}
								href="/winter"
							>
								<Image
									src="/uuuu2.webp"
									alt="mmmm"
									width={28}
									height={28}
								/>
								<span>winter</span>
							</Link>
						)}
						{season !== "dayWinter" && (
							<Link
								className={
									activeRoute === "/daywinter"
										? styles.active
										: undefined
								}
								href="/daywinter"
							>
								<Image
									src="/uuuu2.webp"
									alt="mmmm"
									width={28}
									height={28}
								/>
								<span>daywinter</span>
							</Link>
						)}
						{/* {season !== "autumn" && (
							<Link
								className={
									activeRoute === "/winter"
										? styles.active
										: undefined
								}
								href="/autumn"
							>
								<Image
									src="/uuuu2.webp"
									alt="mmmm"
									width={28}
									height={28}
								/>
								<span>autumn</span>
							</Link>
						)}
						{season !== "spring" && (
							<Link
								className={
									activeRoute === "/winter"
										? styles.active
										: undefined
								}
								href="/spring"
							>
								<Image
									src="/uuuu2.webp"
									alt="mmmm"
									width={28}
									height={28}
								/>
								<span>spring</span>
							</Link>
						)} */}
						<Link
							className={
								activeRoute === "/miku"
									? styles.active
									: undefined
							}
							href="/miku"
						>
							<Image
								src="/miku.png"
								alt="miku"
								width={28}
								height={28}
							/>
							<span>miku</span>
						</Link>
					</Group>
				</>
			)}
		</Header>
	);
};

export default RootHeader;

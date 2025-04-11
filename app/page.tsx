"use client";

import { WebGLWrapper } from "@/components/WebGLWrapper";
import { getSeason } from "@/utils/season";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HomeScene = dynamic(() => import("@/components/mmmm/HomeScene"), {
	ssr: false,
});

const FestiveScene = dynamic(() => import("@/components/FestiveScene"), {
	ssr: false,
});

const DayWinterScene = dynamic(() => import("@/components/DayWinterScene"), {
	ssr: false,
});

const IndexPage = () => {
	const season = getSeason();

	return (
		<motion.main
			style={{
				flex: 1,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100%",
			}}
		>
			<WebGLWrapper>
				{["autumn", "spring", "default", "summer"].includes(season) && (
					<HomeScene />
				)}
				{season === "winter" && <FestiveScene />}
				{season === "dayWinter" && <DayWinterScene />}
			</WebGLWrapper>
		</motion.main>
	);
};

export default IndexPage;

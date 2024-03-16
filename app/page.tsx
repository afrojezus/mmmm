"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HomeScene = dynamic(() => import("@/components/mmmm/HomeScene"), {
	ssr: false,
});

const FestiveScene = dynamic(() => import("@/components/FestiveScene"), {
	ssr: false,
});

const winterTimes = [10, 11, 0, 1];

const IndexPage = () => {
	const isWinterTime = winterTimes.includes(new Date().getMonth());

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
			{!isWinterTime && <HomeScene />}
			{isWinterTime && <FestiveScene />}
		</motion.main>
	);
};

export default IndexPage;

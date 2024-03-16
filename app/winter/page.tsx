"use client";

import dynamic from "next/dynamic";

const FestiveScene = dynamic(() => import("@/components/FestiveScene"), {
	ssr: false,
});

const Page = () => {
	return <FestiveScene />;
};

export default Page;

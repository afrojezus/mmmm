"use client";

import dynamic from "next/dynamic";

const DayWinterScene = dynamic(() => import("@/components/DayWinterScene"), {
	ssr: false,
});

const Page = () => {
	return <DayWinterScene />;
};

export default Page;

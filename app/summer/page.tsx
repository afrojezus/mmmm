"use client";

import dynamic from "next/dynamic";

const SummerScene = dynamic(() => import("@/components/SummerScene"), {
	ssr: false,
});

const Page = () => {
	return <SummerScene />;
};

export default Page;

"use client";

import { WebGLWrapper } from "@/components/WebGLWrapper";
import dynamic from "next/dynamic";

const MikuScene = dynamic(() => import("@/components/miku/MikuWrapper"), {
	ssr: false,
});

const Page = () => {
	return (
		<WebGLWrapper>
			<MikuScene />
		</WebGLWrapper>
	);
};

export default Page;

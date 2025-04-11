"use client";

import React from "react";

export class WebGLWrapper extends React.Component<{
	children: React.ReactNode;
}> {
	constructor(props: { children: React.ReactNode }) {
		super(props);
		this.state = {
			isWebGLAvailable: true,
		};
	}

	componentDidMount() {
		if (!this.isWebGLAvailable()) {
			this.setState({ isWebGLAvailable: false });
		}
	}

	isWebGLAvailable() {
		return (
			!!window.WebGLRenderingContext &&
			!!document.createElement("canvas").getContext("webgl")
		);
	}

	render() {
		const { isWebGLAvailable } = this.state as {
			isWebGLAvailable: boolean;
		};
		if (!isWebGLAvailable) {
			return <p>WebGL is not supported by your browser.</p>;
		}
		return <>{this.props.children}</>;
	}
}

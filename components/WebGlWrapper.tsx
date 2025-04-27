"use client"

import React from "react"

type WebGlWrapperState = {
  isWebGlAvailable: boolean
}

type WebGlWrapperProps = {
  children: React.ReactNode
}

export class WebGlWrapper extends React.Component<
  WebGlWrapperProps,
  WebGlWrapperState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = {
      isWebGlAvailable: true,
    }
  }

  componentDidMount() {
    if (!this.isWebGlAvailable()) {
      this.setState({ isWebGlAvailable: false })
    }
  }

  isWebGlAvailable() {
    return (
      !!window.WebGLRenderingContext &&
      !!document.createElement("canvas").getContext("webgl")
    )
  }

  render() {
    const { isWebGlAvailable } = this.state
    if (!isWebGlAvailable) {
      return <p>WebGL is not supported by your browser.</p>
    }
    return <>{this.props.children}</>
  }
}

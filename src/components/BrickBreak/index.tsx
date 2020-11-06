import React, { Component } from 'react'
import { BrickBreakCore } from './core'

interface Props {
  style?: React.CSSProperties
  width?: number
  height?: number
}
const DEFAULT_WIDTH = 400
const DEFAULT_HEIGHT = 300

export class BrickBreak extends Component<Props> {
  canvasRef = React.createRef<HTMLCanvasElement>()
  ctx: CanvasRenderingContext2D
  core: BrickBreakCore

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d')
    this.core = new BrickBreakCore({
      width: this.getWidth(),
      height: this.getHeight(),
    })
    requestAnimationFrame(this.rafCallback)
  }

  rafCallback = () => {
    this.core.iterator()
    // console.log(this.core.bullet)
    this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight())
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(
      this.core.bullet.x,
      this.core.bullet.y,
      this.core.bullet.width,
      this.core.bullet.height
    )
    requestAnimationFrame(this.rafCallback)
  }

  getHeight() {
    return this.props.height || DEFAULT_HEIGHT
  }

  getWidth() {
    return this.props.width || DEFAULT_WIDTH
  }

  render() {
    return (
      <canvas
        height={this.getHeight()}
        width={this.getWidth()}
        ref={this.canvasRef}
        style={{
          ...this.props.style,
          border: '1px solid #000',
        }}
      ></canvas>
    )
  }
}

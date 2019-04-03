import React, { Component } from "react"
import PropTypes from "prop-types"

const OuterCircle = ({ children, x, y, radius, polyPath }) => (
  <svg
    className="intro"
    preserveAspectRatio="xMidYMax"
    viewBox="0 0 100 100"
    fill="transparent"
    style={{ width: "100%", height: "100%" }}
  >
    <circle
      className="circle"
      stroke="#1a202c"
      cx={x}
      cy={y}
      r={radius - 0.75}
      strokeWidth="1.5"
    />
    <path className="path" fillRule="evenodd" d={polyPath} fill="#1a202c" />
    {children}
  </svg>
)

OuterCircle.propTypes = {
  children: PropTypes.node,
  x: PropTypes.number,
  y: PropTypes.number,
  radius: PropTypes.number,
  polyPath: PropTypes.string,
}

const InnerCircle = ({ y, opacity, title, subtitle, bottomText, progress }) => (
  <svg className="inner" viewBox="0 0 100 100" y={y}>
    <defs>
      <path id="curve" d="M 24 50 A 24 24 0 1 0 76 50" />
    </defs>
    <circle
      className="circle-inner"
      fill="#1a202c"
      cx="50"
      cy="50"
      r={Math.min(28 + 5 * progress, 30)}
    />
    <g style={{ opacity }} className="text-white">
      <text
        className="fill-current uppercase"
        x="50"
        y="42"
        width="100"
        textAnchor="middle"
        fontSize="6"
      >
        {title}
      </text>
      <text
        className="fill-current tracking-wide"
        x="50"
        y="48"
        width="100"
        textAnchor="middle"
        fontSize="4"
      >
        {subtitle}
      </text>
      <text
        className="fill-current uppercase"
        fontSize="2.5"
        letterSpacing="0.4"
        textAnchor="middle"
      >
        <textPath href="#curve" startOffset="50%">
          {bottomText}
        </textPath>
      </text>
    </g>
  </svg>
)

InnerCircle.propTypes = {
  y: PropTypes.number,
  opacity: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  bottomText: PropTypes.string,
  progress: PropTypes.number,
}

class Blob extends Component {
  yMin = 50
  yMax = 130
  radius = 30
  x = 50

  state = {
    y: 50,
    polyPath: null,
    innerOpacity: 1,
  }

  constructor(props) {
    super(props)
  }

  update = () => {
    const { progress } = this.props

    const innerOpacity = 1 - 3 * progress

    let { y } = this.state
    const { yMin, yMax, x, radius } = this

    y = yMin + (yMax - yMin) * progress
    let xOffset = radius * Math.sin(progress * Math.PI)

    let polyAx = x - xOffset
    let polyBx = x + xOffset

    let polyAy = y + radius * Math.cos(progress * Math.PI)
    let polyBy = polyAy

    const d = 2 * Math.abs(5 * progress - 2.5) + 10

    // Calculate points tangent to circle for SVG curve control points
    const vx = x - polyAx
    const vy = y - polyAy
    const norm = Math.sqrt(vx * vx + vy * vy)
    let polyAC1x = polyAx + (-1 * vy * d) / norm
    let polyAC1y = polyAy + (vx * d) / norm

    if (polyAC1x > 50) {
      polyAC1x = 50
    }

    let polyBC1x = 100 - polyAC1x

    let polyBaseAx = polyAx - 50 * progress
    let polyBaseBx = 100 - polyBaseAx

    const polyPath = [
      `M ${polyBaseAx} 100`,
      `Q ${polyAC1x} ${polyAC1y} ${polyAx} ${polyAy}`,
      `L ${polyBx} ${polyBy}`,
      `Q ${polyBC1x} ${polyAC1y} ${polyBaseBx} 100`,
      `Z`,
    ].join(" ")

    this.setState({
      y,
      innerOpacity,
      polyPath,
    })

    window.requestAnimationFrame(this.update)
  }

  componentDidMount() {
    window.requestAnimationFrame(this.update)
  }

  render() {
    const { y, polyPath, innerOpacity } = this.state

    return (
      <OuterCircle x={this.x} y={y} radius={this.radius} polyPath={polyPath}>
        <InnerCircle
          y={y - 50}
          opacity={innerOpacity}
          title="Harry Green"
          subtitle="Full Stack Developer"
          bottomText="Wellington, New Zealand"
          progress={this.props.progress}
        />
      </OuterCircle>
    )
  }
}

Blob.propTypes = {
  progress: PropTypes.number,
}

export default Blob

import React, { Component } from "react";

const inner = ({ ref }) => (
  <svg ref={ref} className="inner" viewBox="0 0 100 100">
    <defs>
      <path id="curve" d="M 24 50 A 24 24 0 1 0 76 50" />
    </defs>
    <circle
      className="circle-inner"
      stroke="#ecefeb"
      fill="#fff"
      strokeWidth="0.2"
      cx="50"
      cy="50"
      r="28"
    />
    <text
      className="text name"
      x="50"
      y="42"
      width="100"
      textAnchor="middle"
      fontSize="6"
    >
      HARRY GREEN
    </text>
    <text
      className="text role"
      x="50"
      y="46"
      width="100"
      textAnchor="middle"
      fontSize="3"
    >
      Frontend Web Developer
    </text>
    {/* {bridge()} */}
    <text
      className="location"
      fontSize="2.5"
      letterSpacing="0.25"
      textAnchor="middle"
      style={{ fill: "#676D65", textTransform: "uppercase" }}
    >
      <textPath href="#curve" startOffset="50%">
        Newcastle upon Tyne
      </textPath>
    </text>
  </svg>
);

class Header extends Component {
  circleYMin = 50;
  circleYMax = 130;

  lastScroll = 0;

  state = {
    circleX: 50,
    circleY: 50,
    circleR: 30,
    p: 0,
    polyPath: null,
    innerOpacity: 1
  };

  constructor(props) {
    super(props);
    this.outerCircle = React.createRef();
    this.innerCircle = React.createRef();
    this.blobPath = React.createRef();
  }

  update = () => {

    const currentScroll = this.lastScroll + (window.scrollY - this.lastScroll) * 0.2;
    this.lastScroll = currentScroll;

    const p = currentScroll / window.innerHeight * 2;

    if (p > 1.1) {
      window.requestAnimationFrame(this.update);
      return;
    }

    let { circleX, circleY, circleR } = this.state;
    const { circleYMin, circleYMax } = this;

    circleY = circleYMin + (circleYMax - circleYMin) * p;
    let xOffset = circleR * Math.sin(p * Math.PI);

    let polyAx = circleX - xOffset;
    let polyBx = circleX + xOffset;

    let polyAy = circleY + circleR * Math.cos(p * Math.PI);
    let polyBy = polyAy;

    const d = 2 * Math.abs(5 * p - 2.5) + 10;

    // Calculate points tangent to circle for SVG curve control points
    const vx = circleX - polyAx;
    const vy = circleY - polyAy;
    const norm = Math.sqrt(vx * vx + vy * vy);
    let polyAC1x = polyAx + -1 * vy * d / norm;
    let polyAC1y = polyAy + vx * d / norm;

    if (polyAC1x > 50) {
      polyAC1x = 50;
    }

    let polyBC1x = 100 - polyAC1x;

    let polyBaseAx = polyAx - 50 * p;
    let polyBaseBx = 100 - polyBaseAx;

    const polyPath = [
      "M",
      polyBaseAx,
      100,
      "Q",
      polyAC1x,
      polyAC1y,
      polyAx,
      polyAy,
      "L",
      polyBx,
      polyBy,
      "Q",
      polyBC1x,
      polyAC1y,
      polyBaseBx,
      100,
      "Z"
    ].join(" ");

    this.outerCircle.current.setAttribute("cx", circleX);
    this.outerCircle.current.setAttribute("cy", circleY);
    this.innerCircle.current.setAttribute("y", circleY - 50);
    this.innerCircle.current.style.opacity = 1 - 3 * p;
    this.blobPath.current.setAttribute("d", polyPath);

    window.requestAnimationFrame(this.update);
  };

  componentDidMount() {
    window.requestAnimationFrame(this.update);
  }

  render() {
    const { circleX, circleY, circleR, polyPath, innerOpacity } = this.state;
    const ref = this.innerCircle;
    return (
      <div
        className="head"
        style={{ backgroundColor: "#ecefeb", height: "100vmin" }}
      >
        <svg
          className="intro"
          preserveAspectRatio="xMidYMid"
          viewBox="0 0 100 100"
          style={{ width: "100%", height: "100%" }}
        >
          <circle
            className="circle"
            fill="#fff"
            cx={circleX}
            cy={circleY}
            r={circleR}
            ref={this.outerCircle}
          />
          <path
            className="path"
            ref
            fill="#fff"
            fillRule="evenodd"
            d={polyPath}
            ref={this.blobPath}
          />
          {inner({ ref, circleX, circleY, innerOpacity })}
        </svg>
      </div>
    );
  }
}

export default Header;

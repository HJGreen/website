import React, { Component } from "react";
import PropTypes from "prop-types";

const OuterCircle = ({ children, x, y, radius, polyPath }) => (
  <svg
    className="intro"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 100 100"
    style={{ width: "100%", height: "100%" }}
  >
    <circle className="circle" fill="#fff" cx={x} cy={y} r={radius} />
    <path className="path" fill="#fff" fillRule="evenodd" d={polyPath} />
    {children}
  </svg>
);

OuterCircle.propTypes = {
  children: PropTypes.node,
  x: PropTypes.number,
  y: PropTypes.number,
  radius: PropTypes.number,
  polyPath: PropTypes.string
};

const InnerCircle = ({ y, opacity, title, subtitle, bottomText }) => (
  <svg className="inner" viewBox="0 0 100 100" y={y} style={{ opacity }}>
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
      {title}
    </text>
    <text
      className="text role"
      x="50"
      y="46"
      width="100"
      textAnchor="middle"
      fontSize="3"
    >
      {subtitle}
    </text>
    <text
      className="location"
      fontSize="2.5"
      letterSpacing="0.25"
      textAnchor="middle"
      style={{ fill: "#676D65", textTransform: "uppercase" }}
    >
      <textPath href="#curve" startOffset="50%">
        {bottomText}
      </textPath>
    </text>
  </svg>
);

InnerCircle.propTypes = {
  y: PropTypes.number,
  opacity: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  bottomText: PropTypes.string
};

class Header extends Component {
  yMin = 50;
  yMax = 130;
  radius = 30;
  x = 50;

  state = {
    y: 50,
    polyPath: null,
    innerOpacity: 1,
    lastScroll: 0
  };

  update = () => {
    const { lastScroll } = this.state;
    const currentScroll = lastScroll + (window.scrollY - lastScroll) * 0.2;

    let progress = currentScroll / window.innerHeight * 2;
    progress = parseFloat(progress.toFixed(3));

    const innerOpacity = 1 - 3 * progress;

    if (progress > 1.1) {
      window.requestAnimationFrame(this.update);
      return;
    }

    let { y } = this.state;
    const { yMin, yMax, x, radius } = this;

    y = yMin + (yMax - yMin) * progress;
    let xOffset = radius * Math.sin(progress * Math.PI);

    let polyAx = x - xOffset;
    let polyBx = x + xOffset;

    let polyAy = y + radius * Math.cos(progress * Math.PI);
    let polyBy = polyAy;

    const d = 2 * Math.abs(5 * progress - 2.5) + 10;

    // Calculate points tangent to circle for SVG curve control points
    const vx = x - polyAx;
    const vy = y - polyAy;
    const norm = Math.sqrt(vx * vx + vy * vy);
    let polyAC1x = polyAx + -1 * vy * d / norm;
    let polyAC1y = polyAy + vx * d / norm;

    if (polyAC1x > 50) {
      polyAC1x = 50;
    }

    let polyBC1x = 100 - polyAC1x;

    let polyBaseAx = polyAx - 50 * progress;
    let polyBaseBx = 100 - polyBaseAx;

    const polyPath = [
      `M ${polyBaseAx} 100`,
      `Q ${polyAC1x} ${polyAC1y} ${polyAx} ${polyAy}`,
      `L ${polyBx} ${polyBy}`,
      `Q ${polyBC1x} ${polyAC1y} ${polyBaseBx} 100`,
      `Z`
    ].join(" ");

    this.setState({
      y,
      innerOpacity,
      polyPath,
      lastScroll: currentScroll
    });

    window.requestAnimationFrame(this.update);
  };

  componentDidMount() {
    window.requestAnimationFrame(this.update);
  }

  render() {
    const { y, polyPath, innerOpacity } = this.state;

    return (
      <header style={{ backgroundColor: "#ecefeb", height: "100vmin" }}>
        <OuterCircle x={this.x} y={y} radius={this.radius} polyPath={polyPath}>
          <InnerCircle
            y={y - 50}
            opacity={innerOpacity}
            title="HARRY GREEN"
            subtitle="Frontend Web Developer"
            bottomText="NEWCASTLE UPON TYNE"
          />
        </OuterCircle>
      </header>
    );
  }
}

export default Header;

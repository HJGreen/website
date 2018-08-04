import React, { Component } from "react";
import Blob from "./Blob";

class Header extends Component {
  state = {
    progress: 0,
    lastScroll: 0
  };

  update = () => {
    const { lastScroll } = this.state;
    let currentScroll = lastScroll + (window.scrollY - lastScroll) * 0.2;
    currentScroll = parseFloat(currentScroll.toFixed(3));

    let progress = currentScroll / window.innerHeight * 2;
    progress = parseFloat(progress.toFixed(3));

    if (progress < 1.1) {
      this.setState({
        progress,
        lastScroll: currentScroll
      });
    }

    window.requestAnimationFrame(this.update);
  };

  componentDidMount() {
    window.requestAnimationFrame(this.update);
  }
  
  render() {
    const { progress } = this.state;
    return (
      <header style={{ backgroundColor: "#ebedef", height: "100vmin" }}>
        <Blob progress={progress} />
      </header>
    );
  }
}

export default Header;

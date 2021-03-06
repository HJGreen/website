import React, { Component } from 'react';

import Blob from './Blob';

class Header extends Component {
  state = {
    progress: 0,
    lastScroll: 0,
  };

  update = () => {
    const { lastScroll } = this.state;
    let currentScroll = lastScroll + (window.scrollY - lastScroll) * 0.2;
    currentScroll = parseFloat(currentScroll.toFixed(3));

    let progress = (currentScroll / window.innerHeight) * 2;
    progress = Math.min(parseFloat(progress.toFixed(3)), 1.0);

    if (progress < 1.1) {
      this.setState({
        progress,
        lastScroll: currentScroll,
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
      <header
        className="max-h-screen"
        style={{
          background:
            'linear-gradient(20deg, hsl(5, 67%, 58%), transparent), \
            linear-gradient(60deg, hsl(270, 67%, 58%), hsl(290, 67%, 58%))',
        }}
      >
        <Blob progress={progress} />
      </header>
    );
  }
}

export default Header;

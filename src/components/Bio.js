import React from "react";
import PropTypes from "prop-types";

const LinkExternal = ({ children, href }) => (
  <a className="c-link-external" href={href}>
    {children}
  </a>
);
LinkExternal.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
};

const Bio = () => (
  <section
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <article style={{ textAlign: "center" }}>
      <h1 className="c-bio-header">Harry Green</h1>
      <p>
        <LinkExternal href="https://github.com/HJGreen">GitHub</LinkExternal>
        <LinkExternal href="https://codepen.io/HGreen7">CodePen</LinkExternal>
        <LinkExternal href="https://www.linkedin.com/in/hjgreen">
          LinkedIn
        </LinkExternal>
      </p>
    </article>
  </section>
);

export default Bio;

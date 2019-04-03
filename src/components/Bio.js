import React from 'react';
import PropTypes from 'prop-types';

const LinkExternal = ({ children, href }) => (
  <a
    className="text-purple-400 px-1 text-xl font-semibold no-underline hover:underline"
    href={href}
  >
    {children}
  </a>
);

LinkExternal.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

const Bio = () => (
  <section className="bg-gray-900 h-screen flex justify-center items-center">
    <article className="text-center">
      <h1 className="uppercase text-white text-4xl mb-4">Harry Green</h1>
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

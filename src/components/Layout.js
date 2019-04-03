import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import '../index.css';

const Layout = ({ children }) => (
  <main>
    <Helmet
      title="Harry Green - Full Stack Developer"
      meta={[
        {
          name: 'description',
          content:
            'Full Stack developer specialising in WordPress and React. Currently based in Wellington, New Zealand',
        },
        {
          name: 'keywords',
          content:
            'web developer, full stack, php, javascript, react, front end, website, wordpress, wellington, new zealand, svg, portfolio',
        },
        { name: 'theme-color', content: '#1a202c' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ]}
    >
      <html lang="en-GB" />
    </Helmet>

    {children}
  </main>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;

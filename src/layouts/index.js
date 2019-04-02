import React from "react";
import Helmet from "react-helmet";

import Header from "../components/Header";
import Bio from "../components/Bio";

import "./../layouts/index.css";

const TemplateWrapper = () => (
  <div>
    <Helmet
      title="Harry Green - Full Stack Developer"
      meta={[
        {
          name: "description",
          content: "Full Stack developer specialising in WordPress and React. Currently based in Wellington, New Zealand"
        },
        {
          name: "keywords",
          content:
            "web developer, full stack, php, javascript, react, front end, website, wordpress, wellington, new zealand, svg, portfolio"
        },
        { name: "theme-color", content: "#1a202c" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ]}
    >
      <html lang="en-GB" />
    </Helmet>
    <Header />
    <Bio />
  </div>
);

export default TemplateWrapper;

import React from "react";
import Helmet from "react-helmet";

import Header from "../components/Header";
import Bio from "../components/Bio";

import "./../layouts/index.css";

const TemplateWrapper = () => (
  <div>
    <Helmet
      title="Harry Green - Full Stack Web Developer"
      meta={[
        {
          name: "description",
          content: "Harry Green - Full stack web developer."
        },
        {
          name: "keywords",
          content:
            "web developer, full stack, php, javascript, react, front end, website"
        }
      ]}
    >
      <html lang="en-GB" />
      <meta name="theme-color" content="#ebedef" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    <Header />
    <Bio />
  </div>
);

export default TemplateWrapper;

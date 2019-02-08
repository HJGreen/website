import React from "react";
import Helmet from "react-helmet";

import Header from "../components/Header";
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
    />
    <Header />
    <div style={{ height: "100vh" }} />
  </div>
);

export default TemplateWrapper;

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/Header";
import "./index.css";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Harry Green - Frontend Web Developer"
      meta={[
        {
          name: "description",
          content:
            "Harry Green is a web developer based in Newcastle upon Tyne, specialising in frontend development."
        },
        {
          name: "keywords",
          content: "web developer, frontend, website, newcastle upon tyne"
        }
      ]}
    />
    <Header />
    <div style={{ height: "100vh" }} />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

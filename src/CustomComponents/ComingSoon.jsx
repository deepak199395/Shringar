import React from "react";
import "./ComingSoon.css";

const ComingSoon = ({ title = "Coming Soon", subtitle = "This section is under development" }) => {
  return (
    <div className="coming-soon-container">

      <div className="coming-soon-box">

        <h1 className="coming-title">{title}</h1>

        <p className="coming-subtitle">{subtitle}</p>

        <div className="coming-loader"></div>

      </div>

    </div>
  );
};

export default ComingSoon;
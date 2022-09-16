import React from "react";
import minderaLogo from "../../assests/mindera-logo.png";
import "./Footer.css";
const Footer = (props) => {
  return (
    <div className="footerDiv">
      <img src={minderaLogo} className="footerLogo" />
      <span style={{ verticalAlign: "top" }}>&#169;</span>
      <p style={{ fontSize: "14px", fontFamily: "Patrick Hand, fantasy" }}>
        2022 Mindera Group. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

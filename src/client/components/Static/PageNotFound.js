import React from "react";

import { Fragment } from "react";
import { Link } from "react-router-dom";
import MinderaSymbol from "../../assests/mindera-symbol.png";
import MinderaLogoMain from "../../assests/mindera-logo-2.png";
import Footer from "../Footer/Footer";
const PageNotFound = () => {
  return (
    <Fragment>
      <div className="headerImage-div">
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <img
            src={MinderaSymbol}
            style={{
              height: "80px",
              marginBottom: "20px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <img
          src={MinderaLogoMain}
          style={{ height: "50px", width: "auto", marginBottom: "30px" }}
        />
      </div>
      <div style={{ margin: "20px auto", maxWidth: "90vw", width: "640px" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "100px",
            fontFamily: "Patrick Hand",
            fontWeight: "200",
            color: "blueviolet",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontFamily: "Patrick Hand",
            fontSize: "21px",
            textAlign: "center",
          }}
        >
          Uh-oh, we can’t find the page you’re looking for. But don’t worry!
          Click on the link below and we’ll take you safely back to our
          homepage.
        </p>
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <a
            href="/login"
            style={{
              fontSize: "24px",
              fontFamily: "Patrick Hand",
              display: "inline-block",
              color: "blueviolet",
              border: "1px solid #ccc ",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              height: "50px",
              width: "200px",
              lineHeight: "47px",
              display: "inline-block",
              borderRadius: "10px",
            }}
          >
            Home
          </a>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default PageNotFound;

import React, { Fragment, useEffect, useState } from "react";
import HeaderImageHolder from "../Header/HeaderImageHolder";
import "../Header/Header.css";

import { auth } from "../../../server/firebase";
import { logout } from "../../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "../../utils/Card";
import { Link, useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
const ResponseSubmitted = (props) => {
  const [user, loading, error] = useAuthState(auth);

  const stylesLine = {
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    height: "10px",
    left: "-1px",
    position: "absolute",
    top: "-1px",
    width: "calc(100% + 2px)",
    backgroundColor: "rgb(125, 67, 38)",
    color: "rgba(255, 255, 255, 1)",
  };

  const navigate = useNavigate();

  const newResponseHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    navigate("/form", { replace: true });
  };

  return (
    <div className="formHeader-div">
      <button className="logOutBtn" onClick={logout}>
        Logout
      </button>
      {user?.uid === "tv5YnP8GH0hgL9OeBtowaIrnvxV2" && (
        <Link
          to="/rem-data"
          style={{
            fontFamily: "Patrick Hand",
            fontSize: "15px",
            fontWeight: "500",
            display: "block",
            textAlign: "right",
          }}
        >
          Reimbursement Records
        </Link>
      )}
      <HeaderImageHolder />
      <Card>
        <div style={stylesLine} />
        <div className="form-intro">
          <div className="form-intro__info">
            <h1 className="header">Reimbursement Form</h1>
          </div>

          <div className="form-into__email">
            <p style={{ fontWeight: "700", color: "grey", fontSize: "14px" }}>
              &nbsp;
              <input
                type="email"
                defaultValue={props.employeeMail}
                name={props.name}
                disabled={true}
                style={{
                  fontWeight: "700",
                  color: "grey",
                  fontSize: "14px",
                  backgroundColor: " #fff",
                  border: "none",
                  display: "block",
                  width: "100%",
                }}
              />
            </p>
          </div>
          <div style={{ marginTop: "15px" }}>
            <p style={{ fontSize: "14px", color: "000000" }}>
              Your response has been recorded.
            </p>
            <button
              onClick={newResponseHandler}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Submit another response.
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResponseSubmitted;

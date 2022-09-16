import React, { Fragment } from "react";
import Card from "../../../utils/Card";
const UserEmail = (props) => {
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
  return (
    <Fragment>
      {" "}
      <Card>
        <div style={stylesLine} />
        <div className="form-intro">
          <div className="form-intro__info">
            <h1 className="header">Reimbursement Form</h1>
            <p className="para">
              Use this form to submit reimbursments and track progress
            </p>
          </div>
          <hr />
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
          <div>
            <p style={{ fontSize: "14px", color: "#5f6368" }}>
              The name, email address and photo associated with your Google
              Account will be recorded when you upload files and submit this
              form
            </p>
          </div>
          <p style={{ color: "red", fontSize: "14px", fontWeight: "400" }}>
            *Required
          </p>
        </div>
      </Card>
    </Fragment>
  );
};

export default UserEmail;

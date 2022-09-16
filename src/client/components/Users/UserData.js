import React, { Fragment } from "react";
import "./User.css";

const UserData = (props) => {
  const filteredPendingApprovalRecords = props.userRemRecords.filter(
    (id) => props.userData[id].IsApproved === ""
  );

  const approvedRecords = props.userRemRecords.filter(
    (id) => props.userData[id].IsApproved === "Yes"
  );

  const declinedRecords = props.userRemRecords.filter(
    (id) => props.userData[id].IsApproved === "No"
  );

  const account = props.account;

  // console.log("From User Data", props.approverMailId);
  return (
    <Fragment>
      <div className="ui segment" style={{ width: "300px" }}>
        <div className="analyticsMain-div">
          <div className="analytics-div">
            <h4 className="railCard-heading">Reimbursement Record Details-</h4>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "darkslategrey",
              }}
            >
              Name: {props.name}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "darkslategrey",
              }}
            >
              Employee Id: {props.employeeID}
            </p>
            {props.account ? (
              <p
                style={{
                  fontFamily: "Patrick Hand",
                  fontSize: "18px",
                  color: "darkslategrey",
                }}
              >
                Account: {account.toString()}
              </p>
            ) : (
              <p
                style={{
                  fontFamily: "Patrick Hand",
                  fontSize: "18px",
                  color: "darkslategrey",
                }}
              >
                Account: Not Assigned
              </p>
            )}
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "darkslategrey",
              }}
            >
              Total Records: {props.userRemRecords.length}
            </p>
            {props.adminMailId ? (
              <p
                style={{
                  fontFamily: "Patrick Hand",
                  fontSize: "18px",
                  color: "darkslategrey",
                }}
              >
                Admin Mail Id: {props.adminMailId}
              </p>
            ) : (
              <p
                style={{
                  fontFamily: "Patrick Hand",
                  fontSize: "18px",
                  color: "darkslategrey",
                }}
              >
                Admin Mail Id: Not Assigned
              </p>
            )}
            {props.approverMailId ? (
              <p
                style={{
                  fontFamily: "Patrick Hand",
                  fontSize: "18px",
                  color: "darkslategrey",
                }}
              >
                Approver Mail Id: {props.approverMailId}
              </p>
            ) : (
              <p
                style={{
                  fontFamily: "Patrick Hand",
                  fontSize: "18px",
                  color: "darkslategrey",
                }}
              >
                Approver Mail Id: Not Assigned
              </p>
            )}
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "blue",
              }}
            >
              Approved Records: {approvedRecords.length}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "red",
              }}
            >
              Rejected Records: {declinedRecords.length}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "brown",
              }}
            >
              Require Action:{filteredPendingApprovalRecords.length}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserData;

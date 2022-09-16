import React, { Fragment } from "react";
import "./ApproverRecords.css";

const ApproverData = (props) => {
  const totalRecords = props.approverRemRecords.filter(
    (id) => props.approverData[id].UserSpecificId === props.employeeID
  );
  const filteredPendingApprovalRecords = props.approverRemRecords.filter(
    (id) =>
      props.approverData[id].IsApproved === "" &&
      props.approverData[id].UserSpecificId === props.employeeID
  );

  const approvedRecords = props.approverRemRecords.filter(
    (id) =>
      props.approverData[id].IsApproved === "Yes" &&
      props.approverData[id].UserSpecificId === props.employeeID
  );

  const declinedRecords = props.approverRemRecords.filter(
    (id) =>
      props.approverData[id].IsApproved === "No" &&
      props.approverData[id].UserSpecificId === props.employeeID
  );
  return (
    <Fragment>
      <div className="ui segment" style={{ width: "300px" }}>
        <div className="analyticsMain-div">
          <div className="analytics-div">
            <h4 className="railCard-heading">Approver Record Details-</h4>
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
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "darkslategrey",
              }}
            >
              Total Records: {totalRecords.length}
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

export default ApproverData;

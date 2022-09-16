import React, { Fragment } from "react";
import "./ApproverMain.css";

const ReimbursementData = (props) => {
  const totalUserRecords = props.remRecords.filter(
    (id) =>
      props.data[id].EmployeeRole !== "approver" &&
      props.data[id].ApproverMailId === props.employeeMailId
  );

  const filteredPendingApprovalRecords = props.remRecords.filter(
    (id) =>
      props.data[id].IsApproved === "" &&
      props.data[id].EmployeeRole !== "approver" &&
      props.data[id].ApproverMailId === props.employeeMailId
  );

  const approvedRecords = props.remRecords.filter(
    (id) =>
      props.data[id].IsApproved === "Yes" &&
      props.data[id].EmployeeRole !== "approver" &&
      props.data[id].ApproverMailId === props.employeeMailId
  );

  const declinedRecords = props.remRecords.filter(
    (id) =>
      props.data[id].IsApproved === "No" &&
      props.data[id].EmployeeRole !== "approver" &&
      props.data[id].ApproverMailId === props.employeeMailId
  );
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
              Total Records: {totalUserRecords.length}
            </p>
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

export default ReimbursementData;

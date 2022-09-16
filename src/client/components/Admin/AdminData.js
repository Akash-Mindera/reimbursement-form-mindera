import React, { Fragment } from "react";
import "./AdminMain.css";

const ReimbursementData = (props) => {
  const filteredPendingApprovalRecords = props.adminRemRecords.filter(
    (id) =>
      // props.adminData[id].EmployeeRole === "user" &&
      props.adminData[id].IsApproved === "" &&
      props.adminData[id].AdminMailId === props.employeeMailId
  );

  const filteredAdminActionRecords = props.adminRemRecords.filter(
    (id) =>
      // props.adminData[id].EmployeeRole === "user" &&
      props.adminData[id].IsApproved === "Yes" &&
      props.adminData[id].IsFundsProcessed === "" &&
      props.adminData[id].AdminMailId === props.employeeMailId
  );

  const filteredFundsProcessedRecords = props.adminRemRecords.filter(
    (id) =>
      // props.adminData[id].EmployeeRole === "user" &&
      props.adminData[id].IsApproved === "Yes" &&
      props.adminData[id].IsFundsProcessed === "Yes" &&
      props.adminData[id].AdminMailId === props.employeeMailId
  );
  const filteredFundsDeclinedRecords = props.adminRemRecords.filter(
    (id) =>
      // props.adminData[id].EmployeeRole === "user" &&
      props.adminData[id].IsApproved === "Yes" &&
      props.adminData[id].IsFundsProcessed === "No" &&
      props.adminData[id].AdminMailId === props.employeeMailId
  );

  const approvedRecords = props.adminRemRecords.filter(
    (id) =>
      props.adminData[id].IsApproved === "Yes" &&
      props.adminData[id].AdminMailId === props.employeeMailId
  );

  const declinedRecords = props.adminRemRecords.filter(
    (id) =>
      props.adminData[id].IsApproved === "No" &&
      props.adminData[id].AdminMailId === props.employeeMailId
  );

  const totalRecords = props.adminRemRecords.filter(
    (id) => props.adminData[id].AdminMailId === props.employeeMailId
  );

  // console.log("Total Admin Records", totalRecords);

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
              Total Records: {totalRecords.length}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "blue",
              }}
            >
              Approved By Approver: {approvedRecords.length}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "red",
              }}
            >
              Rejected By Approver: {declinedRecords.length}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "brown",
              }}
            >
              Require Action By Approver:{filteredPendingApprovalRecords.length}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "brown",
              }}
            >
              Require Action By Admin:{filteredAdminActionRecords.length}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "brown",
              }}
            >
              Funds Processed:{filteredFundsProcessedRecords.length}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "brown",
              }}
            >
              Funds Declined:{filteredFundsDeclinedRecords.length}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReimbursementData;

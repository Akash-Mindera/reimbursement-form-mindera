import React, { Fragment } from "react";
import "./AdminRecords.css";

const AdminRecordsData = (props) => {
  const totalRecords = props.adminRemRecords.filter(
    (id) => props.adminData[id].UserSpecificId === props.employeeID
  );
  const filteredPendingApprovalRecords = props.adminRemRecords.filter(
    (id) =>
      props.adminData[id].IsApproved === "" &&
      props.adminData[id].UserSpecificId === props.employeeID
  );

  const approvedRecords = props.adminRemRecords.filter(
    (id) =>
      props.adminData[id].IsApproved === "Yes" &&
      props.adminData[id].UserSpecificId === props.employeeID
  );

  const declinedRecords = props.adminRemRecords.filter(
    (id) =>
      props.adminData[id].IsApproved === "No" &&
      props.adminData[id].UserSpecificId === props.employeeID
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

export default AdminRecordsData;

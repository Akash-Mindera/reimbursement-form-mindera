import React, { Fragment, useEffect, useState } from "react";
import "./RejectionModal.css";

import { auth, db, logout } from "../../../server/firebase";
import Select from "react-select";
const Modal = (props) => {
  if (!props.appShow) {
    return null;
  }

  const employeeSpecificAccountList = ["Choose", ...props.approvalAccountsList];

  return (
    <div className="modal">
      <div
        className={`modal-content ${props.appShow ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h4 className="modal-title">Approval </h4>
        </div>

        <div className="modal-body">
          <div className="detailCardNew">
            <div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Reimbursement ID:{" "}
                  <span className="spanDta-field">{props.approveId}</span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Employee ID:{" "}
                  <span className="spanDta-field">
                    {props.data[props.approveId].UserSpecificId}
                  </span>
                </h3>
              </div>

              {/* <div className="remList-single">
                <h3 className="h3Field-class">
                  Employee Account:{" "}
                  <span className="spanDta-field">
                    {props.data[props.approveId].EmployeeAccount}
                  </span>
                </h3>
              </div> */}

              <div className="remList-single">
                <h3 className="h3Field-class">
                  Employee Mail:{" "}
                  <span className="spanDta-field">
                    {props.data[props.approveId].EmployeeMail}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Expense Date:{" "}
                  <span className="spanDta-field">
                    {props.data[props.approveId].ExpenseDate}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Expense Category:{" "}
                  <span className="spanDta-field">
                    {props.data[props.approveId].ExpenseCategory}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Amount To Be Refunded:{" "}
                  <span className="spanDta-field">
                    {props.data[props.approveId].AmountToBeRefunded}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Invoice Attachment:{" "}
                  <a
                    download={props.data[props.approveId].Invoice}
                    href={props.data[props.approveId].Invoice}
                    title="Download pdf document"
                  >
                    Link
                  </a>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Invoice Date:{" "}
                  <span className="spanDta-field">
                    {props.data[props.approveId].InvoiceDate}
                  </span>
                </h3>
              </div>
              {props.data[props.approveId].ExpenseDescription ? (
                <div className="remList-single">
                  <h3 className="h3Field-class">
                    Expense Description:{" "}
                    <span className="spanDta-field">
                      {props.data[props.approveId].ExpenseDescription}
                    </span>
                  </h3>
                </div>
              ) : null}
              {props.data[props.approveId].VendorName ? (
                <div className="remList-single">
                  <h3 className="h3Field-class">
                    Vendor Name:{" "}
                    <span className="spanDta-field">
                      {props.data[props.approveId].VendorName}
                    </span>
                  </h3>
                </div>
              ) : null}
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Invoice Number:{" "}
                  <span className="spanDta-field">
                    {props.data[props.approveId].InvoiceNo}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Employee Consent:{" "}
                  <span className="spanDta-field">
                    {props.data[props.approveId].EmployeeConsent}
                  </span>
                </h3>
              </div>
              {props.data[props.approveId].PaidTo ? (
                <div className="remList-single">
                  <h3 className="h3Field-class">
                    Paid To:{" "}
                    <span className="spanDta-field">
                      {props.data[props.approveId].PaidTo}
                    </span>
                  </h3>
                </div>
              ) : null}
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Time:{" "}
                  <span className="spanDta-field">
                    {props.data[props.approveId].Time}
                  </span>
                </h3>
              </div>
            </div>
          </div>
          <h3 className="formHeading-h3">
            Please select an Account<span style={{ color: "red" }}>*</span>
          </h3>

          <form onSubmit={props.approvalSubmitHandler}>
            <Select
              options={employeeSpecificAccountList.map((account) => ({
                value: account,
                label: account,
              }))}
              value={props.account}
              defaultValue="null"
              onChange={props.selectAccountHandler}
              placeholder="Choose"
              maxMenuHeight={100}
              isDisabled={props.isApproveDisabled}
            />
            {props.accountError && (
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "red",
                  fontFamily: "Patrick Hand",
                }}
              >
                Please select an Account !
              </p>
            )}

            {props.isApproveDisabled ? (
              <div className="ui two buttons" style={{ paddingTop: "12px" }}>
                {" "}
                <button
                  className="ui green button"
                  style={{
                    fontSize: "18px",
                    cursor: "default",
                    fontFamily: "Patrick Hand",
                    fontWeight: "500",
                  }}
                >
                  {props.approveModalContent}
                </button>
              </div>
            ) : (
              <button className="ui green button" style={{ marginTop: "15px" }}>
                Approve
              </button>
            )}
          </form>
        </div>
        <div className="modal-footer">
          {!props.isApproveDisabled && (
            <button
              className="clearButton"
              onClick={props.onClearApproveModalHandler}
              disabled={props.isApproveDisabled}
            >
              Cancel{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

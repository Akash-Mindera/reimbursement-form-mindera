import React, { Fragment } from "react";
import "./RejectionModal.css";
const Modal = (props) => {
  if (!props.appShow) {
    return null;
  }
  return (
    <div className="modal">
      <div
        className={`modal-content ${props.appShow ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h4 className="modal-title">Funds Approval </h4>
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
                    {props.adminData[props.approveId].UserSpecificId}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Approved For:{" "}
                  <span className="spanDta-field">
                    {props.adminData[props.approveId].ApprovedAccount}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Employee Mail:{" "}
                  <span className="spanDta-field">
                    {props.adminData[props.approveId].EmployeeMail}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Expense Date:{" "}
                  <span className="spanDta-field">
                    {props.adminData[props.approveId].ExpenseDate}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Expense Category:{" "}
                  <span className="spanDta-field">
                    {props.adminData[props.approveId].ExpenseCategory}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Amount To Be Refunded:{" "}
                  <span className="spanDta-field">
                    {props.adminData[props.approveId].AmountToBeRefunded}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Invoice Attachment:{" "}
                  <a
                    download={props.adminData[props.approveId].Invoice}
                    href={props.adminData[props.approveId].Invoice}
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
                    {props.adminData[props.approveId].InvoiceDate}
                  </span>
                </h3>
              </div>
              {props.adminData[props.approveId].ExpenseDescription ? (
                <div className="remList-single">
                  <h3 className="h3Field-class">
                    Expense Description:{" "}
                    <span className="spanDta-field">
                      {props.adminData[props.approveId].ExpenseDescription}
                    </span>
                  </h3>
                </div>
              ) : null}
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Invoice Number:{" "}
                  <span className="spanDta-field">
                    {props.adminData[props.approveId].InvoiceNo}
                  </span>
                </h3>
              </div>
              {props.adminData[props.approveId].VendorName ? (
                <div className="remList-single">
                  <h3 className="h3Field-class">
                    Vendor Name:{" "}
                    <span className="spanDta-field">
                      {props.adminData[props.approveId].VendorName}
                    </span>
                  </h3>
                </div>
              ) : null}
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Employee Consent:{" "}
                  <span className="spanDta-field">
                    {props.adminData[props.approveId].EmployeeConsent}
                  </span>
                </h3>
              </div>
              {props.adminData[props.approveId].PaidTo ? (
                <div className="remList-single">
                  <h3 className="h3Field-class">
                    Paid To:{" "}
                    <span className="spanDta-field">
                      {props.adminData[props.approveId].PaidTo}
                    </span>
                  </h3>
                </div>
              ) : null}
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Time:{" "}
                  <span className="spanDta-field">
                    {props.adminData[props.approveId].Time}
                  </span>
                </h3>
              </div>
            </div>
          </div>

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
            <button
              className="ui green button"
              style={{ marginTop: "15px" }}
              onClick={props.approvalSubmitHandler}
            >
              Approve Funds
            </button>
          )}
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

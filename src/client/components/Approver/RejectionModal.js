import React, { Fragment } from "react";
import "./RejectionModal.css";
import Select from "react-select";
const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  const employeeSpecificAccountList = [
    "Choose",
    ...props.rejectionAccountsList,
  ];

  return (
    <div className="modal">
      <div
        className={`modal-content ${props.show ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h4 className="modal-title">Rejection </h4>
        </div>

        <div className="modal-body">
          <h3 className="formHeading-h3">
            Enter Rejection Reason<span style={{ color: "red" }}>*</span>
          </h3>
          <div className="detailCardNew">
            <div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Reimbursement ID:{" "}
                  <span className="spanDta-field">{props.remId}</span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Employee ID:{" "}
                  <span className="spanDta-field">
                    {props.data[props.remId].UserSpecificId}
                  </span>
                </h3>
              </div>
              {/* <div className="remList-single">
                <h3 className="h3Field-class">
                  Employee Account:{" "}
                  <span className="spanDta-field">
                    {props.data[props.remId].EmployeeAccount}
                  </span>
                </h3>
              </div> */}
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Employee Mail:{" "}
                  <span className="spanDta-field">
                    {props.data[props.remId].EmployeeMail}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Expense Date:{" "}
                  <span className="spanDta-field">
                    {props.data[props.remId].ExpenseDate}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Expense Category:{" "}
                  <span className="spanDta-field">
                    {props.data[props.remId].ExpenseCategory}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Amount To Be Refunded:{" "}
                  <span className="spanDta-field">
                    {props.data[props.remId].AmountToBeRefunded}
                  </span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Invoice Attachment:{" "}
                  <a
                    download={props.data[props.remId].Invoice}
                    href={props.data[props.remId].Invoice}
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
                    {props.data[props.remId].InvoiceDate}
                  </span>
                </h3>
              </div>
              {props.data[props.remId].ExpenseDescription ? (
                <div className="remList-single">
                  <h3 className="h3Field-class">
                    Expense Description:{" "}
                    <span className="spanDta-field">
                      {props.data[props.remId].ExpenseDescription}
                    </span>
                  </h3>
                </div>
              ) : null}
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Invoice Number:{" "}
                  <span className="spanDta-field">
                    {props.data[props.remId].InvoiceNo}
                  </span>
                </h3>
              </div>
              {props.data[props.remId].VendorName ? (
                <div className="remList-single">
                  <h3 className="h3Field-class">
                    Vendor Name:{" "}
                    <span className="spanDta-field">
                      {props.data[props.remId].VendorName}
                    </span>
                  </h3>
                </div>
              ) : null}
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Employee Consent:{" "}
                  <span className="spanDta-field">
                    {props.data[props.remId].EmployeeConsent}
                  </span>
                </h3>
              </div>
              {props.data[props.remId].PaidTo ? (
                <div className="remList-single">
                  <h3 className="h3Field-class">
                    Paid To:{" "}
                    <span className="spanDta-field">
                      {props.data[props.remId].PaidTo}
                    </span>
                  </h3>
                </div>
              ) : null}
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Time:{" "}
                  <span className="spanDta-field">
                    {props.data[props.remId].Time}
                  </span>
                </h3>
              </div>
            </div>
          </div>
          <form onSubmit={props.rejectionSubmitHandler}>
            <h3 className="formHeading-h3">
              Please select an Account<span style={{ color: "red" }}>*</span>
            </h3>
            <Select
              options={employeeSpecificAccountList.map((account) => ({
                value: account,
                label: account,
              }))}
              value={props.rejectAccount}
              defaultValue="null"
              onChange={props.rejectAccountHandler}
              placeholder="Choose"
              maxMenuHeight={100}
              isDisabled={props.isDisabled}
            />
            {props.rejectAccountError && (
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
            <input
              type="text"
              onChange={props.rejectionInputHandler}
              placeholder="Reason"
              className="modalInput"
              value={props.rejectReason}
            />
            {props.rejectError !== "" ? (
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "red",
                  fontFamily: "Patrick Hand",
                }}
              >
                {props.rejectError}
              </p>
            ) : null}

            {props.isDisabled ? (
              <div className="ui two buttons" style={{ paddingTop: "12px" }}>
                {" "}
                <button
                  className="ui red button"
                  style={{
                    fontSize: "18px",
                    cursor: "default",
                    fontFamily: "Patrick Hand",
                    fontWeight: "500",
                  }}
                >
                  {props.rejectModalContent}
                </button>
              </div>
            ) : (
              <button className="ui red button" style={{ marginTop: "15px" }}>
                Reject
              </button>
            )}
          </form>
        </div>
        <div className="modal-footer">
          {!props.isDisabled && (
            <button
              className="clearButton"
              onClick={props.onClearModalHandler}
              disabled={props.isDisabled}
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

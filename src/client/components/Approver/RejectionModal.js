import React, { Fragment, useEffect, useState } from "react";

import { db } from "../../../server/firebase";

import { updateDoc, doc } from "firebase/firestore";
import Creatable from "react-select/creatable";
import { Oval } from "react-loader-spinner";
import downloadBase64Data from "../../utils/FileSaver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RejectionModal.css";

import "./RejectionModal.css";

const Modal = (props) => {
  const [isDisabled, setIsDisabled] = useState(false);
  if (!props.show) {
    return null;
  }

  const employeeSpecificAccountList = [
    "Choose",
    ...props.rejectionAccountsList,
  ];

  const handleOptionCreate = async (inputValue) => {
    console.log("Create Option", inputValue);
    if (window.confirm("Are you sure you want to add a new account ?")) {
      if (props.id !== "") {
        setIsDisabled(true);
        const userAuthDbRef = doc(db, "UserAuth", props.rejId);

        try {
          await updateDoc(userAuthDbRef, {
            account: [...props.rejectionAccountsList, inputValue],
          }).then(() => {
            setIsDisabled(false);
            setIsDisabled(false);
            toast.success("New Account is added.");
          });
        } catch {
          setIsDisabled(false);
          toast.error("There is problem adding a new account");
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="modal">
        <div
          className={`modal-content ${props.show ? "show" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h4 className="modal-title">Rejection </h4>
          </div>

          <div className="modal-body">
            {props.rejectedformDataById.length !== 0 ? (
              <div>
                <h3 className="formHeading-h3">
                  Enter Rejection Reason<span style={{ color: "red" }}>*</span>
                </h3>
                <div className="detailCardNew">
                  {props.rejectedformDataById.map((data) => (
                    <div key={data._id}>
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Reimbursement ID:{" "}
                          <span className="spanDta-field">{data._id}</span>
                        </h3>
                      </div>
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Employee ID:{" "}
                          <span className="spanDta-field">
                            {data.UserSpecificId}
                          </span>
                        </h3>
                      </div>

                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Employee Mail:{" "}
                          <span className="spanDta-field">
                            {data.EmployeeMail}
                          </span>
                        </h3>
                      </div>
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Expense Date:{" "}
                          <span className="spanDta-field">
                            {data.ExpenseDate}
                          </span>
                        </h3>
                      </div>
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Expense Category:{" "}
                          <span className="spanDta-field">
                            {data.ExpenseCategory}
                          </span>
                        </h3>
                      </div>
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Amount To Be Refunded:{" "}
                          <span className="spanDta-field">
                            {data.AmountToBeRefunded}
                          </span>
                        </h3>
                      </div>

                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Invoice Attachment:{" "}
                          <button
                            style={{
                              color: "var(--bs-link-color)",
                              textDecoration: "underline",
                              border: "none",
                              background: "transparent",
                              fontWeight: "600",
                            }}
                            onClick={() =>
                              downloadBase64Data(
                                data.Invoice,
                                data.InvoiceFileName
                              )
                            }
                          >
                            Download
                          </button>
                        </h3>
                      </div>
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Invoice Date:{" "}
                          <span className="spanDta-field">
                            {data.InvoiceDate}
                          </span>
                        </h3>
                      </div>
                      {data.ExpenseDescription ? (
                        <div className="remList-single">
                          <h3 className="h3Field-class">
                            Expense Description:{" "}
                            <span className="spanDta-field">
                              {data.ExpenseDescription}
                            </span>
                          </h3>
                        </div>
                      ) : null}
                      {data.VendorName ? (
                        <div className="remList-single">
                          <h3 className="h3Field-class">
                            Vendor Name:{" "}
                            <span className="spanDta-field">
                              {data.VendorName}
                            </span>
                          </h3>
                        </div>
                      ) : null}
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Invoice Number:{" "}
                          <span className="spanDta-field">
                            {data.InvoiceNo}
                          </span>
                        </h3>
                      </div>
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Employee Consent:{" "}
                          <span className="spanDta-field">
                            {data.EmployeeConsent}
                          </span>
                        </h3>
                      </div>
                      {data.PaidTo ? (
                        <div className="remList-single">
                          <h3 className="h3Field-class">
                            Paid To:{" "}
                            <span className="spanDta-field">{data.PaidTo}</span>
                          </h3>
                        </div>
                      ) : null}
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Time:{" "}
                          <span className="spanDta-field">{data.Time}</span>
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={props.rejectionSubmitHandler}>
                  <h3 className="formHeading-h3">
                    Please select an Account
                    <span style={{ color: "red" }}>*</span>
                  </h3>
                  <Creatable
                    options={employeeSpecificAccountList.map((account) => ({
                      value: account,
                      label: account,
                    }))}
                    value={props.rejectAccount}
                    defaultValue="null"
                    onChange={props.rejectAccountHandler}
                    placeholder="Choose"
                    maxMenuHeight={100}
                    isDisabled={props.Disabled}
                    isLoading={isDisabled}
                    onCreateOption={handleOptionCreate}
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
                    <div
                      className="ui two buttons"
                      style={{ paddingTop: "12px" }}
                    >
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
                    <button
                      className="ui red button"
                      style={{ marginTop: "15px" }}
                    >
                      Reject
                    </button>
                  )}
                </form>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItem: "center",
                }}
              >
                <Oval
                  height={100}
                  width={100}
                  color="#DC143C"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#DC143C"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            )}
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default Modal;

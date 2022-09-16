import React, { Fragment } from "react";
import { useState } from "react";
import Pagination from "../../utils/Pagination";
import "./User.css";
const RejectedRecord = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredUserRejectedRecords = props.userRemRecords.filter(
    (id) => props.userData[id].IsApproved === "No"
  );

  const currentUserRejectedRecords = filteredUserRejectedRecords.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      {" "}
      {currentUserRejectedRecords.length !== 0 ? (
        <div className="detailsMaindiv">
          <div className="flexdetails">
            <div className="flex-individual">
              {currentUserRejectedRecords.map((id) => (
                <div key={id} className="detailCardNew">
                  <div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Reimbursement ID:{" "}
                        <span className="spanDta-field">{id}</span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Employee ID:{" "}
                        <span className="spanDta-field">
                          {props.userData[id].UserSpecificId}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Rejected For:{" "}
                        <span className="spanDta-field">
                          {props.userData[id].RejectedAccount}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Employee Mail:{" "}
                        <span className="spanDta-field">
                          {props.userData[id].EmployeeMail}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Expense Date:{" "}
                        <span className="spanDta-field">
                          {props.userData[id].ExpenseDate}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Expense Category:{" "}
                        <span className="spanDta-field">
                          {props.userData[id].ExpenseCategory}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Amount To Be Refunded:{" "}
                        <span className="spanDta-field">
                          {props.userData[id].AmountToBeRefunded}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Invoice Attachment:{" "}
                        <a
                          download={props.userData[id].Invoice}
                          href={props.userData[id].Invoice}
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
                          {props.userData[id].InvoiceDate}
                        </span>
                      </h3>
                    </div>
                    {props.userData[id].ExpenseDescription ? (
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Expense Description:{" "}
                          <span className="spanDta-field">
                            {props.userData[id].ExpenseDescription}
                          </span>
                        </h3>
                      </div>
                    ) : null}
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Invoice Number:{" "}
                        <span className="spanDta-field">
                          {props.userData[id].InvoiceNo}
                        </span>
                      </h3>
                    </div>
                    {props.userData[id].VendorName ? (
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Vendor Name:{" "}
                          <span className="spanDta-field">
                            {props.userData[id].VendorName}
                          </span>
                        </h3>
                      </div>
                    ) : null}
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Employee Consent:{" "}
                        <span className="spanDta-field">
                          {props.userData[id].EmployeeConsent}
                        </span>
                      </h3>
                    </div>
                    {props.userData[id].PaidTo ? (
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Paid To:{" "}
                          <span className="spanDta-field">
                            {props.userData[id].PaidTo}
                          </span>
                        </h3>
                      </div>
                    ) : null}
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Time:{" "}
                        <span className="spanDta-field">
                          {props.userData[id].Time}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Rejection Reason:{" "}
                        <span className="spanDta-field">
                          {props.userData[id].RejectionReason}
                        </span>
                      </h3>
                    </div>
                  </div>

                  {props.userData[id].IsApproved === "No" && (
                    <div
                      className="ui two buttons"
                      style={{ paddingTop: "12px" }}
                    >
                      <button
                        className="ui red button"
                        style={{
                          fontSize: "18px",
                          cursor: "default",
                          fontFamily: "Patrick Hand",
                          fontWeight: "500",
                        }}
                      >
                        Rejected
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              margin: "auto",
              maxWidth: "80%",
              paddingTop: "20px",
            }}
          >
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filteredUserRejectedRecords.length}
              paginate={paginate}
            />
          </div>
        </div>
      ) : (
        <div
          style={{ margin: "auto", marginTop: "20px" }}
          className="noRecords-div"
        >
          <p
            style={{
              fontFamily: "Patrick Hand",
              fontSize: "22px",
              color: "black",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            No Rejected Records Founds !
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default RejectedRecord;

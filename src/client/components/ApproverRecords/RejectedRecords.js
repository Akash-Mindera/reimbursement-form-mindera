import React, { Fragment } from "react";
import { useState } from "react";
import Pagination from "../../utils/Pagination";
import "./ApproverRecords.css";
const RejectedRecord = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredUserRejectedRecords = props.approverRemRecords.filter(
    (id) =>
      props.approverData[id].IsApproved === "No" &&
      props.approverData[id].UserSpecificId === props.employeeID
  );

  const approverRejectedRecords = filteredUserRejectedRecords.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      {" "}
      {approverRejectedRecords.length !== 0 ? (
        <div className="detailsMaindiv">
          <div className="flexdetails">
            <div className="flex-individual">
              {approverRejectedRecords.map((id) => (
                <div key={id} className="detailCardNew">
                  <div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Employee ID:{" "}
                        <span className="spanDta-field">
                          {props.approverData[id].UserSpecificId}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Employee Mail:{" "}
                        <span className="spanDta-field">
                          {props.approverData[id].EmployeeMail}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Expense Date:{" "}
                        <span className="spanDta-field">
                          {props.approverData[id].ExpenseDate}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Expense Category:{" "}
                        <span className="spanDta-field">
                          {props.approverData[id].ExpenseCategory}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Amount To Be Refunded:{" "}
                        <span className="spanDta-field">
                          {props.approverData[id].AmountToBeRefunded}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Invoice Attachment:{" "}
                        <a
                          download={props.approverData[id].Invoice}
                          href={props.approverData[id].Invoice}
                          title="Download pdf document"
                        >
                          Link
                        </a>
                      </h3>
                    </div>
                    {props.approverData[id].ExpenseDescription ? (
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Expense Description:{" "}
                          <span className="spanDta-field">
                            {props.approverData[id].ExpenseDescription}
                          </span>
                        </h3>
                      </div>
                    ) : null}
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Invoice Number:{" "}
                        <span className="spanDta-field">
                          {props.approverData[id].InvoiceNo}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Employee Consent:{" "}
                        <span className="spanDta-field">
                          {props.approverData[id].EmployeeConsent}
                        </span>
                      </h3>
                    </div>
                    {props.approverData[id].PaidTo ? (
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Paid To:{" "}
                          <span className="spanDta-field">
                            {props.approverData[id].PaidTo}
                          </span>
                        </h3>
                      </div>
                    ) : null}
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Time:{" "}
                        <span className="spanDta-field">
                          {props.approverData[id].Time}
                        </span>
                      </h3>
                    </div>
                  </div>

                  {props.approverData[id].IsApproved === "No" && (
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

import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./ApproverMain.css";
import realtimeDbUrl from "../../../server/dataBaseUrl";
import Pagination from "../../utils/Pagination";

const RejectedResponses = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [loadingState, setLoadingState] = useState(false);
  const [searchRemRecords, setSearchRemRecords] = useState(props.remRecords);
  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage] = useState(6);

  const handleDataSearch = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSearch = () => {
    const filterUrl = `${realtimeDbUrl}/ReimbursementRecords.json?auth=${
      props.approverAccessToken
    }orderBy="UserSpecificId"&equalTo="${searchTerm.toLocaleUpperCase()}"`;
    const filterRecords = async () => {
      setLoadingState(true);
      const res = await axios.get(filterUrl);
      const filteredData = res.data;
      if (searchTerm === "") {
        setSearchRemRecords(props.remRecords);
        setLoadingState(false);
      } else {
        setCurrentPage(1);
        setSearchRemRecords(Object.keys(filteredData));
        setLoadingState(false);
      }
    };
    filterRecords();
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredRejectedRecords = searchRemRecords.filter(
    (id) =>
      props.data[id].IsApproved === "No" &&
      props.data[id].ApproverMailId === props.employeeMailId
  );

  const currentRejectedRecords = filteredRejectedRecords.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <label
        style={{
          display: "block",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            fontFamily: "Patrick Hand",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          Search By Employee ID
        </p>
      </label>

      <div className="ui category search" style={{ display: "inline-block" }}>
        <div className="ui icon input">
          <input
            className="prompt"
            type="text"
            placeholder="Employee-ID"
            onChange={handleDataSearch}
            value={searchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <button
        className={!loadingState ? "ui button" : "ui loading button"}
        onClick={handleSearch}
        style={{ marginLeft: "10px" }}
      >
        Search
      </button>

      {currentRejectedRecords.length !== 0 ? (
        <div className="detailsMaindiv">
          <div className="flexdetails">
            <div className="flex-individual">
              {currentRejectedRecords.map((id) => (
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
                          {props.data[id].UserSpecificId}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Employee Account:{" "}
                        <span className="spanDta-field">
                          {props.data[id].RejectedAccount}
                        </span>
                      </h3>
                    </div>

                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Employee Mail:{" "}
                        <span className="spanDta-field">
                          {props.data[id].EmployeeMail}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Expense Date:{" "}
                        <span className="spanDta-field">
                          {props.data[id].ExpenseDate}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Expense Category:{" "}
                        <span className="spanDta-field">
                          {props.data[id].ExpenseCategory}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Amount To Be Refunded:{" "}
                        <span className="spanDta-field">
                          {props.data[id].AmountToBeRefunded}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Invoice Attachment:{" "}
                        <a
                          download={props.data[id].Invoice}
                          href={props.data[id].Invoice}
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
                          {props.data[id].InvoiceDate}
                        </span>
                      </h3>
                    </div>
                    {props.data[id].ExpenseDescription ? (
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Expense Description:{" "}
                          <span className="spanDta-field">
                            {props.data[id].ExpenseDescription}
                          </span>
                        </h3>
                      </div>
                    ) : null}
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Invoice Number:{" "}
                        <span className="spanDta-field">
                          {props.data[id].InvoiceNo}
                        </span>
                      </h3>
                    </div>
                    {props.data[id].VendorName ? (
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Expense Description:{" "}
                          <span className="spanDta-field">
                            {props.data[id].VendorName}
                          </span>
                        </h3>
                      </div>
                    ) : null}
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Employee Consent:{" "}
                        <span className="spanDta-field">
                          {props.data[id].EmployeeConsent}
                        </span>
                      </h3>
                    </div>
                    {props.data[id].PaidTo ? (
                      <div className="remList-single">
                        <h3 className="h3Field-class">
                          Paid To:{" "}
                          <span className="spanDta-field">
                            {props.data[id].PaidTo}
                          </span>
                        </h3>
                      </div>
                    ) : null}
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Time:{" "}
                        <span className="spanDta-field">
                          {props.data[id].Time}
                        </span>
                      </h3>
                    </div>
                    <div className="remList-single">
                      <h3 className="h3Field-class">
                        Rejection Reason:{" "}
                        <span className="spanDta-field">
                          {props.data[id].RejectionReason}
                        </span>
                      </h3>
                    </div>
                  </div>

                  {props.data[id].IsApproved === "Yes" && (
                    <div
                      className="ui two buttons"
                      style={{ paddingTop: "12px" }}
                    >
                      <button
                        className="ui green button"
                        style={{
                          fontSize: "18px",
                          cursor: "default",
                          fontFamily: "Patrick Hand",
                          fontWeight: "500",
                        }}
                      >
                        Approved
                      </button>
                    </div>
                  )}
                  {props.data[id].IsApproved === "No" && (
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
              totalPosts={filteredRejectedRecords.length}
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
            No Data Found !
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default RejectedResponses;

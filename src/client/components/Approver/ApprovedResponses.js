import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./ApproverMain.css";
import moment from "moment";
import realtimeDbUrl from "../../../server/dataBaseUrl";
import Pagination from "../../utils/Pagination";

const ApprovedResponses = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [resetState, setResetState] = useState(false);
  const [searchRemRecords, setSearchRemRecords] = useState(props.remRecords);
  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage] = useState(6);

  const handleDataSearch = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleDateChange = (e) => {
    console.log(e.target.value);
    setExpenseDate(e.target.value);
  };

  const handleReset = (e) => {
    setResetState(true);
    setSearchTerm("");
    setExpenseDate("");
    setSearchRemRecords(props.remRecords);
    setResetState(false);
  };

  const handleSearch = () => {
    const filterByIdUrl = `${realtimeDbUrl}/ReimbursementRecords.json?auth=${
      props.approverAccessToken
    }&orderBy="UserSpecificId"&equalTo="${searchTerm.toLocaleUpperCase()}"`;
    const filterByDateUrl = `${realtimeDbUrl}/ReimbursementRecords.json?auth=${props.approverAccessToken}&orderBy="ExpenseDate"&equalTo="${expenseDate}"`;
    const filterRecords = async () => {
      setLoadingState(true);
      const res = await axios.get(filterByIdUrl);
      const dateRes = await axios.get(filterByDateUrl);
      const filteredData = res.data;
      const filterDataByDate = dateRes.data;
      if (searchTerm === "" && expenseDate === "") {
        setSearchRemRecords(props.remRecords);
        setLoadingState(false);
      } else if (searchTerm !== "" && expenseDate === "") {
        setCurrentPage(1);
        setSearchRemRecords(Object.keys(filteredData));
        setLoadingState(false);
      } else if (searchTerm !== "" && expenseDate !== "") {
        setCurrentPage(1);
        setSearchRemRecords(
          Object.keys(filteredData).filter(
            (id) => props.data[id].ExpenseDate === expenseDate
          )
        );
        setLoadingState(false);
      } else {
        setCurrentPage(1);
        setSearchRemRecords(Object.keys(filterDataByDate));
        setLoadingState(false);
      }
    };
    filterRecords();
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredApprovedRecords = searchRemRecords.filter(
    (id) =>
      props.data[id].IsApproved === "Yes" &&
      props.data[id].ApproverMailId === props.employeeMailId
  );

  const currentApprovedRecords = filteredApprovedRecords.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // console.log("From Approved Response", filteredApprovedRecords);

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
          Search By Employee ID & Expense Date
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

      <input
        type="date"
        onChange={handleDateChange}
        value={expenseDate}
        // required
        className="expenseApproverInput"
        mandatory="true"
        // aria-invalid={props.dateError ? "true" : "false"}

        max={moment().format("YYYY-MM-DD")}
        onKeyDown={props.disableKeyDown}
      />

      <button
        className={!loadingState ? "ui button" : "ui loading button"}
        onClick={handleSearch}
        style={{ marginLeft: "10px" }}
      >
        Search
      </button>

      <button
        className={
          !resetState ? "ui secondary button" : "ui loading secondary button"
        }
        onClick={handleReset}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button>

      {currentApprovedRecords.length !== 0 ? (
        <div className="detailsMaindiv">
          <div className="flexdetails">
            <div className="flex-individual">
              {currentApprovedRecords.map((id) => (
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
                          {props.data[id].ApprovedAccount}
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
              totalPosts={filteredApprovedRecords.length}
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

export default ApprovedResponses;

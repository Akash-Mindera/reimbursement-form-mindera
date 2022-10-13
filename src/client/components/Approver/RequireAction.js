import React, { Fragment } from "react";
import "./ApproverMain.css";
import { useState, useEffect } from "react";
import moment from "moment";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";

import { auth } from "../../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Pagination from "../../utils/ReactPaginate";
import downloadBase64Data from "../../utils/FileSaver";
import axios from "axios";

const RequireAction = (props) => {
  const [user] = useAuthState(auth);

  const [pageCount, setPageCount] = useState(0);
  const [requireActionByApproverData, setRequireActionByApproverData] =
    useState([]);

  const [employeeId, setEmployeeId] = useState("");

  const [createdAtDate, setCreatedAtDate] = useState("");

  const [operation, setOperation] = useState(false);

  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    trackPromise(getResponse());
  }, [user, props.employeeMailId]);

  const handleDataSearch = (e) => {
    setEmployeeId(e.target.value.trim().toUpperCase());
  };

  const handleDateChange = (e) => {
    console.log(e.target.value);
    setCreatedAtDate(e.target.value);
  };

  const getResponse = async () => {
    if (props.employeeMailId) {
      let API = `/requireActionByApprover/${props.employeeMailId}`;
      const response = await axios.get(`${API}?page=0`, {
        headers: {
          authToken: user.accessToken,
        },
      });

      setRequireActionByApproverData(response.data.data);
      setPageCount(response.data.total);
    }
  };

  const handleSearch = (e) => {
    setOperation(true);
    const getSearchResponse = async () => {
      if (employeeId !== "" && createdAtDate !== "") {
        const searchTerm = employeeId;
        const dateTerm = createdAtDate;
        let searchAPI = `/requireActionByApproverUsingSearch/${props.employeeMailId}`;
        const response = await axios.get(
          `${searchAPI}?employeeId=${searchTerm}&createdAt=${dateTerm}`,
          {
            headers: {
              authToken: user.accessToken,
            },
          }
        );
        setRequireActionByApproverData(response.data.data);
      } else if (employeeId === "" && createdAtDate !== "") {
        const dateTerm = createdAtDate;
        let searchAPI = `/requireActionByApproverUsingSearch/${props.employeeMailId}`;
        const response = await axios.get(`${searchAPI}?createdAt=${dateTerm}`, {
          headers: {
            authToken: user.accessToken,
          },
        });
        setRequireActionByApproverData(response.data.data);
      } else if (employeeId !== "" && createdAtDate === "") {
        const searchTerm = employeeId;
        let searchAPI = `/requireActionByApproverUsingSearch/${props.employeeMailId}`;
        const response = await axios.get(
          `${searchAPI}?employeeId=${searchTerm}`,
          {
            headers: {
              authToken: user.accessToken,
            },
          }
        );
        setRequireActionByApproverData(response.data.data);
      } else {
        setOperation(false);
        let API = `/requireActionByApprover/${props.employeeMailId}`;
        const response = await axios.get(`${API}?page=0`, {
          headers: {
            authToken: user.accessToken,
          },
        });
        setRequireActionByApproverData(response.data.data);
        setPageCount(response.data.total);
      }
    };
    trackPromise(getSearchResponse());
  };

  const handlePageClick = (data) => {
    let currentPage = data.selected;

    const paginatedResponse = async () => {
      let API = `/requireActionByApprover/${props.employeeMailId}`;
      const response = await axios.get(`${API}?page=${currentPage}`, {
        headers: {
          authToken: user.accessToken,
        },
      });

      setRequireActionByApproverData(response.data.data);
    };

    paginatedResponse();
  };

  const handleReset = () => {
    trackPromise(getResponse());
    setEmployeeId("");
    setCreatedAtDate("");
    setOperation(false);
  };

  const fetchLatestData = (e) => {
    trackPromise(getResponse());
    setEmployeeId("");
    setCreatedAtDate("");
    setOperation(false);
  };

  // console.log("From require Action", props.approvalStates);

  return (
    <Fragment>
      {promiseInProgress === true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div>
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
              Search By Employee ID & Created Date
            </p>
          </label>

          <div
            className="ui category search"
            style={{ display: "inline-block" }}
          >
            <div className="ui icon input">
              <input
                // ref={inputRef}
                className="prompt"
                type="text"
                placeholder="Employee-ID"
                onChange={handleDataSearch}
                value={employeeId}
              />
              <i className="search icon"></i>
            </div>
          </div>

          <input
            type="date"
            onChange={handleDateChange}
            value={createdAtDate}
            className="expenseApproverInput"
            mandatory="true"
            max={moment().format("YYYY-MM-DD")}
            onKeyDown={props.disableKeyDown}
          />

          <button
            className={"ui button"}
            onClick={handleSearch}
            style={{ marginLeft: "10px" }}
          >
            Search
          </button>

          <button
            className={"ui secondary button"}
            onClick={handleReset}
            style={{ marginLeft: "10px" }}
          >
            Reset
          </button>

          <div style={{ display: "block", marginTop: "15px" }}>
            {" "}
            <button className="ui teal basic button" onClick={fetchLatestData}>
              {promiseInProgress === true ? "Fetching..." : "Fetch Latest Data"}
            </button>
          </div>

          {requireActionByApproverData.length !== 0 ? (
            <div className="detailsMaindiv">
              <div className="flexdetails">
                <div className="flex-individual">
                  {requireActionByApproverData.map((data, index) => (
                    <div key={data._id} className="detailCardNew">
                      <div>
                        <div className="remList-single">
                          <h3 className="h3Field-class">
                            Reimbursement Id:{" "}
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
                        <div className="remList-single">
                          <h3 className="h3Field-class">
                            Invoice Number:{" "}
                            <span className="spanDta-field">
                              {data.InvoiceNo}
                            </span>
                          </h3>
                        </div>
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
                              <span className="spanDta-field">
                                {data.PaidTo}
                              </span>
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
                      {data.IsApproved === "" && (
                        <div
                          className="ui two buttons"
                          style={{ paddingTop: "12px" }}
                        >
                          {props.rejectResponse !== index ? (
                            <button
                              style={{ cursor: "pointer" }}
                              className="ui basic green button"
                              onClick={() =>
                                props.approvalHandler(data._id, index)
                              }
                              disabled={
                                props.approveResponse === index && "disabled"
                              }
                            >
                              {props.approveResponse === index
                                ? "Approving ..."
                                : "Approve"}
                            </button>
                          ) : null}
                          {props.approveResponse !== index ? (
                            <button
                              style={{ cursor: "pointer" }}
                              className="ui basic red button"
                              onClick={() =>
                                props.declineHandler(data._id, index)
                              }
                              disabled={
                                props.rejectResponse === index && "disabled"
                              }
                            >
                              {props.rejectResponse === index
                                ? "Rejecting ..."
                                : "Reject"}
                            </button>
                          ) : null}
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
                {operation !== true && (
                  <Pagination
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                  />
                )}
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
                No Data Found!
              </p>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default RequireAction;

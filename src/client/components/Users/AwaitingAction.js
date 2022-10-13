import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { auth } from "../../../server/firebase";
import axios from "axios";
import Pagination from "../../utils/ReactPaginate";
// import ReactPaginate from "react-paginate";
import { useAuthState } from "react-firebase-hooks/auth";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";

import "./User.css";

const AwaitingAction = (props) => {
  const [user] = useAuthState(auth);
  const { promiseInProgress } = usePromiseTracker();
  const [pendingUserData, setPendingUserData] = useState([]);

  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (props.tab1 === true) {
      trackPromise(getResponse());
    }
  }, [user, props.tab1, props.employeeID]);

  const getResponse = async () => {
    if (props.employeeID) {
      const response = await axios.get(
        `/pendingUserData/${props.employeeID}?page=0`,
        {
          headers: {
            authToken: user.accessToken,
          },
        }
      );
      setPendingUserData(response.data.data);
      setPageCount(response.data.total);
    }
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    const response = await axios.get(
      `/pendingUserData/${props.employeeID}?page=${currentPage}`,
      {
        headers: {
          authToken: user.accessToken,
        },
      }
    );

    setPendingUserData(response.data.data);
  };

  const fetchLatestData = () => {
    trackPromise(getResponse());
  };

  // console.log(pendingUserData.map((data) => data.Time));

  // console.log(pendingUserData);

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
          <button className="ui teal basic button" onClick={fetchLatestData}>
            {promiseInProgress === true ? "Fetching..." : "Fetch Latest Data"}
          </button>
          {pendingUserData.length !== 0 ? (
            <div className="detailsMaindiv">
              <div className="flexdetails">
                <div className="flex-individual">
                  {pendingUserData.map((data) => (
                    <div key={data._id} className="detailCardNew">
                      <div>
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
                            <a
                              download={data.Invoice}
                              href={data.Invoice}
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
                          <button
                            className="ui brown button"
                            style={{
                              fontSize: "18px",
                              cursor: "default",
                              fontFamily: "Patrick Hand",
                              fontWeight: "500",
                            }}
                          >
                            Awaiting Action
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
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
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
                No Awaiting Records Founds !
              </p>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default AwaitingAction;

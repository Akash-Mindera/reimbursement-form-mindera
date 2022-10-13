import React, { Fragment } from "react";
import { auth } from "../../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import "./User.css";

const UserData = (props) => {
  const [user] = useAuthState(auth);
  const { promiseInProgress } = usePromiseTracker();
  const [totalRecords, setTotalRecords] = useState([]);

  const filteredPendingApprovalRecords = totalRecords.filter(
    (records) => records.IsApproved === ""
  );

  const approvedRecords = totalRecords.filter(
    (records) => records.IsApproved === "Yes"
  );

  const declinedRecords = totalRecords.filter(
    (records) => records.IsApproved === "No"
  );

  const account = props.account;

  useEffect(() => {
    trackPromise(fetchTotalRecords());
  }, [user, props.employeeID]);

  const fetchTotalRecords = async () => {
    if (props.employeeID) {
      const response = await axios.get(`/totalUserData/${props.employeeID}`, {
        headers: {
          authToken: user.accessToken,
        },
      });
      setTotalRecords(response.data);
    }
  };

  return (
    <Fragment>
      <div>
        <div className="ui segment" style={{ width: "300px" }}>
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
            <div className="analyticsMain-div">
              <div className="analytics-div">
                <h4 className="railCard-heading">
                  Reimbursement Record Details-
                </h4>
                <p
                  style={{
                    fontFamily: "Patrick Hand",
                    fontSize: "18px",
                    color: "darkslategrey",
                  }}
                >
                  Name: {props.name}
                </p>
                <p
                  style={{
                    fontFamily: "Patrick Hand",
                    fontSize: "18px",
                    color: "darkslategrey",
                  }}
                >
                  Employee Id: {props.employeeID}
                </p>
                {props.account ? (
                  <p
                    style={{
                      fontFamily: "Patrick Hand",
                      fontSize: "18px",
                      color: "darkslategrey",
                    }}
                  >
                    Account: {account.toString()}
                  </p>
                ) : (
                  <p
                    style={{
                      fontFamily: "Patrick Hand",
                      fontSize: "18px",
                      color: "darkslategrey",
                    }}
                  >
                    Account: Not Assigned
                  </p>
                )}
                <p
                  style={{
                    fontFamily: "Patrick Hand",
                    fontSize: "18px",
                    color: "darkslategrey",
                  }}
                >
                  Total Records: {totalRecords.length}
                </p>
                {props.adminMailId ? (
                  <p
                    style={{
                      fontFamily: "Patrick Hand",
                      fontSize: "18px",
                      color: "darkslategrey",
                    }}
                  >
                    Admin Mail Id: {props.adminMailId}
                  </p>
                ) : (
                  <p
                    style={{
                      fontFamily: "Patrick Hand",
                      fontSize: "18px",
                      color: "darkslategrey",
                    }}
                  >
                    Admin Mail Id: Not Assigned
                  </p>
                )}
                {props.approverMailId ? (
                  <p
                    style={{
                      fontFamily: "Patrick Hand",
                      fontSize: "18px",
                      color: "darkslategrey",
                    }}
                  >
                    Approver Mail Id: {props.approverMailId}
                  </p>
                ) : (
                  <p
                    style={{
                      fontFamily: "Patrick Hand",
                      fontSize: "18px",
                      color: "darkslategrey",
                    }}
                  >
                    Approver Mail Id: Not Assigned
                  </p>
                )}
                <p
                  style={{
                    fontFamily: "Patrick Hand",
                    fontSize: "18px",
                    color: "blue",
                  }}
                >
                  Approved Records: {approvedRecords.length}
                </p>
                <p
                  style={{
                    fontFamily: "Patrick Hand",
                    fontSize: "18px",
                    color: "red",
                  }}
                >
                  Rejected Records: {declinedRecords.length}
                </p>
                <p
                  style={{
                    fontFamily: "Patrick Hand",
                    fontSize: "18px",
                    color: "brown",
                  }}
                >
                  Require Action:{filteredPendingApprovalRecords.length}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UserData;

import React, { Fragment, useEffect, useState } from "react";
import { auth } from "../../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";

import "./ApproverMain.css";

const ReimbursementData = (props) => {
  const [user] = useAuthState(auth);

  const [approverData, setApproverData] = useState({
    total: 0,
    totalApproved: 0,
    totalDeclined: 0,
    totalAwaited: 0,
  });

  useEffect(() => {
    trackPromise(fetchTotalRecords());
  }, [user, props.employeeMailId]);

  const fetchTotalRecords = async () => {
    if (props.employeeMailId) {
      const response = await axios.get(
        `/totalActionApproverRecords/${props.employeeMailId}`,
        {
          headers: {
            authToken: user.accessToken,
          },
        }
      );
      setApproverData({
        total: response.data.total,
        totalApproved: response.data.totalApproved,
        totalDeclined: response.data.totalDeclined,
        totalAwaited: response.data.requireAction,
      });
    }
  };

  return (
    <Fragment>
      <div className="ui segment" style={{ width: "300px" }}>
        <div className="analyticsMain-div">
          <div className="analytics-div">
            <h4 className="railCard-heading">Reimbursement Record Details-</h4>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "darkslategrey",
              }}
            >
              Total Records: {approverData.total}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "blue",
              }}
            >
              Approved Records: {approverData.totalApproved}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "red",
              }}
            >
              Rejected Records: {approverData.totalDeclined}
            </p>
            <p
              style={{
                fontFamily: "Patrick Hand",
                fontSize: "18px",
                color: "brown",
              }}
            >
              Require Action:{approverData.totalAwaited}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReimbursementData;

import React, { useState, useEffect, Fragment } from "react";
import { auth, db, logout } from "../../../server/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import ApproverData from "./ApproverData";
import Loader from "../../utils/Loader";
import Header from "../Header/Header";
import ApprovedRecord from "./ApprovedRecords";
import AwaitingAction from "./AwaitingAction";
import RejectedRecord from "./RejectedRecords";
import Footer from "../Footer/Footer";
import realtimeDbUrl from "../../../server/dataBaseUrl";

import axios from "axios";
const ApproverRecordsMain = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [approverData, setApproverData] = useState("");
  const [approverRemRecords, setApproverRemRecords] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  const [approverAccessToken, setApproverAccessToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      setApproverAccessToken(user.accessToken);
      const timer = setTimeout(() => {
        if (props.role === "approver") {
          getApproverData();
          return;
        }
        if (props.role === "user") {
          return navigate("/");
        }
        if (props.role === "admin") {
          return navigate("/admin-panel");
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setApproverAccessToken();
      return navigate("/login");
    }
  }, [
    user,
    approverAccessToken,
    loading,
    props.employeeID,
    props.name,
    props.role,
  ]);

  const approverFilterUrl = `${realtimeDbUrl}/ReimbursementRecords.json?auth=${approverAccessToken}&orderBy="EmployeeRole"&equalTo="approver"`;

  const getApproverData = async () => {
    setSpinner(true);
    const response = await axios.get(approverFilterUrl);
    setApproverData(response.data);
    setSpinner(false);

    let approverSpecificData = response.data;

    if (approverSpecificData) {
      setApproverRemRecords(Object.keys(approverSpecificData));
    }
  };

  const tabFirstHandler = () => {
    setTab1(true);
    setTab2(false);
    setTab3(false);
  };

  const tabSecondHandler = () => {
    setTab2(true);
    setTab1(false);
    setTab3(false);
  };

  const tabThirdHandler = () => {
    setTab3(true);
    setTab1(false);
    setTab2(false);
  };

  return (
    <Fragment>
      {spinner && <Loader />}
      <Header
        employeeName={props.employeeName}
        role={props.role}
        employeeID={props.employeeID}
      />
      <div className="header-RemDetails">
        <h1
          style={{
            fontFamily: "Patrick Hand",
            fontSize: "35px",
            color: "Blue",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Approver Records
        </h1>
      </div>
      {approverData ? (
        <div
          className="ui container"
          style={{
            position: "inherit",
            backgroundColor: "transparent !important",
            border: "none",
            boxShadow: " none",
          }}
        >
          <ApproverData
            approverData={approverData}
            approverRemRecords={approverRemRecords}
            employeeID={props.employeeID}
            name={props.employeeName}
            adminMailId={props.adminMailId}
            approverMailId={props.approverMailId}
          />

          <div className="ui top attached tabular menu">
            <a
              className={`item ${tab1 === true ? "active" : ""}`}
              data-tab="first"
              onClick={tabFirstHandler}
              style={{
                width: "33.5%",
                fontFamily: "Patrick Hand",
                fontSize: "23px",
                color: "brown",
              }}
            >
              Awaiting Action
            </a>
            <a
              className={`item ${tab2 === true ? "active" : ""}`}
              data-tab="second"
              onClick={tabSecondHandler}
              style={{
                width: "33.5%",
                fontFamily: "Patrick Hand",
                fontSize: "23px",
                color: "green",
              }}
            >
              Approved Records
            </a>
            <a
              className={`item ${tab3 === true ? "active" : ""}`}
              data-tab="third"
              onClick={tabThirdHandler}
              style={{
                width: "33.1%",
                fontFamily: "Patrick Hand",
                fontSize: "23px",
                color: "red",
              }}
            >
              Rejected Records
            </a>
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab1 === true ? "active" : ""
            }`}
            data-tab="first"
          >
            <AwaitingAction
              approverRemRecords={approverRemRecords}
              approverData={approverData}
              employeeID={props.employeeID}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab2 === true ? "active" : ""
            }`}
            data-tab="second"
          >
            <ApprovedRecord
              approverRemRecords={approverRemRecords}
              approverData={approverData}
              employeeID={props.employeeID}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab3 === true ? "active" : ""
            }`}
            data-tab="third"
          >
            <RejectedRecord
              approverRemRecords={approverRemRecords}
              approverData={approverData}
              employeeID={props.employeeID}
            />
          </div>
        </div>
      ) : (
        <div
          style={{ maxWidth: "80%", margin: "auto" }}
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
            Sorry! No Records Available
          </p>
        </div>
      )}
      <Footer />
    </Fragment>
  );
};

export default ApproverRecordsMain;

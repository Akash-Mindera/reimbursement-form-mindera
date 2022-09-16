import React, { useState, useEffect, Fragment } from "react";
import { auth, db, logout } from "../../../server/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import AdminRecordsData from "./AdminRecordsData";
import Loader from "../../utils/Loader";
import Header from "../Header/Header";
import ApprovedAdminRecord from "./ApprovedAdminRecords";
import AwaitingAction from "./AwaitingActions";
import RejectedAdminRecord from "./RejectedAdminRecords";
import realtimeDbUrl from "../../../server/dataBaseUrl";
import Footer from "../Footer/Footer";

import axios from "axios";
const ApproverRecordsMain = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [adminData, setAdminData] = useState("");
  const [adminRemRecords, setAdminRemRecords] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [adminAccessToken, setAdminAccessToken] = useState();
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      setAdminAccessToken(user.accessToken);
      const timer = setTimeout(() => {
        if (props.role === "admin") {
          getAdminData();
          return;
        }
        if (props.role === "user") {
          return navigate("/");
        }
        if (props.role === "approver") {
          return navigate("/approver-panel");
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setAdminAccessToken();
      return navigate("/login");
    }
  }, [
    user,
    adminAccessToken,
    loading,
    props.employeeID,
    props.name,
    props.role,
  ]);

  const approverFilterUrl = `${realtimeDbUrl}/ReimbursementRecords.json?auth=${adminAccessToken}&orderBy="EmployeeRole"&equalTo="admin"`;

  const getAdminData = async () => {
    setSpinner(true);
    const response = await axios.get(approverFilterUrl);
    setAdminData(response.data);
    setSpinner(false);

    let adminSpecificData = response.data;

    if (adminSpecificData) {
      setAdminRemRecords(Object.keys(adminSpecificData));
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

  // console.log("From Admin Records", props.employeeID);

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
          Admin Reimbursement Records
        </h1>
      </div>
      {adminData ? (
        <div
          className="ui container"
          style={{
            position: "inherit",
            backgroundColor: "transparent !important",
            border: "none",
            boxShadow: " none",
          }}
        >
          <AdminRecordsData
            adminData={adminData}
            adminRemRecords={adminRemRecords}
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
              adminRemRecords={adminRemRecords}
              adminData={adminData}
              employeeID={props.employeeID}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab2 === true ? "active" : ""
            }`}
            data-tab="second"
          >
            <ApprovedAdminRecord
              adminRemRecords={adminRemRecords}
              adminData={adminData}
              employeeID={props.employeeID}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab3 === true ? "active" : ""
            }`}
            data-tab="third"
          >
            <RejectedAdminRecord
              adminRemRecords={adminRemRecords}
              adminData={adminData}
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

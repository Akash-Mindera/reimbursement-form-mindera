import React, { useState, useEffect, Fragment } from "react";
import { auth, db, logout } from "../../../server/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import UserData from "./UserData";
import Loader from "../../utils/Loader";
import Header from "../Header/Header";
import ApprovedRecord from "./ApprovedRecord";
import AwaitingAction from "./AwaitingAction";
import RejectedRecord from "./RejectedRecord";
import Footer from "../Footer/Footer";
import realtimeDbUrl from "../../../server/dataBaseUrl";

import axios from "axios";
const UserMain = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(false);
  const [userRemRecords, setUserRemRecords] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  const [userAccessToken, setUserAccessToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      // setUserAccessToken(user.accessToken);

      if (props.role === "user") {
        setUserData(true);
        return;
      }
      if (props.role === "admin") {
        setUserData(false);
        return navigate("/admin-panel");
      }
      if (props.role === "approver") {
        setUserData(false);
        return navigate("/approver-panel");
      }
    } else {
      setUserAccessToken();
      return navigate("/login");
    }
    return () => {
      // clearTimeout(timer);
    };
  }, [
    user,
    loading,
    props.employeeID,
    props.name,
    props.role,
    props.approverMailId,
    props.adminMailId,
  ]);

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
        employeeName={props.name}
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
          User Panel
        </h1>
      </div>
      {userData === true ? (
        <div
          className="ui container"
          style={{
            position: "inherit",
            backgroundColor: "transparent !important",
            border: "none",
            boxShadow: " none",
          }}
        >
          <UserData
            userData={userData}
            userRemRecords={userRemRecords}
            employeeID={props.employeeID}
            account={props.account}
            name={props.name}
            approverMailId={props.approverMailId}
            adminMailId={props.adminMailId}
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
              tab1={tab1}
              userRemRecords={userRemRecords}
              userData={userData}
              employeeID={props.employeeID}
              accessToken={userAccessToken}
              role={props.role}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab2 === true ? "active" : ""
            }`}
            data-tab="second"
          >
            <ApprovedRecord
              tab2={tab2}
              userRemRecords={userRemRecords}
              userData={userData}
              employeeID={props.employeeID}
              accessToken={userAccessToken}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab3 === true ? "active" : ""
            }`}
            data-tab="third"
          >
            <RejectedRecord
              tab3={tab3}
              userRemRecords={userRemRecords}
              userData={userData}
              employeeID={props.employeeID}
              accessToken={userAccessToken}
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

export default UserMain;

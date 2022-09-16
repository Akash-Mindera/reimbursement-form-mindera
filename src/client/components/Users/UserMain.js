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
  const [userData, setUserData] = useState("");
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
      setUserAccessToken(user.accessToken);
      const timer = setTimeout(() => {
        if (props.role === "user") {
          getUserData();
          return;
        }
        if (props.role === "admin") {
          return navigate("/admin-panel");
        }
        if (props.role === "approver") {
          return navigate("/approver-panel");
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setUserAccessToken();
      return navigate("/login");
    }
  }, [
    user,
    userAccessToken,
    loading,
    props.employeeID,
    props.name,
    props.role,
    props.approverMailId,
    props.adminMailId,
  ]);

  const userFilterUrl = `${realtimeDbUrl}/ReimbursementRecords.json?auth=${userAccessToken}&orderBy="UserSpecificId"&equalTo="${props.employeeID}"`;

  const getUserData = async () => {
    setSpinner(true);

    const response = await axios.get(userFilterUrl);
    setUserData(response.data);
    setSpinner(false);

    let userSpecificData = response.data;

    if (userSpecificData) {
      setUserRemRecords(Object.keys(userSpecificData));
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

  // console.log("Access-Token", accessToken);

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
      {userData ? (
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
              userRemRecords={userRemRecords}
              userData={userData}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab2 === true ? "active" : ""
            }`}
            data-tab="second"
          >
            <ApprovedRecord
              userRemRecords={userRemRecords}
              userData={userData}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab3 === true ? "active" : ""
            }`}
            data-tab="third"
          >
            <RejectedRecord
              userRemRecords={userRemRecords}
              userData={userData}
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

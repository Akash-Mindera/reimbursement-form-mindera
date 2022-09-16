import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import { auth, db, logout } from "../../../server/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import Footer from "../Footer/Footer";
import realtimeDbUrl from "../../../server/dataBaseUrl";
import app from "../../../server/firebase";
import ReimbursementData from "./ReimbursementData";
import RequireAction from "./RequireAction";
import ApprovedResponses from "./ApprovedResponses";
import RejectedResponses from "./RejectedResponses";
import Header from "../Header/Header";
import RejectionModal from "./RejectionModal";
import Loader from "../../utils/Loader";
import ApprovalModal from "./ApprovalModal";
import "./ApproverMain.css";

const ApproverMain = (props) => {
  const localAuth = getAuth();
  const localUser = localAuth.currentUser;
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState("");

  const [remRecords, setRemRecords] = useState([]);

  const [spinner, setSpinner] = useState(false);

  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  const [approverAccessToken, setApproverAccessToken] = useState();

  const [approveResponse, setApproveResponse] = useState();
  const [rejectResponse, setRejectResponse] = useState();

  //Rejection Modal States//
  const [show, setShow] = useState(false);
  const [rejectAccount, setRejectAccount] = useState([]);
  const [rejectAccountError, setRejectAccountError] = useState(false);
  const [rejectionAccountList, setRejectionAccountList] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const [rejectModalContent, setRejectModalContent] = useState("Rejecting...");
  const [isDisabled, setIsDisabled] = useState(false);
  const [remId, setRemId] = useState();

  //Approve Modal States//
  const [appShow, setAppShow] = useState(false);
  const [account, setAccount] = useState([]);
  const [approvalAccountsList, setApprovalAccountsList] = useState([]);
  const [accountError, setAccountError] = useState(false);
  const [approveId, setApproveId] = useState();
  const [isApproveDisabled, setApproveDisabled] = useState(false);
  const [approveModalContent, setApproveModalContent] =
    useState("Approving...");

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      setApproverAccessToken(user.accessToken);
      const timer = setTimeout(() => {
        if (props.role === "approver") {
          getData();
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
  }, [user, approverAccessToken, props.role, loading, props.employeeMailId]);

  if (appShow) {
    const fetchSpecificAccounts = async () => {
      try {
        const q = query(
          collection(db, "UserAuth"),
          where("employeeId", "==", data[approveId].UserSpecificId)
        );
        const doc = await getDocs(q);
        const res = doc.docs[0].data();

        setApprovalAccountsList(res.account);
      } catch (err) {
        alert(err);
      }
    };
    fetchSpecificAccounts();
  }

  if (show) {
    const fetchSpecificAccounts = async () => {
      try {
        const q = query(
          collection(db, "UserAuth"),
          where("employeeId", "==", data[remId].UserSpecificId)
        );
        const doc = await getDocs(q);
        const res = doc.docs[0].data();

        setRejectionAccountList(res.account);
      } catch (err) {
        alert(err);
      }
    };
    fetchSpecificAccounts();
  }

  const fireBaseUrl = `${realtimeDbUrl}/ReimbursementRecords.json?auth=${approverAccessToken}`;

  const approvalHandler = (id, index) => {
    console.log(id);
    if (window.confirm("Are you sure you want to approve this record?")) {
      setApproveId(id);
      setApproveResponse(index);
      setAppShow(true);
    }
  };

  const approvalSubmitHandler = (e) => {
    e.preventDefault();
    const approverMailId = data[approveId].ApproverMailId;
    const adminMailId = data[approveId].AdminMailId;
    const approvedEmailAddress = data[approveId].EmployeeMail;
    const approvedEmployeeName = data[approveId].EmployeeName;
    const approvedEmployeeId = data[approveId].UserSpecificId;
    const approvedAccount = account.value;
    const approvedAmount = data[approveId].AmountToBeRefunded;
    const approvedInvoiceDate = data[approveId].InvoiceDate;
    const approvedDescription = data[approveId].ExpenseDescription;
    const approvedConsent = data[approveId].EmployeeConsent;
    const approvedDate = data[approveId].ExpenseDate;
    const approvedInvoiceNo = data[approveId].InvoiceNo;
    const approvedVendor = data[approveId].VendorName;
    const approvedExpenseCategory = data[approveId].ExpenseCategory;
    const approvedPaidTo = data[approveId].PaidTo;
    const approvedFileLink = data[approveId].Invoice;
    const body = {
      approverMailId,
      adminMailId,
      approvedEmailAddress,
      approvedEmployeeName,
      approvedEmployeeId,
      approvedAccount,
      approvedAmount,
      approvedInvoiceDate,
      approvedDescription,
      approvedConsent,
      approvedDate,
      approvedInvoiceNo,
      approvedVendor,
      approvedExpenseCategory,
      approvedPaidTo,
      approvedFileLink,
    };
    if (
      account.value === undefined ||
      account.value === "" ||
      account.value === "Choose"
    ) {
      setAccountError(true);
    } else {
      setApproveDisabled(true);
      setAccountError(false);
      app
        .child(`ReimbursementRecords/${approveId}`)
        .update({ IsApproved: "Yes", ApprovedAccount: account.value })
        .then(() => {
          // setApproveResponse(index);
          setApproveModalContent("Approving...");
          axios
            .post("/approvalMail", body, {
              headers: {
                "Content-type": "application/json",
              },
            })
            .then((res) => {
              // alert("Approval Mail Sent!");
              setApproveModalContent("Approval Mail Sent!");
              console.log(res);
              setTimeout(() => {
                window.location.reload(true);
              }, 2000);
            })
            .catch((err) => {
              // alert(
              //   "There is an issue with the mailing service but the form is approved"
              // );

              setApproveModalContent(
                "There is an issue with the mailing service but the form is approved"
              );
              setTimeout(() => {
                window.location.reload(true);
              }, 2000);
              console.log(err);
            });
        })
        .catch((err) => {
          setApproveDisabled(false);
          console.log(err);
          alert("There is an error with the db connection");
        });
    }
  };

  const selectAccountHandler = (account) => {
    if (
      account.value === undefined ||
      account.value === "" ||
      account.value === "Choose"
    ) {
      setAccountError(true);
      setAccount(account[0]);
    } else {
      setAccountError(false);
    }
    setAccount(account);
    console.log("Change Detected", account.value);
  };

  const onClearApproveModalHandler = (e) => {
    setAppShow(false);
    setApproveResponse();
    setAccount([]);
    setAccountError("");
    setApprovalAccountsList([]);
  };

  const declineHandler = (id, index) => {
    if (window.confirm("Are you sure want to decline this record")) {
      setRemId(id);

      setRejectResponse(index);
      setShow(true);
    }
  };

  const tabFirstHandler = () => {
    console.log("First Tab Clicked");

    setTab1(true);
    setTab2(false);
    setTab3(false);
  };

  const tabSecondHandler = () => {
    console.log("Second Tab Clicked");

    setTab2(true);
    setTab1(false);
    setTab3(false);
  };

  const tabThirdHandler = () => {
    console.log("Third Tab Clicked");
    setTab3(true);
    setTab1(false);
    setTab2(false);
  };

  const getData = async () => {
    setSpinner(true);
    const response = await axios.get(fireBaseUrl);
    setData(response.data);
    setSpinner(false);
    let latestData = response.data;
    // console.log("latest", latestData);
    if (latestData) {
      setRemRecords(Object.keys(latestData));
    }
  };

  const rejectionInputHandler = (e) => {
    console.log(e.target.value);
    setRejectReason(e.target.value);
  };

  const rejectionSubmitHandler = (e) => {
    e.preventDefault();
    const approverMailId = data[remId].ApproverMailId;
    const adminMailId = data[remId].AdminMailId;
    const rejectedEmailAddress = data[remId].EmployeeMail;
    const rejectedEmployeeName = data[remId].EmployeeName;
    const rejectedEmployeeId = data[remId].UserSpecificId;
    const rejectedAccount = rejectAccount.value;
    const rejectedAmount = data[remId].AmountToBeRefunded;
    const rejectedInvoiceDate = data[remId].InvoiceDate;
    const rejectedDescription = data[remId].ExpenseDescription;
    const rejectedConsent = data[remId].EmployeeConsent;
    const rejectedDate = data[remId].ExpenseDate;
    const rejectedInvoiceNo = data[remId].InvoiceNo;
    const rejectedVendor = data[remId].VendorName;
    const rejectedExpenseCategory = data[remId].ExpenseCategory;
    const rejectedPaidTo = data[remId].PaidTo;
    const rejectedFileLink = data[remId].Invoice;
    const rejectedReason = rejectReason;
    const body = {
      adminMailId,
      approverMailId,
      rejectedEmailAddress,
      rejectedEmployeeName,
      rejectedEmployeeId,
      rejectedAccount,
      rejectedAmount,
      rejectedInvoiceDate,
      rejectedDescription,
      rejectedConsent,
      rejectedDate,
      rejectedInvoiceNo,
      rejectedVendor,
      rejectedExpenseCategory,
      rejectedPaidTo,
      rejectedFileLink,
      rejectedReason,
    };
    if (
      rejectAccount.value === undefined ||
      rejectAccount.value === "" ||
      rejectAccount.value === "Choose"
    ) {
      setRejectAccountError(true);
      return;
    } else {
      setRejectAccountError(false);
    }

    if (rejectReason === "") {
      setRejectError("Please Enter a Reason");
      return;
    } else {
      setRejectError("");
    }

    setRejectError("");
    setRejectAccountError(false);
    setIsDisabled(true);
    app
      .child(`ReimbursementRecords/${remId}`)
      .update({
        IsApproved: "No",
        RejectionReason: rejectReason,
        RejectedAccount: rejectAccount.value,
      })
      .then(() => {
        // setRejectResponse(index);
        setRejectModalContent("Rejecting...");
        axios
          .post("/rejectionMail", body, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((res) => {
            // alert("Rejection Mail Sent!");
            setRejectModalContent("Rejection Mail Sent");
            console.log(res);
            setTimeout(() => {
              window.location.reload(true);
            }, 2000);
          })
          .catch((err) => {
            // alert(
            //   "There is an issue with the mailing service but the form is rejected"
            // );
            setRejectModalContent(
              "There is an issue with the mailing service but the form is rejected"
            );
            console.log(err);
            setTimeout(() => {
              window.location.reload(true);
            }, 2000);
          });
      })
      .catch((err) => {
        setIsDisabled(false);
        console.log(err);
        alert(
          "There is an error with the db connection please try again after sometime."
        );
        setRejectReason("");
      });
  };

  const rejectAccountHandler = (rejectAccount) => {
    if (
      rejectAccount.value === undefined ||
      rejectAccount.value === "" ||
      rejectAccount.value === "Choose"
    ) {
      setRejectAccountError(true);
      // setAccount(account[0]);
    } else {
      setRejectAccountError(false);
    }
    setRejectAccount(rejectAccount);
    console.log("Change Detected", rejectAccount.value);
  };

  const onClearModalHandler = (e) => {
    setShow(false);
    setRejectResponse();
    setRejectAccount();
    setRejectReason("");
    setRejectAccountError(false);
    setRejectError("");
    setRejectionAccountList([]);
  };

  // console.log(accountsList);

  return (
    <Fragment>
      {spinner && <Loader />}
      <Header role={props.role} employeeName={props.employeeName} />
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
          Approver Panel
        </h1>
      </div>
      {data ? (
        <div
          className="ui container"
          style={{
            position: "inherit",
            backgroundColor: "transparent !important",
            border: "none",
            boxShadow: " none",
          }}
        >
          <ReimbursementData
            remRecords={remRecords}
            data={data}
            employeeMailId={props.employeeMailId}
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
                color: "red",
              }}
            >
              Requires Action
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
              Approved Response
            </a>
            <a
              className={`item ${tab3 === true ? "active" : ""}`}
              data-tab="third"
              onClick={tabThirdHandler}
              style={{
                width: "33.1%",
                fontFamily: "Patrick Hand",
                fontSize: "23px",
                color: "green",
              }}
            >
              Rejected Response
            </a>
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab1 === true ? "active" : ""
            }`}
            data-tab="first"
          >
            <RequireAction
              remRecords={remRecords}
              data={data}
              rejectResponse={rejectResponse}
              approveResponse={approveResponse}
              approvalHandler={approvalHandler}
              declineHandler={declineHandler}
              employeeMailId={props.employeeMailId}
              approverAccessToken={approverAccessToken}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab2 === true ? "active" : ""
            }`}
            data-tab="second"
          >
            <ApprovedResponses
              remRecords={remRecords}
              data={data}
              employeeMailId={props.employeeMailId}
              approverAccessToken={approverAccessToken}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab3 === true ? "active" : ""
            }`}
            data-tab="third"
          >
            <RejectedResponses
              remRecords={remRecords}
              data={data}
              employeeMailId={props.employeeMailId}
              approverAccessToken={approverAccessToken}
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
      <ApprovalModal
        appShow={appShow}
        approveId={approveId}
        isApproveDisabled={isApproveDisabled}
        approvalSubmitHandler={approvalSubmitHandler}
        onClearApproveModalHandler={onClearApproveModalHandler}
        approveModalContent={approveModalContent}
        data={data}
        selectAccountHandler={selectAccountHandler}
        accountError={accountError}
        approvalAccountsList={approvalAccountsList}
      />
      <RejectionModal
        show={show}
        onClearModalHandler={onClearModalHandler}
        rejectionInputHandler={rejectionInputHandler}
        rejectionSubmitHandler={rejectionSubmitHandler}
        remId={remId}
        data={data}
        rejectReason={rejectReason}
        rejectError={rejectError}
        isDisabled={isDisabled}
        rejectModalContent={rejectModalContent}
        rejectAccountHandler={rejectAccountHandler}
        rejectAccount={rejectAccount}
        rejectAccountError={rejectAccountError}
        rejectionAccountsList={rejectionAccountList}
      />
    </Fragment>
  );
};

export default ApproverMain;

import React, { Fragment, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../../server/firebase";
import app from "../../../server/firebase";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../../utils/Loader";
import AdminData from "./AdminData";
import RequiresAction from "./RequiresAction";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ApprovedRecords from "./ApprovedRecords";
import RejectedRecord from "./RejectRecords";
import ApprovalModal from "./ApprovalModal";
import RejectionModal from "./RejectionModal";
import realtimeDbUrl from "../../../server/dataBaseUrl";

const AdminMain = (props) => {
  const [spinner, setSpinner] = useState(false);
  const [adminData, setAdminData] = useState("");
  const [adminRemRecords, setAdminRemRecords] = useState([]);
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [adminAccessToken, setAdminAccessToken] = useState();

  const [approveResponse, setApproveResponse] = useState();
  const [rejectResponse, setRejectResponse] = useState();

  //Rejection Modal States//
  const [show, setShow] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const [rejectModalContent, setRejectModalContent] =
    useState("Funds Rejecting...");
  const [isDisabled, setIsDisabled] = useState(false);
  const [remId, setRemId] = useState();

  //Approve Modal States//
  const [appShow, setAppShow] = useState(false);
  const [approveId, setApproveId] = useState();
  const [isApproveDisabled, setApproveDisabled] = useState(false);
  const [approveModalContent, setApproveModalContent] =
    useState("Funds Approving...");

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      setAdminAccessToken(user.accessToken);

      if (props.role === "admin") {
        getAdminData();
        return;
      }
      if (props.role === "approver") {
        return navigate("/approver-panel");
      }
      if (props.role === "user") {
        return navigate("/");
      }
    } else {
      setAdminAccessToken();
      return navigate("/login");
    }
    return () => {
      // clearTimeout(timer);
    };
  }, [user, adminAccessToken, props.role, loading, props.employeeMailId]);

  const fireBaseUrl = `${realtimeDbUrl}/ReimbursementRecords.json?auth=${adminAccessToken}`;

  const getAdminData = async () => {
    // setSpinner(true);
    const response = await axios.get(fireBaseUrl);
    setAdminData(response.data);
    // setSpinner(false);
    let adminData = response.data;

    if (adminData) {
      setAdminRemRecords(Object.keys(adminData));
    }
  };

  const approvalHandler = (id, index) => {
    console.log(id);
    if (window.confirm("Are Funds processed for this record?")) {
      setApproveId(id);
      setApproveResponse(index);
      setAppShow(true);
    }
  };

  const approvalSubmitHandler = () => {
    const adminMailId = adminData[approveId].AdminMailId;
    const approverMailId = adminData[approveId].ApproverMailId;
    const fundProcessedEmailAddress = adminData[approveId].EmployeeMail;
    const fundProcessedEmployeeName = adminData[approveId].EmployeeName;
    const fundProcessedEmployeeId = adminData[approveId].UserSpecificId;
    const fundProcessedApprovedAccount = adminData[approveId].ApprovedAccount;
    const fundProcessedAmount = adminData[approveId].AmountToBeRefunded;

    const fundProcessedInvoiceDate = adminData[approveId].InvoiceDate;
    const fundProcessedDescription = adminData[approveId].ExpenseDescription;
    const fundProcessedConsent = adminData[approveId].EmployeeConsent;
    const fundProcessedDate = adminData[approveId].ExpenseDate;
    const fundProcessedInvoiceNo = adminData[approveId].InvoiceNo;
    const fundProcessedVendorName = adminData[approveId].VendorName;
    const fundProcessedExpenseCategory = adminData[approveId].ExpenseCategory;
    const fundProcessedPaidTo = adminData[approveId].PaidTo;
    const fundProcessedFileLink = adminData[approveId].Invoice;
    const body = {
      adminMailId,
      approverMailId,
      fundProcessedEmailAddress,
      fundProcessedEmployeeName,
      fundProcessedEmployeeId,
      fundProcessedApprovedAccount,
      fundProcessedAmount,
      fundProcessedInvoiceDate,
      fundProcessedDescription,
      fundProcessedConsent,
      fundProcessedDate,
      fundProcessedInvoiceNo,
      fundProcessedVendorName,
      fundProcessedExpenseCategory,
      fundProcessedPaidTo,
      fundProcessedFileLink,
    };

    setApproveDisabled(true);
    app
      .child(`ReimbursementRecords/${approveId}`)
      .update({ IsFundsProcessed: "Yes" })
      .then(() => {
        // setApproveResponse(index);
        setApproveModalContent("Approving Funds ...");
        axios
          .post("/fundsProcessedMail", body, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((res) => {
            // alert("Approval Mail Sent!");
            setApproveModalContent("Funds Approval Mail Sent!");
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
              "There is an issue with the mailing service Funds are appproved."
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
  };

  const onClearApproveModalHandler = (e) => {
    setAppShow(false);
    setApproveResponse();
  };

  const declineHandler = (id, index) => {
    if (window.confirm("Are Funds unavailable for this record?")) {
      setRemId(id);

      setRejectResponse(index);
      setShow(true);
    }
  };

  const rejectionInputHandler = (e) => {
    console.log(e.target.value);
    setRejectReason(e.target.value);
  };

  const rejectionSubmitHandler = (e) => {
    e.preventDefault();
    const adminMailId = adminData[remId].AdminMailId;
    const approverMailId = adminData[remId].ApproverMailId;
    const fundRejectedEmailAddress = adminData[remId].EmployeeMail;
    const fundRejectedEmployeeName = adminData[remId].EmployeeName;
    const fundRejectedEmployeeId = adminData[remId].UserSpecificId;
    const fundRejectedAccount = adminData[remId].ApprovedAccount;
    const fundRejectedAmount = adminData[remId].AmountToBeRefunded;
    const fundRejectedInvoiceDate = adminData[remId].InvoiceDate;
    const fundRejectedDescription = adminData[remId].ExpenseDescription;
    const fundRejectedConsent = adminData[remId].EmployeeConsent;
    const fundRejectedDate = adminData[remId].ExpenseDate;
    const fundRejectedInvoiceNo = adminData[remId].InvoiceNo;
    const fundRejectedVendorName = adminData[remId].VendorName;
    const fundRejectedExpenseCategory = adminData[remId].ExpenseCategory;
    const fundRejectedPaidTo = adminData[remId].PaidTo;
    const fundRejectedFileLink = adminData[remId].Invoice;
    const fundRejectedReason = rejectReason;
    const body = {
      adminMailId,
      approverMailId,
      fundRejectedEmailAddress,
      fundRejectedEmployeeName,
      fundRejectedEmployeeId,
      fundRejectedAccount,
      fundRejectedAmount,
      fundRejectedInvoiceDate,
      fundRejectedDescription,
      fundRejectedConsent,
      fundRejectedDate,
      fundRejectedInvoiceNo,
      fundRejectedVendorName,
      fundRejectedExpenseCategory,
      fundRejectedPaidTo,
      fundRejectedFileLink,
      fundRejectedReason,
    };
    if (rejectReason === "") {
      setRejectError("Please Enter a Reason");
    } else {
      setIsDisabled(true);
      app
        .child(`ReimbursementRecords/${remId}`)
        .update({ IsFundsProcessed: "No", FundsRejectionReason: rejectReason })
        .then(() => {
          // setRejectResponse(index);
          setRejectModalContent("Rejecting...");
          axios
            .post("/fundsRejectedMail", body, {
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
    }
  };

  const onClearModalHandler = (e) => {
    setShow(false);
    setRejectResponse();
    setRejectReason("");

    setRejectError("");
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

  // console.log("Hello There", props.employeeMailId);

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
          Admin Panel
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
          <AdminData
            adminRemRecords={adminRemRecords}
            adminData={adminData}
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
              Require Action By Admin
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
              Awaiting Action By Approver
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
              Rejected By Approver
            </a>
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab1 === true ? "active" : ""
            }`}
            data-tab="first"
          >
            <ApprovedRecords
              adminRemRecords={adminRemRecords}
              adminData={adminData}
              isApproveDisabled={isApproveDisabled}
              rejectResponse={rejectResponse}
              approveResponse={approveResponse}
              approvalHandler={approvalHandler}
              declineHandler={declineHandler}
              employeeMailId={props.employeeMailId}
              adminAccessToken={adminAccessToken}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab2 === true ? "active" : ""
            }`}
            data-tab="second"
          >
            <RequiresAction
              adminRemRecords={adminRemRecords}
              adminData={adminData}
              employeeMailId={props.employeeMailId}
              adminAccessToken={adminAccessToken}
            />
          </div>
          <div
            className={`ui bottom attached tab segment ${
              tab3 === true ? "active" : ""
            }`}
            data-tab="third"
          >
            <RejectedRecord
              adminRemRecords={adminRemRecords}
              adminData={adminData}
              employeeMailId={props.employeeMailId}
              adminAccessToken={adminAccessToken}
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
        adminData={adminData}
      />
      <RejectionModal
        show={show}
        onClearModalHandler={onClearModalHandler}
        rejectionInputHandler={rejectionInputHandler}
        rejectionSubmitHandler={rejectionSubmitHandler}
        remId={remId}
        adminData={adminData}
        rejectReason={rejectReason}
        rejectError={rejectError}
        isDisabled={isDisabled}
        rejectModalContent={rejectModalContent}
      />
    </Fragment>
  );
};

export default AdminMain;

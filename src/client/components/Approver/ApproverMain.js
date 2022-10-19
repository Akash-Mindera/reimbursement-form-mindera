import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, NavLink } from "react-router-dom";
import { auth, db, logout } from "../../../server/firebase";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import Footer from "../Footer/Footer";
import ReimbursementData from "./ReimbursementData";
import RequireActionTab from "./TabRoutes/RequireActionTab";
import ApprovedResponsesTab from "./TabRoutes/ApprovedResponsesTab";
import RejectedResponsesTab from "./TabRoutes/RejectedResponsesTab";
import Header from "../Header/Header";
import RejectionModal from "./RejectionModal";
import Loader from "../../utils/Loader";
import ApprovalModal from "./ApprovalModal";
import { ToastContainer, toast } from "react-toastify";
import useTabHandler from "./Helpers/ApproverMain/TabHandler";

import "react-toastify/dist/ReactToastify.css";
import "./ApproverMain.css";

const ApproverMain = (props) => {
  const [user, loading, error] = useAuthState(auth);

  const {
    tabFirstHandler,
    tabSecondHandler,
    tabThirdHandler,
    tab1,
    tab2,
    tab3,
  } = useTabHandler();

  const [approverData, setApproverData] = useState(false);

  const [spinner, setSpinner] = useState(false);

  const [approverAccessToken, setApproverAccessToken] = useState();

  const [approveResponse, setApproveResponse] = useState();
  const [rejectResponse, setRejectResponse] = useState();
  const [formDataById, setFormDataById] = useState([]);
  const [rejectedformDataById, setRejectedFormDataById] = useState([]);

  //Rejection Modal States//
  const [show, setShow] = useState(false);
  const [rejectAccount, setRejectAccount] = useState([]);
  const [rejectAccountError, setRejectAccountError] = useState(false);
  const [rejectionAccountList, setRejectionAccountList] = useState([]);
  const [rejId, setRejId] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const [rejectModalContent, setRejectModalContent] = useState("Rejecting...");
  const [isDisabled, setIsDisabled] = useState(false);
  const [remId, setRemId] = useState();
  const [rejectionEmployeeId, setRejectionEmployeeId] = useState("");
  const [rejectionStates, setRejectionStates] = useState({
    approverMailId: "",
    adminMailId: "",
    rejectedEmailAddress: "",
    rejectedEmployeeName: "",
    rejectedEmployeeId: "",
    rejectedAccount: "",
    rejectedAmount: "",
    rejectedInvoiceDate: "",
    rejectedDescription: "",
    rejectedConsent: "",
    rejectedDate: "",
    rejectedInvoiceNo: "",
    rejectedVendor: "",
    rejectedExpenseCategory: "",
    rejectedPaidTo: "",
    rejectedFileLink: "",
  });

  //Approve Modal States//
  const [appShow, setAppShow] = useState(false);
  const [account, setAccount] = useState([]);
  const [approvalAccountsList, setApprovalAccountsList] = useState([]);
  const [id, setId] = useState("");
  const [accountError, setAccountError] = useState(false);
  const [approveId, setApproveId] = useState();
  const [approvalEmployeeId, setApprovalEmployeeId] = useState("");
  const [isApproveDisabled, setApproveDisabled] = useState(false);
  const [approveModalContent, setApproveModalContent] =
    useState("Approving...");

  const [approvalStates, setApprovalStates] = useState({
    approverMailId: "",
    adminMailId: "",
    approvedEmailAddress: "",
    approvedEmployeeName: "",
    approvedEmployeeId: "",
    approvedAccount: "",
    approvedAmount: "",
    approvedInvoiceDate: "",
    approvedDescription: "",
    approvedConsent: "",
    approvedDate: "",
    approvedInvoiceNo: "",
    approvedVendor: "",
    approvedExpenseCategory: "",
    approvedPaidTo: "",
    approvedFileLink: "",
    isApprovedStatus: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user) {
      // setApproverAccessToken(user.accessToken);

      if (props.role === "approver") {
        setApproverData(true);
        return;
      }
      if (props.role === "user") {
        return navigate("/");
      }
      if (props.role === "admin") {
        return navigate("/admin-panel");
      }
    } else {
      // setApproverAccessToken();
      return navigate("/login");
    }
  }, [user, props.role, loading, props.employeeMailId]);

  useEffect(() => {
    if (appShow) {
      if (approvalEmployeeId !== "") {
        fetchSpecificAccounts();
      }
    }
  }, [appShow, approvalEmployeeId]);

  useEffect(() => {
    if (show) {
      if (rejectionEmployeeId !== "") {
        fetchRejSpecificAccounts();
      }
    }
  }, [show, rejectionEmployeeId]);

  const fetchSpecificAccounts = async () => {
    try {
      const q = query(
        collection(db, "UserAuth"),
        where("employeeId", "==", approvalEmployeeId)
      );

      const doc = await getDocs(q);
      const id = doc.docs.map((d) => ({ id: d.id }));
      const res = doc.docs[0].data();
      setApprovalAccountsList(res.account);
      setId(id[0].id);
    } catch (err) {
      alert("There is an issue");
    }
  };

  const handleOptionCreate = async (inputValue) => {
    console.log("Create Option", inputValue);
    if (window.confirm("Are you sure you want to add a new account ?")) {
      if (id !== "") {
        console.log(id);
        // setApproveDisabled(true);
        const userAuthDbRef = doc(db, "UserAuth", id);

        try {
          await updateDoc(userAuthDbRef, {
            account: [...approvalAccountsList, inputValue],
          }).then(() => {
            // setApproveDisabled(false);
            fetchSpecificAccounts();
            toast.success("New Account is added.");
          });
        } catch (err) {
          console.log(err);
          // setApproveDisabled(false);
          toast.error("There is problem adding a new account");
        }
      }
    }
  };

  const fetchRejSpecificAccounts = async () => {
    try {
      const q = query(
        collection(db, "UserAuth"),
        where("employeeId", "==", rejectionEmployeeId)
      );
      const doc = await getDocs(q);
      const id = doc.docs.map((d) => ({ id: d.id }));
      const res = doc.docs[0].data();

      setRejectionAccountList(res.account);
      setRejId(id[0].id);
    } catch (err) {
      alert(err);
    }
  };

  const approvalHandler = (id, index) => {
    console.log(id);
    if (window.confirm("Are you sure you want to approve this record?")) {
      setApproveId(id);
      const getResponse = async () => {
        const response = await axios.get(`/fetchRecordsById/${id}`, {
          headers: {
            authToken: user.accessToken,
          },
        });

        setFormDataById(response.data);
        setApprovalEmployeeId(response.data[0].UserSpecificId);
        setApprovalStates({
          approverMailId: response.data[0].ApproverMailId,
          adminMailId: response.data[0].AdminMailId,
          approvedEmailAddress: response.data[0].EmployeeMail,
          approvedEmployeeName: response.data[0].EmployeeName,
          approvedEmployeeId: response.data[0].UserSpecificId,
          approvedAmount: response.data[0].AmountToBeRefunded,
          approvedInvoiceDate: response.data[0].InvoiceDate,
          approvedDescription: response.data[0].ExpenseDescription,
          approvedConsent: response.data[0].EmployeeConsent,
          approvedDate: response.data[0].ExpenseDate,
          approvedInvoiceNo: response.data[0].InvoiceNo,
          approvedVendor: response.data[0].VendorName,
          approvedExpenseCategory: response.data[0].ExpenseCategory,
          approvedPaidTo: response.data[0].PaidTo,
          approvedFileLink: response.data[0].Invoice,
        });
      };
      getResponse();
      setApproveResponse(index);
      setAppShow(true);
    }
  };

  const approvalSubmitHandler = async (e) => {
    e.preventDefault();
    const approverMailId = approvalStates.approverMailId;
    const adminMailId = approvalStates.adminMailId;
    const approvedEmailAddress = approvalStates.approvedEmailAddress;
    const approvedEmployeeName = approvalStates.approvedEmployeeName;
    const approvedEmployeeId = approvalStates.approvedEmployeeId;
    const approvedAccount = account.value;
    const approvedAmount = approvalStates.approvedAmount;
    const approvedInvoiceDate = approvalStates.approvedInvoiceDate;
    const approvedDescription = approvalStates.approvedDescription;
    const approvedConsent = approvalStates.approvedConsent;
    const approvedDate = approvalStates.approvedDate;
    const approvedInvoiceNo = approvalStates.approvedInvoiceNo;
    const approvedVendor = approvalStates.approvedVendor;
    const approvedExpenseCategory = approvalStates.approvedExpenseCategory;
    const approvedPaidTo = approvalStates.approvedPaidTo;
    const approvedFileLink = approvalStates.approvedFileLink;
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
      account.value === null ||
      account.value === "" ||
      account.value === "Choose"
    ) {
      setAccountError(true);
    } else {
      setApproveDisabled(true);
      setAccountError(false);
      const res = await fetch(`/setResponseApproved/${approveId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authToken: user.accessToken,
        },
        body: JSON.stringify({
          IsApproved: "Yes",
          ApprovedAccount: account.value,
        }),
      });
      if (res.status === 201) {
        axios
          .post("/approvalMail", body, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((res) => {
            setApproveModalContent("Approval Mail Sent!");

            setTimeout(() => {
              window.location.reload(true);
            }, 2000);
          })
          .catch((err) => {
            setApproveModalContent(
              "There is an issue with the mailing service but the form is approved"
            );
            setTimeout(() => {
              window.location.reload(true);
            }, 2000);
            console.log(err);
          });
      } else {
        setApproveDisabled(false);
        // console.log(err);
        alert("There is an error with the db connection");
      }
    }
  };

  const selectAccountHandler = (account) => {
    if (account) {
      if (
        account.value === undefined ||
        account.value === null ||
        account.value === "" ||
        account.value === "Choose"
      ) {
        setAccountError(true);
        setAccount(account[0]);
      } else {
        setAccountError(false);
      }
      setAccount(account);
    }
  };

  const onClearApproveModalHandler = (e) => {
    setAppShow(false);
    setApproveResponse();
    setApprovalEmployeeId("");
    setFormDataById([]);
    setAccount([]);
    setAccountError("");
    setApprovalAccountsList([]);
    setId("");
    setApprovalStates({
      approverMailId: "",
      adminMailId: "",
      approvedEmailAddress: "",
      approvedEmployeeName: "",
      approvedEmployeeId: "",
      approvedAccount: "",
      approvedAmount: "",
      approvedInvoiceDate: "",
      approvedDescription: "",
      approvedConsent: "",
      approvedDate: "",
      approvedInvoiceNo: "",
      approvedVendor: "",
      approvedExpenseCategory: "",
      approvedPaidTo: "",
      approvedFileLink: "",
    });
  };

  const declineHandler = (id, index) => {
    if (window.confirm("Are you sure want to decline this record")) {
      setRemId(id);
      const getResponse = async () => {
        const response = await axios.get(`/fetchRecordsById/${id}`, {
          headers: {
            authToken: user.accessToken,
          },
        });

        setRejectedFormDataById(response.data);
        setRejectionEmployeeId(response.data[0].UserSpecificId);
        setRejectionStates({
          approverMailId: response.data[0].ApproverMailId,
          adminMailId: response.data[0].AdminMailId,
          rejectedEmailAddress: response.data[0].EmployeeMail,
          rejectedEmployeeName: response.data[0].EmployeeName,
          rejectedEmployeeId: response.data[0].UserSpecificId,
          rejectedAmount: response.data[0].AmountToBeRefunded,
          rejectedInvoiceDate: response.data[0].InvoiceDate,
          rejectedDescription: response.data[0].ExpenseDescription,
          rejectedConsent: response.data[0].EmployeeConsent,
          rejectedDate: response.data[0].ExpenseDate,
          rejectedInvoiceNo: response.data[0].InvoiceNo,
          rejectedVendor: response.data[0].VendorName,
          rejectedExpenseCategory: response.data[0].ExpenseCategory,
          rejectedPaidTo: response.data[0].PaidTo,
          rejectedFileLink: response.data[0].Invoice,
        });
      };
      getResponse();

      setRejectResponse(index);
      setShow(true);
    }
  };

  const rejectionInputHandler = (e) => {
    console.log(e.target.value);
    setRejectReason(e.target.value);
  };

  const rejectionSubmitHandler = async (e) => {
    e.preventDefault();
    const approverMailId = rejectionStates.approverMailId;
    const adminMailId = rejectionStates.adminMailId;
    const rejectedEmailAddress = rejectionStates.rejectedEmailAddress;
    const rejectedEmployeeName = rejectionStates.rejectedEmployeeName;
    const rejectedEmployeeId = rejectionStates.rejectedEmployeeId;
    const rejectedAccount = rejectionStates.rejectedAccount;
    const rejectedAmount = rejectionStates.rejectedAmount;
    const rejectedInvoiceDate = rejectionStates.rejectedInvoiceDate;
    const rejectedDescription = rejectionStates.rejectedDescription;
    const rejectedConsent = rejectionStates.rejectedConsent;
    const rejectedDate = rejectionStates.rejectedDate;
    const rejectedInvoiceNo = rejectionStates.rejectedInvoiceDate;
    const rejectedVendor = rejectionStates.rejectedVendor;
    const rejectedExpenseCategory = rejectionStates.rejectedExpenseCategory;
    const rejectedPaidTo = rejectionStates.rejectedPaidTo;
    const rejectedFileLink = rejectionStates.rejectedFileLink;
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
    const res = await fetch(`/setResponseRejected/${remId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authToken: user.accessToken,
      },
      body: JSON.stringify({
        IsApproved: "No",
        RejectedAccount: rejectAccount.value,
        RejectionReason: rejectReason,
      }),
    });
    if (res.status === 201) {
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
            // setAppShow(false);
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
    } else {
      setIsDisabled(false);
      // console.log(err);
      alert(
        "There is an error with the db connection please try again after sometime."
      );
      setRejectReason("");
    }
  };

  const rejectAccountHandler = (rejectAccount) => {
    if (rejectAccount) {
      if (
        rejectAccount.value === undefined ||
        rejectAccount.value === "" ||
        rejectAccount.value === "Choose"
      ) {
        setRejectAccountError(true);
        setRejectAccount(rejectAccount[0]);
      } else {
        setRejectAccountError(false);
      }
      setRejectAccount(rejectAccount);
      console.log("Change Detected", rejectAccount.value);
    }
  };

  const onClearModalHandler = (e) => {
    setShow(false);
    setRejectResponse();
    setRejectAccount([]);
    setRejectReason("");
    setRejectAccountError(false);
    setRejectError("");
    setRejectionAccountList([]);
    // setId("");
    setRejectionEmployeeId("");
    setRejectedFormDataById([]);
    setRejectionStates({
      approverMailId: "",
      adminMailId: "",
      rejectedEmailAddress: "",
      rejectedEmployeeName: "",
      rejectedEmployeeId: "",
      rejectedAccount: "",
      rejectedAmount: "",
      rejectedInvoiceDate: "",
      rejectedDescription: "",
      rejectedConsent: "",
      rejectedDate: "",
      rejectedInvoiceNo: "",
      rejectedVendor: "",
      rejectedExpenseCategory: "",
      rejectedPaidTo: "",
      rejectedFileLink: "",
    });
  };

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
      {approverData === true ? (
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
            // data={data}
            employeeMailId={props.employeeMailId}
          />
          <div className="ui top attached tabular menu">
            <a
              to="/approver-panel/requireAction"
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

          <RequireActionTab
            rejectResponse={rejectResponse}
            approveResponse={approveResponse}
            approvalHandler={approvalHandler}
            declineHandler={declineHandler}
            employeeMailId={props.employeeMailId}
            tab1={tab1}
          />

          <ApprovedResponsesTab
            employeeMailId={props.employeeMailId}
            tab2={tab2}
          />

          <RejectedResponsesTab
            // data={data}
            employeeMailId={props.employeeMailId}
            tab3={tab3}
          />
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
        formDataById={formDataById}
        approveId={approveId}
        isApproveDisabled={isApproveDisabled}
        approvalSubmitHandler={approvalSubmitHandler}
        onClearApproveModalHandler={onClearApproveModalHandler}
        approveModalContent={approveModalContent}
        account={account}
        handleOptionCreate={handleOptionCreate}
        selectAccountHandler={selectAccountHandler}
        accountError={accountError}
        approvalAccountsList={approvalAccountsList}
        fetchSpecificAccounts={fetchSpecificAccounts}
        id={id}
      />
      <RejectionModal
        show={show}
        rejectedformDataById={rejectedformDataById}
        onClearModalHandler={onClearModalHandler}
        rejectionInputHandler={rejectionInputHandler}
        rejectionSubmitHandler={rejectionSubmitHandler}
        remId={remId}
        rejectReason={rejectReason}
        rejectError={rejectError}
        isDisabled={isDisabled}
        rejectModalContent={rejectModalContent}
        rejectAccountHandler={rejectAccountHandler}
        rejectAccount={rejectAccount}
        rejectAccountError={rejectAccountError}
        rejectionAccountsList={rejectionAccountList}
        rejId={rejId}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default ApproverMain;

import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ApproverMain.css";

const ApproverMain = (props) => {
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
      setApproverAccessToken(user.accessToken);

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
    } else {
      setApproverAccessToken();
      return navigate("/login");
    }
  }, [user, approverAccessToken, props.role, loading, props.employeeMailId]);

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

  const fireBaseUrl = `${realtimeDbUrl}/ReimbursementRecords.json?auth=${approverAccessToken}`;

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
    // setSpinner(true);
    const response = await axios.get(fireBaseUrl);
    setData(response.data);
    // setSpinner(false);
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
    // const approverMailId = data[remId].ApproverMailId;
    // const adminMailId = data[remId].AdminMailId;
    // const rejectedEmailAddress = data[remId].EmployeeMail;
    // const rejectedEmployeeName = data[remId].EmployeeName;
    // const rejectedEmployeeId = data[remId].UserSpecificId;
    // const rejectedAccount = rejectAccount.value;
    // const rejectedAmount = data[remId].AmountToBeRefunded;
    // const rejectedInvoiceDate = data[remId].InvoiceDate;
    // const rejectedDescription = data[remId].ExpenseDescription;
    // const rejectedConsent = data[remId].EmployeeConsent;
    // const rejectedDate = data[remId].ExpenseDate;
    // const rejectedInvoiceNo = data[remId].InvoiceNo;
    // const rejectedVendor = data[remId].VendorName;
    // const rejectedExpenseCategory = data[remId].ExpenseCategory;
    // const rejectedPaidTo = data[remId].PaidTo;
    // const rejectedFileLink = data[remId].Invoice;
    // const rejectedReason = rejectReason;
    // const body = {
    //   adminMailId,
    //   approverMailId,
    //   rejectedEmailAddress,
    //   rejectedEmployeeName,
    //   rejectedEmployeeId,
    //   rejectedAccount,
    //   rejectedAmount,
    //   rejectedInvoiceDate,
    //   rejectedDescription,
    //   rejectedConsent,
    //   rejectedDate,
    //   rejectedInvoiceNo,
    //   rejectedVendor,
    //   rejectedExpenseCategory,
    //   rejectedPaidTo,
    //   rejectedFileLink,
    //   rejectedReason,
    // };
    // if (
    //   rejectAccount.value === undefined ||
    //   rejectAccount.value === "" ||
    //   rejectAccount.value === "Choose"
    // ) {
    //   setRejectAccountError(true);
    //   return;
    // } else {
    //   setRejectAccountError(false);
    // }

    // if (rejectReason === "") {
    //   setRejectError("Please Enter a Reason");
    //   return;
    // } else {
    //   setRejectError("");
    // }

    // setRejectError("");
    // setRejectAccountError(false);
    // setIsDisabled(true);
    // app
    //   .child(`ReimbursementRecords/${remId}`)
    //   .update({
    //     IsApproved: "No",
    //     RejectionReason: rejectReason,
    //     RejectedAccount: rejectAccount.value,
    //   })
    //   .then(() => {
    //     // setRejectResponse(index);
    //     setRejectModalContent("Rejecting...");
    //     axios
    //       .post("/rejectionMail", body, {
    //         headers: {
    //           "Content-type": "application/json",
    //         },
    //       })
    //       .then((res) => {
    //         // alert("Rejection Mail Sent!");
    //         setRejectModalContent("Rejection Mail Sent");
    //         console.log(res);
    //         setTimeout(() => {
    //           window.location.reload(true);
    //           // setAppShow(false);
    //         }, 2000);
    //       })
    //       .catch((err) => {
    //         // alert(
    //         //   "There is an issue with the mailing service but the form is rejected"
    //         // );
    //         setRejectModalContent(
    //           "There is an issue with the mailing service but the form is rejected"
    //         );
    //         console.log(err);
    //         setTimeout(() => {
    //           window.location.reload(true);
    //         }, 2000);
    //       });
    //   })
    //   .catch((err) => {
    //     setIsDisabled(false);
    //     console.log(err);
    //     alert(
    //       "There is an error with the db connection please try again after sometime."
    //     );
    //     setRejectReason("");
    //   });
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
    setId("");
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

  console.log(rejectedformDataById);

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
      {/* {data ? ( */}
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
      {/* ) : (
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
      )} */}
      <Footer />
      <ApprovalModal
        appShow={appShow}
        formDataById={formDataById}
        approveId={approveId}
        isApproveDisabled={isApproveDisabled}
        approvalSubmitHandler={approvalSubmitHandler}
        onClearApproveModalHandler={onClearApproveModalHandler}
        approveModalContent={approveModalContent}
        data={data}
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
        data={data}
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

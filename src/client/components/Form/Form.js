import React, { Fragment, Profiler } from "react";

import { useState, useEffect } from "react";

import { auth, db } from "../../../server/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import realtimeDbUrl from "../../../server/dataBaseUrl";
import fireStoreDbUrl from "../../../server/fireStoreUrl";

import Header from "../Header/Header";
import FormImage from "./FormComponents/FormImage";
import UserEmail from "./FormComponents/UserEmail";
import ExpenseDate from "./FormComponents/ExpenseDate";
import ExpenseCategory from "./FormComponents/ExpenseCategory";
import Amount from "./FormComponents/Amount";
import AttachInvoice from "./FormComponents/AttachInvoice";
import ExpenseDescription from "./FormComponents/ExpenseDescription";
import InvoiceNo from "./FormComponents/InvoiceNo";
import VendorName from "./FormComponents/VendorName";
import EmployeeConsent from "./FormComponents/EmployeeConsent";
import PaidTo from "./FormComponents/PaidTo";
import InvoiceDate from "./FormComponents/InvoiceDate";
import FormUrl from "./FormComponents/FormUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "./Modal/Modal";

import { getAuth } from "firebase/auth";

const Form = (props) => {
  const localAuth = getAuth();
  const localUser = localAuth.currentUser;
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [employeeMail, setEmployeeMail] = useState("");
  const [approverMailId, setApproverMailId] = useState("");
  const [adminMailId, setAdminMailId] = useState("");
  const [employeeAccount, setEmployeeAccount] = useState([]);
  const [docUrl, setDocUrl] = useState("");
  const [disable, setDisable] = useState(false);
  const [submitText, setSubmitText] = useState("Submit");
  const [userData, setUserData] = useState([]);
  const [employeeTitle, setEmployeeTitle] = useState("");

  const [dateError, setDateError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [InvoiceNoError, setInvoiceNoError] = useState(false);
  const [refNoError, setRefNoError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const [consentError, setConsentError] = useState(false);
  const [expenseItemsError, setExpenseItemsError] = useState(false);
  const [vendorItemsError, setVendorItemsError] = useState(false);
  const [pdfFileError, setPdfFileError] = useState("");
  const [percent, setPercent] = useState(0);
  const [show, setShow] = useState(false);
  const [role, setRole] = useState();
  const [isFormValid, setIsFormValid] = useState(props.isSubmitValid);
  const [formAccessToken, setFormAccessToken] = useState();
  const [invoiceDateError, setInvoiceDateError] = useState(false);

  const navigate = useNavigate();

  // const getDateValue = () => {
  //   const storedDate = localStorage.getItem("date");
  //   if (!storedDate)
  //     return {
  //       date: "",
  //     };
  //   return JSON.parse(storedDate);
  // };

  useEffect(() => {
    if (loading) return;
    if (user) {
      setFormAccessToken(user.accessToken);
      // const timer = setTimeout(() => {
      setEmployeeMail(user?.email);
      setEmployeeTitle(props.employeeName);
      setRole(props.userRole);
      setAdminMailId(props.adminMailId);
      setApproverMailId(props.approverMailId);
      setEmployeeAccount(props.account);

      // }, 1000);
    } else {
      return navigate("/login");
    }
    return () => {
      // clearTimeout(timer);
    };
  }, [user, formAccessToken, loading, props.userRole]);

  let id,
    mailId,
    expenseDate,
    expenseCategory,
    vendorCategory,
    refundAmount,
    expenseDescription,
    invoiceNumber,
    employee_consent,
    paid_to;

  const clearFormHandler = (e) => {
    e.preventDefault();

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setShow(false);
    // console.log(pdfFile);
    setDate("");
    setDateError("");
    setAmount("");
    setAmountError("");
    setExpenseItems("");
    setExpenseItemsError(false);
    setPdfFile(null);
    setEmailID("");
    setEmailError("");
    setInvoice("");
    setInvoiceNoError("");
    setConsent("");
    setConsentError("");
    setInvoiceDate("");
    setInvoiceDateError(false);
    setDescription("");
    setPdfFileError("");
    setVendorItems("");
    setTheInputKey(randomString);
    setOtherExpenseValue("");
    setDocUrl("");
  };

  let randomString = Math.random().toString(36);

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (date === "") {
      setDateError(true);

      return;
    } else {
      setDateError(false);
    }
    if (expenseItems === "") {
      setExpenseItemsError(true);
      return;
    } else {
      setExpenseItemsError(false);
    }

    if (expenseItems === "Other:" && otherExpenseValue === "") {
      setExpenseItemsError(true);
      return;
    } else {
      setExpenseItemsError(false);
    }
    if (amount === "") {
      setAmountError("This is a required Field.");
      return;
    } else if (isNaN(amount)) {
      setAmountError("Please enter a numeric value");
      return;
    } else {
      setAmountError("");
    }

    if (pdfFile === "" || pdfFile === null || pdfFile === undefined) {
      setPdfFileError("This is a required Question");
      return;
    } else {
      setPdfFileError("");
    }

    if (invoiceDate === "") {
      setInvoiceDateError(true);
      return;
    } else {
      setInvoiceDateError(false);
    }

    if (invoice === "") {
      setInvoiceNoError(true);
      return;
    } else {
      setInvoiceNoError(false);
    }

    if (consent.value === undefined || consent.value === "") {
      setConsentError(true);
      return;
    } else {
      setConsentError(false);
    }

    if (emailId !== "" && !isValidEmail(emailId)) {
      setEmailError("Please enter a valid email");
      return;
    } else {
      setEmailError("");
    }

    if (!approverMailId && !adminMailId) {
      toast(
        "You dont have an approver and admin assigned.Please contact the admin !"
      );
      return;
    }

    if (!adminMailId) {
      toast("You dont have an Admin assigned !");
      return;
    }

    if (!approverMailId) {
      toast("You dont have an Approver assigned !");
      return;
    }

    if (!employeeAccount) {
      toast("You dont have an Account assigned !");
      return;
    }

    id = props.employeeID;

    mailId = employeeMail;
    expenseDate = date;
    if (expenseItems !== "Other:") {
      expenseCategory = expenseItems;
    } else {
      expenseCategory = `${expenseItems}${otherExpenseValue}`;
    }
    if (vendorItems !== "Other:") {
      vendorCategory = vendorItems;
    } else {
      expenseCategory = `${vendorItems}${otherVendorName}`;
    }
    refundAmount = amount;
    expenseDescription = description;
    invoiceNumber = invoice;
    employee_consent = consent.value;
    paid_to = emailId;

    // console.log("employess Maild ID", employeeMail);

    const body = {
      employeeTitle,
      Time: new Date().toLocaleString(),
      employeeMail,
      id,
      date,
      expenseCategory,
      amount,
      invoiceDate,
      description,
      invoice,
      vendorCategory,
      employee_consent,
      emailId,
      pdfFile,
      approverMailId,
    };

    const postData = async () => {
      setDisable(true);
      setSubmitText("Submitting ...");
      const res = await fetch(
        "/formData",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            authToken: user.accessToken,
          },
          body: JSON.stringify({
            Time: new Date().toLocaleString(),
            UserSpecificId: id,
            EmployeeMail: employeeMail,
            EmployeeName: employeeTitle,
            EmployeeAccount:
              typeof employeeAccount === "string"
                ? [employeeAccount]
                : employeeAccount,
            ExpenseDate: date,
            ExpenseCategory:
              expenseItems === "Other:"
                ? `${(expenseItems, otherExpenseValue)}`
                : expenseItems,
            AmountToBeRefunded: amount,
            ExpenseDescription: description,
            InvoiceNo: invoice,
            VendorName:
              vendorItems === "Other:"
                ? `${(vendorItems, otherVendorName)}`
                : vendorItems,
            EmployeeConsent: consent.value,
            PaidTo: emailId,
            Invoice: pdfFile,
            InvoiceFileName: invoiceFileName,
            InvoiceDate: invoiceDate,
            EmployeeRole: role,
            AdminMailId: adminMailId,
            ApproverMailId: approverMailId,
            IsApproved: "",
            ApprovedAccount: "",
            RejectedAccount: "",
            RejectionReason: "",
            IsFundsProcessed: "",
            FundsRejectionReason: "",
            createdAt: new Date().toJSON().slice(0, 10),
          }),
        }
      );

      if (res.status === 201) {
        await axios
          .post("/mail", body, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((res) => {
            toast(`Copy of the Response successfully sent to ${employeeMail}`);

            // console.log(res);
          })
          .catch((err) => {
            toast("There is an issue with the mailing service");
            // console.log(err);
          });

        toast.dark("Your Form is Submitted!");
        setDisable(false);
        setSubmitText("Submit");
        // window.location.assign("/form-Submitted");
        setDate("");
        setDateError("");
        setAmount("");
        setAmountError("");
        setExpenseItems("");
        setExpenseItemsError(false);
        setPdfFile(null);
        setEmailID("");
        setEmailError("");
        setInvoice("");
        setInvoiceNoError("");
        setConsent("");
        setConsentError("");
        setInvoiceDate("");
        setDescription("");
        setPdfFileError("");
        setTheInputKey(randomString);
        setVendorItems("");
        setOtherVendorName("");
        setOtherExpenseValue("");
        // setDocUrl("");
      } else {
        alert("There is some problem with the DB connection");
        setDisable(false);
        setSubmitText("Submit");
      }
    };

    postData();

    props.setSubmitValid(true);
  };

  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    if (e.target.value === "") {
      setDateError(true);
    } else {
      setDateError(false);
    }
    // console.log(e.target.value);
    setDate(e.target.value);

    // setFormData(setDate);
  };

  // Amount
  const [amount, setAmount] = useState("");
  const inputAmountHandler = (e) => {
    if (e.target.value === "") {
      setAmountError("This is a required Field.");
    } else if (isNaN(e.target.value)) {
      setAmountError("Please enter a numeric value !");
    } else {
      setAmountError("");
    }
    // console.log(e.target.value);
    setAmount(e.target.value);
    // setFormData(...formData, setAmount);
  };

  // Paid To - Email

  const [emailId, setEmailID] = useState("");

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmail = (e) => {
    if (e.target.value !== "" && !isValidEmail(e.target.value)) {
      setEmailError("Please enter a vaild email");
    } else {
      setEmailError("");
    }
    setEmailID(e.target.value);

    // console.log(emailId);
    // setFormData(...formData, setEmailID);
  };

  // Invoice No.

  const [invoice, setInvoice] = useState("");

  const invoiceHandler = (e) => {
    if (e.target.value === "") {
      setInvoiceNoError(true);
    } else {
      setInvoiceNoError(false);
    }
    setInvoice(e.target.value);
    // console.log(invoice);
  };

  // Expense Description

  const limit = 100;
  const value = "";
  const [description, setDescription] = useState(value.slice(0, limit));
  const expenseDescriptionHandler = React.useCallback(
    (text) => {
      setDescription(text.slice(0, limit));
    },
    [limit, setDescription]
  );

  // Invoice PDF
  const [pdfFile, setPdfFile] = useState("");
  const [invoiceFileName, setInvoiceFileName] = useState("");
  const [fileProof, setFileProof] = useState("");
  const [theInputKey, setTheInputKey] = useState("");

  const handlePdfChange = (e) => {
    if (!e.target.files[0]) {
      setPdfFileError("This is a required Question");
    } else {
      setPdfFileError("");
    }
    if (e.target.files[0]) {
      const fileSize = e.target.files[0].size;
      if (fileSize && fileSize > 1000000) {
        alert("The filesize has exceeded size");
        e.target.value = null;
        // setPdfFile(undefined);
        // setTheInputKey(randomString);
        setPdfFileError("Please upload a file with size less than 300Kb.");
      }
    }
    // console.log(e.target.files[0]);
    setFileProof(e.target.files[0]);

    // console.log("hello");
    let selectedFile = e.target.files[0];
    // console.log("File Type", selectedFile.type);

    if (selectedFile) {
      setInvoiceFileName(selectedFile.name);
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = (e) => {
        setPdfFile(e.target.result);
        setPdfFileError("");
        // console.log(e.target.result);
      };
    } else {
      // setPdfFile(null);
      setInvoiceFileName("");
      setPdfFileError("This is a required Question");
    }

    if (!selectedFile) {
      setPdfFile(null);
      setInvoiceFileName("");
      setPdfFileError("This is a required Question");
    }
  };

  // Employee Consent

  const [consent, setConsent] = useState([]);

  const handleConsent = (consent) => {
    if (consent.value === undefined || consent.value === "") {
      setConsentError(true);
      setConsent(consent[0]);
    } else {
      setConsentError(false);
    }
    setConsent(consent);
    // console.log("Change Detected", consent.value);
  };

  // Expense Category
  const [expenseItems, setExpenseItems] = useState("");
  const [otherExpenseValue, setOtherExpenseValue] = useState("");

  const handleRadioChange = (e) => {
    if (e.target.value === "") {
      setExpenseItemsError(true);
    } else {
      setExpenseItemsError(false);
    }

    // console.log(e.target.value);
    setExpenseItems(e.target.value);
  };

  const othersInputHandler = (e) => {
    if (e.target.value === "") {
      setExpenseItemsError(true);
    } else {
      setExpenseItemsError(false);
    }
    setExpenseItems("Other:");

    setOtherExpenseValue(e.target.value);
  };

  const [vendorItems, setVendorItems] = useState("");
  const [otherVendorName, setOtherVendorName] = useState("");

  const handleVendorRadioChange = (e) => {
    console.log(e.target.value);
    setVendorItems(e.target.value);
  };

  const othersVendorHandler = (e) => {
    setVendorItems("Other:");
    setOtherVendorName(e.target.value);
  };

  const disableKeyDown = (e) => {
    e.preventDefault();
    return false;
  };

  // Reimbursement date

  const [invoiceDate, setInvoiceDate] = useState("");

  const handleInvoiceDateChange = (e) => {
    if (e.target.value === "") {
      setInvoiceDateError(true);
    } else {
      setInvoiceDateError(false);
    }
    setInvoiceDate(e.target.value);
  };

  const sameExpenseDateHandler = (e) => {
    e.preventDefault();
    if (invoiceDate !== "") {
      setInvoiceDateError(false);
    }
    setInvoiceDateError(false);
    setInvoiceDate(date);
  };

  const clearSelectionHandler = (e) => {
    e.preventDefault();
    setVendorItems("");
    setOtherVendorName("");
    // setVendorItemsError(false);
  };

  return (
    <Fragment>
      <Header role={props.userRole} employeeName={props.employeeName} />
      <div className="form-main__div">
        <form onSubmit={submitFormHandler} id="form" method="post">
          <FormImage />
          <UserEmail name="employeemail" employeeMail={employeeMail} />
          <ExpenseDate
            handleDateChange={handleDateChange}
            date={date}
            dateError={dateError}
            name="date"
            disableKeyDown={disableKeyDown}
          />
          <ExpenseCategory
            handleRadioChange={handleRadioChange}
            othersInputHandler={othersInputHandler}
            expenseItems={expenseItems}
            expenseItemsError={expenseItemsError}
            otherExpenseValue={otherExpenseValue}
            name="expensecategory"
          />
          <Amount
            inputAmountHandler={inputAmountHandler}
            amount={amount}
            amountError={amountError}
            name="amount"
          />
          <AttachInvoice
            pdfFile={pdfFile}
            pdfFileError={pdfFileError}
            handlePdfChange={handlePdfChange}
            // handleResetPdf={handleResetPdf}
            theInputKey={theInputKey}
            percent={percent}
            name="invoiceProof"
          />
          <InvoiceDate
            handleInvoiceDateChange={handleInvoiceDateChange}
            invoiceDate={invoiceDate}
            invoiceDateError={invoiceDateError}
            sameExpenseDateHandler={sameExpenseDateHandler}
          />
          <ExpenseDescription
            expenseDescriptionHandler={expenseDescriptionHandler}
            description={description}
            name="description"
            limit={limit}
          />
          <InvoiceNo
            invoiceHandler={invoiceHandler}
            invoice={invoice}
            InvoiceNoError={InvoiceNoError}
            name="invoiceNo"
          />

          <VendorName
            handleVendorRadioChange={handleVendorRadioChange}
            othersVendorHandler={othersVendorHandler}
            clearSelectionHandler={clearSelectionHandler}
            otherVendorName={otherVendorName}
            vendorItems={vendorItems}
          />

          <EmployeeConsent
            handleConsent={handleConsent}
            consent={consent}
            consentError={consentError}
            name="employeeconsent"
          />
          <PaidTo
            handleEmail={handleEmail}
            emailId={emailId}
            emailError={emailError}
            name="paidToEmail"
          />

          <FormUrl docUrl={docUrl} />

          <div className="btnDiv">
            <button
              className="submitBtn"
              disabled={disable}
              style={{ width: disable && "170px", fontSize: disable && "16px" }}
            >
              {submitText}
            </button>
          </div>
        </form>

        <div className="clearFormBtn-div">
          <button className="clearBtn" onClick={() => setShow(true)}>
            Clear Form
          </button>
          {/* <button >Show Modal</button> */}
          <Modal
            show={show}
            onClose={() => setShow(false)}
            title="Clear Form?"
            content="This will remove your answers from all questions and cannot be undone."
            clearFormHandler={clearFormHandler}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
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

export default Form;

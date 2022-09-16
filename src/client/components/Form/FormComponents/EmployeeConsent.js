import React from "react";
import { useState } from "react";
import Select from "react-select";
import Card from "../../../utils/Card";

const consentChoice = [
  { value: "", label: "Choose" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const EmployeeConsent = (props) => {
  // console.log(props.consentError);
  // console.log(props.consent.label);
  // const [consent, setConsent] = useState("");

  // const handleConsent = (consent) => {
  //   setConsent(consent.value);
  //   console.log("Change Detected", consent);
  // };
  return (
    <Card error={props.consentError}>
      <div className="expense-category">
        <h3 className="formHeading-h3">
          Employee Concent<span style={{ color: "red" }}>*</span>
        </h3>
        <p className="para" style={{ fontSize: "12px" }}>
          I Agree that the expense submitted by me are approved by policy or
          explicit approval was obtained before the expense was made for
          official purpose. Information Submitted herewith is correct to best of
          my knowledge. I have also ensured that this is not duplicate
          submission for reimbursement.
        </p>
        <Select
          options={consentChoice}
          value={props.consent}
          onChange={props.handleConsent}
          placeholder="Choose"
        />
      </div>
      {props.consentError ? (
        <p
          style={{
            fontSize: "15px",
            color: "red",
            fontFamily: "Patrick Hand",
            fontWeight: "500",
          }}
        >
          This is a required Question
        </p>
      ) : null}
    </Card>
  );
};

export default EmployeeConsent;

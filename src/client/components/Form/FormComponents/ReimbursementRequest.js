import React from "react";
import { useState } from "react";
import Select from "react-select";
import Card from "../utils/Card";

const reimbursementChoice = [
  { value: "", label: "Choose" },
  { value: "submitted", label: "Submitted" },
  { value: "draft", label: "Draft" },
  { value: "cancelled", label: "Cancelled" },
];

const ReimbursementRequest = (props) => {
  // const [reimbursement, setReimbursement] = useState("");

  // const handleChoice = (reimbursement) => {
  //   setReimbursement(reimbursement.value);
  //   console.log("Change Detected", reimbursement.value);
  // };
  return (
    <Card error={props.statusError}>
      <div className="expense-category">
        <h3 className="formHeading-h3">
          Reimbursement Request Status<span style={{ color: "red" }}>*</span>
        </h3>
        <Select
          options={reimbursementChoice}
          value={props.reimbursement}
          onChange={props.handleChoice}
          placeholder="Choose"
          name={props.name}
        />
        {props.statusError ? (
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
      </div>
    </Card>
  );
};

export default ReimbursementRequest;

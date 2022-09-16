import React from "react";
import { useState } from "react";
import Select from "react-select";
import Card from "../utils/Card";

const statusChoice = [
  { value: "", label: "Choose" },
  { value: "on hold", label: "On Hold (Pending Documents)" },
  { value: "verified", label: "Verified (Pending Payment)" },
  { value: "paid", label: "Paid" },
];

const ReimbursementStatus = (props) => {
  // const [status, setStaus] = useState("");

  // const handleStatus = (status) => {
  //   setStaus(status.value);
  //   console.log("Change Detected", status.value);
  // };
  return (
    <Card error={props.statusError}>
      <div className="expense-category">
        <h3 className="formHeading-h3">Reimbursement Payment Status</h3>
        <Select
          options={statusChoice}
          value={props.status}
          onChange={props.handleStatus}
          placeholder="Choose"
          name={props.name}
        />
        {props.statusError && (
          <p style={{ color: "red", fontSize: "14px" }}>
            This is a required Field.
          </p>
        )}
      </div>
    </Card>
  );
};

export default ReimbursementStatus;

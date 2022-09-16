import React from "react";
import Card from "../../../utils/Card";
import { useState } from "react";
const PaidTo = (props) => {
  // const [emailId, setEmailID] = useState("");

  // const handleEmail = (e) => {
  //   setEmailID(e.target.value);
  // };

  return (
    <Card error={props.emailError}>
      <div>
        <h3 className="formHeading-h3">Paid By/To (Email Id)</h3>
        <p className="para" style={{ fontSize: "12px" }}>
          Enter the email id of the person to whom the amount to be reimbursed
          (use this if you are filling the form on someone's behalf otherwise
          leave it empty)
        </p>
        <input
          type="text"
          onChange={props.handleEmail}
          placeholder="Your Answer"
          className="expenseInput"
          value={props.emailId}
          name={props.name}
        />
        {props.emailError && (
          <p
            style={{
              color: "red",
              fontSize: "15px",
              fontFamily: "Patrick Hand",
              fontWeight: "500",
            }}
          >
            {props.emailError}
          </p>
        )}
      </div>
    </Card>
  );
};

export default PaidTo;

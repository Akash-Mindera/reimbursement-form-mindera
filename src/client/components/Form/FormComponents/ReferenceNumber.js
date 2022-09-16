import React from "react";
import Card from "../utils/Card";
import { useState } from "react";

const ReferenceNumber = (props) => {
  // const [refNumber, setRefNumber] = useState("");

  // const refNoHandler = (e) => {
  //   console.log(e.target.value);
  //   setRefNumber(e.target.value);
  // };
  return (
    <Card>
      <div>
        <h3 className="formHeading-h3">Reimbursement Reference Number</h3>
        <input
          type="text"
          onChange={props.refNoHandler}
          placeholder="Your Answer"
          className="expenseInput"
          value={props.refNumber}
          name={props.name}
        />
      </div>
    </Card>
  );
};

export default ReferenceNumber;

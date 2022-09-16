import React from "react";
import Card from "../../../utils/Card";
import { useState } from "react";
const Amount = (props) => {
  // const [amount, setAmount] = useState("");
  // const inputAmountHandler = (e) => {
  //   console.log(e.target.value);
  //   setAmount(e.target.value);
  // };
  return (
    <Card error={props.amountError}>
      <div>
        <h3 className="formHeading-h3">
          Amount<span style={{ color: "red" }}>*</span>
        </h3>
        <input
          type="text"
          onChange={props.inputAmountHandler}
          placeholder="Your Answer"
          className="expenseInput"
          value={props.amount}
          name={props.name}
        />
        {props.amountError ? (
          <p
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "red",
              fontFamily: "Patrick Hand",
            }}
          >
            {props.amountError}
          </p>
        ) : null}
      </div>
    </Card>
  );
};

export default Amount;

import React from "react";
import Card from "../../../utils/Card";
import moment from "moment";
import { useState } from "react";
import "./ExpenseDate.css";
const ExpenseDate = (props) => {
  // const [date, setDate] = useState("dd-mm-yy");

  // const handleDateChange = (e) => {
  //   console.log(e.target.value);
  //   setDate(e.target.value);
  // };

  return (
    <Card error={props.dateError}>
      {/* {console.log(props.dateError)} */}
      <div>
        <h3 className="formHeading-h3">
          Expense Date<span style={{ color: "red" }}>*</span>
        </h3>
        <label className="label">Date</label>
        <input
          type="date"
          onChange={props.handleDateChange}
          value={props.date}
          // required
          className="expenseInput"
          mandatory="true"
          aria-invalid={props.dateError ? "true" : "false"}
          name={props.name}
          max={moment().format("YYYY-MM-DD")}
          onKeyDown={props.disableKeyDown}
        />
        {props.dateError ? (
          <p
            style={{
              fontSize: "14px",
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

export default ExpenseDate;

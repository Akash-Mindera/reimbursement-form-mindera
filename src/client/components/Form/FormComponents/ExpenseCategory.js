import React, { useState } from "react";
import Card from "../../../utils/Card";
import "./ExpenseCategory.css";

const ExpenseItems = [
  "IT Asset",
  "Mobile",
  "Lunch/Dinner Expense",
  "Pantry Expense",
  "TL Pantry Expense",
  "Visa/Travel Expense",
  "Other:",
];

const ExpenseCategory = (props) => {
  // const [expenseItems, setExpenseItems] = useState("Mobile");
  // const [otherExpenseValue, setOtherExpenseValue] = useState("");

  // const handleRadioChange = (e) => {
  //   console.log(e.target.value);
  //   setExpenseItems(e.target.value);
  // };

  // const othersInputHandler = (e) => {
  //   setExpenseItems("Other:");
  //   setOtherExpenseValue(e.target.value);
  // };

  //   console.log(ExpenseItems);
  return (
    <Card error={props.expenseItemsError}>
      <div className="expense-category">
        <h3 className="formHeading-h3">
          Expense Catergory<span style={{ color: "red" }}>*</span>
        </h3>
        {ExpenseItems.map((option, i) => {
          return (
            <div
              style={{ marginTop: "25px", position: "relative" }}
              key={option}
              className="expenseItems-div"
            >
              <input
                type="radio"
                value={option}
                onChange={props.handleRadioChange}
                checked={props.expenseItems === option}
                name={props.name}
              />

              <label style={{ marginLeft: "20px", flexBasis: "50%" }}>
                {option}
              </label>
            </div>
          );
        })}
        <div className="OtherInputDiv">
          <input
            type="text"
            className="otherInputField"
            onChange={props.othersInputHandler}
            value={props.otherExpenseValue}
            style={{
              borderBottom: props.expenseItems === "Other:" && "2px solid red",
            }}
          />
        </div>

        {props.expenseItemsError && (
          <p
            style={{
              color: "red",
              fontSize: "15px",
              fontFamily: "Patrick Hand",
              fontWeight: "500",
            }}
          >
            This is a required Field.
          </p>
        )}
      </div>
    </Card>
  );
};

export default ExpenseCategory;

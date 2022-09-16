import React from "react";
import Card from "../../../utils/Card";
import { useState } from "react";
const ExpenseDescription = (props) => {
  // const [description, setDescription] = useState("");
  // const expenseDescriptionHandler = (e) => {
  //   setDescription(e.target.value);
  // };
  return (
    <Card>
      <div>
        <h3 className="formHeading-h3">Expense Description</h3>
        <textarea
          type="text"
          onChange={(e) => props.expenseDescriptionHandler(e.target.value)}
          placeholder="Your Answer"
          // required
          className="expenseInput"
          value={props.description}
          name={props.name}
          style={{ resize: "none", width: "96%" }}
        />
        {props.description.length < props.limit ? (
          <p
            style={{
              color: "blue",
              fontFamily: "Patrick Hand",
              fontFamily: "15px",
            }}
          >
            {props.description.length}/{props.limit}
          </p>
        ) : (
          <p
            style={{
              color: "red",
              fontFamily: "Patrick Hand",
              fontFamily: "15px",
            }}
          >
            You have reached the max no. of characters !
          </p>
        )}
      </div>
    </Card>
  );
};

export default ExpenseDescription;

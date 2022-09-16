import React from "react";
import Card from "../../../utils/Card";
import moment from "moment";
import "./ExpenseDate.css";
const InvoiceDate = (props) => {
  // const [remDate, setRemDate] = useState("dd-mm-yy");

  // const handleRemDateChange = (e) => {
  //   console.log(e.target.value);
  //   setRemDate(e.target.value);
  // };

  return (
    <Card error={props.invoiceDateError}>
      <div>
        <h3 className="formHeading-h3">
          Invoice Date<span style={{ color: "red" }}>*</span>
        </h3>
        <label className="label">Date</label>
        <div className="invoiceDateDiv">
          <input
            type="date"
            onChange={props.handleInvoiceDateChange}
            value={props.invoiceDate}
            className="expenseInput"
            max={moment().format("YYYY-MM-DD")}
            onKeyDown={props.disableKeyDown}
            name={props.name}
          />
          <button
            onClick={props.sameExpenseDateHandler}
            className="sameAsExpenseButton"
          >
            Same as Expense
          </button>
        </div>
        {props.invoiceDateError ? (
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

export default InvoiceDate;

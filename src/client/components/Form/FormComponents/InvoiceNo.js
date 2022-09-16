import React from "react";
import Card from "../../../utils/Card";
import { useState } from "react";
const InvoiceNo = (props) => {
  // const [invoice, setInvoice] = useState("");

  // const invoiceHandler = (e) => {
  //   setInvoice(e.target.value);
  // };
  return (
    <Card error={props.InvoiceNoError}>
      <div>
        <h3 className="formHeading-h3">
          Invoice Number<span style={{ color: "red" }}>*</span>
        </h3>
        <input
          type="text"
          onChange={props.invoiceHandler}
          placeholder="Your Answer"
          className="expenseInput"
          value={props.invoice}
          name={props.name}
        />
      </div>
      {props.InvoiceNoError && (
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
    </Card>
  );
};

export default InvoiceNo;

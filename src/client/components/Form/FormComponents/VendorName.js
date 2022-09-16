import React, { useState } from "react";
import Card from "../../../utils/Card";
import "./ExpenseCategory.css";

const VendorItems = ["Amazon", "BigBasket", "Metro", "Other:"];

const VendorName = (props) => {
  // const [vendorItems, setVendorItems] = useState("Amazon");
  // const [otherVendorName, setOtherVendorName] = useState("");

  // const handleVendorRadioChange = (e) => {
  //   console.log(e.target.value);
  //   setVendorItems(e.target.value);
  // };

  // const othersVendorHandler = (e) => {
  //   setVendorItems("Other:");
  //   setOtherVendorName(e.target.value);
  // };

  //   console.log(ExpenseItems);

  return (
    <Card>
      <div className="expense-category">
        <h3 className="formHeading-h3">Vendor Name</h3>
        {VendorItems.map((option, i) => {
          return (
            <div
              style={{ marginTop: "25px", position: "relative" }}
              key={option}
              className="expenseItems-div"
            >
              <input
                type="radio"
                value={option}
                onChange={props.handleVendorRadioChange}
                checked={props.vendorItems === option}
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
            onChange={props.othersVendorHandler}
            value={props.otherVendorName}
            style={{
              borderBottom: props.vendorItems === "Other:" && "2px solid red",
            }}
          />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              className="clearSelect-btn"
              onClick={props.clearSelectionHandler}
              style={{
                opacity: props.vendorItems !== "" && "1",
                visibility: props.vendorItems !== "" && "visible",
              }}
            >
              Clear Selection
            </button>
          </div>
        </div>
        {/* {props.vendorItemsError && (
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
        )} */}
      </div>
    </Card>
  );
};

export default VendorName;

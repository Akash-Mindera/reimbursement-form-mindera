import React, { useState } from "react";
import Card from "../../../utils/Card";
import "./AttachInvoice.css";
const AttachInvoice = (props) => {
  // for Onchange Events
  // const [pdfFile, setPdfFile] = useState(null);
  // const [pdfFileError, setPdfFileError] = useState("");

  // const fileType = ["application/pdf"];

  // const handlePdfChange = (e) => {
  //   let selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     if (selectedFile && fileType.includes(selectedFile.type)) {
  //       setPdfFile(selectedFile);
  //       setPdfFileError("");
  //     } else {
  //       setPdfFile(null);
  //       setPdfFileError("Please select a valid PDF File");
  //     }
  //   } else {
  //     console.log("select you file");
  //   }
  // };

  return (
    <Card error={props.pdfFileError}>
      {/* {console.log(props.pdfFile)} */}
      <div>
        <h3 className="formHeading-h3">
          Attach Invoice<span style={{ color: "red" }}>*</span>
        </h3>
        <p className="para">
          Hard Copy of the Invoice should be submitted to Operations team
        </p>
        <input
          type="file"
          onChange={props.handlePdfChange}
          placeholder="Add File"
          id="FileUpload"
          className="custom-file-input"
          key={props.theInputKey || ""}
          name={props.name}
          accept=".gif, .jpg, .png, .doc, application/pdf"
        />

        <p
          style={{
            fontFamily: "Patrick Hand",
            fontSize: "15px",
            fontWeight: "500",
            color: "red",
          }}
        >
          {props.pdfFileError}
        </p>
      </div>
    </Card>
  );
};

export default AttachInvoice;

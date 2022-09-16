import React from "react";
import Card from "../../../utils/Card";
const ReimbursementDetails = () => {
  return (
    <Card>
      <div>
        <h3 className="formHeading-h3">Reimbursement Details</h3>
        <p
          className="para"
          style={{
            fontSize: "12px",
            marginTop: "-18px",
            fontFamily: "Patrick Hand, fantasy",
          }}
        >
          (Below Section to be filled by finance team only)
        </p>
      </div>
    </Card>
  );
};

export default ReimbursementDetails;

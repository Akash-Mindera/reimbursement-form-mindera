import React from "react";
import Card from "../../utils/Card";
const NoRecordsAvailable = () => {
  return (
    <Card>
      {" "}
      <div
        style={{ margin: "auto", marginTop: "20px" }}
        className="noRecords-div"
      >
        <p
          style={{
            fontFamily: "Patrick Hand",
            fontSize: "22px",
            color: "black",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          No Records Founds !
        </p>
      </div>
    </Card>
  );
};

export default NoRecordsAvailable;

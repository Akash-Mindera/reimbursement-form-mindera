import React from "react";

const ApprovalButton = (props) => {
  return (
    <button className="ui basic green button" onClick={props.onClick}>
      Approve
    </button>
  );
};

export default ApprovalButton;

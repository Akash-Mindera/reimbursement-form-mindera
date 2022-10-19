import React from "react";
import { Fragment } from "react";

import ApprovedResponses from "../ApprovedResponses";
const ApprovedResponsesTab = (props) => {
  return (
    <Fragment>
      <div
        className={`ui bottom attached tab segment ${
          props.tab2 === true ? "active" : ""
        }`}
        data-tab="second"
      >
        <ApprovedResponses
          remRecords={props.remRecords}
          employeeMailId={props.employeeMailId}
          tab2={props.tab2}
        />
      </div>
    </Fragment>
  );
};

export default ApprovedResponsesTab;

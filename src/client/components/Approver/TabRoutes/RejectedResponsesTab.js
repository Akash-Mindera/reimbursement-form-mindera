import React from "react";
import { Fragment } from "react";
import RejectedResponses from "../RejectedResponses";
const RejectedResponsesTab = (props) => {
  return (
    <Fragment>
      <div
        className={`ui bottom attached tab segment ${
          props.tab3 === true ? "active" : ""
        }`}
        data-tab="third"
      >
        <RejectedResponses
          remRecords={props.remRecords}
          employeeMailId={props.employeeMailId}
          tab3={props.tab3}
        />
      </div>
    </Fragment>
  );
};

export default RejectedResponsesTab;

import React from "react";
import { Fragment } from "react";
import RequireAction from "../RequireAction";
const RequireActionTab = (props) => {
  return (
    <Fragment>
      <div
        className={`ui bottom attached tab segment ${
          props.tab1 === true ? "active" : ""
        }`}
        data-tab="first"
      >
        <RequireAction
          remRecords={props.remRecords}
          rejectResponse={props.rejectResponse}
          approveResponse={props.approveResponse}
          approvalHandler={props.approvalHandler}
          declineHandler={props.declineHandler}
          employeeMailId={props.employeeMailId}
          tab1={props.tab1}
        />
      </div>
    </Fragment>
  );
};

export default RequireActionTab;

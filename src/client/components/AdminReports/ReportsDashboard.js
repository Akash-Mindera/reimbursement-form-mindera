import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../server/firebase";
import axios from "axios";
import realtimeDbUrl from "../../../server/dataBaseUrl";
import Select from "react-select";
import "./ReportsDashboard.css";
import Card from "../../utils/Card";
import Loader from "../../utils/Loader";
import AllRecords from "./AllRecords";
import RequiresApprovalFromApprover from "./RequiresApprovalFromApprover";
import ApprovedFromApprover from "./ApprovedFromApprover";
import DeclinedRecords from "./DeclinedByApprover";
import RequiresApprovalFromAdmin from "./RequiresApprovalFromAdmin";
import ApprovedForFundsAdmin from "./ApprovedForFundsAdmin";
import DeclinedForFundsAdmin from "./DeclinedForFundsAdmin";
import NoRecordsAvailable from "./NoRecordsAvailable";

const ReportsDashboard = (props) => {
  const [adminAccessToken, setAdminAccessToken] = useState();
  const [user, loading, error] = useAuthState(auth);
  const [spinner, setSpinner] = useState(false);
  const [adminData, setAdminData] = useState();
  const [adminRemRecords, setAdminRemRecords] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (user) {
      setAdminAccessToken(user.accessToken);
      const timer = setTimeout(() => {
        getAdminData();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [user, adminAccessToken]);

  const fireBaseUrl = `${realtimeDbUrl}/ReimbursementRecords.json?auth=${adminAccessToken}`;

  const getAdminData = async () => {
    setSpinner(true);
    const response = await axios.get(fireBaseUrl);
    setAdminData(response.data);
    setSpinner(false);
    let adminData = response.data;

    if (adminData) {
      setAdminRemRecords(Object.keys(adminData));
    }
  };

  // Select Field Logic //

  const handleEmployeeId = (employeeId) => {
    if (
      employeeId.value === undefined ||
      employeeId.value === "" ||
      employeeId.value === "Choose"
    ) {
      // setConsentError(true);
      setEmployeeId(employeeId[0]);
    } else {
      // setConsentError(false);
    }
    setEmployeeId(employeeId);
    console.log("Change in select field", employeeId.value);
  };

  const handleFilterEmployeeId = (filter) => {
    if (filter.value === undefined) {
      setFilter([]);
    } else {
    }
    setFilter(filter);
    console.log("Filter", filter.value);
  };

  // Filtering Employee Ids Logic //
  const filteredAwaitedRecords = adminRemRecords.filter(
    (id) => adminData[id].AdminMailId === props.employeeMailId
  );

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const employeeIds = filteredAwaitedRecords.map(
    (id) => adminData[id].UserSpecificId
  );

  const uniqueIds = employeeIds.filter(onlyUnique);

  const consentChoice = ["Choose", ...uniqueIds];

  const filterChoices = [
    { value: "Choose", label: "Choose" },
    { value: "All", label: "All" },
    { value: "awaitingApprover", label: "Require Action By Approver" },
    { value: "approvedApprover", label: "Approved By Approver" },
    { value: "declinedApprover", label: "Declined By Approver" },
    { value: "awaitingAdmin", label: "Require Action By Admin" },
    { value: "approvedAdmin", label: "Funds Processed for Reimbursement" },
    { value: "declinedAdmin", label: "Funds Declined for Reimbursement" },
  ];

  // Filtering Data with only employee Id and filtering//

  const filterAllData = adminRemRecords.filter(
    (id) => adminData[id].UserSpecificId === employeeId.value
  );

  const filterPendingActionDataUsingId = adminRemRecords.filter(
    (id) =>
      adminData[id].UserSpecificId === employeeId.value &&
      adminData[id].IsApproved === ""
  );

  const filterApprovedDataUsingId = adminRemRecords.filter(
    (id) =>
      adminData[id].UserSpecificId === employeeId.value &&
      adminData[id].IsApproved === "Yes"
  );
  const filterDeclinedDataUsingId = adminRemRecords.filter(
    (id) =>
      adminData[id].UserSpecificId === employeeId.value &&
      adminData[id].IsApproved === "No"
  );

  const filterPendingAdminDataUsingId = adminRemRecords.filter(
    (id) =>
      adminData[id].UserSpecificId === employeeId.value &&
      adminData[id].IsApproved === "Yes" &&
      adminData[id].IsFundsProcessed === ""
  );

  const filterProcessedAdminDataUsingId = adminRemRecords.filter(
    (id) =>
      adminData[id].UserSpecificId === employeeId.value &&
      adminData[id].IsApproved === "Yes" &&
      adminData[id].IsFundsProcessed === "Yes"
  );

  const filterDeclinedAdminDataUsingId = adminRemRecords.filter(
    (id) =>
      adminData[id].UserSpecificId === employeeId.value &&
      adminData[id].IsApproved === "Yes" &&
      adminData[id].IsFundsProcessed === "No"
  );

  console.log("fetched Data", employeeId.value);

  return (
    <Fragment>
      {spinner && <Loader />}
      <div className="ui container">
        <Card>
          Reports Dashboard
          <>
            <div>
              <h3 className="formHeading-h3">
                Select Employee Id:<span style={{ color: "red" }}>*</span>
              </h3>
              <Select
                options={consentChoice.map((account) => ({
                  value: account,
                  label: account,
                }))}
                value={employeeId}
                onChange={handleEmployeeId}
                placeholder="Choose"
              />
            </div>
            <div>
              <h3 className="formHeading-h3">
                Filter Data<span style={{ color: "red" }}>*</span>
              </h3>
              <Select
                options={filterChoices}
                //   value: account,
                //   label: account,
                // }))}
                value={filter}
                onChange={handleFilterEmployeeId}
                placeholder="Choose"
                isOptionSelected={(option, selectValue) =>
                  selectValue.some((i) => i === option)
                }
              />
            </div>
          </>
        </Card>
        <>
          {filterAllData.length !== 0 && filter.value === "All" ? (
            <AllRecords
              filterAllData={filterAllData}
              employeeId={employeeId}
              adminData={adminData}
            />
          ) : null}
          {filterPendingActionDataUsingId.length !== 0 &&
          filter.value === "awaitingApprover" ? (
            <RequiresApprovalFromApprover
              filterPendingActionDataUsingId={filterPendingActionDataUsingId}
              employeeId={employeeId}
              adminData={adminData}
            />
          ) : null}
          {filterApprovedDataUsingId.length !== 0 &&
          filter.value === "approvedApprover" ? (
            <ApprovedFromApprover
              filterApprovedDataUsingId={filterApprovedDataUsingId}
              employeeId={employeeId}
              adminData={adminData}
            />
          ) : null}
          {filterDeclinedDataUsingId.length !== 0 &&
          filter.value === "declinedApprover" ? (
            <DeclinedRecords
              filterDeclinedDataUsingId={filterDeclinedDataUsingId}
              employeeId={employeeId}
              adminData={adminData}
            />
          ) : null}
          {filterPendingAdminDataUsingId.length !== 0 &&
          filter.value === "awaitingAdmin" ? (
            <RequiresApprovalFromAdmin
              filterPendingAdminDataUsingId={filterPendingAdminDataUsingId}
              employeeId={employeeId}
              adminData={adminData}
            />
          ) : null}
          {filterProcessedAdminDataUsingId.length !== 0 &&
          filter.value === "approvedAdmin" ? (
            <ApprovedForFundsAdmin
              filterProcessedAdminDataUsingId={filterProcessedAdminDataUsingId}
              employeeId={employeeId}
              adminData={adminData}
            />
          ) : null}
          {filterDeclinedAdminDataUsingId.length !== 0 &&
          filter.value === "declinedAdmin" ? (
            <DeclinedForFundsAdmin
              filterDeclinedAdminDataUsingId={filterDeclinedAdminDataUsingId}
              employeeId={employeeId}
              adminData={adminData}
            />
          ) : null}
        </>
      </div>
    </Fragment>
  );
};

export default ReportsDashboard;

import { Fragment, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./server/firebase";
import { db } from "./server/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { logout } from "./server/firebase";
import Footer from "./client/components/Footer/Footer";
import UserMain from "./client/components/Users/UserMain";
import Form from "./client/components/Form/Form";
import Login from "./client/components/Login/Login";
import ApproverMain from "./client/components/Approver/ApproverMain";
import ApproverRecordsMain from "./client/components/ApproverRecords/ApproverRecordsMain";
import PageNotFound from "./client/components/Static/PageNotFound";
import Reset from "./client/components/Reset/Reset";
import AdminRecordsMain from "./client/components/AdminRecords/AdminRecordsMain";
import AdminMain from "./client/components/Admin/AdminMain";
import ReportsDashboard from "./client/components/AdminReports/ReportsDashboard";
import Testing from "./Testing";

import "./App.css";

const App = () => {
  const [user] = useAuthState(auth);

  const [employeeMail, setEmployeeMail] = useState("");

  const [isSubmitValid, setSubmitValid] = useState();

  const [role, setRole] = useState();

  const [approverMailId, setApproverMailId] = useState("");

  const [adminMailId, setAdminMailId] = useState("");
  const [employeeMailId, setEmployeeMailId] = useState("");

  const [approver, setApprover] = useState(true);
  const [name, setName] = useState("");

  const [employeeID, setEmployeeID] = useState("");
  const [account, setAccount] = useState([]);

  useEffect(() => {
    if (user) {
      setEmployeeMail(user?.email);
      // getUser();
      fetchData();
    }
    return () => {
      setRole();
      setEmployeeID();
      setAccount();
      setName();
      setApproverMailId();
      setAdminMailId();
      setEmployeeID();
    };
  }, [user]);

  const fetchData = async () => {
    try {
      const q = query(
        collection(db, "UserAuth"),
        where("uid", "==", user?.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setRole(data.role);
      setEmployeeID(data.employeeId);
      setAccount(data.account);
      setName(data.name);
      setApproverMailId(data.approverMailId);
      setAdminMailId(data.adminMailId);
      setEmployeeMailId(data.emailID);
    } catch (err) {
      // console.error(err);
      alert("Your Data has not been updated on the database");
      logout();
    }
  };

  // console.log("From App", role);
  return (
    <Fragment>
      <Routes>
        <Route exact path="/login" element={<Login role={role} />} />

        <Route
          exact
          path="/approver-panel"
          element={
            <ApproverMain
              role={role}
              employeeName={name}
              employeeMailId={employeeMailId}
              employeeID={employeeID}
            />
          }
        />

        <Route
          exact
          path="/approver-records"
          element={
            <ApproverRecordsMain
              role={role}
              employeeName={name}
              employeeID={employeeID}
              approverMailId={approverMailId}
              adminMailId={adminMailId}
            />
          }
        />

        <Route
          exact
          path="/admin-panel"
          element={
            <AdminMain
              role={role}
              employeeName={name}
              employeeMailId={employeeMailId}
              employeeID={employeeID}
            />
          }
        />

        <Route
          exact
          path="/admin-records"
          element={
            <AdminRecordsMain
              role={role}
              employeeName={name}
              employeeMailId={employeeMailId}
              employeeID={employeeID}
              approverMailId={approverMailId}
              adminMailId={adminMailId}
            />
          }
        />
        <Route
          exact
          path="/admin-reports"
          element={
            <ReportsDashboard
              role={role}
              employeeName={name}
              employeeMailId={employeeMailId}
              employeeID={employeeID}
              approverMailId={approverMailId}
              adminMailId={adminMailId}
            />
          }
        />

        <Route
          exact
          path="/"
          element={
            <Fragment>
              <Form
                setSubmitValid={setSubmitValid}
                employeeID={employeeID}
                userRole={role}
                approver={approver}
                employeeName={name}
                approverMailId={approverMailId}
                adminMailId={adminMailId}
                account={account}
              />
              <Footer />
            </Fragment>
          }
        />

        <Route
          exact
          path="/user-records"
          element={
            <UserMain
              employeeID={employeeID}
              name={name}
              role={role}
              approverMailId={approverMailId}
              adminMailId={adminMailId}
              account={account}
            />
          }
        />
        <Route exact path="/reset" element={<Reset />} />

        <Route path="*" element={<PageNotFound />} />
        <Route exact path="/testing" element={<Testing />} />
      </Routes>
    </Fragment>
  );
};

export default App;

// package.json file start -

// "nodemon --watch backend --exec node backend/server.js"

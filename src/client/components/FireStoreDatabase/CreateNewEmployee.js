import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../server/firebase";
import Card from "../../utils/Card";
const CreateNewEmployee = () => {
  const [userCreationStates, setUserCreationStates] = useState({
    name: "",
    employeeId: "",
    emailId: "",
    role: "",
    uid: "",
    account: "",
    approverMailId: "",
    adminMailId: "",
  });

  let name, value;
  const getUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUserCreationStates({ ...userCreationStates, [name]: value });
  };

  const clearFormHandler = () => {
    setUserCreationStates({
      name: "",
      employeeId: "",
      emailId: "",
      role: "",
      uid: "",
      account: [],
      approverMailId: "",
      adminMailId: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userAuthDbRef = collection(db, "UserAuth");
    try {
      await addDoc(userAuthDbRef, {
        name: userCreationStates.name,
        employeeId: userCreationStates.employeeId,
        emailID: userCreationStates.emailId,
        role: userCreationStates.role,
        uid: userCreationStates.uid,
        account: userCreationStates.account,
        approverMailId: userCreationStates.approverMailId,
        adminMailId: userCreationStates.adminMailId,
      }).then(() => {
        alert("New Account Is Added");
        clearFormHandler();
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Fragment>
      <div style={{ marginTop: "25px" }}>
        <h1
          style={{
            fontFamily: "Patrick Hand",
            fontSize: "35px",
            color: "Blue",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Create New Employee
        </h1>
      </div>
      <div className="ui container">
        <Card>
          <form className="ui form" onSubmit={handleFormSubmit}>
            <div class="field">
              <label>Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={userCreationStates.name}
                name="name"
                onChange={getUserData}
                required
              />
            </div>
            <div className="field">
              <label>Employee ID</label>
              <input
                type="text"
                placeholder="Employee ID"
                name="employeeId"
                value={userCreationStates.employeeId}
                onChange={getUserData}
                required
              />
            </div>
            <div className="field">
              <label>Email Id : (Employee)</label>
              <input
                name="emailId"
                type="email"
                placeholder="Email Id"
                value={userCreationStates.emailId}
                onChange={getUserData}
                required
              />
            </div>
            <div className="field">
              <label>Role</label>
              <input
                name="role"
                type="text"
                placeholder="Role"
                value={userCreationStates.role}
                onChange={getUserData}
                required
              />
            </div>
            <div className="field">
              <label>UID</label>
              <input
                name="uid"
                type="text"
                placeholder="UID"
                value={userCreationStates.uid}
                onChange={getUserData}
                required
              />
            </div>
            <div className="field">
              <label>Account</label>
              <input
                name="account"
                type="text"
                placeholder="Account"
                value={userCreationStates.account}
                onChange={getUserData}
                required
              />
            </div>
            <div className="field">
              <label>Approver Mail ID</label>
              <input
                name="approverMailId"
                type="email"
                value={userCreationStates.approverMailId}
                placeholder="Approver Mail Id"
                onChange={getUserData}
                required
              />
            </div>
            <div className="field">
              <label>Admin Mail ID</label>
              <input
                name="adminMailId"
                type="email"
                value={userCreationStates.adminMailId}
                placeholder="Admin Mail Id"
                onChange={getUserData}
                required
              />
            </div>

            <button className="ui button" type="submit">
              Submit
            </button>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};

export default CreateNewEmployee;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderImageHolder from "./HeaderImageHolder";
import "./Header.css";
import Card from "../../utils/Card";
import { auth } from "../../../server/firebase";
import { logout } from "../../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
const Header = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [openMenu, setOpenMenu] = useState(false);

  const handleUserMenu = () => {
    setOpenMenu(!openMenu);
  };

  // const switchAccountHandler = (e) => {
  //   if (user) navigate("/");
  // };
  // console.log("Props of role", props.role);
  // console.log("Current Url", window.location.href);
  // console.log("From menu", props.employeeID);
  return (
    <div className="formHeader-div">
      <div className="header-flex">
        <div className="dropdown">
          <div
            className={`ui floating labeled icon dropdown button ${
              openMenu ? "active visible" : ""
            } `}
            onClick={handleUserMenu}
          >
            {props.role === "user" ? (
              <i className="user icon"></i>
            ) : (
              <i className="user secret icon"></i>
            )}
            <span className="text">{props.employeeName}</span>
            <div className={`menu ${openMenu ? "transition visible" : ""}  `}>
              {props.role === "user" ? (
                <div className="item">
                  <i className="edit icon"></i>
                  <Link to={`/user-records`} className="profile-Btn">
                    Your Records
                  </Link>
                </div>
              ) : null}

              {props.role === "approver" ? (
                <div className="item">
                  <i className="th icon"></i>
                  <Link to="/approver-panel" className="adminPanelLink">
                    Approver Panel
                  </Link>
                </div>
              ) : null}

              {props.role === "approver" ? (
                <div className="item">
                  <i className="edit icon"></i>
                  <Link to="/approver-records" className="adminPanelLink">
                    Approver Records
                  </Link>
                </div>
              ) : null}
              {props.role === "admin" ? (
                <div className="item">
                  <i className="edit icon"></i>
                  <Link to="/admin-panel" className="adminPanelLink">
                    Admin Panel
                  </Link>
                </div>
              ) : null}

              {props.role === "admin" ? (
                <div className="item">
                  <i className="th icon"></i>
                  <Link to="/admin-records" className="adminPanelLink">
                    Admin Records
                  </Link>
                </div>
              ) : null}

              <div className="item">
                <i className="wpforms icon"></i>
                <Link to="/" className="adminPanelLink">
                  Form
                </Link>
              </div>

              <div className="item">
                <i className="power off icon"></i>
                <button className="logOutBtn" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <HeaderImageHolder />
      </div>
    </div>
  );
};

export default Header;

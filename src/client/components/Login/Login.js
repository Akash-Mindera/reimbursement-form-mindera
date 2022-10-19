import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MinderaSymbol from "../../assests/mindera-symbol.png";
import MinderaLogoMain from "../../assests/mindera-logo-2.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, loading, error] = useAuthState(auth);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      // const timer = setTimeout(() => {
      if (props.role === "approver") {
        navigate("/approver-panel");
        return;
      }

      if (props.role === "admin") {
        navigate("/admin-panel");
        return;
      }
      if (props.role === "user") {
        navigate("/");
      }
    }

    return () => {
      // props.role;
    };
  }, [user, loading, props.role]);

  const singInHandler = () => {
    // signInWithEmailAndPassword(auth, email, password).catch((err) =>
    //   setFireBaseError(err.message)
    // );
    if (email !== "" && password !== "") {
      setIsLoading(true);
      setIsDisabled(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(function () {
          setIsLoading(false);
          setIsDisabled(false);
        })
        .catch(function (error) {
          switch (error.code) {
            case "auth/Invalid-email":
              toast.error("Invalid Email-Id");
              setIsLoading(false);
              setIsDisabled(false);
            case "auth/user-disabled":
              toast.error(
                "User credentials are disabled. Please contact the administrator."
              );
              setIsLoading(false);
              setIsDisabled(false);
            case "auth/user-not-found":
              toast.error("User Credentials are not Found");
              setIsLoading(false);
              setIsDisabled(false);
              break;
            case "auth/wrong-password":
              toast.error("Please enter the corrrect password.");
              setIsLoading(false);
              setIsDisabled(false);
              break;
            default:
              toast.error("Please enter correct credentials to login.");
              setIsLoading(false);
              setIsDisabled(false);
          }
        });
    } else if (email === "" && password === "") {
      toast.error("Please enter your email & password");
      setIsLoading(false);
      setIsDisabled(false);
    } else if (email === "") {
      toast.error("Please enter your email");
      setIsLoading(false);
      setIsDisabled(false);
    } else if (password === "") {
      toast.error("Please enter your password.");
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  const handlePasswordToggle = (e) => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Fragment>
      <div className="headerImageholder-div">
        <div style={{ textAlign: "center" }}>
          <img
            src={MinderaSymbol}
            style={{
              height: "80px",
              marginBottom: "20px",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <img
            src={MinderaLogoMain}
            style={{ height: "50px", width: "auto", marginBottom: "30px" }}
          />
        </div>
      </div>
      <div className="login">
        {/* {console.log(fireBaseError)} */}
        <div className="login__container">
          <h4
            style={{
              fontFamily: "Patrick Hand",
              fontSize: "15px",
              color: "Black",
            }}
          >
            Login For the Reimbursement Form
          </h4>
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            placeholder="E-mail Address"
          />
          {/* <p>{err.message}</p> */}
          <input
            type={passwordShown ? "text" : "password"}
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            placeholder="Password"
          />
          <div className="passswordShowBox">
            <input
              type="checkbox"
              id="passwordShow"
              onClick={handlePasswordToggle}
              className="inputPasswordShow"
            />
            <label htmlFor="passwordShow" className="labelPasswordShow">
              Show Password
            </label>
          </div>
          <button
            className={
              !isLoading
                ? "ui secondary button login__btn"
                : "ui secondary loading button login__btn"
            }
            onClick={singInHandler}
            disabled={isDisabled}
            style={{
              fontSize: "1.3rem",
              backgroundColor: loggedIn ? "green" : "black",
            }}
          >
            {loggedIn !== true ? "Login" : "Login Successfull !"}
          </button>

          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};
export default Login;

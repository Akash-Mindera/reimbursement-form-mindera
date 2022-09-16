import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../../server/firebase";
import MinderaSymbol from "../../assests/mindera-symbol.png";
import MinderaLogoMain from "../../assests/mindera-logo-2.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Reset.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/form");
  }, [user, loading]);

  const passwordResetHandler = () => {
    if (email !== "") {
      sendPasswordResetEmail(auth, email)
        .then(function () {
          toast.success(
            `Mail is sent to ${email} for resetting. Please Check !`
          );
          setEmail("");
        })
        .catch(function (error) {
          toast.info("Email-id is not associated with the portal");
          setEmail("");
        });
    } else {
      toast.error("Please enter your Mail ID");
    }
  };

  return (
    <React.Fragment>
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
      <div className="reset">
        <div className="reset__container">
          <h4
            style={{
              fontFamily: "Patrick Hand",
              fontsize: "15px",
              color: "black",
            }}
          >
            Reset Your Password
          </h4>
          <input
            type="text"
            className="reset__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            placeholder="E-mail Address"
          />
          <button className="reset__btn" onClick={passwordResetHandler}>
            Send password reset email
          </button>
          <div>
            <Link to="/">Login</Link>
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
    </React.Fragment>
  );
}
export default Reset;

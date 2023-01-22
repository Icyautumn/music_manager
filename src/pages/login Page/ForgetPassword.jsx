import React, { useState } from "react";
import Pool from "./UserPool";
import { CognitoUser } from "amazon-cognito-identity-js";
import "./login_page.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function ForgetPassword() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [forgotPasswordScreen, SetForgotPasswordScreen] = useState(false);
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const [code, setCode] = useState("");

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool,
    });
  };

  const forgetPassword = (e) => {
    e.preventDefault();
    
    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
      inputVerificationCode: (data) => {
        console.log("Input code:", data);
        SetForgotPasswordScreen((current) => !current);
        setStage(2);
      },
    });
  };

  const ChangePassword = (e) => {
    e.preventDefault();
    if (password !== cfmPassword) {
      setOpen(true);
      return
    }
    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log("onSucess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
    });
  };
  return (
    <div className="loginScreen">
      <div
        id="container"
        className={
          forgotPasswordScreen ? "container" : "container , right-panel-active"
        }
      >
        <div className="form-container sign-up-container">
          <form className="formLogin">
            <h1>Forgot Password</h1>
            <span className="spanLogin">enter your Email</span>
            <input
              className="InputLogin"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className="buttonLog" onClick={forgetPassword}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" className="formLogin">
            <h1>Verification code</h1>
            <span className="spanLogin">
              Enter the verification code in your email
            </span>
            <input
              className="InputLogin"
              type="number"
              placeholder="code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            <input
              className="InputLogin"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              className="InputLogin"
              type="password"
              placeholder="Confirm Password"
              value={cfmPassword}
              onChange={(event) => setCfmPassword(event.target.value)}
            />
            <button className="buttonLog" onClick={ChangePassword}>
              Sign In
            </button>
          </form>
        </div>
        <div className={"overlay-container"}>
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Music Portal</h1>
              <p className="loginP">Forget Password</p>
              {/* <button
                onClick={handleClick}
                id="signIn"
                className={"ghost, buttonLog"}
              >
                Sign In
              </button> */}
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Enter your verification code</h1>
              <p className="loginP"></p>
              {/* <button
                onClick={handleClick}
                id="signUp"
                className={"ghost, buttonLog"}
              >
                Sign Up
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Wrong username or password</h2>
        </Box>
      </Modal>
    </div>
  );
}

export default ForgetPassword;

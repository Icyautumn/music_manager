import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from "./UserPool";
import { FaRegObjectGroup } from "react-icons/fa";
import {useNavigate } from "react-router-dom";

function ConfirmRegistration() {
  const navigate = useNavigate();
  const [confirmScreen, SetconfirmScreen] = useState(false);
  const [code, setCode] = useState("");
  const getUser = () => {
    return new CognitoUser({
      // remember to change the email to the one the user is using
      Username: "victorchua171@gmail.com",
      Pool,
    });
  };
  const Verify = (e) => {
    e.preventDefault()
    return new Promise((resolve, reject) => {
      getUser().confirmRegistration(code, true, function (err, result) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
          navigate("/login");

        }
      });
    });
  };
  return (
    <div className="loginScreen">
      <div
        id="container"
        className={
          confirmScreen ? "container" : "container , right-panel-active"
        }
      >
        <div className="form-container sign-up-container">
          <form className="formLogin">
            <h1>Enter Verification code</h1>
            <span className="spanLogin">enter your Email</span>
            <input
              className="InputLogin"
              type="text"
              placeholder="code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            <button className="buttonLog" onClick={Verify}>
              Verify
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
              //   value={password}
              //   onChange={(event) => setPassword(event.target.value)}
            />
            <input
              className="InputLogin"
              type="password"
              placeholder="Confirm Password"
              //   value={cfmPassword}
              //   onChange={(event) => setCfmPassword(event.target.value)}
            />
            <button className="buttonLog">Sign In</button>
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
    </div>
  );
}

export default ConfirmRegistration;

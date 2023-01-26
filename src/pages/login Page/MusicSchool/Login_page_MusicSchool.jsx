import React, { useState, useContext } from "react";
import "./login_page_MusicSchool.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import UserPool from "../UserPool";
import { AccountContext } from "../Accounts";
import { useNavigate } from "react-router-dom";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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

function Login_page_MusicSchool() {
  const navigate = useNavigate();

  const forgetPassword = () => {
    setForgetPasswordPage(true);
    handleClick();
  };

  const bcrypt = require("bcryptjs");
  const BCRYPT_SALT_ROUNDS = 12;
  const [SignUp, SetSignup] = useState(true);

  const { authenticate } = useContext(AccountContext);
  const [code, setCode] = useState("");

  const handleClick = (e) => {
    SetSignup((current) => !current);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [signupStage, SetSignupStage] = useState(false);

  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createContact, setCreateContact] = useState(null);
  const [email, setEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotPasswordPage, setForgetPasswordPage] = useState(false);
  const [logo, setLogo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState("");
  const [zipcode, setZipCode] = useState(null);
  const [billingAddress, setBillingAddress] = useState("");

  const params_SignUp = {
    routeKey: "POST /music_portal/account/reg-MusicSchool",
    parameters: {
      name: { createName },
      music_school_logo: { imagePreview },
      email: { createEmail },
      address: { address },
      zipcode: { zipcode },
      contact: { createContact },
      billing_Address: { billingAddress },
    },
  };

  // const params_SignIn = {
  //   routeKey: "POST /music_portal/account/user/login",
  //   parameters: {
  //     name: { email },
  //     music_school_logo: { password },
  //     email: {email}
  //   },
  // };

  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  const NewSignUp = async (e) => {
    e.preventDefault();
    const response = await axios({
      method: "post",
      url: "https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/account/reg-MusicSchool",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: { params_SignUp },
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    if (response) {
      const receiver = await response.data;
      console.log(receiver);
      const attributes = [
        new CognitoUserAttribute({ Name: "name", Value: createName }),
        new CognitoUserAttribute({
          Name: "phone_number",
          Value: "+65" + createContact,
        }),
        new CognitoUserAttribute({ Name: "profile", Value: "MusicSchool" }),
        new CognitoUserAttribute({ Name: "nickname", Value: receiver }),
      ];

      UserPool.signUp(
        createEmail,
        createPassword,
        attributes,
        null,
        (err, data) => {
          if (err) console.error(err);
          console.log(data);
          // go to confirm registration page
          // navigate("/confirmRegistration");
          handleClick();
          SetSignupStage(true);
        }
      );
    }
  };

  const getUser = () => {
    return new CognitoUser({
      // remember to change the email to the one the user is using
      Username: createEmail,
      Pool,
    });
  };
  const Verify = (e) => {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      getUser().confirmRegistration(code, true, function (err, result) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
          SetSignupStage(false)
        }
      });
    });
  };

  const SignIn = async (e) => {
    e.preventDefault();
    // e.preventDefault();
    // const response = await axios({
    //   method: "post",
    //   url: "https://1eahwpxaqc.execute-api.us-east-1.amazonaws.com/music_portal/account/user/login",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   data: { params_SignIn },
    // });
    // if (response) {
    //   const receiver = response.data;
    //   localStorage.setItem("userEmail", JSON.stringify(receiver.email));
    //   localStorage.setItem("userId", JSON.stringify(receiver.id));

    authenticate(email, password)
      .then((data) => {
        console.log("Logged in!", data);
      })
      .catch((err) => {
        console.error("Failed to login", err);
      });
  };

  const findEmail = (e) => {
    e.preventDefault();
    const getUser = () => {
      return new CognitoUser({
        // remember to change the email to the one the user is using
        Username: forgotEmail,
        Pool,
      });
    };

    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
      inputVerificationCode: (data) => {
        console.log("Input code:", data);
        SetSignupStage(true);
        handleClick();
      },
    });
  };

  const ChangePassword = (e) => {
    e.preventDefault();
    getUser().confirmPassword(code, newPassword, {
      onSuccess: (data) => {
        console.log("onSucess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
    });
  };

  const [base64, setBase64] = useState(null);

  function handleChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    console.log(imagePreview);
  }

  function handleRemove() {
    // image preview is the data
    console.log(imagePreview);
    setImagePreview(null);
    //reset the file input
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (imagePreview) {
      // handle the image upload
    }
  }
  return (
    <div className="loginScreen">
      <div
        id="container"
        className={SignUp ? "containerM" : "containerM , right-panel-active"}
      >
        <div className="form-container sign-up-container">
          {forgotPasswordPage ? (
            <form className="formLogin">
              <h1>Forgot Password</h1>
              <span className="spanLogin">enter your Email</span>
              <input
                className="InputLogin"
                type="text"
                placeholder="Email"
                value={forgotEmail}
                onChange={(event) => setForgotEmail(event.target.value)}
              />
              <button className="buttonLogin" onClick={findEmail}>
                Send
              </button>
            </form>
          ) : (
            <form className="formLogin">
              <h1>Create Account</h1>
              {/* <div className="social-container">
                <a onClick="" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a onClick="" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a onClick="" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span className="spanLogin">
                or use your email for registration
              </span> */}
              <input
                className="InputLogin"
                type="text"
                placeholder="School Name"
                value={createName}
                onChange={(event) => setCreateName(event.target.value)}
              />
              <input
                className="InputLogin"
                type="email"
                placeholder="Email"
                value={createEmail}
                onChange={(event) => setCreateEmail(event.target.value)}
              />
              <input
                className="InputLogin"
                type="password"
                placeholder="Password"
                value={createPassword}
                onChange={(event) => setCreatePassword(event.target.value)}
              />
              <input
                className="InputLogin"
                type="number"
                placeholder="Contact"
                value={createContact}
                onChange={(event) =>
                  setCreateContact(parseInt(event.target.value))
                }
              />
              <input
                className="InputLogin"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <input
                className="InputLogin"
                type="number"
                placeholder="ZipCode"
                value={zipcode}
                onChange={(event) => setZipCode(parseInt(event.target.value))}
              />
              <input
                className="InputLogin"
                type="text"
                placeholder="Billing Address"
                value={billingAddress}
                onChange={(event) => setBillingAddress(event.target.value)}
              />
              <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} />
                <div className="image-preview">
                  {imagePreview === null ? null : (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      width="200"
                      height="200"
                    />
                  )}

                  <FontAwesomeIcon
                    icon={faTimes}
                    className="remove-icon"
                    onClick={handleRemove}
                  />
                </div>
              </form>

              <button className="buttonLogin" onClick={NewSignUp}>
                Sign Up
              </button>
            </form>
          )}
        </div>
        <div className="form-container sign-in-container">
          {signupStage ? (
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
              {forgotPasswordPage ? (
                <input
                  className="InputLogin"
                  type="text"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              ) : null}
              <button
                className="buttonLogin"
                onClick={forgotPasswordPage ? ChangePassword : Verify}
              >
                Verify
              </button>
            </form>
          ) : (
            <form className="formLogin">
              <h1>Sign in</h1>
              <div className="social-container">
                <a onClick="" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a onClick="" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a onClick="" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span className="spanLogin">or use your account</span>
              <input
                className="InputLogin"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="InputLogin"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <a onClick={forgetPassword} className={"cursor: pointer"}>
                Forgot your password?
              </a>
              <button className="buttonLogin" onClick={SignIn}>
                Sign In
              </button>
            </form>
          )}
        </div>
        <div className={"overlay-container"}>
          <div className="overlayB">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p className="loginP">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => {
                  handleClick();
                  SetSignupStage(false);
                }}
                id="signIn"
                className={"ghost, buttonLogin"}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p className="loginP">
                Enter your personal details and start journey with us
              </p>
              <button
                onClick={() => {
                  handleClick();
                  setForgetPasswordPage(false);
                }}
                id="signUp"
                className={"ghost, buttonLogin"}
              >
                Sign Up
              </button>
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

export default Login_page_MusicSchool;

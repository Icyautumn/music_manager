import React, { useState, useContext } from "react";
import "./login_page.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import UserPool from "./UserPool";
import { AccountContext } from "./Accounts";
import { useNavigate } from "react-router-dom";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from "./UserPool";

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

function Login_page() {
  const navigate = useNavigate();

  const forgetPassword = () => {
    setForgetPasswordPage(true)
    handleClick()
  };
  const [SignUp, SetSignup] = useState(true);
  const { authenticate, getSession } = useContext(AccountContext);
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

  const params_SignUp = {
    routeKey: "POST /music_portal/account/reg-user",
    parameters: {
      email: { createEmail },
      name: { createName },
      contact: { createContact },
    },
  };

  const params_SignIn = {
    routeKey: "POST /music_portal/account/user/login",
    parameters: {
      email: { email },
      password: { password },
    },
  };

  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  const NewSignUp = async (e) => {
    e.preventDefault();
    const response = await axios({
      method: "post",
      url: "https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/account/reg-user",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: { params_SignUp },
    });
    if (response) {
      const receiver = await response.data;
      console.log(receiver);
      localStorage.setItem("userEmail", JSON.stringify(receiver.email));
      localStorage.setItem("userId", JSON.stringify(receiver.id));
      const attributes = [
        new CognitoUserAttribute({ Name: "name", Value: createName }),
        new CognitoUserAttribute({
          Name: "phone_number",
          Value: "+65" + createContact,
        }),
        new CognitoUserAttribute({ Name: "profile", Value: 'User' }),
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
          handleClick()
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

  const getPasswordForgot = () =>{
    return new CognitoUser({
      Username: forgotEmail,
      Pool
    })
  }
  const Verify = (e) => {
    e.preventDefault()
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
        getSession().then((data) => {
          // gets the uid of the user
          console.log(data['nickname'])
          localStorage.setItem("id", data['nickname'])
          localStorage.setItem("profile", data["profile"])
          // check if user has verified email
          console.log(data['email_verified'])
          if(data["profile"] === "MusicSchool"){
            navigate(`/students/${data['nickname']}`)
          }
          else{
            navigate(`/calendar/${data['nickname']}`)
          }
          

        });
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
    console.log(newPassword)
    console.log(forgotEmail)
    getPasswordForgot().confirmPassword(code, newPassword, {
      onSuccess: (data) => {
        console.log("onSucess:", data);
        SetSignupStage(false)
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
        className={SignUp ? "container" : "container , right-panel-active"}
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
            <button className="buttonLog" onClick={findEmail}>
              Send
            </button>
          </form>
          ) : (
            <form className="formLogin">
              <h1>Create Account</h1>
              <input
                className="InputLogin"
                type="text"
                placeholder="Name"
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
                onChange={(event) => setCreateContact(parseInt(event.target.value))}
              />
              <button className="buttonLog" onClick={NewSignUp}>
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
            {forgotPasswordPage ? (<input
              className="InputLogin"
              type="text"
              placeholder="New Password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />) : null }
            <button className="buttonLog" onClick={forgotPasswordPage ? ChangePassword : Verify}>
              Verify
            </button>
          </form>
          ) : (
            <form className="formLogin">
            <h1>Sign in</h1>
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
            <a onClick={forgetPassword} className={"cursor: pointer"}>Forgot your password?</a>
            <button className="buttonLog" onClick={SignIn}>
              Sign In
            </button>
          </form>
          )}
          
        </div>
        <div className={"overlay-container"}>
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p className="loginP">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => {handleClick(); SetSignupStage(false)}}
                id="signIn"
                className={"ghost, buttonLog"}
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
                onClick={() => {handleClick(); setForgetPasswordPage(false)}}
                id="signUp"
                className={"ghost, buttonLog"}
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

export default Login_page;

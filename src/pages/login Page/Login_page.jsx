import React, { useState } from "react";
import "./login_page.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";

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
  const [SignUp, SetSignup] = useState(false);

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

  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createContact, setCreateContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFlUWpNZjlteWV3N3BmcXZUQ2FBQiJ9.eyJpc3MiOiJodHRwczovL2Rldi1zMXFibXIxbXJxaXhmZXBmLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJKdkp3ZEc4bmdySVZHbVdtdTc1bGZQc20zTVNnb2JwVEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly8xZWFod3B4YXFjLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tIiwiaWF0IjoxNjczMjQ5MDI4LCJleHAiOjE2NzMzMzU0MjgsImF6cCI6Ikp2SndkRzhuZ3JJVkdtV211NzVsZlBzbTNNU2dvYnBUIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.BgOGdnk6_zdj4W3BCyMbeFVchdBU4ZbAr6i6xje-vcX3CPq0bG8O_U4CTUNHD6ijSxUXTLrD07pQScibRhiYC_MbS758WH4kDIslCF2r4P3vQ5PZhfI9E3ldV_rjIWhxXQP7LkbobRwopfdX5hnJDLZUzDa6YuSj1xkhr2jM9ZSRMiv2Zo1O694SAKEI5paD2rrfvo9eu5XKe8_LGzgymsJb_r_GUiC7tcyxNAR_8ZrhWErLiZEX3IKjo0SOfVZOcG3mXgibvtl65LEMhBRzwWU9z_c-mhteXEX3nWRAKGHdgKnf6q3uavn3oI9rh8P9ff_HDaUFYlim9szcjoi4FA";
  const params_SignUp = {
    routeKey: "POST /music_portal/account/reg-user",
    parameters: {
      email: { createEmail },
      password: { createPassword },
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

  const NewSignUp = async () => {
    const response = await axios({
      method: "post",
      url: "https://1eahwpxaqc.execute-api.us-east-1.amazonaws.com/music_portal/account/reg-user",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { params_SignUp },
    });
    if (response) {
      const receiver = response.data;
      console.log(receiver);
      localStorage.setItem('userEmail', JSON.stringify(receiver.email));
      localStorage.setItem('userId', JSON.stringify(receiver.id));
    }
  };

  const SignIn = async () => {
    const response = await axios({
      method: "post",
      url: "https://1eahwpxaqc.execute-api.us-east-1.amazonaws.com/music_portal/account/user/login",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { params_SignIn },
    });
    if (response) {
      const receiver = response.data;
      localStorage.setItem('userEmail', JSON.stringify(receiver.email));
      localStorage.setItem('userId', JSON.stringify(receiver.id));

    }
  };

  return (
    <div className="loginScreen">
      <div
        id="container"
        className={SignUp ? "container" : "container , right-panel-active"}
      >
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
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
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              value={createName}
              onChange={(event) => setCreateName(event.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={createEmail}
              onChange={(event) => setCreateEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={createPassword}
              onChange={(event) => setCreatePassword(event.target.value)}
            />
            <input
              type="text"
              placeholder="Contact"
              value={createContact}
              onChange={(event) => setCreateContact(event.target.value)}
            />
            <button onClick={NewSignUp}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
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
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <a onClick="">Forgot your password?</a>
            <button onClick={SignIn}>Sign In</button>
          </form>
        </div>
        <div className={"overlay-container"}>
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button onClick={handleClick} id="signIn" className={"ghost"}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={handleClick} id="signUp" className={"ghost"}>
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

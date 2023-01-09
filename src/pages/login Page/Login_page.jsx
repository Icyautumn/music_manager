import React, { useState } from "react";
import "./login_page.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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

  const NewSignUp = (e) => {
    // get the details and send to lambda to sign user up
  }

  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createContact, setCreateContact] = useState("");

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
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a onClick="">Forgot your password?</a>
            <button onClick={handleOpen}>Sign In</button>
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

      <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by
          <a target="_blank" href="https://florin-pop.com">
            Florin Pop
          </a>
          - Read how I created this and how you can join the challenge
          <a
            target="_blank"
            href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
          >
            here
          </a>
          .
        </p>
      </footer>


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

import React, { useState } from "react";
import "./Slider.css";
import Login_page_User from "../login Page/Login_page";
import Settings from "../Account/Settings";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Login_page_MusicSchool from "../login Page/MusicSchool/Login_page_MusicSchool";
import TextField from "@mui/material/TextField";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Slider() {
  const [alignment, setAlignment] = useState("User");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {
    const userMessage = {
      subject: subject,
      message: message
    }
    const response = await axios({
      method: "POST",
      url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/email`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: {userMessage}
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    if (response) {
      const receiver = await response.data;
      console.log(receiver.subject);
      console.log(receiver);
    }
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(newAlignment);
  };
  return (
    <div
      style={{
        backgroundColor: "#f6f5f7",
      }}
    >
      <div style={{ justifyContent: "center", textAlign: "center" }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          style={{ marginTop: "20px" }}
        >
          <ToggleButton value="User">User</ToggleButton>
          <ToggleButton value="MusicSchool">Music School</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div
        style={{
          justifyContent: "center",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <Button onClick={handleOpen}>Email admin</Button>
      </div>

      {alignment === "User" ? <Login_page_User /> : <Login_page_MusicSchool />}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom: "30px"}}>
            Email Admin for Issues
          </Typography>
          <TextField
            id="subject"
            label="Subject"
            variant="outlined"
            value={subject}
            fullWidth
            onChange={(event) => setSubject(event.target.value)}
            style={{marginBottom: "20px"}}
          />
          
          <TextField
            id="message"
            label="Message"
            variant="outlined"
            value={message}
            fullWidth
            multiline
            maxRows={4}
            onChange={(event) => setMessage(event.target.value)}
          />
          <div style={{ justifyContent: "end", display: "grid" }}>
            <Button onClick={sendEmail}>Send</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Slider;

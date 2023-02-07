import {
  Box,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  makeStyles,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import axios from "axios";
import "./AddStudent.css";
import { Autocomplete, Button, Stack } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Space, TimePicker } from "antd";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import SendIcon from "@mui/icons-material/Send";
import { height } from "@mui/system";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(255,255,255)",
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "rgb(250, 232, 241)",
      //Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "rgb(232, 241, 250)",
      },
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "rgb(250, 241, 232)",
    },
    "& .MuiTextField-root": { my: 0.5, width: "35ch", height: "6ch" },
  },
}));

function AddStudent() {
  const dateFormat = "YYYY/MM/DD";
  const navigate = useNavigate();
  const urlParameters = useParams();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [dateJoined, setDateJoined] = useState();
  const [studentCode, setStudentCode] = useState();
  const [userNotExist, setUserNotExist] = useState(false);

  const studentAdd = async () => {
    const data = {
      email: email,
      name: name,
      contact: contact,
      music_school_id: urlParameters.token,
      date_joined: dateJoined,
      student_code: studentCode,
    };

    console.log(data);

    if (userNotExist) {
      const response = await axios({
        method: "POST",
        url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/reg-user`,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        data: { data },
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert("student already exist");
        }
      });
      if (response) {
        const receiver = await response.data;
        console.log(receiver)
        const data = {
          email: email,
          name: name,
          contact: contact,
          music_school_id: urlParameters.token,
          date_joined: dateJoined,
          student_code: receiver,
        };
        const secondResponse = await axios({
          method: "POST",
          url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/user/${urlParameters.token}`,
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          data: { data },
        }).catch(function (error) {
          if (error.response) {
            console.log(error.secondResponse.data);
            console.log(error.secondResponse.status);
            console.log(error.secondResponse.headers);
            alert("student already exist");
          }
        });
        if (secondResponse) {
          const receiver = await secondResponse.data;
          console.log(receiver);
          navigate(`/Students/${urlParameters.token}`);
        }
      }
    } else {
      const response = await axios({
        method: "POST",
        url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/user/${urlParameters.token}`,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        data: { data },
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert("student already exist");
        }
      });
      if (response) {
        const receiver = await response.data;
        console.log(receiver);
        navigate(`/Students/${urlParameters.token}`);
      }
    }
  };

  const checkUser = async () => {
    const response = await axios({
      method: "POST",
      url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/user`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: { email },
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    if (response) {
      const receiver = await response.data;
      console.log(receiver.length === 0);
      if (receiver.length !== 0) {
        setName(receiver[0].name);
        setContact(receiver[0].contact);
        setStudentCode(receiver[0].id);
      } else {
        setUserNotExist(true);
      }
    }
  };

  const pickerdate = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    setDateJoined(value.valueOf());
  };

  const [instrumentPicked, setInstrumentPicked] = useState("");
  const [gradePicked, setGradePicked] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="container mt-3"
          style={{ maxWidth: "550px", height: "380px", marginTop: "100px" }}
        >
          <div className="alert alert-danger mt-3" style={{ display: "none" }}>
            <ul id="alerts"></ul>
          </div>
          <div>
            <Typography variant="h3" style={{ textAlign: "center" }}>
              Add Student
            </Typography>
            <br />

            <Grid container item>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={9}>
                  <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <TextField
                      style={{ paddingRight: "10px" }}
                      label="student email"
                      variant="filled"
                      fullWidth
                      required
                      size="large"
                      className={classes.root}
                      value={email}
                      onBlur={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div style={{ marginTop: "23px" }} elevation={0}>
                    <Button onClick={checkUser}>Check</Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item>
              <Grid
                container
                spacing={2}
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <Grid item xs={6}>
                  <Grid style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <TextField
                      label="name"
                      variant="filled"
                      fullWidth
                      required
                      size="large"
                      className={classes.root}
                      value={name}
                      onBlur={(event) => setName(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid
                    style={{
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      visibility: "visible",
                    }}
                  >
                    <TextField
                      label="contact"
                      variant="filled"
                      fullWidth
                      required
                      size="large"
                      className={classes.root}
                      value={contact}
                      onBlur={(event) => setContact(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <label className="form-label" style={{ paddingRight: "20px" }}>
                Start Date:
              </label>
              <DatePicker
                size={"large"}
                showTime
                onChange={pickerdate}
                onOk={onOk}
                format={dateFormat}
              />
            </div>
            <br />
            <Button
              variant="contained"
              style={{ width: "100%" }}
              endIcon={<SendIcon />}
              onClick={studentAdd}
            >
              Add
            </Button>
            <br />
          </div>
        </div>
      )}
    </>
  );
}

export default AddStudent;

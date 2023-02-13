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
import { Autocomplete, Button, Stack } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Space, TimePicker } from "antd";
import { useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import SendIcon from "@mui/icons-material/Send";
import { height } from "@mui/system";
import dayjs from "dayjs";
import {useNavigate } from "react-router-dom";

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

function AddInstrument() {
  const navigate = useNavigate();
  const [teachers, SetTeachers] = useState();
  const urlParameters = useParams();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [day, setDay] = useState();
  const [teacherTeaching, setTeacherTeaching] = useState();
  const [fees, setFees] = useState();
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [duration, setDuration] = useState();
  const Instruments = [
    { title: "Drums" },
    { title: "Piano" },
    { title: "Violin" },
    { title: "Music Theory" },
    { title: "Cello" },
  ];
  const Grade = [
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "Diploma" },
  ];

  const days = [
    { title: "Monday" },
    { title: "Tuesday" },
    { title: "Wednesday" },
    { title: "Thursday" },
    { title: "Friday" },
    { title: "Saturday" },
    { title: "Sunday" },
  ];

  const addLesson = async () => {
    const calendarEvent = {
      id: Date.now(),
      day: startDate,
      description: "DESC",
      label: "gray",
      startTime: startTime,
      endTime: endTime,
      teacher_id: teacherTeaching.id,
      teacher: teacherTeaching.name,
      student_id: urlParameters.student_id,
      student: localStorage.getItem("student"),
      title: instrumentPicked + " lesson",
      duration: duration,
      grade: gradePicked,     
      music_school_id: urlParameters.token,
      
    };

    const response = await axios({
      method: "POST",
      url: "https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/lesson",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: { calendarEvent },
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
      navigate(`/Students/${urlParameters.token}/${urlParameters.student_id}`)
    }


  }

  const addInstrument = async () => {
    const data = {
      instrument_name: instrumentPicked,
      grade: gradePicked,
      fees: fees,
      start_date: startDate,
      start_time: startTime,
      end_time: endTime,
      usual_lesson_day: day,
      teacher_id: teacherTeaching.id,
      end_date: null,
      student_code: urlParameters.student_id,
      music_school_id: urlParameters.token,
      duration: duration,
    };

    console.log(data);

    const response = await axios({
      method: "POST",
      url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/instrument/user/instrument`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: { data },
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
      addLesson();
    }
  };
  const getTeachers = async () => {
    const response = await axios({
      method: "GET",
      url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/teachers/${urlParameters.token}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
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
      SetTeachers(receiver);
      setLoading(false);
    }
  };
  const dateFormat = "YYYY/MM/DD";
  const [instrumentPicked, setInstrumentPicked] = useState("");
  const [gradePicked, setGradePicked] = useState("");

  const format = "hh : mm A";

  const timepicker = (time) => {
    console.log(time);
    console.log(time[0].$d);
    console.log(time[0].valueOf());
    console.log(time[1].valueOf());
    console.log(
      new Date(time[0].valueOf()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    console.log(
      new Date(time[1].valueOf()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setStartTime(time[0].valueOf());

    setEndTime(time[1].valueOf());

    const start = time[0].$d.valueOf();
    const end = time[1].$d.valueOf();

    setDuration(dayjs(end).diff(dayjs(start), "minute"));
  };

  const { RangePicker } = DatePicker;
  const pickerdate = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", new Date(value.valueOf()).toLocaleDateString());
    setStartDate(value.valueOf());
  };
  const ref = useRef();

  useEffect(() => {
    getTeachers();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="container mt-3"
          style={{ maxWidth: "550px", height: "520px" }}
        >
          <div className="alert alert-danger mt-3" style={{ display: "none" }}>
            <ul id="alerts"></ul>
          </div>
          <div>
            <Typography variant="h3" style={{ textAlign: "center" }}>
              Add Instrument
            </Typography>

            <Autocomplete
              id="instrument"
              freeSolo
              options={Instruments.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  style={{ paddingLeft: "10px", paddingRight: "10px" }}
                  {...params}
                  label="Instrument"
                  variant="filled"
                  fullWidth
                  required
                  size="large"
                  className={classes.root}
                  onChange
                  value={instrumentPicked}
                  onBlur={(event) => setInstrumentPicked(event.target.value)}
                />
              )}
            />
            <Grid container item>
              <Grid
                container
                spacing={2}
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <Grid item xs={6}>
                  <Grid style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <Autocomplete
                      id="Grade"
                      freeSolo
                      options={Grade.map((option) => option.title)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Grade"
                          variant="filled"
                          fullWidth
                          required
                          size="large"
                          className={classes.root}
                          value={gradePicked}
                          onBlur={(event) => setGradePicked(event.target.value)}
                        />
                      )}
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
                    <OutlinedInput
                      style={{ color: "black", visibility: "visible" }}
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Fees per lesson"
                      labelStyle={{ visibility: "visible" }}
                      onBlur={(event) => setFees(parseInt(event.target.value))}
                    />
                  </Grid>
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
                    <label
                      className="form-label"
                      style={{ paddingRight: "20px" }}
                    >
                      Start Date:
                    </label>
                    <DatePicker
                      size={"large"}
                      showTime
                      onChange={pickerdate}
                      onOk={onOk}
                      format={dateFormat}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <label
                      className="form-label"
                      style={{ paddingRight: "20px" }}
                    >
                      Lesson Time:
                    </label>
                    <TimePicker.RangePicker
                      size={"large"}
                      format={format}
                      onChange={timepicker}
                    />
                  </Grid>
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
                    <Autocomplete
                      id="Day"
                      options={days.map((option) => option.title)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Day of lesson"
                          variant="filled"
                          fullWidth
                          required
                          size="large"
                          className={classes.root}
                          onBlur={(event) => setDay(event.target.value)}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <Autocomplete
                      id="Teacher"
                      options={teachers.map((option) => ({
                        name: option.name,
                        id: option.id,
                      }))}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, value) => setTeacherTeaching(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Teacher"
                          variant="filled"
                          fullWidth
                          required
                          size="large"
                          className={classes.root}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              style={{ width: "100%" }}
              endIcon={<SendIcon />}
              onClick={addInstrument}
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

export default AddInstrument;

import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
import dayjs from "dayjs";
import { TimePicker } from "antd";
import { Autocomplete, TextField } from "@mui/material";
import { Grid, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import moment from "moment/moment";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

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

export default function EventModal() {
  useEffect(() => {
    getTeachers();
  }, []);
  const urlParameters = useParams();
  const [loading, setLoading] = useState(true);
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const format = "hh:mm A";
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [duration, setDuration] = useState();
  const [teachers, SetTeachers] = useState();
  const [students, setStudents] = useState();

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const classes = useStyles();
  const [teacherTeaching, setTeacherTeaching] = useState();
  const [studentLearning, setStudentLearning] = useState();

  const onchange = (time) => {
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
      getStudents();
      console.log("event", selectedEvent);
    }
  };

  const getStudents = async () => {
    const response = await axios({
      method: "GET",
      url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/students/${urlParameters.token}`,
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
      setStudents(receiver);
      setLoading(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      startTime: startTime,
      endTime: endTime,
      teacher_id: teacherTeaching.id,
      student_id: studentLearning.id,
      teacher: teacherTeaching.name,
      student: studentLearning.name,
      duration: duration,
      music_school_id: urlParameters.token
    };
    console.log(calendarEvent);
    if (selectedEvent) {
      const response = await axios({
        method: "PUT",
        url: "https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/lesson/{lesson_id}",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        data: { calendarEvent },
      });
      if (response) {
        const receiver = await response.data;
        console.log("response", receiver);
        dispatchCalEvent({ type: "update", payload: calendarEvent });
        window.location.reload();
      }
    } else {
      const response = await axios({
        method: "POST",
        url: "https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/lesson",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        data: { calendarEvent },
      });
      if (response) {
        const receiver = await response.data;
        console.log("response", receiver);
        dispatchCalEvent({ type: "push", payload: calendarEvent });
        window.location.reload();
      }
    }

    setShowEventModal(false);
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <form className="bg-white rounded-lg shadow-2xl w-1/4">
          <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <span className="material-icons-outlined text-gray-400">
              drag_handle
            </span>
            <div>
              {selectedEvent && (
                <span
                  onClick={async () => {
                    const response = await axios({
                      method: "DELETE",
                      url: "https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/lesson/{lesson_id}",
                      // headers: {
                      //   Authorization: `Bearer ${token}`,
                      // },
                      data: { selectedEvent },
                    });
                    if (response) {
                      const receiver = await response.data;
                      console.log("response", receiver);
                      dispatchCalEvent({
                        type: "delete",
                        payload: selectedEvent,
                      });
                      window.location.reload();
                    }
                    setShowEventModal(false);
                  }}
                  className="material-icons-outlined text-gray-400 cursor-pointer"
                >
                  delete
                </span>
              )}
              <button onClick={() => setShowEventModal(false)}>
                <span className="material-icons-outlined text-gray-400">
                  close
                </span>
              </button>
            </div>
          </header>
          <div className="p-3">
            <div
              className="grid grid-cols-1/5 items-end gap-y-7"
              style={{ display: "grid", "grid-template-columns": "1fr 5fr" }}
            >
              <div></div>
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="material-icons-outlined text-gray-400">
                schedule
              </span>
              <span className="display: flex">
                <p style={{ paddingRight: "30px" }}>
                  {daySelected.format("dddd")}, <br />{" "}
                  {daySelected.format("MMMM DD")}
                </p>
                {selectedEvent !== null ? (
                  <TimePicker.RangePicker
                    defaultValue={[
                      moment(
                        new Date(selectedEvent.startTime).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        ),
                        "hh : mm A"
                      ),
                      moment(
                        new Date(selectedEvent.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                        "hh : mm A"
                      ),
                    ]}
                    format={format}
                    onChange={onchange}
                  />
                ) : (
                  <TimePicker.RangePicker format={format} onChange={onchange} />
                )}
              </span>
              <span className="text-gray-400">Lesson</span>
              <span className="display: flex">
                <Grid xs={6}>
                {selectedEvent !== null ? (
                    <Autocomplete
                    value={selectedEvent.teacher}
                    id="Teacher"
                    options={teachers.map((option) => ({
                      name: option.name,
                      id: option.id,
                    }))}
                    getOptionLabel={(option) => option.name || selectedEvent.teacher}
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
                  ) : (
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
                  )}
                </Grid>

                <Grid xs={6}>
                  {selectedEvent !== null ? (
                    <Autocomplete
                      value={selectedEvent.student}
                      id="student"
                      options={students.map((option) => ({
                        name: option.name,
                        id: option.id,
                      }))}
                      getOptionLabel={(option) => option.name || selectedEvent.student}
                      onChange={(event, value) => setStudentLearning(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Student"
                          variant="filled"
                          fullWidth
                          required
                          size="large"
                          className={classes.root}
                        />
                      )}
                    />
                  ) : (
                    <Autocomplete
                      id="student"
                      options={students.map((option) => ({
                        name: option.name,
                        id: option.id,
                      }))}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, value) => setStudentLearning(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Student"
                          variant="filled"
                          fullWidth
                          required
                          size="large"
                          className={classes.root}
                        />
                      )}
                    />
                  )}
                </Grid>
              </span>

              <span className="material-icons-outlined text-gray-400">
                segment
              </span>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={description}
                required
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="material-icons-outlined text-gray-400">
                bookmark_border
              </span>
              <div className="flex gap-x-2">
                {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass && (
                      <span className="material-icons-outlined text-white text-sm">
                        check
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <footer className="flex justify-end border-t p-3 mt-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            >
              Save
            </button>
          </footer>
        </form>
      )}
    </div>
  );
}

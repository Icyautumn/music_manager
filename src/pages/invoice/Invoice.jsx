import React, { useState, useRef, useEffect } from "react";
import StyledTextField from "./components/StyledTextField";
import "./Invoice.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// import Table from "./components/Table";
import { makeStyles } from "@material-ui/core/styles";
import StyledTableContainer from "./components/StyledTableContainer";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Pdf from "react-to-pdf";
import * as htmlToImage from "html-to-image";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import {useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  addButton: {
    "&:hover": {
      "& $Button": {
        backgroundColor: "#ebebeb",
        color: "black",
        opacity: 1,
      },
      "& $p": {
        color: "black",
        opacity: 1,
      },
    },
  },
  root: {
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(255,255,255)",
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "rgb(250, 232, 241)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "rgb(232, 241, 250)",
      },
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "rgb(250, 241, 232)",
    },
    "& .MuiTextField-root": { my: 0.5, width: "35ch", height: "6ch" },
  },
  table: {
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(255,255,255)",
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "rgb(250, 232, 241)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "rgb(232, 241, 250)",
      },
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "rgb(250, 241, 232)",
    },
    "& .MuiTextField-root": { mb: 1, width: "10ch", height: "6ch" },
  },
  TableRow: {
    "&:hover": {
      backgroundColor: theme.palette.primary.gray,
      color: "black",
      "& $deleteButton": {
        color: "black",
        display: "block",
      },
    },
  },
  deleteButton: {
    color: "white",
    display: "inline",
    position: "relative",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

function Invoice() {
  const urlParameters = useParams();
  const [showInvoice, setShowInvoice] = useState(false);
  const [hover, sethover] = useState(false);
  const [Notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [invoiceDate, setInvoiceDate] = React.useState(null);
  const [dueDateInvoice, setDueDateInvoice] = useState("");

  const [uuid, setUUID] = useState("");
  const [admin_name, setAdmin_name] = useState("");

  const handlePrint = () => {
    window.print();
  };

  function handleChange(event) {
    setNotes(event.target.value);
  }
  useEffect(() => {
    music_school_details();
    const newUUID = uuidv4();
    setUUID(newUUID);
  }, []);

  const [schoolDetails, setSchoolDetails] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);

  const music_school_id = urlParameters.token;

  const music_school_details = async () => {
    console.log(urlParameters);
    const response = await axios({
      method: "GET",
      url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/account/${urlParameters.token}`,
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
      setSchoolDetails(receiver);

      setStudentDetails(receiver);
      await student_details();
      setLoading(false);
    }
  };

  const student_details = async () => {
    console.log(urlParameters);
    const response = await axios({
      method: "GET",
      url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/account/student/${urlParameters.student_id}`,
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
      setStudentDetails(receiver);
    }
  };

  const ref = useRef();

  const student_id = urlParameters.student_id;
  const payment = "not paid";
  const [total, setTotal] = useState();
  const [pdf, setPdf] = useState();

  const getTotal = (total) => {
    setTotal(total);
  };

  const sendFile = async () => {
    const dataUrl = await htmlToImage.toPng(ref.current);
    const link = document.createElement("a");
    link.download = "invoice.png";
    link.href = dataUrl;
    setPdf(dataUrl);
    console.log(dataUrl);
    link.click();

    const invoiceDetails = {
      routeKey: "POST /music_portal/invoice",
      parameters: {
        id: uuid,
        student_id: student_id,
        music_school_id: music_school_id,
        Invoice: dataUrl,
        date: invoiceDate,
        payment: payment,
        amount: total,
        due_date: dueDateInvoice,
      },
    };

    const response = await axios({
      method: "post",
      url: "https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/invoice",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: { invoiceDetails },
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
  };

  const classes = useStyles();
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <body style={{ display: "grid", justifyContent: "center" }}>
          <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-3xl bg-white rounded shadow display:flex">
            <Box
              component="form"
              noValidate
              autoComplete="off"
              ref={ref}
              id="ref"
              item
              sx={{ backgroundColor: "white" }}
            >
              <Grid container item>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={6}>
                    <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                      <img
                        src={schoolDetails[0].music_school_logo}
                        alt={""}
                        style={{ width: 100, height: 100 }}
                      />
                      <StyledTextField
                        root={classes.root}
                        id="admin_name"
                        label="admin name"
                      />
                      <StyledTextField
                        root={classes.root}
                        id="company_address"
                        label="Company's Address"
                        default_value={schoolDetails[0].address}
                      />
                      <StyledTextField
                        root={classes.root}
                        id="zipcode"
                        label="City, State Zip"
                        default_value={schoolDetails[0].zipcode}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div sx={{ textAlign: "center" }} elevation={0}>
                      <Typography variant="h2" gutterBottom>
                        INVOICE
                      </Typography>
                    </div>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mb={1}>
                  <Grid item xs={6}>
                    <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                      <Typography sx={{ textAlign: "left" }}>
                        <b>Bill To:</b>
                      </Typography>
                      <StyledTextField
                        root={classes.root}
                        id="client_name"
                        label="Client's Name"
                        default_value={studentDetails[0].name}
                      />
                      <StyledTextField
                        root={classes.root}
                        id="client_address"
                        label="client's Address"
                      />
                      <StyledTextField
                        root={classes.root}
                        id="client_zipcode"
                        label="client's Zipcode"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>
                      <TextField
                        id="Invoice#"
                        label="Invoice #"
                        value={uuid}
                        disabled
                        fullWidth
                        required
                        variant="filled"
                        size="small"
                        className={classes.root}
                        InputProps={{ disableUnderline: true }}
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Invoice Date"
                          value={invoiceDate}
                          sx={{ backgroundColor: "white" }}
                          onChange={(newValue) => {
                            setInvoiceDate(newValue["$d"].getTime());
                          }}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              size="small"
                              variant="filled"
                              className={classes.root}
                              sx={{
                                input: { backgroundColor: "white" },
                                label: { backgroundColor: "white" },
                              }}
                              InputProps={{ disableUnderline: true }}
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Due Date"
                          value={dueDateInvoice}
                          onChange={(newValue) => {
                            setDueDateInvoice(newValue["$d"].getTime());
                          }}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              size="small"
                              variant="filled"
                              className={classes.root}
                              sx={{
                                input: { backgroundColor: "white" },
                                label: { backgroundColor: "white" },
                              }}
                              InputProps={{ disableUnderline: true }}
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </Grid>
                </Grid>
                <StyledTableContainer
                  tableRowStyle={classes.TableRow}
                  tableStyle={classes.table}
                  deleteButton={classes.deleteButton}
                  addItemButtonStyle={classes.addButton}
                  getTotal={getTotal}
                />

                <Grid container spacing={2} mb={2} mt={2}>
                  <Grid item xs={12}>
                    <div elevation={0}>
                      <TextField
                        fullWidth
                        id="Notes"
                        label="Notes"
                        variant="filled"
                        size="small"
                        multiline
                        maxRows={4}
                        className={classes.root}
                        InputProps={{ disableUnderline: true }}
                      />
                    </div>
                    <div elevation={0}>
                      <TextField
                        fullWidth
                        id="Terms"
                        label="Terms & Condition"
                        variant="filled"
                        size="small"
                        multiline
                        maxRows={4}
                        className={classes.root}
                        InputProps={{ disableUnderline: true }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <button
              onClick={sendFile}
              className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
            >
              Send Invoice
            </button>
          </main>
        </body>
      )}
    </div>
  );
}

export default Invoice;

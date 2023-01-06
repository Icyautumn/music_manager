import React, { useState } from "react";
import StyledTextField from "./components/StyledTextField";
import "./Invoice.css";
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

const useStyles = makeStyles((theme) => ({
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
    display: "block",
  },
}));

function Invoice() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [hover, sethover] = useState(false);
  const [Notes, setNotes] = useState("");

  const [invoiceDate, setInvoiceDate] = React.useState(null);
  const [dueDateInvoice, setDueDateInvoice] = useState("");

  const [uuid, setUUID] = useState("");
  const [admin_name, setAdmin_name] = useState("");

  const handlePrint = () => {
    window.print();
  };

  // const Item = styled(Paper)(({ theme }) => ({
  //   padding: theme.spacing(1),
  //   textAlign: "left",
  //   color: theme.palette.text.secondary,
  // }));

  function handleChange(event) {
    setNotes(event.target.value);
  }

  // useEffect(() => {
  //   addItem();
  //   const newUUID = uuidv4();
  //   setUUID(newUUID);

  // }, []);

  const classes = useStyles();
  return (
    <body>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-3xl bg-white rounded shadow">
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <StyledTextField
                  root={classes.root}
                  id="admin_name"
                  label="admin name"
                />
                <StyledTextField
                  root={classes.root}
                  id="company_address"
                  label="Company's Address"
                />
                <StyledTextField
                  root={classes.root}
                  id="zipcode"
                  label="City, State Zip"
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
                    onChange={(newValue) => {
                      setInvoiceDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        variant="filled"
                        className={classes.root}
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
                      setDueDateInvoice(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        variant="filled"
                        className={classes.root}
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
        </Box>

        <button
          onClick={() => setShowInvoice(false)}
          className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
        >
          Save Invoice
        </button>
      </main>
    </body>
  );
}

export default Invoice;

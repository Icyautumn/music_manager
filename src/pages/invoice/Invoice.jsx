import React, { useState } from "react";
import "./Invoice.css";
import { v4 as uuidv4 } from "uuid";
// import Table from "./components/Table";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai";
import Button from "@mui/material/Button";
import { data } from "autoprefixer";
import { type } from "@testing-library/user-event/dist/type";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect } from "react";

import DropZone from "./components/DropZone";

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
}));

function Invoice() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [hover, sethover] = useState(false);
  

  const handlePrint = () => {
    window.print();
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [Notes, setNotes] = useState("");

  const [invoiceDate, setInvoiceDate] = React.useState(null);
  const [dueDateInvoice, setDueDateInvoice] = useState("");
  const [data, setData] = useState([]);
  const [uuid, setUUID] = useState("");
  const [counter, setCounter] = useState(2);

  const addItem = () => {
    const createData = {
      id: counter,
      Desc: "Description",
      Date: "",
      amount: 0,
    };
    setCounter(counter + 1);
    setData([...data, createData]);
  };

  const updateItem = (value, id, type) => {
    const updateItem = data.find((item) => item.id === id);
    if (type === "Desc") {
      updateItem.Desc = value;
    } else if (type === "amount") {
      updateItem.amount = value;
    } else {
      console.log("flow");
      updateItem.Date = value;
      setData([...data]);
    }
  };

  function handleChange(event) {
    setNotes(event.target.value);
  }

  // useEffect(() => {
  //   sethover(false);
  //   addTemplate();
  //   addItem();
  //   const newUUID = uuidv4();
  //   setUUID(newUUID);
    
  // }, []);

  const deleteItem = (id) => {
    console.log("deleted");
    console.log(id);
    setData(data.filter((item) => item.id !== id));
  };

  const total = data.reduce((acc, item) => acc + parseInt(item.amount), 0);

  const classes = useStyles();
  return (
    <body>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-3xl bg-white rounded shadow">
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <Item elevation={0}>
                <DropZone />

                <TextField
                  fullWidth
                  required
                  id="admin_name"
                  label="admin name"
                  variant="filled"
                  size="small"
                  className={classes.root}
                  InputProps={{ disableUnderline: true }}
                />
                <TextField
                  fullWidth
                  required
                  id="company_address"
                  label="Company's Address"
                  variant="filled"
                  size="small"
                  className={classes.root}
                  InputProps={{ disableUnderline: true }}
                />
                <TextField
                  fullWidth
                  required
                  id="zipcode"
                  label="City, State Zip"
                  variant="filled"
                  size="small"
                  className={classes.root}
                  InputProps={{ disableUnderline: true }}
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ textAlign: "center" }} elevation={0}>
                <Typography variant="h2" gutterBottom>
                  INVOICE
                </Typography>
              </Item>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item elevation={0}>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Bill To:</b>
                </Typography>
                <TextField
                  fullWidth
                  required
                  size="small"
                  id="client_name"
                  label="Client's Name"
                  variant="filled"
                  className={classes.root}
                  InputProps={{ disableUnderline: true }}
                />
                <TextField
                  fullWidth
                  required
                  size="small"
                  id="client_address"
                  label="client's Address"
                  variant="filled"
                  className={classes.root}
                  InputProps={{ disableUnderline: true }}
                />
                <TextField
                  fullWidth
                  required
                  size="small"
                  id="client_zipcode"
                  label="client's Zipcode"
                  variant="filled"
                  className={classes.root}
                  InputProps={{ disableUnderline: true }}
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item elevation={0}>
                <TextField
                  fullWidth
                  required
                  size="small"
                  id="Invoice#"
                  label="Invoice #"
                  variant="filled"
                  className={classes.root}
                  InputProps={{ disableUnderline: true }}
                  value={uuid}
                  disabled
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
              </Item>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="student Invoice">
              <TableHead>
                <TableRow>
                  <StyledTableCell width="40%">
                    Item Description
                  </StyledTableCell>
                  <StyledTableCell width="40%">Date:</StyledTableCell>
                  <StyledTableCell width="50%">Amount</StyledTableCell>
                  <StyledTableCell width="50%"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow
                    key={row.id}
                    onMouseEnter={() => sethover(true)}
                    onMouseLeave={() => sethover(false)}
                  >
                    <StyledTableCell component="th" scope="row">
                      <TextField
                        fullWidth
                        required
                        variant="filled"
                        defaultValue={row.Desc}
                        multiline
                        maxRows={4}
                        className={classes.table}
                        InputProps={{ disableUnderline: true }}
                        size="small"
                        onChange={(newValue) =>
                          updateItem(newValue.target.value, row.id, "Desc")
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Invoice Date"
                          value={row.Date}
                          onChange={(newValue) => {
                            updateItem(newValue, row.id, "Date");
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="filled"
                              size="small"
                              className={classes.table}
                              InputProps={{ disableUnderline: true }}
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </StyledTableCell>
                    <StyledTableCell width={"100%"} align="left">
                      <TextField
                        required
                        variant="filled"
                        defaultValue={row.amount}
                        multiline
                        maxRows={4}
                        className={classes.table}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{ marginBottom: "17px" }}
                            >
                              $
                            </InputAdornment>
                          ),
                          disableUnderline: true,

                          textAlign: "center",
                          inputmode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        size="small"
                        onChange={(newValue) =>
                          updateItem(newValue.target.value, row.id, "amount")
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <AiFillDelete
                        size={15}
                        style={{ color: hover ? "black" : "white" }}
                        onClick={() => deleteItem(row.id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <Grid>
                  <Box container sx={{ my: 1 }}>
                    <Button
                      variant="text"
                      sx={{ "&:hover": { backgroundColor: "transparent" } }}
                    >
                      <AiOutlinePlusCircle size={25} onClick={addItem} />
                    </Button>
                    <p
                      style={{
                        marginTop: "5px",
                        display: "inline",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      &nbsp; Add Line Item
                    </p>
                  </Box>
                </Grid>
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={1}>total</TableCell>
                  <TableCell align="right">${total}</TableCell>
                </TableRow>
                <TableRow></TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={2} mb={2}>
            <Grid Item xs={12}>
              <Item elevation={0}>
                <input
                  fullWidth
                  required
                  id="Notes"
                  label="Notes"
                  variant="filled"
                  size="small"
                  multiline
                  value={Notes}
                  maxRows={4}
                  className={classes.root}
                  InputProps={{ disableUnderline: true }}
                  onChange={event => setNotes(event.target.value)}
                  autoFocus
                />
                <TextField
                  fullWidth
                  required
                  id="Terms"
                  label="Terms & Condition"
                  variant="filled"
                  size="small"
                  multiline
                  maxRows={4}
                  className={classes.root}
                  InputProps={{ disableUnderline: true }}
                />
              </Item>
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

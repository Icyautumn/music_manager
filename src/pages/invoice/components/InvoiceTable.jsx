import React, { useState } from "react";
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

 function InvoiceTable() {
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

  const useStyles = makeStyles((theme) => ({
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
  const [counter, setCounter] = useState(2);

  const [data, setData] = useState([]);

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

  const total = data.reduce((acc, item) => acc + parseInt(item.amount), 0);

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

  const deleteItem = (id) => {
    console.log("deleted");
    console.log(id);
    setData(data.filter((item) => item.id !== id));
  };

  const [hover, sethover] = useState(false);
  const classes = useStyles();
  return (
    <TableContainer component={Paper} mb={1}>
      <Table sx={{ width: "100%" }} aria-label="student Invoice">
        <TableHead>
          <TableRow>
            <StyledTableCell width="40%">Item Description</StyledTableCell>
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
                  autoFocus
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
  );
}

export default InvoiceTable;

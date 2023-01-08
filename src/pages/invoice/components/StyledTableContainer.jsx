import React from "react";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Grid } from "@material-ui/core";
import { useState } from "react";
export default function StyledTableContainer({
  tableRowStyle,
  tableStyle,
  deleteButton,
  addItemButtonStyle
}) {
  const [data, setData] = useState([]);

  const addItem = () => {
    setData([
      ...data,
      {
        Desc: "Description",
        Date: new Date(),
        amount: 0,
      },
    ]);
  };

  const calculateTotal = () => {
    let total = 0;
    data.forEach((item) => {
      total += parseInt(item.amount);
    });
    return total;
  };
  const deleteItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };
  const updateItem = (value, id, type) => {
    const newData = [...data];
    newData[id][type] = value;
    setData(newData);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <TableContainer component={Paper}>
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
          {data.map((row, index) => (
            <TableRow key={index} className={tableRowStyle}>
              <TableCell component="th" scope="row">
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  defaultValue={row.Desc}
                  multiline
                  maxRows={4}
                  className={tableStyle}
                  InputProps={{ disableUnderline: true }}
                  size="small"
                  onBlur={(event) =>
                    updateItem(event.target.value, index, "Desc")
                  }
                />
              </TableCell>
              <TableCell align="left">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Invoice Date"
                    value={row.Date}
                    onChange={(event) => {
                      updateItem(event, index, "Date");
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="filled"
                        size="small"
                        className={tableStyle}
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
              </TableCell>
              <TableCell width={"100%"} align="left">
                <TextField
                  required
                  variant="filled"
                  defaultValue={row.amount}
                  multiline
                  maxRows={4}
                  className={tableStyle}
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

                    textalign: "center",
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  size="small"
                  onBlur={(event) =>
                    updateItem(event.target.value, index, "amount")
                  }
                />
              </TableCell>
              <TableCell>
                <AiFillDelete
                  size={15}
                  className={deleteButton}
                  onClick={() => deleteItem(index)}
                ></AiFillDelete>
              </TableCell>
            </TableRow>
          ))}
          <Grid>
            <Box container sx={{ my: 1 }} className={addItemButtonStyle}>
              <Button >
                <AiOutlinePlusCircle className={deleteButton} size={25} onClick={addItem} />
              </Button>

              <p className={deleteButton}
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
            <TableCell align="right">${calculateTotal()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

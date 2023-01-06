import React, { useState, useRef } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Typography,
  createTheme,
  Box,
  Grid,
  styled,
  Paper,
} from "@material-ui/core";

export const theme = createTheme({
  overrides: {
    MuiCard: {
      root: {
        "& .deleteButton": {
          display: "none",
        },
        "&:hover .deleteButton": {
          display: "flex",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) =>
  createStyles({
    TableRow: {
      "&:hover": {
        backgroundColor: theme.palette.primary.gray,
        color: "black",
        "& $deleteButton": {
          backgroundColor: theme.palette.error.dark,
          color: "black",
        },
      },
    },
    deleteButton: {
      backgroundColor: theme.palette.primary.white,
      color: "white",
    },
    imageDropZone: {
      backgroundColor: "#f0f0f0",
      border: "dashed 2px #ccc",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
      imageContainer: {
        position: "relative",
        "& img": {
          maxWidth: "100%",
        },
      },
      deleteImageButton: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "transparent",
        border: "none",
        color: "rgba(0, 0, 0, 0.87)",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      },
      root: {
        "& .MuiFilledInput-root": {
          backgroundColor: "rgb(255,255,255)",
        },
        "& .MuiFilledInput-root:hover": {
          backgroundColor: "rgb(250, 232, 241)",
          // Reset on touch devices, it doesn't add specificity
        },
        "& .MuiFilledInput-root.Mui-focused": {
          backgroundColor: "rgb(250, 241, 232)",
        },
        "& .MuiTextField-root": { my: 0.5, width: "35ch", height: "6ch" },
      },
    },
  })
);

function InvoiceGenerator() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));
  const classes = useStyles();

  // State variables to hold form values
  const [clientName, setClientName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null);

  // Function to add a new item to the invoice
  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 0,
        rate: 0,
      },
    ]);
  };

  // Function to delete an item from the invoice
  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // Function to update the value of an item
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Function to handle image drops
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImage(file);
  };

  // Function to delete the image
  const deleteImage = () => {
    setImage(null);
  };
  const fileInputRef = useRef(null);

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  // Function to calculate the total amount due
  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.quantity * item.rate;
    });
    return total;
  };

  const pdfRef = useRef(null);

  // Function to save the invoice as a PDF
  const savePDF = () => {
    // const pdf = new jsPDF();
    // pdf.addHTML(document.main, ()=> {
    //   pdf.save('invoice.pdf');
    // });
  };

  return (
    <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-3xl bg-white rounded shadow">
      <div className="invoice-generator container" sx={{ textAlign: "center" }}>
        <h1>Invoice Generator</h1>
        <form>
          <Box noValidate >
            <Grid container spacing={2} mb={2}>
              <Grid xs={6}>
              
                  <TextField
                    label="Client Name"
                    value={clientName}
                    onChange={(event) => setClientName(event.target.value)}
                  />
                
              </Grid>
            </Grid>

            <TextField
              label="Invoice Number"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
              fullWidth
            />
            <TextField
              label="Invoice Date"
              type="date"
              value={invoiceDate}
              onChange={(event) => setInvoiceDate(event.target.value)}
              fullWidth
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Rate</TableCell>
                  <TableCell align="left">Amount</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index} className={classes.TableRow}>
                    <TableCell>
                      <TextField
                        value={item.description}
                        onChange={(event) =>
                          updateItem(index, "description", event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(event) =>
                          updateItem(index, "quantity", event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        value={item.rate}
                        onChange={(event) =>
                          updateItem(index, "rate", event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      {item.quantity * item.rate}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        className={classes.deleteButton}
                        onClick={() => deleteItem(index)}
                        style={{ display: "block" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={addItem}>Add Item</Button>
            <div
              className={classes.imageDropZone}
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
              onClick={openFileInput}
            >
              {image ? (
                <div className={classes.imageContainer}>
                  <img src={URL.createObjectURL(image)} alt="Invoice" />
                  <button
                    className={classes.deleteImageButton}
                    onClick={deleteImage}
                  >
                    Delete Image
                  </button>
                </div>
              ) : (
                <Typography>
                  Drop your image here or click to choose a file
                </Typography>
              )}
            </div>
            <Typography variant="h6">Total: {calculateTotal()}</Typography>
          </Box>
          <Button onClick={savePDF()}>Save as PDF</Button>
        </form>
      </div>
    </main>
  );
}

export default InvoiceGenerator;

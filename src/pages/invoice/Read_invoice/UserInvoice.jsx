import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import tw from "twin.macro";
import { GlobalFilter } from "../../../components/globalFilter";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    textAlign: "center",
  },
  TableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    textAlign: "center",
    justifyContent: "center",
    maxWidth: 1300,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontweight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  TablePagination: {
    width: 300,
  },
}));

export function UserInvoice(props) {
  const navigate = useNavigate();
  const urlParameters = useParams();
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   const token =
  //     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFlUWpNZjlteWV3N3BmcXZUQ2FBQiJ9.eyJpc3MiOiJodHRwczovL2Rldi1zMXFibXIxbXJxaXhmZXBmLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJKdkp3ZEc4bmdySVZHbVdtdTc1bGZQc20zTVNnb2JwVEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly8xZWFod3B4YXFjLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tIiwiaWF0IjoxNjczMjM2MTUwLCJleHAiOjE2NzMzMjI1NTAsImF6cCI6Ikp2SndkRzhuZ3JJVkdtV211NzVsZlBzbTNNU2dvYnBUIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.soE0SukJLR7rZm_SsMKApbHeDxLy9sEk0sj41L-ovX-yEfIGMEwtVJozM4AbrnBw7t91yl2j6ITYbAjbxC77RZW7LX47wD0zMc-NUd9hslZtyPSZVN7moqPymGThHMzs8841_ksdeFgqkPyu1djQX2XkhruWhfNa9AfWlalUzbfO2C-zuHvdnmZuakKpxs5jc2Dzqx48N_tdzolV-vSOEWyfUBWjUpmUj8g_hAkmRltv_4AZKf3pTpijZOtx6KXQEZXqxmv2FTafxPpOEXYZSgKYbXaw9bhdoXH2vJaV7U0h0yP4PA8wPLeEaSe5hMfXAIukpmO3VF506hRdtr2Uhw";

  const [products, setProducts] = useState([]);
  const [musicSchoolId, setMusicSchoolId] = useState();

  useEffect(() => {
    fetchProducts();
  }, []);

  const payment = async (amount, invoice_id) => {
    const totalAmount = {
      parameters: {
        amount: amount * 100,
        invoice_id: invoice_id,
        user_id: urlParameters.token,
      },
    };

    const response = await axios({
      method: "POST",
      url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/invoice/payment`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: { totalAmount },
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
      window.location = receiver;
    }
  };

  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  const fetchProducts = async () => {
    console.log(urlParameters.token);
    console.log(urlParameters.student_id);
    const response = await axios({
      method: "POST",
      url: `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/invoice/${urlParameters.token}`,
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
      console.log(receiver["Items"]);

      setProducts(receiver["Items"]);
    }
  };

  const downloadPdf = (value) => {
    const link = document.createElement("a");
    link.download = "invoice1.png";
    link.href = value;
    link.click();
  };

  const productsData = useMemo(() => [...products], [products]);

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            // .filter((key) => key !== "rating")
            // .filter(
            //   (key) => key !== "description")
            .filter((key) => key !== "id")
            .filter((key) => key !== "music_school_id")
            .filter((key) => key !== "student_id")

            //   .filter((key) => key !== "id")

            .map((key) => {
              if (key === "Invoice")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => (
                    //         <img
                    //           src={value}
                    //           style={{
                    //             width: 50,
                    //             height: 50,
                    //           }}
                    //         />
                    <button onClick={() => downloadPdf(value)}>Download</button>
                  ),
                };

              if (key === "amount")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <span>${value}</span>,
                };

              if (key === "date")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => (
                    <span>{new Date(value).toLocaleDateString()}</span>
                  ),
                };
              if (key === "due_date")
                return {
                  Header: "due date",
                  accessor: key,
                  Cell: ({ value }) => (
                    <span>{new Date(value).toLocaleDateString()}</span>
                  ),
                };

              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Pay",
        Header: "Pay",
        Cell: ({ row }) =>
          row.values.payment === "paid" ? null : (
            <Button onClick={() => payment(row.values.amount, row.original.id)}>
              Pay
            </Button>
          ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
      //   columns,
      //   data,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  return (
    <Grid style={{ display: "grid", justifyContent: "center" }}>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
        setPage={setPage}
      />
      <TableContainer component={Paper} className={classes.TableContainer}>
        <Table
          {...getTableProps()}
          className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    className={classes.tableHeaderCell}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {
                prepareRow(row);

                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell, idx) => (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              count={rows.length}
              className={classes.TablePagination}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default UserInvoice;

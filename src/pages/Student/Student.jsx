import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import tw from "twin.macro";
import { GlobalFilter } from "../../components/globalFilter";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
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

export function Student(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFlUWpNZjlteWV3N3BmcXZUQ2FBQiJ9.eyJpc3MiOiJodHRwczovL2Rldi1zMXFibXIxbXJxaXhmZXBmLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJKdkp3ZEc4bmdySVZHbVdtdTc1bGZQc20zTVNnb2JwVEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly8xZWFod3B4YXFjLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tIiwiaWF0IjoxNjczMjM2MTUwLCJleHAiOjE2NzMzMjI1NTAsImF6cCI6Ikp2SndkRzhuZ3JJVkdtV211NzVsZlBzbTNNU2dvYnBUIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.soE0SukJLR7rZm_SsMKApbHeDxLy9sEk0sj41L-ovX-yEfIGMEwtVJozM4AbrnBw7t91yl2j6ITYbAjbxC77RZW7LX47wD0zMc-NUd9hslZtyPSZVN7moqPymGThHMzs8841_ksdeFgqkPyu1djQX2XkhruWhfNa9AfWlalUzbfO2C-zuHvdnmZuakKpxs5jc2Dzqx48N_tdzolV-vSOEWyfUBWjUpmUj8g_hAkmRltv_4AZKf3pTpijZOtx6KXQEZXqxmv2FTafxPpOEXYZSgKYbXaw9bhdoXH2vJaV7U0h0yP4PA8wPLeEaSe5hMfXAIukpmO3VF506hRdtr2Uhw";

  const [products, setProducts] = useState([]);
  const musicSchoolId = useParams();

  const fetchProducts = async () => {
    const response = await axios
      .get(
        `https://8nnc5jq04m.execute-api.us-east-1.amazonaws.com/music_portal/students/${musicSchoolId.token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.log(err));

    if (response) {
      const products = response.data;

      console.log("Products: ", products);
      setProducts(products);
    }
  };

  const data = useMemo(
    () => [
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
          rate: 3.9,
          count: 120,
        },
      },
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
          rate: 3.9,
          count: 120,
        },
      },
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
          rate: 3.9,
          count: 120,
        },
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Title",
        accessor: "title",
      },
    ],
    []
  );

  const productsData = useMemo(() => [...products], [products]);

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "id")
            .map((key) => {
              if (key === "date_joined")
                return {
                  Header: "date joined",
                  accessor: key,
                  Cell: ({ value }) => (
                    <span>
                      {new Date(value).toLocaleDateString()}
                    </span>
                  ),
                };
              if (key === "profile_picture")
                return {
                  Header: "Picture",
                  accessor: key,
                  Cell: ({ value }) => (
                    <Avatar
                      className={classes.avatar}
                      alt={value}
                      src={value}
                    />
                  ),
                };
              if (key === "Makeup_credits")
                return {
                  Header: "Makeup Lesson",
                  accessor: key,
                  Cell: ({ value }) => <span>{value}</span>,
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
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <Button
            onClick={() =>
              // alert("Editing: "+ row.original.id)
              navigate(`/Students/${musicSchoolId.token}/${row.original.id}`)
            }
          >
            Edit
          </Button>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Grid>
      <Grid container item>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={10}>
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
                setPage={setPage}
              />
            </div>
          </Grid>
          <Grid item xs={2}>
            <div style={{ marginTop: "23px" }} elevation={0}>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                onClick={() => {
                  navigate(`/students/reg-student/${musicSchoolId.token}`);
                }}
              >
                Add
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>

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

export default Student;

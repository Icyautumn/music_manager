// import faker from "faker";
// import * as React from "react";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import makeStyles from '@mui/material/makeStyles';
// import Avatar from '@mui/material/Avatar';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import TablePagination from '@mui/material/TablePagination';
// import TableFooter from '@mui/material/TableFooter';

// let USERS = [],
//   STATUSES = ["Active", "Pending", "Blocked"];

// for (let i = 0; i < 14; i++) {
//   USERS[i] = {
//     name: faker.name.findName(),
//     email: faker.internet.email(),
//     phone: faker.phone.phoneNumber(),
//     jobTitle: faker.name.jobTitle(),
//     compay: faker.company.companyName(),
//     joinDate: faker.date.past().toLocaleDateString("en-US"),
//     status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
//   };
// }



// const useStyles = makeStyles((theme) => ({
//   table: {
//     minWidth: 650,
//   },
//   TableContainer: {
//     borderRadius: 15,
//     margin: "10px 10px",
//     maxWidth: 950,
//   },
//   tableHeaderCell: {
//     fontWeight: "bold",
//     backgroundColor: theme.palette.primary.dark,
//     color: theme.palette.getContrastText(theme.palette.primary.dark),
//   },
//   avatar: {
//     backgroundColor: theme.palette.primary.light,
//     color: theme.palette.getContrastText(theme.palette.primary.light),
//   },
//   name: {
//     fontweight: "bold",
//     color: theme.palette.secondary.dark,
//   },
//   status: {
//     fontWeight: "bold",
//     fontSize: "0.75rem",
//     color: "white",
//     backgroundColor: "grey",
//     borderRadius: 8,
//     padding: "3px 10px",
//     display: "inline-block",
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }



// function MTable() {
//   const classes = useStyles();

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//   setPage(0)
//   }
//   return (
    
//     <TableContainer component={Paper} className={classes.TableContainer}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell className={classes.tableHeaderCell}>User Info</TableCell>
//             <TableCell className={classes.tableHeaderCell}>Job Info</TableCell>
//             <TableCell className={classes.tableHeaderCell}>
//               Joining Date
//             </TableCell>
//             <TableCell className={classes.tableHeaderCell}>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 <Grid container>
//                   <Grid item lg={2}>
//                     <Avatar className={classes.avatar} alt={row.name} src="." />
//                   </Grid>

//                   <Grid item lg={10}>
//                     <Typography className={classes.name}>{row.name}</Typography>
//                     <Typography color="textSecondary" variant="body2">
//                       {row.email}
//                     </Typography>
//                     <Typography color="textSecondary" variant="body2">
//                       {row.phone}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </TableCell>
//               <TableCell>
//                 {row.jobTitle}
//                 {row.company}
//               </TableCell>
//               <TableCell>{row.joinDate}</TableCell>
//               <TableCell>
//                 <Typography
//                   className={classes.status}
//                   style={{
//                     backgroundColor:
//                       ((row.status === "Active" && "green") ||
//                       (row.status === "Pending" && "blue") ||
//                       (row.status === "Blocked" && "orange"))
//                   }}
//                 >
//                   {row.status}
//                 </Typography>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//         <TableFooter>
//             <TablePagination
//             rowsPerPageOptions={[5, 10, 15]}
//             component="div"
//             count={USERS.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onChangePage={handleChangePage}
//             onChangeRowsPerPage={handleChangeRowsPerPage}/>
//         </TableFooter>
//       </Table>
//     </TableContainer>
//   );
// }

// export default MTable;

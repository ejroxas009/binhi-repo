import React from 'react'
import { useEffect, useState } from "react";

//components
import TablePaginationActions from '../shared/TablePaginationActions';

//UI
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, TableHead } from "@mui/material";

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
const ComplaintsTable = ({complaints}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    // useEffect(() => {
    //   const token = localStorage.getItem("accessToken");
    //   const decoded = jwtDecode(token);
    //   const getCurrentAccount = async (id) => {
    //     const res = await getAccountById(id);
    //     setAccount(res.data);
    //     setToggle(!toggle);
    //   };
  
    //   getCurrentAccount(decoded.id);
    // }, []);


  return (
    <Grid item xs={12} sm={10} md={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Complaint Post</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? complaints.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : complaints
              ).map((complaints) => (
                <TableRow key={complaints.id}>
                  <TableCell>{complaints.img}</TableCell>
                  <TableCell>{complaints.post}</TableCell>
                  <TableCell>{complaints.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={complaints.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
  );

}

export default ComplaintsTable
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Colors } from "../../../../styles/Theme/Theme";
import { Button } from "@mui/material";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";

//components
import TablePaginationActions from "../../../shared/TablePaginationActions";

//Service
import * as userService from "../../../../service/admin/userService"
import { useEffect } from "react";


//TableStyles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.primary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//TablePagination
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


//Main Function
export default function UserTables({ list }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [account, setAccount] = useState();

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //for block and unblock
  const handleActiveUser = async (id,event) => {
    const res = await userService.blockUser(id);
    console.log(res);
    window.location.reload();
  }

  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    console.log(setAccount);
  };

  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Username</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">User Type</StyledTableCell>
            <StyledTableCell align="center">Details</StyledTableCell>
            <StyledTableCell align="right">Action </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : list
          ).map((item) => (
            <StyledTableRow key={item.accountId}>
              <StyledTableCell align="left">{item.username}</StyledTableCell>
              <StyledTableCell align="left">{`${item.firstName} ${item.lastName}`}</StyledTableCell>
              <StyledTableCell align="left">{item.role}</StyledTableCell>
              <StyledTableCell align="center">
                View Details
              </StyledTableCell>
              <StyledTableCell align="right">
                {(item.active) ? (
                <Button
                  variant="outlined"
                  color="error"
                  name="active"
                  value={item.active}
                  sx={{ borderRadius: "20px!important" }}
                  onChange={handleChange}
                  onClick = {() => {
                    handleActiveUser(item.accountId)
                    console.log(item.accountId)
                 }} 
                >
                  Deactivate
                </Button>
                ) : (
                  <Button
                  variant="outlined"
                  color="success"
                  name="active"
                  value={item.active}
                  sx={{ borderRadius: "20px!important" }}
                  onChange={handleChange}
                  onClick = {() => {
                    handleActiveUser(item.accountId)
                    console.log(item.accountId)
                 }} 
                >
                  Activate
                </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={list.length}
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
  );
}

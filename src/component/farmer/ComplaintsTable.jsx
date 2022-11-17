import React from "react";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

//components
import TablePaginationActions from "../shared/TablePaginationActions";

//services
import {
  getAccountById,
  getAllAccount,
} from "../../service/shared/accountService";
import * as complaintService from "../../service/admin/complaintService";

//UI
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHead } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Colors } from '../../styles/Theme/Theme';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const ComplaintsTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [account, setAccount] = useState();
  const [accountToggle, setAccountToggle] = useState(false);
  const [accountList, setAccountList] = useState();
  const [accountListToggle, setAccountListToggle] = useState(false);

  const [complaints, setComplaints] = useState();
  const [complaintsToggle, setComplaintsToggle] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const getCurrentAccount = async (id) => {
      const res = await getAccountById(id);
      setAccount(res.data);
      setAccountToggle(!accountToggle);
    };

    getCurrentAccount(decoded.id);
  }, []);

  const getAllComplaints = async () => {
    const res = await complaintService.viewComplaints();

    if (account) {
      const complaintList = res.data.filter(
        (complaints) => complaints.account.accountId == account.accountId
      );
      setComplaints(complaintList);
      setComplaintsToggle(!complaintsToggle);
    }
  };

  const getAllAccounts = async () => {
    const res = await getAllAccount();
    // console.log(res.data);
    setAccountList(res.data);
    setAccountListToggle(!accountListToggle);
  };

  useEffect(() => {
    console.log(account);
  }, [accountToggle]);

  useEffect(() => {
    getAllComplaints();
    getAllAccounts();
  }, [accountToggle]);

  useEffect(() => {
    // console.log(accountList);
  }, [accountListToggle]);

  useEffect(() => {
    console.log(complaints);
  }, [complaintsToggle]);

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {complaints && (
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Image Proof (Optional)</StyledTableCell>
              <StyledTableCell align="center">Post Message</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? complaints.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : complaints
                ).map((data) => (
                  <StyledTableRow key={data.complaintId}>
                    <StyledTableCell align="center">{data.complaintImg}</StyledTableCell>
                    <StyledTableCell align="center">{data.complaintPost}</StyledTableCell>
                    <StyledTableCell align="center">(Read)  (Resolve)</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={4}
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
      )}
    </>
  );
};

export default ComplaintsTable;

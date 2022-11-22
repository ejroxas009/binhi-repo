import React from "react";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

//services
import {
  getAccountById,
} from "../../service/shared/accountService";
import * as complaintService from "../../service/admin/complaintService";

//component
import Complaint from "./Complaint";

//material
import { TableFooter, Grid, TableHead } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Colors } from "../../styles/Theme/Theme";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
// import TablePagination from "@mui/material/TablePagination";


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

const columns = [
  { id: "complaintPost", label: "Complaint Message", align: "center" },
  { id: "read", label: "Status", align: "center" },
  { id: "actions", label: "Actions", align: "center" },
];

const Complaints = () => {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const [account, setAccount] = useState();
  const [accountToggle, setAccountToggle] = useState(false);

  const [complaints, setComplaints] = useState();
  const [complaintsToggle, setComplaintsToggle] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenView = () => setView(true);
  const handleCloseView = () => setView(false);

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

  useEffect(() => {
    getAllComplaints();
  }, [accountToggle]);

  useEffect(() => {
    console.log(account);
  }, [accountToggle]);

  useEffect(() => {
    console.log(complaints);
  }, [complaintsToggle]);

  //Pagination
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <>
      <Grid>
        <h1>My Complaints</h1>
      </Grid>
      {complaints && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((data) => (
                <StyledTableRow key={data.complaintId}>
                    <Complaint data={data}/>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Complaints;

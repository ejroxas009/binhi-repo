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
import { Card, CardMedia, Grid, TableHead, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../../styles/Theme/Theme";
import Chip from "@mui/material/Chip";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

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

  const [open, setOpen] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <h1>My Complaints</h1>
      {complaints && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  Image Proof (Screenshot/s)
                </StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
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
                  <StyledTableCell align="center">
                    {data.complaintImg}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.read ? (
                      <Chip label="Read" color="primary" />
                    ) : (
                      <Chip label="Unread" color="warning" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="outlined" onClick={handleClickOpen}>
                      <ReadMoreIcon />
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      PaperComponent={PaperComponent}
                      aria-labelledby="draggable-dialog-title"
                    >
                      <DialogTitle
                        style={{ cursor: "move" }}
                        id="draggable-dialog-title"
                      >
                        Complaint Details
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          <Typography>
                            Complaint ID: {data.complaintId}
                          </Typography>
                          <Typography paragraph>
                            Post Message: {data.complaintPost}
                          </Typography>
                          <Typography paragraph>
                            Status: 
                            {data.resolved ? (
                              <Chip label="Resolved" color="primary" />
                            ) : (
                              <Chip label="UnResolved" color="warning" />
                            )}
                          </Typography>
                          <Card elevation={5}>
                            <CardMedia
                              component="img"
                              height="250"
                              image={data.complaintImg}
                              alt="Screenshot"
                            />
                          </Card>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          autoFocus
                          variant="contained"
                          sx={{ borderRadius: 50 }}
                          onClick={handleClose}
                        >
                          Ok
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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

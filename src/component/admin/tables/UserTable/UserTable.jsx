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
import { Button, Fab, Grid } from "@mui/material";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";

//components
import TablePaginationActions from "../../../shared/TablePaginationActions";

//Service
import * as userService from "../../../../service/admin/userService"
import { getAccountById } from "../../../../service/shared/accountService";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

//Material Icons
import AddIcon from "@mui/icons-material/Add";
import AddAdminModal from "../../modals/AddAdminModal/AddAdminModal";
import ViewDetailsModal from "../../modals/ViewDetailsModal/ViewDetailsModal";

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
export default function UserTables({ list, onSetUserListToggle, userListToggle }) {
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

  //additions
  const [toggle, setToggle] = useState(false);
  //--------PostAds -----------------
  const [postOpen, setPostOpen] = useState(false);
  const [postToggle, setPostToggle] = useState(false);
  const [isPostSuccess, setIsPostSuccess] = useState(false);
  const [postAdsForm, setPostAdsForm] = useState({
    role: "Admin",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
    profileImg: "",
    complianceImg: "",
    email: "",
    username: "",
    password: "",
  });
  //-------Menu -------------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const getCurrentAccount = async (id) => {
      const res = await getAccountById(id);
      setAccount(res.data);
      setToggle(!toggle);
    };
    getCurrentAccount(decoded.id);
  }, []);

  useEffect(() => {
    console.log(account);
  }, [toggle]);

  //View Details Modal
  const [detailsOpen, setDetailsOpen] = useState(false);
  const handleDetailsOpen = () => setDetailsOpen(true);
  const handleDetailsClose = () => setDetailsOpen(false);
  
  //-----------Post Ads ----------------------------------

  const handlePostOpen = () => setPostOpen(true);
  const handlePostClose = () => setPostOpen(false);
  const handleIsPostSuccessOpen = () => setIsPostSuccess(true);
  const handleIsPostSuccessClose = () => setIsPostSuccess(false);

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    setPostAdsForm({ ...postAdsForm, accountId: account.accountId });
    setPostToggle(!postToggle);
  };

  const handleChangePost = (event) => {
    setPostAdsForm({
      ...postAdsForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    console.log(postAdsForm);

    const addPostFunction = async () => {
      if (account) {
        const res = userService.addUser(postAdsForm);
        console.log(res);
      }
    };

    addPostFunction();
  }, [postToggle]);

  //------------End Post Ads ----------------------------

  
  return (
    <>
    {/* Add Button */}
    <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid item xs={10.5}>
            <Fab
              onClick={handlePostOpen}
              color="primary"
              aria-label="add"
              sx={{
                position: "fixed",
                bottom: (theme) => theme.spacing(5),
                right: (theme) => theme.spacing(5),
                backgroundColor: Colors.primary,
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>

    {/* Table */}
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
                <Button variant="text" size="small" onClick={handleDetailsOpen}>View Details</Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                {(item.active) ? (
                <Button
                  variant="outlined"
                  color="error"
                  name="active"
                  value={item.active}
                  sx={{ borderRadius: "20px!important" }}
                  //onChange={handleChange}
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
                  //onChange={handleChange}
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


    {/* Modals */}
    {account && (
        <AddAdminModal
          open={postOpen}
          onHandleClose={handlePostClose}
          onHandleSubmit={handleSubmitPost}
          onHandleChange={handleChangePost}
          form={postAdsForm}
          onSetForm={setPostAdsForm}
          id={account.accountId}
          userListToggle={userListToggle}
          onSetUserListToggle={onSetUserListToggle}
        />
      )}
      {account && (
        <ViewDetailsModal
        open={detailsOpen}
        onHandleClose={handleDetailsClose}
        onHandleSubmit={handleSubmitPost}
        onHandleChange={handleChangePost}
        onSetForm={setPostAdsForm}
        id={account.accountId}
        list={list}
        />
      )}
  </>
  );
}

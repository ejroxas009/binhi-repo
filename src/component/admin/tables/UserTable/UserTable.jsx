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
import * as userService from "../../../../service/admin/userService";
import * as accountService from "../../../../service/admin/userService";
import { getAccountById } from "../../../../service/shared/accountService";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

//Material Icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
export default function UserTables({
  list,
  onSetUserListToggle,
  userListToggle,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [account, setAccount] = useState();

  const [user, setUser] = useState();
  const [userToggle, setUserToggle] = useState(false);

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //for block and unblock
  const handleActiveUser = async (id, event) => {
    const res = await userService.blockUser(id);
    console.log(res);
    window.location.reload();
  };

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

  //function for view details button
  const viewDetailsFunction = (user) => {
    handleDetailsOpen();
    const viewDataFunction = async () => {
      if (user) {
        const res = await accountService.getAccountById(user);
        setUser(res.data);
        setUserToggle(!userToggle);
      }
    };

    viewDataFunction();
  };

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

 //------------View Data ---------------------------

  useEffect(() => {
    // console.log(user);
  }, [userToggle]);

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
              <PersonAddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>

      {/* Table */}
      <h1>All Users</h1>
      <TableContainer component={Paper} 
      sx={{borderRadius:5}}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">User Type</StyledTableCell>
              <StyledTableCell align="center">Details</StyledTableCell>
              <StyledTableCell align="center">Action </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : list
            ).map((item) => (
              <StyledTableRow key={item.accountId}>
                <StyledTableCell align="center">{item.username}</StyledTableCell>
                <StyledTableCell align="center">{`${item.firstName} ${item.lastName}`}</StyledTableCell>
                <StyledTableCell align="center">{item.role}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      viewDetailsFunction(item.accountId);
                    }}
                  >
                    View Details
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.active ? (
                    <Button
                      variant="outlined"
                      color="error"
                      name="active"
                      value={item.active}
                      sx={{ borderRadius: "20px!important" }}
                      //onChange={handleChange}
                      onClick={() => {
                        handleActiveUser(item.accountId);
                        console.log(item.accountId);
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
                      onClick={() => {
                        handleActiveUser(item.accountId);
                        console.log(item.accountId);
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
      {account && user && (
        <ViewDetailsModal
          open={detailsOpen}
          onHandleClose={handleDetailsClose}
          onHandleSubmit={handleSubmitPost}
          onHandleChange={handleChangePost}
          onSetForm={setPostAdsForm}
          id={account.accountId}
          user={user}
          list={list}
        />
      )}
    </>
  );
}

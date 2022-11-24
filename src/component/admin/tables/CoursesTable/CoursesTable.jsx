import * as React from 'react';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Colors } from '../../../../styles/Theme/Theme';
import { Button, Fab, Grid } from '@mui/material';
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

import { getAccountById } from "../../../../service/shared/accountService";
import CourseModal from "../../modals/CourseModal/CourseModal";
import * as courseService from '../../../../service/admin/courseService'

//components
import TablePaginationActions from "../../../shared/TablePaginationActions";

//Material Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteCourse from '../../modals/CourseModal/DeleteCourse';

//Moment
import moment from "moment"
import Moment from 'react-moment';


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

export default function CoursesTable ({coursesList, onSetCourseListToggle, courseListToggle}) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  //additions
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  //--------PostAds -----------------
  const [postOpen, setPostOpen] = useState(false);
  const [postToggle, setPostToggle] = useState(false);
  const [isPostSuccess, setIsPostSuccess] = useState(false);
  const [postAdsForm, setPostAdsForm] = useState({
    courseId: "",
    courseName: "",
    courseDescription: "",
    courseLink: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
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

  //-----------Post Ads ----------------------------------

  const handlePostOpen = () => setPostOpen(true);
  const handlePostClose = () => setPostOpen(false);
  const handleIsPostSuccessOpen = () => setIsPostSuccess(true);
  const handleIsPostSuccessClose = () => setIsPostSuccess(false);

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    setPostAdsForm({ ...postAdsForm, courseId: account.courseId });
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
        const res = courseService.addCourse(postAdsForm);
        console.log(res);
      }
    };

    addPostFunction();
  }, [postToggle]);

  //------------End Post Ads ----------------------------

  //------------Delete Course----------------------------

  const [course, setCourse] = useState();
  const [courseToggle, setCourseToggle] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const deleteFunction = (course) => {
    handleDeleteOpen();
    const deleteDataFunction = async () => {
      if (course) {
        const res = await courseService.getCourseById(course);
        setCourse(res.data);
        setCourseToggle(!courseToggle);
      }
    };

    deleteDataFunction();
  };
  
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
                top: (theme) => theme.spacing(15),
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
      <h1>Courses</h1>
      <TableContainer component={Paper} sx={{borderRadius:5}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell align="center">Course Name</StyledTableCell>
              <StyledTableCell align="center">Course Description</StyledTableCell>
              <StyledTableCell align="center">Schedule</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
            ? coursesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : coursesList
          ).map((item) => (
              <StyledTableRow key={item.courseId}>
                <StyledTableCell align="center">{item.courseName}</StyledTableCell>
                <StyledTableCell align="center">{item.courseDescription}</StyledTableCell>
                <StyledTableCell align="center">
                    {/* {`${item.startTime} - ${item.endTime} | ${item.startDate.substring(0,10)} - ${item.endDate.substring(0,10)}`} */}
                    <Moment format="YYYY/MM/DD" date={item.startDate}/>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="outlined" 
                  color="error" 
                  sx={{ borderRadius:'20px!important'}}
                  onClick={() => {
                    deleteFunction(item.courseId);
                  }}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={coursesList.length}
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


      {/* Modal */}
      {account && (
        <CourseModal
          open={postOpen}
          onHandleClose={handlePostClose}
          onHandleSubmit={handleSubmitPost}
          onHandleChange={handleChangePost}
          form={postAdsForm}
          onSetForm={setPostAdsForm}
          id={account.accountId}
          courseListToggle={courseListToggle}
          onSetCourseListToggle={onSetCourseListToggle}
        />
      )}

      {account && (
        <DeleteCourse
          open={deleteOpen}
          onHandleClose={handleDeleteClose}
          onSetForm={setPostAdsForm}
          id={account.accountId}
          course={course}
          coursesList={coursesList}
          setCourse = {setCourse}
          setCourseToggle = {setCourseToggle}
          courseToggle = {courseToggle}
        />
      )}
    </>
  );
}
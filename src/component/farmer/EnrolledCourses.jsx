import React, { useState, useEffect } from 'react'
import jwtDecode from "jwt-decode";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Colors } from '../../styles/Theme/Theme';
import PropTypes from "prop-types";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";

//components
import TablePaginationActions from "../shared/TablePaginationActions";

//services
import {getAccountById} from "../../service/shared/accountService";
import * as courseService from '../../service/admin/courseService'
import ViewEnrolledCourse from './ViewEnrolledCourse';

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


const EnrolledCourses = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [account, setAccount] = useState();
  const [accountToggle, setAccountToggle] = useState(false);

  const [enrolledCourse, setEnrolledCourse] = useState();
  const [enrolledCourseToggle, setEnrolledCourseToggle] = useState(false);

  const [course, setCourse] = useState();
  const [courseToggle, setCourseToggle] = useState(false);

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

    const viewEnrolledCourses = async () => {
      const res = await courseService.getCourseEnroll();
      // console.log(res.data);
      if (account) {
        const coursesList = res.data.filter(
          (enrolledCourse) => enrolledCourse.account.accountId == account.accountId
        );
        setEnrolledCourse(coursesList);
        setEnrolledCourseToggle(!enrolledCourseToggle);
      } 
    }
   
  useEffect(() => {
    console.log(account);
  }, [accountToggle]);

  useEffect(() => {
    viewEnrolledCourses();
  }, [accountToggle]);

  useEffect(() => {
    console.log(enrolledCourse);
  }, [enrolledCourseToggle])

  //function for view details
  const viewDetailsFunction = (course) => {
    handleDetailsOpen();
    const viewDataFunction = async () => {
      if (course) {
        const res = await courseService.getCourseEnrollById(course);
        setCourse(res.data);
        setCourseToggle(!courseToggle);
      }
    };
    viewDataFunction();
  };

  useEffect(() => {
    console.log(course);
  }, [courseToggle]);

  //View Details Modal
  const [detailsOpen, setDetailsOpen] = useState(false);
  const handleDetailsOpen = () => setDetailsOpen(true);
  const handleDetailsClose = () => setDetailsOpen(false);

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
  <h1>My Courses</h1>
    {enrolledCourse && (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Enrolled Date</StyledTableCell>
          <StyledTableCell align="center">Course Name</StyledTableCell>
          <StyledTableCell align="center">Description</StyledTableCell>
          <StyledTableCell align="center">Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {(rowsPerPage > 0
                  ? enrolledCourse.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : enrolledCourse
                ).map((item) => (
            <StyledTableRow key={item.courseEnrollId}>
            <StyledTableCell align="center">{item.enrollDate}</StyledTableCell>
            <StyledTableCell align="center">{item.course.courseName}</StyledTableCell>
            <StyledTableCell align="center">{item.course.courseDescription}</StyledTableCell>
            <StyledTableCell align="center">
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      viewDetailsFunction(item.courseEnrollId);
                    }}
                  >
                    View Details
                  </Button>
                </StyledTableCell>
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
                    count={enrolledCourse.length}
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
    {enrolledCourse && course && (
      <ViewEnrolledCourse 
      open={detailsOpen}
      onHandleClose={handleDetailsClose}
      course={course}
      enrolledCourse={enrolledCourse}
      id={enrolledCourse.courseId}
      />
    )}

  </>
);
}

export default EnrolledCourses;
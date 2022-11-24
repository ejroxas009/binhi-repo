import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Colors } from "../../styles/Theme/Theme";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip";

import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

//Moment
import Moment from 'react-moment';

//components
import TablePaginationActions from "../shared/TablePaginationActions";

//services
import * as courseService from "../../service/admin/courseService";
import { getAccountById } from "../../service/shared/accountService";

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

const randomstring = require("randomstring");

const CoursesList = ({ details }) => {
  const [enrolledCourse, setEnrolledCourse] = useState();
  const [enrolledCourseToggle, setEnrolledCourseToggle] = useState(false);

  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [enrollForm, setEnrollForm] = useState({
    enrollId: "",
    accountId: "",
    courseId: "",
  });
  const [coursesId, setCoursesId] = useState();
  const [enrollFormToggle, setEnrollFormToggle] = useState(false);
  const [enrollButtonToggle, setEnrollButtonToggle] = useState(false);

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
    // console.log(account);
  }, [toggle]);

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
  }, [toggle]);

  useEffect(() => {
    viewEnrolledCourses();
  }, [toggle]);
  
  useEffect(() => {
    console.log(enrolledCourse);
  }, [enrolledCourseToggle])


  //--------------Enroll Course Function---------------------------
  const handleEnrollCourse = async (accountId, courseId) => {
    const enrollIdRef =
      "EnrollRef-" +
      randomstring.generate({
        length: 10,
        charset: "alphanumeric",
      });

    setEnrollForm({
      enrollId: enrollIdRef,
      accountId,
      courseId,
    });
    setCoursesId(courseId);
    setEnrollFormToggle(!enrollFormToggle);
  };

  useEffect(() => {
    const enrolledCourseFunction = async () => {
      if (enrollForm.enrollId !== "") {
        const res = await courseService.postCourseEnroll(enrollForm);
        setEnrollButtonToggle(!enrollButtonToggle);

        // console.log(enrollForm);
        console.log(res);
      }
    };

    enrolledCourseFunction();
  }, [enrollFormToggle]);

  useEffect(() => {
    // console.log(enrollButtonToggle);
  }, [enrollButtonToggle]);

  const showToastMessage = () => {
    toast.success("Course Enrolled Successfully !", {
      position: toast.POSITION.TOP_RIGHT,
    });
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
      <h1>Courses</h1>
      <TableContainer component={Paper} sx={{borderRadius:5}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Course ID</StyledTableCell>
              <StyledTableCell align="center">Course Name</StyledTableCell>
              <StyledTableCell align="center">
                Course Description
              </StyledTableCell>
              <StyledTableCell align="center">Schedule</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? details.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : details
            ).map((item) => (
              <StyledTableRow key={item.courseId}>
                <StyledTableCell align="center">
                  {item.courseId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.courseName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.courseDescription}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {`${item.startTime} - ${item.endTime} | ${item.startDate} - ${item.endDate}`} */}
                  <Moment format="hh:mm A" date={item.startTime}/>
                    &nbsp; - &nbsp;
                    <Moment format="hh:mm A" date={item.endTime}/>
                    &nbsp; | &nbsp;
                    <Moment format="ddd YYYY/MM/DD" date={item.startDate}/>
                    &nbsp; - &nbsp;
                    <Moment format="ddd YYYY/MM/DD" date={item.endDate}/>
                </StyledTableCell>
                <StyledTableCell>
                {/* {enrolledCourse && enrolledCourse.map((data) => {
                   {item.courseId == enrolledCourse.courseId ? (
                      <Chip label="Enrolled" color="success" />
                  ) : (  */}
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: "20px!important" }}
                    onClick={() => {
                      handleEnrollCourse(account.accountId, item.courseId);
                      showToastMessage();
                    }}
                  >
                    Enroll
                  </Button>
                   {/* )} */}
                  {/* })} */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4}
                count={details.length}
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
    </>
  );
};

export default CoursesList;

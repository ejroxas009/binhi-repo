import React from "react";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {
  CardMedia,
  Divider,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";

//Moment
import moment from "moment"
import Moment from 'react-moment';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  height: 475,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

function BoldText({ children }) {
  return <span style={{ fontWeight: "bold" }}>{children}</span>;
}

const ViewEnrolledCourse = ({
  open,
  onHandleClose,
  course,
  enrolledCourse,
  id,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component="form"
      >
        <Card sx={style}>
          <Grid container item xs={12} justifyContent="center">
            <CardHeader title="Course Details" />
          </Grid>
          <Divider />
          {course && (
            <CardContent>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <Typography>
                    Course Name: <BoldText>{course.course.courseName}</BoldText>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Course Description:{" "}
                    <BoldText>{course.course.courseDescription}</BoldText>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography> Schedule:</Typography>
                  <Typography>
                    {/* {`${course.course.startTime} - ${course.course.endTime} | ${course.course.startDate} - ${course.course.endDate}`} */}
                    <BoldText> <Moment format="hh:mm A" date={course.course.startTime}/>
                    &nbsp; - &nbsp;
                    <Moment format="hh:mm A" date={course.course.endTime}/>
                    &nbsp; | &nbsp;
                    <Moment format="ddd YYYY/MM/DD" date={course.course.startDate}/>
                    &nbsp; - &nbsp;
                    <Moment format="ddd YYYY/MM/DD" date={course.course.endDate}/></BoldText>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      marginLeft: 10,
                      height: 200,
                      width: 250,
                      borderRadius: "20px",
                    }}
                  >
                    <CardActionArea href={course.course.courseLink}>
                      <CardMedia
                        component="img"
                        height="140"
                        width="280"
                        image="https://picsum.photos/200"
                        alt="image"
                      />
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        href={course.course.courseLink}
                      >
                        Visit Course
                        <span hidden={course.course.courseLink}></span>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default ViewEnrolledCourse;

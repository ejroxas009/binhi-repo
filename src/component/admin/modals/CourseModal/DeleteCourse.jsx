import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import UploadingModal from "../../../shared/UploadingModal";
import UploadSuccessModal from "../../../shared/UploadSuccessModal";
import { CardMedia, Typography } from "@mui/material";

import * as courseService from '../../../../service/admin/courseService'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const DeleteCourse = ({
  open,
  onHandleClose,
  onHandleSubmit,
  onHandleChange,
  id,
  course,
  list,
  setCourse,
  setCourseToggle,
  courseToggle

}) => {
  const [uploadingOpen, setUploadingOpen] = useState(false);
  const [uploadingSuccessOpen, setUploadingSuccessOpen] = useState(false);

  const deleteFunction = (course) => {
    onHandleClose();
    const deleteDataFunction = async () => {
      if (course) {
        const res = await courseService.deleteCourse(course)
        setCourse(res.data);
        setCourseToggle(!courseToggle);
        window.location.reload();
      }
    };

    deleteDataFunction();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component="form"
      >
        
        <Card sx={style}>
          <Grid container item xs={12} justifyContent="center">
            <CardHeader title="Delete Category" />
          </Grid>
          {course && (
          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h5">
                  Are you sure you want to delete: {course.courseName} ?
                  {/* <Typography variant="h5" sx={{fontWeight: 'bold'}}>{crop.cropName}</Typography>? */}
                </Typography>
              </Grid>
              <Grid container item xs={12} justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ 
                    borderRadius: 50, 
                    margin: 1,
                   }}
                   onClick={() => {
                    deleteFunction(course.courseId);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 50, margin: 1 }}
                  onClick={onHandleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </CardContent>
           )}
        </Card>
      </Modal>

      <UploadingModal open={uploadingOpen} />
      <UploadSuccessModal open={uploadingSuccessOpen} />
    </div>
  );
};

export default DeleteCourse;

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";
import { v4 } from "uuid";
import { storage } from "../../../../service/shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect } from "react";
import * as courseService from "../../../../service/admin/courseService";
import UploadingModal from "../../../shared/UploadingModal";
import UploadSuccessModal from "../../../shared/UploadSuccessModal";

//DatePicker
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DateTimePicker, LocalizationProvider, MobileDatePicker, TimePicker } from "@mui/x-date-pickers";
import { Input } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CourseModal = ({
  open,
  onHandleClose,
  onHandleSubmit,
  form,
  onSetForm,
  onHandleChange,
  id,
}) => {
  const [postImageUpload, setPostImageUpload] = useState(null);
  const [postImageRef, setPostImageRef] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState("");
  const [postImageToggle, setPostImageToggle] = useState(false);
  const [uploadingOpen, setUploadingOpen] = useState(false);
  const [uploadingSuccessOpen, setUploadingSuccessOpen] = useState(false);

  const handleUploadingOpen = () => setUploadingOpen(true);
  const handleUploadingClose = () => setUploadingOpen(false);
  const handleUploadingSuccessOpen = () => setUploadingSuccessOpen(true);
  const handleUploadingSuccessClose = () => setUploadingSuccessOpen(false);

  const handleSubmitPostAds = async (event) => {
    event.preventDefault();
    onSetForm({
      ...form,
      courseId: id,
      onHandleSubmit
    });

    setPostImageToggle(!postImageToggle);
  };

  useEffect(() => {
    const uploadPost = async () => {
      if (form.courseName !== "") {
        handleUploadingOpen();
        try {
          const res = await courseService.addCourse(form);
          if (res.status == 200) {
            onHandleClose();
            setTimeout(handleUploadingClose, 1000);
            setTimeout(handleUploadingSuccessOpen, 1000);
            setTimeout(handleUploadingSuccessClose, 4000);
            //onSetAdsListToggle(!adsListToggle);
            window.location.reload()
          }
          console.log(res);
        } catch {}
      }
    };
    uploadPost();
  }, [postImageToggle]);

  //DatePicker
  const [date, setDate] = React.useState(null);
  const handleChange = (newDate) => {
    console.log(date);
  };
  const customInputRef = useRef();

  return (
    <div>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component="form"
        onSubmit={handleSubmitPostAds}
      >
        <Card sx={style}>
          <Grid container item xs={12} justifyContent="center">
            <CardHeader title="Add a Course" />
          </Grid>

          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  label="Course Name"
                  name="courseName"
                  fullWidth
                  value={form.courseName}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Course Description"
                  name="courseDescription"
                  fullWidth
                  value={form.courseDescription}
                  onChange={onHandleChange}
                  inputProps={{
                    style: {
                      height: "80px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Course Link"
                  name="courseLink"
                  fullWidth
                  value={form.courseLink}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  value={form.startTime}
                  onChange={(newDate) =>{
                    onSetForm({...form, startTime: newDate})
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="End Time"
                  value={form.endTime}
                  onChange={(newDate) =>{
                    onSetForm({...form, endTime: newDate})
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={form.startDate}
                  onChange={(newDate) =>{
                    onSetForm({...form, startDate: newDate})
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="End Date"
                  inputFormat="MM/DD/YYYY"
                  value={form.endDate}
                  onChange={(newDate) =>{
                    onSetForm({...form, endDate: newDate})
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
              </Grid>
              <Grid container item xs={12} justifyContent="center">
                <Button
                  variant="contained"
                  sx={{ borderRadius: 50, margin: 1 }}
                  type="submit"
                >
                  Save
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
        </Card>
      </Modal>

      <UploadingModal open={uploadingOpen} />
      <UploadSuccessModal open={uploadingSuccessOpen} />
    </div>
  );
};

export default CourseModal;

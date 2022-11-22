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
import * as userService from "../../../../service/admin/userService";
import UploadingModal from "../../../shared/UploadingModal";
import UploadSuccessModal from "../../../shared/UploadSuccessModal";

//DatePicker
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DateTimePicker, LocalizationProvider, MobileDatePicker, TimePicker } from "@mui/x-date-pickers";
import { Input } from "@mui/material";

import { getAccountById } from "../../../../service/shared/accountService";
import jwtDecode from "jwt-decode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const ViewDetailsModal = ({
  open,
  onHandleClose,
  onHandleChange,
  id,
  item,
}) => {
  const [postImageUpload, setPostImageUpload] = useState(null);
  const [postImageRef, setPostImageRef] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState("");
  const [postImageToggle, setPostImageToggle] = useState(false);
  const [uploadingOpen, setUploadingOpen] = useState(false);
  const [uploadingSuccessOpen, setUploadingSuccessOpen] = useState(false);

  const [users, setUsers] = useState();
  const [userstoggle, setUsersToggle] = useState(false);


  const [account, setAccount] = useState();
  const [accountToggle, setAccountToggle] = useState(false);

  const handleUploadingOpen = () => setUploadingOpen(true);
  const handleUploadingClose = () => setUploadingOpen(false);
  const handleUploadingSuccessOpen = () => setUploadingSuccessOpen(true);
  const handleUploadingSuccessClose = () => setUploadingSuccessOpen(false);

  //useEffect then create function under useEffect which is getAccountById na service
  //next item; 




  // useEffect(() => {
  //   const getUserById = async (id) => {
  //     const res = await getAccountById(id);
  //     setUsers(res.data);
  //     setUsersToggle(!userstoggle);
  //   };
  //   getUserById(id);
  // },[])

  const [detailsToggle, setDetailsToggle] = useState(false);

  useEffect(() => {
    console.log(item);
  }, [detailsToggle]);

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
            <CardHeader title="User Details" />
          </Grid>
          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
              <Typography component={"div"}>
                Name: {item.firstName}
              </Typography>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  value={item.firstName}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Middle Name"
                    name="middleName"
                    fullWidth
                    value={item.middleName}
                    onChange={onHandleChange}
                    />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  value={item.lastName}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="username"
                  fullWidth
                  value={item.username}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                disabled
                  label="User Type"
                  name="role"
                  fullWidth
                  value={item.role}
                  onChange={onHandleChange}
                />
              </Grid>

              <Grid container item xs={12} justifyContent="center">
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 50, margin: 1 }}
                  onClick={onHandleClose}
                >
                  Close
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

export default ViewDetailsModal;

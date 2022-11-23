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

// import * as accountService from "../../../../service/admin/userService";

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
  onHandleSubmit,
  onHandleChange,
  id,
  user,
  list,
}) => {
  const [uploadingOpen, setUploadingOpen] = useState(false);
  const [uploadingSuccessOpen, setUploadingSuccessOpen] = useState(false);

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
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  value={user.firstName}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Middle Name"
                  name="middleName"
                  fullWidth
                  value={user.middleName}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  value={user.lastName}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="username"
                  fullWidth
                  value={user.username}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="User Type"
                  name="role"
                  fullWidth
                  value={user.role}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid container item xs={12} justifyContent="center">
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

export default ViewDetailsModal;

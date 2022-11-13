import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

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

const ChangePWModal = ({
  onSetOpen,
  onHandleOpen,
  onHandleClose,
  open,
  onPWChange,
  onConfirmNewPWChange,
  onHandleSubmit,
  form,
  confirmPWForm,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component="form"
        onSubmit={onHandleSubmit}
      >
        <Card sx={style}>
          <Grid container item xs={12} justifyContent="center">
            <CardHeader title="Change Password" />
          </Grid>

          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              {/* <Grid container item justifyContent="flex-start">
              <Typography>Change Password</Typography>
            </Grid> */}
              <Grid item xs={12}>
                <TextField
                  label="Old Password"
                  name="oldPassword"
                  fullWidth
                  value={form.oldPassword}
                  onChange={onPWChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  name="newPassword"
                  fullWidth
                  value={form.newPassword}
                  onChange={onPWChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm New Password"
                  fullWidth
                  value={confirmPWForm}
                  onChange={onConfirmNewPWChange}
                />
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
    </div>
  );
};
export default ChangePWModal;

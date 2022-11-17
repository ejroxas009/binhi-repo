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
import SendIcon from "@mui/icons-material/Send";

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

const SendComplainModal = ({
  open,
  onHandleClose,
  onHandleSubmit,
  form,
  onHandleChange,
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
            <CardHeader title="Complaint to the Admin!" />
          </Grid>

          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  label="Leave a message"
                  name="complaintPost"
                  fullWidth
                  value={form.complaintPost}
                  onChange={onHandleChange}
                  inputProps={{
                    style: {
                      height: "80px",
                    },
                  }}
                />
              </Grid>

              <Grid container item xs={12} justifyContent="center">
                <Button
                  variant="contained"
                  sx={{ borderRadius: 50, margin: 1 }}
                  type="submit"
                  endIcon={<SendIcon />}
                >
                  Send
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

export default SendComplainModal;

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
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ViewProofOfPayment = ({
  onSetOpen,
  onHandleOpen,
  onHandleClose,
  open,
  onHandleSubmit,
  form,
  onHandleChange,
  proofOfPayment,
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
            <CardHeader title="Proof of Payment" />
          </Grid>

          <CardContent>
            <Grid container justifyContent="center" spacing={2}>
              <Grid container item xs={12} justifyContent="center">
                <img
                  src={proofOfPayment}
                  style={{ height: "50vh", width: "50vw" }}
                />
              </Grid>
              <Grid container item xs={12} justifyContent="center">
                <Button
                  variant="contained"
                  sx={{ borderRadius: 50, width: "200px" }}
                  onClick={onHandleClose}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default ViewProofOfPayment;

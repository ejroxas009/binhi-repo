import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RadioButton from "../RadioButton";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GCashPaymentMode = ({ open, onHandleClose, bidWinner }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            G Cash QR Code
          </Typography>

          <Grid container justifyContent="center" spacing={2}>
            <Grid container item xs={12} justifyContent="center">
              {bidWinner && (
                <img
                  src={bidWinner.account.gcashQr}
                  style={{ height: "40vh", width: "20vw" }}
                />
              )}
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ borderRadius: 50 }}
                onClick={onHandleClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ borderRadius: 50 }}
                endIcon={<SendIcon />}
                //onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default GCashPaymentMode;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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

const BankTransferPaymentMode = ({ open, onHandleClose, bidWinner }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Bank Transfer
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {bidWinner && (
                <Card>
                  <CardContent>
                    <Typography>{`Bank Name: ${bidWinner.account.bankName}`}</Typography>
                    <Typography>{`Account Name: ${bidWinner.account.bankAccountName}`}</Typography>
                    <Typography>{`Account Name: ${bidWinner.account.bankAccountNumber}`}</Typography>
                  </CardContent>
                </Card>
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

export default BankTransferPaymentMode;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as transactionService from "../../service/buyer/MyTransactionService";

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

const CODPaymentMode = ({ open, onHandleClose, paymentId }) => {
  const handleCODPayment = async () => {
    const res = await transactionService.markAsCOD(paymentId);
    console.log(res);
  };
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
                Cash on Delivery
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid container item justifyContent="center">
                    <Typography>
                      Please pay upon the delivery of the product.
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
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
                onClick={handleCODPayment}
              >
                Proceed
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default CODPaymentMode;

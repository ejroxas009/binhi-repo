import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RadioButton from "../RadioButton";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import * as transactionService from "../../../service/buyer/MyTransactionService";
import GCashPaymentMode from "./GCashPaymentMode";
import BankTransferPaymentMode from "../BankTransferPaymentMode";

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

const paymentMode = [
  {
    paymentModeId: 1,
    paymentMode: "Cash On Delivery",
  },
  {
    paymentModeId: 2,
    paymentMode: "G Cash",
  },
  {
    paymentModeId: 3,
    paymentMode: "Bank Transfer",
  },
];
const PaymentModeModal = ({
  open,
  onHandleClose,
  handleOpen,
  paymentId,
  onHandleChange,
  form,
  onSetForm,
  paymentMethod,
  bidWinner,
}) => {
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
  const handleProceedToCheckout = async () => {
    console.log(form);
    if (paymentId) {
      const res = await transactionService.setPaymentMethod(paymentId, form);
      console.log(res);
    }
    handlePaymentMethodOpen();
    // if (paymentMethod == "G Cash") {
    //   console.log("G cash");
    //   handlePaymentMethodOpen();
    // }
  };

  const handlePaymentMethodOpen = () => setPaymentMethodOpen(true);
  const handlePaymentMethodClose = () => setPaymentMethodOpen(false);

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
            Payment Method
          </Typography>

          <RadioButton
            list={paymentMode}
            onHandleChange={onHandleChange}
            name="changePaymentMethod"
            value={form.changePaymentMethod}
          />
          <Grid container justifyContent="center" spacing={2}>
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
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {paymentMethod == "G Cash" && (
        <GCashPaymentMode
          open={paymentMethodOpen}
          onHandleClose={handlePaymentMethodClose}
          bidWinner={bidWinner}
          paymentId={paymentId}
        />
      )}
      {paymentMethod == "Bank Transfer" && (
        <BankTransferPaymentMode
          open={paymentMethodOpen}
          onHandleClose={handlePaymentMethodClose}
          bidWinner={bidWinner}
          paymentId={paymentId}
        />
      )}
    </div>
  );
};

export default PaymentModeModal;

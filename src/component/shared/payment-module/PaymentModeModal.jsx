import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RadioButton from "../RadioButton";

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
const PaymentModeModal = ({ open, handleClose, handleOpen }) => {
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Payment Method
          </Typography>

          <RadioButton list={paymentMode} />
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentModeModal;

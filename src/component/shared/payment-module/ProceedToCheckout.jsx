import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RadioButton from "../RadioButton";
import Card from "@mui/material/Card";
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

const ProceedToCheckout = ({ open, handleClose, handleOpen }) => {
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
          <Grid container justifyContent="center" spacing={3}>
            <Grid container item xs={12} justifyContent="center">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Proceed to checkout?
              </Typography>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <Button variant="outlined" sx={{ borderRadius: 50, margin: 1 }}>
                Later
              </Button>
              <Button
                variant="contained"
                sx={{ borderRadius: 50, margin: 1 }}
                endIcon={<SendIcon />}
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
export default ProceedToCheckout;

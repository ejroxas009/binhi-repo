import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RadioButton from "../RadioButton";
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

const CheckoutModal = ({ open, handleClose, handleOpen, data }) => {
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
                Checkout your product
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography>Product : Rice</Typography>
                  <Typography>Quantity : 100kgs</Typography>
                  <Typography>Price Offer : 56 per kilogram</Typography>
                  <Typography>Total Aount : P5600</Typography>
                </CardContent>
              </Card>
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
                Payment
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckoutModal;

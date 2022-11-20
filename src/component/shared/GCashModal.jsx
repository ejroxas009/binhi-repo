import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import ChangeQRModal from "./ChangeQRModal";

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

const GCashModal = ({ open, onHandleClose, onHandleChange, account }) => {
  const [changeQRModalOpen, setChangeQRModalOpen] = useState(false);

  const handleChangeQRModalOpen = () => setChangeQRModalOpen(true);
  const handleChangeQRModalClose = () => setChangeQRModalOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid container item xs={12} justifyContent="center">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                G Cash QR
              </Typography>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              {account && (
                <img
                  src={account.gcashQr}
                  style={{ height: "40vh", width: "20vw" }}
                />
              )}
            </Grid>
            <Grid container item xs={12} justifyContent="center" spacing={2}>
              <Button
                variant="outlined"
                sx={{ borderRadius: 50, margin: 1 }}
                onClick={onHandleClose}
              >
                Close
              </Button>
              <Button
                variant="contained"
                sx={{ borderRadius: 50, margin: 1 }}
                onClick={handleChangeQRModalOpen}
              >
                Change QR
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <ChangeQRModal
        open={changeQRModalOpen}
        onHandleClose={handleChangeQRModalClose}
        account={account}
      />
    </div>
  );
};

export default GCashModal;

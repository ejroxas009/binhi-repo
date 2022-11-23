import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RadioButton from "../RadioButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";
import { v4 } from "uuid";
import { storage } from "../../../service/shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as transactionService from "../../../service/buyer/MyTransactionService";

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

const GCashPaymentMode = ({
  open,
  onHandleClose,
  bidWinner,
  paymentId,
  toReceiveList,
  orderIdRef,
}) => {
  const [paymentImageUpload, setPaymentImageUpload] = useState(null);
  const [paymentImageRef, setPaymentImageRef] = useState(null);
  const [paymentImageUrl, setPaymentImageUrl] = useState("");
  const [paymentImageToggle, setPaymentImageToggle] = useState(false);
  const [paymentImgForm, setPaymentImgForm] = useState({
    proofOfPayment: "",
  });

  const uploadPaymentImage = async () => {
    if (paymentImageUpload == null) return;
    const paymentImageRef = ref(
      storage,
      `proof-of-payment/${paymentImageUpload.name + v4()}`
    );
    setPaymentImageRef(paymentImageRef);
    try {
      console.log("uploading");

      await uploadBytes(paymentImageRef, paymentImageUpload);
      const url = await getDownloadURL(paymentImageRef);

      return url;
    } catch {}
  };

  const handleSubmitPaymentImage = async (event) => {
    event.preventDefault();
    console.log("Submitted");
    const url = await uploadPaymentImage();
    console.log(typeof url);
    setPaymentImgForm({
      proofOfPayment: url,
    });
    setPaymentImageToggle(!paymentImageToggle);
    console.log(paymentImgForm);

    alert("Profile Image Sucessfully Uploaded!");
  };

  useEffect(() => {
    console.log(paymentImgForm);
    const sendProofOfPayment = async () => {
      if (paymentImgForm.proofOfPayment !== "" && paymentId) {
        const res = await transactionService.sendProofOfPayment(
          paymentId,
          paymentImgForm
        );
        console.log(res);
        // const res2 = await transactionService.sendProofOfPaymentCropReceived(
        //   paymentId
        // );
        //window.location.reload();
      }
    };

    sendProofOfPayment();
  }, [paymentImageToggle]);

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
              <Card>
                <Grid container item justifyContent="center">
                  <Typography>Upload the Proof of Payment</Typography>
                </Grid>

                <CardContent>
                  <Grid container item justifyContent="center">
                    <Button>
                      <input
                        type="file"
                        onChange={(event) => {
                          setPaymentImageUpload(event.target.files[0]);
                        }}
                      />
                    </Button>
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
                onClick={handleSubmitPaymentImage}
              >
                Upload Payment Proof
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default GCashPaymentMode;

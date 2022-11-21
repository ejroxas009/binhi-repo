import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { v4 } from "uuid";
import { storage } from "../../service/shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

const BankTransferPaymentMode = ({
  open,
  onHandleClose,
  bidWinner,
  paymentId,
}) => {
  const [paymentImageUpload, setPaymentImageUpload] = useState(null);
  const [paymentImageRef, setPaymentImageRef] = useState(null);
  const [paymentImageUrl, setPaymentImageUrl] = useState("");
  const [paymentImageToggle, setPaymentImageToggle] = useState(false);
  const [paymentImgForm, setPaymentImgForm] = useState({
    proofOfPayment: "",
  });

  console.log(paymentId);
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
            <Grid item xs={12}>
              <Card>
                <Grid container item justifyContent="center">
                  <Typography>Upload Proof of Payment</Typography>
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

export default BankTransferPaymentMode;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import { v4 } from "uuid";
import { storage } from "../../service/shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as accountService from "../../service/shared/accountService";

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

const ChangeQRModal = ({ open, onHandleClose, onHandleChange, account }) => {
  const [gCashImageUpload, setGCashImageUpload] = useState(null);
  const [gCashImageRef, setGCashImageRef] = useState(null);
  const [gCashImageUrl, setGCashImageUrl] = useState("");
  const [gCashImageToggle, setGCashImageToggle] = useState(false);
  const [gCashForm, setGCashForm] = useState({
    GCashQr: "",
  });

  const uploadGCashImage = async () => {
    if (gCashImageUpload == null) return;
    const gCashImageRef = ref(
      storage,
      `g-cash-QR/${gCashImageUpload.name + v4()}`
    );
    setGCashImageRef(gCashImageRef);
    try {
      console.log("uploading");

      await uploadBytes(gCashImageRef, gCashImageUpload);
      const url = await getDownloadURL(gCashImageRef);

      return url;
    } catch {}
  };

  const handleSubmitGCashImage = async (event) => {
    event.preventDefault();
    console.log("Submitted");
    const url = await uploadGCashImage();
    console.log(typeof url);
    setGCashForm({
      gcashQr: url,
    });
    setGCashImageToggle(!gCashImageToggle);
    console.log(gCashForm);

    alert("GCash QR Sucessfully Uploaded!");
  };

  useEffect(() => {
    console.log(gCashForm);
    const changeGCashImageFunction = async () => {
      if (gCashForm.GCashQr !== "" && account) {
        const res = await accountService.uploadGCashQR(
          account.accountId,
          gCashForm
        );
        console.log(gCashForm);
        console.log(res);
        //handleCloseProfileImage();
        //window.location.reload();
      }
    };

    changeGCashImageFunction();
  }, [gCashImageToggle]);

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
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Change QR" />
                <CardContent>
                  <Button>
                    <input
                      type="file"
                      onChange={(event) => {
                        setGCashImageUpload(event.target.files[0]);
                      }}
                    />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
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
                onClick={handleSubmitGCashImage}
              >
                Submit QR
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ChangeQRModal;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";
import { v4 } from "uuid";
import { storage } from "../../service/shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as complaintService from "../../service/farmer/complaints";
import UploadingModal from "./UploadingModal";
import UploadSuccessModal from "./UploadSuccessModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SendComplainModal = ({
  open,
  onHandleClose,
  onHandleSubmit,
  form,
  onSetForm,
  onHandleChange,
  account,
}) => {
  const [complaintImageUpload, setComplaintImageUpload] = useState(null);
  const [complaintImageRef, setComplaintImageRef] = useState(null);
  const [complaintImageUrl, setComplaintImageUrl] = useState("");
  const [complaintImageToggle, setComplaintImageToggle] = useState(false);
  const [uploadingOpen, setUploadingOpen] = useState(false);
  const [uploadingSuccessOpen, setUploadingSuccessOpen] = useState(false);

  const handleUploadingOpen = () => setUploadingOpen(true);
  const handleUploadingClose = () => setUploadingOpen(false);
  const handleUploadingSuccessOpen = () => setUploadingSuccessOpen(true);
  const handleUploadingSuccessClose = () => setUploadingSuccessOpen(false);

  const uploadComplaintImage = async () => {
    if (complaintImageUpload) {
      const complaintImageRef = ref(
        storage,
        `complaint-image/${complaintImageUpload + v4()} `
      );
      setComplaintImageRef(complaintImageRef);
      try {
        console.log("uploading");
        await uploadBytes(complaintImageRef, complaintImageUpload);
        const url = await getDownloadURL(complaintImageRef);

        return url;
      } catch {}
    }
  };

  const handleSubmitComplaints = async (event) => {
    event.preventDefault();
    const url = await uploadComplaintImage();
    console.log(url);
    onSetForm({
      ...form,
      accountId: account.accountId,
      complaintImg: url,
    });

    setComplaintImageToggle(!complaintImageToggle);
  };

  useEffect(() => {
    const uploadComplaint = async () => {
      if (form.complaintImg !== "") {
        handleUploadingOpen();
        try {
          const res = await complaintService.addComplaints(form);
          if (res.status == 200) {
            onHandleClose();
            setTimeout(handleUploadingClose, 1000);
            setTimeout(handleUploadingSuccessOpen, 1000);
            setTimeout(handleUploadingSuccessClose, 4000);
            //onSetAdsListToggle(!adsListToggle);
            setTimeout(window.location.reload, 5500);
          }
          console.log(res);
        } catch {}
      }
    };
    uploadComplaint();
  }, [complaintImageToggle]);
  return (
    <div>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component="form"
        onSubmit={handleSubmitComplaints}
      >
        <Card sx={style}>
          <Grid container item xs={12} justifyContent="center">
            <CardHeader title="Complaint to the Admin!" />
          </Grid>

          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  label="Leave a message"
                  name="complaintPost"
                  fullWidth
                  value={form.complaintPost}
                  onChange={onHandleChange}
                  inputProps={{
                    style: {
                      height: "80px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography>Upload Image</Typography>
                    <Button>
                      <Grid container item>
                        <input
                          type="file"
                          onChange={(event) => {
                            setComplaintImageUpload(event.target.files[0]);
                          }}
                        />
                      </Grid>
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid container item xs={12} justifyContent="center">
                <Button
                  variant="contained"
                  sx={{ borderRadius: 50, margin: 1 }}
                  type="submit"
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 50, margin: 1 }}
                  onClick={onHandleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
      <UploadingModal open={uploadingOpen} />
      <UploadSuccessModal
        open={uploadingSuccessOpen}
        message="Your complaint is successfully sent"
      />
    </div>
  );
};

export default SendComplainModal;

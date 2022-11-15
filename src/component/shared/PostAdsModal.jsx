import React, { useState } from "react";
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
import { useEffect } from "react";
import * as adsService from "../../service/buyer/AdvertisementService";
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

const PostAdsModal = ({
  open,
  onHandleClose,
  onHandleSubmit,
  form,
  onSetForm,
  onHandleChange,
  id,
  adsListToggle,
  onSetAdsListToggle,
}) => {
  const [postImageUpload, setPostImageUpload] = useState(null);
  const [postImageRef, setPostImageRef] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState("");
  const [postImageToggle, setPostImageToggle] = useState(false);
  const [uploadingOpen, setUploadingOpen] = useState(false);
  const [uploadingSuccessOpen, setUploadingSuccessOpen] = useState(false);

  const uploadPostImage = async () => {
    if (postImageUpload !== null) {
      const postImageRef = ref(
        storage,
        `post-image/${postImageUpload + v4()} `
      );
      setPostImageRef(postImageRef);
      try {
        console.log("uploading");
        await uploadBytes(postImageRef, postImageUpload);
        const url = await getDownloadURL(postImageRef);

        return url;
      } catch {}
    }
  };

  const handleUploadingOpen = () => setUploadingOpen(true);
  const handleUploadingClose = () => setUploadingOpen(false);
  const handleUploadingSuccessOpen = () => setUploadingSuccessOpen(true);
  const handleUploadingSuccessClose = () => setUploadingSuccessOpen(false);

  const handleSubmitPostAds = async (event) => {
    event.preventDefault();
    const url = await uploadPostImage();
    console.log(url);
    onSetForm({
      ...form,
      accountId: id,
      cropImg: url,
    });

    setPostImageToggle(!postImageToggle);
  };
  //-----toggle postImage
  useEffect(() => {
    const uploadPost = async () => {
      if (form.cropImg !== "") {
        handleUploadingOpen();
        try {
          const res = await adsService.addPost(form);
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
    uploadPost();
  }, [postImageToggle]);
  return (
    <div>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component="form"
        onSubmit={handleSubmitPostAds}
      >
        <Card sx={style}>
          <Grid container item xs={12} justifyContent="center">
            <CardHeader title="Post your ads" />
          </Grid>

          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  label="Category"
                  name="cropId"
                  fullWidth
                  value={form.cropId}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="adsDescription"
                  fullWidth
                  value={form.adsDescription}
                  onChange={onHandleChange}
                  inputProps={{
                    style: {
                      height: "80px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Quantity in kilograms"
                  name="cropQuantity"
                  fullWidth
                  value={form.cropQuantity}
                  onChange={onHandleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Budget"
                  name="initialPrice"
                  fullWidth
                  value={form.initialPrice}
                  onChange={onHandleChange}
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
                            setPostImageUpload(event.target.files[0]);
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
      <UploadSuccessModal open={uploadingSuccessOpen} />
    </div>
  );
};

export default PostAdsModal;

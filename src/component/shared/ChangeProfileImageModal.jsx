import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

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

const ChangeProfileImageModal = ({
  open,
  onHandleClose,
  onHandleSubmit,
  onSetImageUpload,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component="form"
        onSubmit={onHandleSubmit}
      >
        <Card sx={style}>
          <Grid container item justifyContent="center">
            <CardHeader title="Upload Profile Image" />
          </Grid>

          <CardContent>
            <Grid container spacing={2}>
              <Grid container item justifyContent="center">
                <Button>
                  <Grid container item>
                    <input
                      type="file"
                      onChange={(event) => {
                        onSetImageUpload(event.target.files[0]);
                      }}
                    />
                  </Grid>
                </Button>
              </Grid>
              <Grid container item justifyContent="center">
                <Button
                  variant="contained"
                  sx={{ borderRadius: 50 }}
                  onClick={onHandleSubmit}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default ChangeProfileImageModal;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import UploadingModal from "../../../shared/UploadingModal";
import UploadSuccessModal from "../../../shared/UploadSuccessModal";
import { CardMedia, Typography, Divider } from "@mui/material";

// import * as accountService from "../../../../service/admin/userService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 750,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const ViewDetailsModal = ({
  open,
  onHandleClose,
  onHandleSubmit,
  onHandleChange,
  id,
  user,
  list,
}) => {
  const [uploadingOpen, setUploadingOpen] = useState(false);
  const [uploadingSuccessOpen, setUploadingSuccessOpen] = useState(false);

  function BoldText({ children }) {
    return <span style={{ fontWeight: "bold" }}>{children}</span>;
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component="form"
      >
        
        <Card sx={style}>
          <Grid container item xs={12} justifyContent="center">
            <CardHeader title="User Details" />
          </Grid>
          <Divider/>
          {user && (
          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Typography>
                  Name: <BoldText>{`${user.firstName} ${user.middleName} ${user.lastName}`}</BoldText>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Gender: <BoldText>{user.gender}</BoldText>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  User Type: <BoldText>{user.role}</BoldText>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Home Address: <BoldText>{`${user.addressLine1} ${user.city} ${user.province} ${user.zipCode} ${user.country}`}</BoldText>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Contact Number: <BoldText>{user.phoneNumber}</BoldText>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Email: <BoldText>{user.email}</BoldText>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CardMedia
                  component="img"
                  height="370"
                  image={user.complianceImg}
                  alt="Compliance Image"
                />
              </Grid>
            </Grid>
          </CardContent>
           )}
        </Card>
      </Modal>

      <UploadingModal open={uploadingOpen} />
      <UploadSuccessModal open={uploadingSuccessOpen} />
    </div>
  );
};

export default ViewDetailsModal;

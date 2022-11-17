import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {
  getAccountById,
  changePW,
  changeProfileImage,
  editAccount,
} from "../../service/shared/accountService";
import { v4 } from "uuid";
import { storage } from "../../service/shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

//----MUI-----------
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import SaveIcon from "@mui/icons-material/Save";
import ChangePWModal from "./ChangePWModal";
import ChangeProfileImageModal from "./ChangeProfileImageModal";
import { toast } from "react-toastify";

const Profile = () => {
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileImageOpen, setProfileImageOpen] = useState(false);
  const [confirmNewPW, setConfirmNewPW] = useState("");
  const [changePWForm, setChangePWForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [profileImgForm, setProfileImgForm] = useState({
    profileImage: "",
  });
  const [proileImgToggle, setProfileImgToggle] = useState(false);

  const [profileImageUpload, setProfileImageUpload] = useState(null);
  const [profileImageRef, setProfileImageRef] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profileImageToggle, setProfileImageToggle] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const getCurrentAccount = async (id) => {
      const res = await getAccountById(id);
      setAccount(res.data);
      setToggle(!toggle);
    };

    getCurrentAccount(decoded.id);
  }, []);

  useEffect(() => {
    console.log(account);
    //setProfileImg(account.profileImg);
    // console.log(profileImg);
  }, [toggle]);

  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  //------For change password----------------------
  const handlePWChange = (event) => {
    setChangePWForm({
      ...changePWForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleConfirmNewPWChange = (event) => {
    setConfirmNewPW(event.target.value);
  };

  const handleChangePWSubmit = async (event) => {
    event.preventDefault();
    console.log(changePWForm);
    console.log(account);
    const res = await changePW(account.accountId, changePWForm);
    console.log(res);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //-------end of change password -------------

  //------------Change profile Image ------------------
  const handleOpenProfileImage = () => setProfileImageOpen(true);
  const handleCloseProfileImage = () => setProfileImageOpen(false);

  const uploadProfileImage = async () => {
    if (profileImageUpload == null) return;
    const profileImageRef = ref(
      storage,
      `profile-image-testing/${profileImageUpload.name + v4()}`
    );
    setProfileImageRef(profileImageRef);
    try {
      console.log("uploading");

      await uploadBytes(profileImageRef, profileImageUpload);
      const url = await getDownloadURL(profileImageRef);

      return url;
    } catch {}
  };

  const handleSubmitProfileImage = async (event) => {
    event.preventDefault();
    console.log("Submitted");
    const url = await uploadProfileImage();
    console.log(typeof url);
    setProfileImgForm({
      profileImage: url,
    });
    setProfileImageToggle(!profileImageToggle);
    console.log(profileImgForm);

    alert("Profile Image Sucessfully Uploaded!");
  };

  //----ProfileImage toggle----
  useEffect(() => {
    console.log(profileImgForm);
    const changeProfileImageFunction = async () => {
      if (profileImgForm.profileImage !== "") {
        const res = await changeProfileImage(account.accountId, profileImgForm);
        console.log(res);
        handleCloseProfileImage();
        window.location.reload();
      }
    };

    changeProfileImageFunction();
  }, [profileImageToggle]);

  //---------end of profileImage---------------

  const handleSubmitEditAccount = async (event) => {
    event.preventDefault();
    const res = await editAccount(account.accountId, account);
    console.log(res);
    setIsEdit(false);
  };

  return (
    <Grid container sx={{ marginLeft: 35, marginTop: 13 }}>
      <Grid item xs={12} sm={12} md={9} lg={9}>
        {account && (
          <Avatar
            alt="Remy Sharp"
            src={account.profileImg}
            sx={{ width: 150, height: 150 }}
          />
        )}

        <Button
          variant="contained"
          sx={{
            borderRadius: 50,
            marginTop: 1,
            marginBottom: 1,
            marginLeft: 3,
            fontSize: 10,
          }}
          startIcon={<PhotoCameraIcon />}
          onClick={handleOpenProfileImage}
        >
          Upload
        </Button>
        {account && (
          <Card>
            <Grid container>
              <Grid item xs={4}>
                {" "}
                <CardHeader
                  title={`${account.firstName} ${account.lastName}`}
                  subheader={`@${account.username}`}
                ></CardHeader>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid container item xs={4} justifyContent="flex-end">
                {" "}
                <CardHeader
                  title={
                    isEdit ? (
                      <Button
                        variant="contained"
                        sx={{ borderRadius: 50, fontSize: 10 }}
                        startIcon={<SaveIcon />}
                        onClick={handleSubmitEditAccount}
                        type="submit"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        sx={{ borderRadius: 50, fontSize: 10 }}
                        onClick={() => setIsEdit(true)}
                      >
                        Edit
                      </Button>
                    )
                  }
                ></CardHeader>
              </Grid>
            </Grid>

            <CardContent>
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{ display: "flex" }}
                >
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={account.firstName}
                    onChange={handleChange}
                    sx={{ margin: 1, width: "30vw" }}
                    disabled={!isEdit}
                  />
                  <TextField
                    label="Middle Name"
                    name="middleName"
                    value={account.middleName}
                    onChange={handleChange}
                    sx={{ margin: 1, width: "30vw" }}
                    disabled={!isEdit}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={account.lastName}
                    onChange={handleChange}
                    sx={{ margin: 1, width: "30vw" }}
                    disabled={!isEdit}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{ display: "flex" }}
                >
                  <TextField
                    label="Gender"
                    name="gender"
                    value={account.gender}
                    onChange={handleChange}
                    sx={{ margin: 1, width: "50vw" }}
                    disabled={!isEdit}
                  />
                  <TextField
                    label="Role"
                    name="role"
                    value={account.role}
                    onChange={handleChange}
                    sx={{ margin: 1, width: "50vw" }}
                    disabled={!isEdit}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{ display: "flex" }}
                >
                  <TextField
                    label="Address"
                    name="addressLine1"
                    value={account.addressLine1}
                    onChange={handleChange}
                    sx={{ margin: 1 }}
                    disabled={!isEdit}
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{ display: "flex" }}
                >
                  <TextField
                    label="City"
                    name="city"
                    value={account.city}
                    onChange={handleChange}
                    sx={{ margin: 1, width: "50vw" }}
                    disabled={!isEdit}
                  />
                  <TextField
                    label="Province"
                    name="province"
                    value={account.province}
                    onChange={handleChange}
                    sx={{ margin: 1, width: "50vw" }}
                    disabled={!isEdit}
                  />
                  <TextField
                    label="Zip Code"
                    name="zipCode"
                    value={account.zipCode}
                    onChange={handleChange}
                    sx={{ margin: 1, width: "50vw" }}
                    disabled={!isEdit}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={account.phoneNumber}
                    onChange={handleChange}
                    sx={{ margin: 1 }}
                    fullWidth
                    disabled={!isEdit}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    label="Email "
                    name="email"
                    value={account.email}
                    onChange={handleChange}
                    sx={{ margin: 1 }}
                    fullWidth
                    disabled={!isEdit}
                  />
                </Grid>
                <Grid container item xs={12} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    startIcon={<LockIcon />}
                    sx={{ borderRadius: 50, marginTop: 10 }}
                    onClick={handleOpen}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Grid>
      <ChangePWModal
        open={open}
        onSetOpen={setOpen}
        onHandleOpen={handleOpen}
        onHandleClose={handleClose}
        onPWChange={handlePWChange}
        onConfirmNewPWChange={handleConfirmNewPWChange}
        onHandleSubmit={handleChangePWSubmit}
        form={changePWForm}
        confirmPWForm={confirmNewPW}
      />
      <ChangeProfileImageModal
        open={profileImageOpen}
        onHandleClose={handleCloseProfileImage}
        onHandleSubmit={handleSubmitProfileImage}
        onSetImageUpload={setProfileImageUpload}
      />
    </Grid>
  );
};

export default Profile;

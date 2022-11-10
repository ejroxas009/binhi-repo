import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getAccountById } from "../../service/shared/accountService";

//----MUI-----------
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import SaveIcon from "@mui/icons-material/Save";
const Profile = () => {
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
  }, [toggle]);

  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSave = () => {
    setIsEdit(false);
  };

  return (
    <Grid container sx={{ marginLeft: 10, marginTop: 10 }}>
      <Grid item xs={12} sm={12} md={9} lg={9}>
        <Avatar alt="Remy Sharp" src="" sx={{ width: 150, height: 150 }} />
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
                        onClick={handleSave}
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
                    sx={{ margin: 1, width: "30vw" }}
                    disabled={!isEdit}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={account.lastName}
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
                    sx={{ margin: 1, width: "50vw" }}
                    disabled={!isEdit}
                  />
                  <TextField
                    label="Role"
                    name="role"
                    value={account.role}
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
                    sx={{ margin: 1, width: "50vw" }}
                    disabled={!isEdit}
                  />
                  <TextField
                    label="Province"
                    name="province"
                    value={account.province}
                    sx={{ margin: 1, width: "50vw" }}
                    disabled={!isEdit}
                  />
                  <TextField
                    label="Zip Code"
                    name="zipCode"
                    value={account.zipCode}
                    sx={{ margin: 1, width: "50vw" }}
                    disabled={!isEdit}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={account.phoneNumber}
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
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

export default Profile;

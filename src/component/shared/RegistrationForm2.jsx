import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

const RegistrationForm2 = ({
  onHandleChange,
  accountForm,
  onSetAccountForm,
}) => {
  const { firstName, middleName, lastName, gender, email, phoneNumber } =
    accountForm;
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6} sm={6}>
          <Card>
            <CardHeader title="User Details" />
            <CardContent>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    onChange={onHandleChange}
                    value={firstName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Middle Name"
                    name="middleName"
                    onChange={onHandleChange}
                    value={middleName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    onChange={onHandleChange}
                    value={lastName}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Gender"
                    name="gender"
                    onChange={onHandleChange}
                    value={gender}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Email"
                    name="email"
                    onChange={onHandleChange}
                    value={email}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    onChange={onHandleChange}
                    value={phoneNumber}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationForm2;

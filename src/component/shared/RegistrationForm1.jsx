import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

const RegistrationForm1 = ({
  onHandleChange,
  accountForm,
  onSetAccountForm,
}) => {
  const { role, username, password } = accountForm;
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6} sm={6}>
          <Card>
            <CardHeader title="User Credentials" />
            <CardContent>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="User Type"
                    name="role"
                    onChange={onHandleChange}
                    value={role}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Username"
                    name="username"
                    onChange={onHandleChange}
                    value={username}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Password"
                    name="password"
                    onChange={onHandleChange}
                    value={password}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField label="Repeat Password" fullWidth />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationForm1;

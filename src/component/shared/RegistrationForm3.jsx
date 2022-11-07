import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

const RegistrationForm3 = ({
  onHandleChange,
  accountForm,
  onSetAccountForm,
}) => {
  const {
    addressLine1,
    addressLine2,
    city,
    province,
    zipCode,
    country,
    complianceImg,
  } = accountForm;
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
                    label="Address 1"
                    name="addressLine1"
                    onChange={onHandleChange}
                    value={addressLine1}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="City"
                    name="city"
                    onChange={onHandleChange}
                    value={city}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Province"
                    name="province"
                    onChange={onHandleChange}
                    value={province}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Zip Code"
                    name="zipCode"
                    onChange={onHandleChange}
                    value={zipCode}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Country"
                    name="country"
                    onChange={onHandleChange}
                    value={country}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Valid Government ID"
                    name="complianceImg"
                    onChange={onHandleChange}
                    value={complianceImg}
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

export default RegistrationForm3;

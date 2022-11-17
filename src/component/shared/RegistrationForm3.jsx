import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MultiStepper from "./MultiStepper";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const RegistrationForm3 = ({
  onHandleChange,
  accountForm,
  onSetAccountForm,
  onSetImageUpload,
  step,
  steps,
  handlePrev,
  handleNext,
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
            <CardHeader title="Address and Valid ID" />
            <CardContent>
              <Grid container spacing={2} justifyContent="center">
                <Grid
                  item
                  xs={12}
                  md={12}
                  sm={12}
                  lg={12}
                  sx={{ marginBottom: 1 }}
                >
                  <MultiStepper step={step} steps={steps} />
                </Grid>
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
                {/* <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Valid Government ID"
                    name="complianceImg"
                    onChange={onHandleChange}
                    value={complianceImg}
                    fullWidth
                  />
                </Grid> */}
                <Grid item xs={12} md={12} sm={12}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid
                          container
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          justifyContent="center"
                        >
                          <Typography>Government Valid ID</Typography>
                        </Grid>
                        <Grid
                          container
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          justifyContent="center"
                        >
                          <Button
                            variant="contained"
                            component="label"
                            startIcon={<PhotoCameraIcon />}
                            sx={{ borderRadius: 50 }}
                          >
                            Upload File
                            <input
                              type="file"
                              hidden
                              onChange={(event) => {
                                onSetImageUpload(event.target.files[0]);
                              }}
                            />
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="center"
                style={{ marginTop: "20px" }}
              >
                <Button
                  type="button"
                  onClick={handlePrev}
                  variant="contained"
                  sx={{ borderRadius: 50 }}
                  startIcon={<ArrowBackIosNewIcon />}
                >
                  Previous
                </Button>
                {step === steps.length - 1 && (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: 50,
                      width: "130px",
                      maxWidth: "150px",
                      minWidth: "130px",
                      marginLeft: 2,
                    }}
                    endIcon={<ArrowForwardIosIcon />}
                  >
                    Submit
                  </Button>
                )}
                {step !== steps.length - 1 && (
                  <Button
                    type="button"
                    onClick={handleNext}
                    variant="contained"
                    sx={{
                      borderRadius: 50,
                      width: "130px",
                      maxWidth: "150px",
                      minWidth: "130px",
                      marginLeft: 2,
                    }}
                    endIcon={<ArrowForwardIosIcon />}
                  >
                    Next
                  </Button>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationForm3;

import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import RadioButton from "./RadioButton";
import MultiStepper from "./MultiStepper";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const RegistrationForm2 = ({
  onHandleChange,
  accountForm,
  onSetAccountForm,
  step,
  steps,
  handlePrev,
  handleNext,
}) => {
  const { firstName, middleName, lastName, gender, email, phoneNumber } =
    accountForm;
  const genderList = [
    {
      genderId: 1,
      gender: "Male",
    },
    {
      genderId: 2,
      gender: "Female",
    },
  ];
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6} sm={6}>
          <Card>
            <CardHeader title="User Details" />
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
                  <Card>
                    <CardContent>
                      {/* <TextField
                    label="Gender"
                    name="gender"
                    onChange={onHandleChange}
                    value={gender}
                    fullWidth
                  /> */}
                      <RadioButton
                        label="Gender"
                        onHandleChange={onHandleChange}
                        list={genderList}
                        value={gender}
                        name="gender"
                      />
                    </CardContent>
                  </Card>
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

export default RegistrationForm2;

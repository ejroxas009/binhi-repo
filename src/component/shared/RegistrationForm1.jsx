import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Selection from "./Selection";
import MultiStepper from "./MultiStepper";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const RegistrationForm1 = ({
  onHandleChange,
  accountForm,
  onSetAccountForm,
  step,
  steps,
  handlePrev,
  handleNext,
}) => {
  const { role, username, password } = accountForm;
  const roleList = [
    {
      roleId: 1,
      role: "Farmer",
    },
    {
      roleId: 2,
      role: "Wholesaler",
    },
  ];
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6} sm={6} lg={6}>
          <Card>
            <CardHeader title="User Credentials" />
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
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <Card>
                    <CardContent>
                      <Selection
                        label="User Type"
                        list={roleList}
                        onHandleChange={onHandleChange}
                        value={role}
                        name="role"
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <TextField
                    label="Username"
                    name="username"
                    onChange={onHandleChange}
                    value={username}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <TextField
                    label="Password"
                    name="password"
                    onChange={onHandleChange}
                    value={password}
                    fullWidth
                    type="password"
                  />
                </Grid>

                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <TextField
                    label="Repeat Password"
                    fullWidth
                    type="password"
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

export default RegistrationForm1;

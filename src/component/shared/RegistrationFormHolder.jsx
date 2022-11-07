import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MultiStepper from "./MultiStepper";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

import RegistrationForm1 from "./RegistrationForm1";
import RegistrationForm2 from "./RegistrationForm2";
import RegistrationForm3 from "./RegistrationForm3";
import * as accountService from "../../service/shared/accountService";

const RegistrationFormHolder = () => {
  const [accountForm, setAccountForm] = useState({
    role: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
    profileImg: "",
    complianceImg: "",
    email: "",
    username: "",
    password: "",
  });

  const [step, setStep] = useState(0);

  const steps = ["User Credentials", "Personal Details", "Address"];

  const handleNext = () => {
    if (step !== steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleChange = (event) => {
    setAccountForm({
      ...accountForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(accountForm);
    accountService.addAccount(accountForm).then((data) => console.log(data));
    //accountService.createAccount(accountForm).then((res) => console.log(res));
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid container>
          <MultiStepper step={step} steps={steps} />
        </Grid>

        <Grid container>
          {step == 0 && (
            <RegistrationForm1
              onHandleChange={handleChange}
              accountForm={accountForm}
              onSetAccountForm={setAccountForm}
            />
          )}

          {step == 1 && (
            <RegistrationForm2
              onHandleChange={handleChange}
              accountForm={accountForm}
              onSetAccountForm={setAccountForm}
            />
          )}

          {step == 2 && (
            <RegistrationForm3
              onHandleChange={handleChange}
              accountForm={accountForm}
              onSetAccountForm={setAccountForm}
            />
          )}
        </Grid>
        <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
          <Button type="button" onClick={handlePrev}>
            Previous
          </Button>
          {step === steps.length - 1 && <Button type="submit">Submit</Button>}
          {step !== steps.length - 1 && (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationFormHolder;

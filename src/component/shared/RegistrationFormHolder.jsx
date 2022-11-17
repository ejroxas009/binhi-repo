import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MultiStepper from "./MultiStepper";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { storage } from "../../service/shared/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

import RegistrationForm1 from "./RegistrationForm1";
import RegistrationForm2 from "./RegistrationForm2";
import RegistrationForm3 from "./RegistrationForm3";
import * as accountService from "../../service/shared/accountService";
import Appbar from "../../component/shared/appbar/Appbar";

const RegistrationFormHolder = () => {
  let temp;
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

  const [imageUpload, setImageUpload] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [toggle, setToggle] = useState(false);

  const [step, setStep] = useState(0);

  const steps = ["User Credentials", "Personal Details", "Address"];

  useEffect(() => {
    console.log(imageUrl);

    console.log(accountForm);
    if (accountForm.complianceImg !== "") {
      accountService.addAccount(accountForm).then((data) => {
        console.log(data);
        setAccountForm({
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
      });
    }
  }, [toggle]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(accountForm);
    if (imageUpload !== null) {
      const imageRef = ref(storage, `testing/${imageUpload.name}`);
      setImageRef(imageRef);

      const uploadImage = uploadBytesResumable(imageRef, imageUpload);
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(ref(storage, `testing/${imageUpload.name}`)).then(
            (url) => {
              setAccountForm({ ...accountForm, complianceImg: url });
              setToggle(!toggle); // this is to trigger the useEffect
            }
          );
        }
      );
    }
  };

  return (
    <>
      <Appbar />
      <Grid
        container
        justifyContent="center"
        component="form"
        onSubmit={handleSubmit}
      >
        {/* <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6} sm={6} lg={6}>
            <Card>
              <CardContent>
                <MultiStepper step={step} steps={steps} />
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        <Grid container sx={{ marginTop: 15 }}>
          {step == 0 && (
            <RegistrationForm1
              onHandleChange={handleChange}
              accountForm={accountForm}
              onSetAccountForm={setAccountForm}
              step={step}
              steps={steps}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          )}

          {step == 1 && (
            <RegistrationForm2
              onHandleChange={handleChange}
              accountForm={accountForm}
              onSetAccountForm={setAccountForm}
              step={step}
              steps={steps}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          )}

          {step == 2 && (
            <RegistrationForm3
              onHandleChange={handleChange}
              accountForm={accountForm}
              onSetAccountForm={setAccountForm}
              onSetImageUpload={setImageUpload}
              step={step}
              steps={steps}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          )}
        </Grid>
        {/* <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
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
        </Grid> */}
      </Grid>
    </>
  );
};

export default RegistrationFormHolder;

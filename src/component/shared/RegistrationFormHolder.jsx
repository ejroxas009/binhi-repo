import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MultiStepper from "./MultiStepper";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { storage } from "../../service/shared/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

import RegistrationForm1 from "./RegistrationForm1";
import RegistrationForm2 from "./RegistrationForm2";
import RegistrationForm3 from "./RegistrationForm3";
import * as accountService from "../../service/shared/accountService";

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
  const [image, setImage] = useState(null);
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
      <Grid
        container
        justifyContent="center"
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid container>
          {/* <MultiStepper step={step} steps={steps} /> */}
          {role == "admin" && <MultiStepper step={step} steps={steps} />}
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
              onSetImageUpload={setImageUpload}
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

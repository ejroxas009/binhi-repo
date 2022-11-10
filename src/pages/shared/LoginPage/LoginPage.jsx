import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";

import Joi from "joi";
import Swal from "sweetalert2";

//toast
import { toast } from "react-toastify";

//service

import * as accountService from "../../../service/shared/accountService";

export function LoginPage({ onSetAccessToken }) {
  // const [accessToken, setAccessToken] = React.useState(
  //   accountService.getAccessToken()
  // );

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });

    const { error } = schema
      .extract(e.currentTarget.name)
      .label(e.currentTarget.name)
      .validate(e.currentTarget.value);
    if (error) {
      setErrors({
        ...errors,
        [e.currentTarget.name]: error.details[0].message,
      });
    } else {
      delete errors[e.currentTarget.name];
      setErrors(errors);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await accountService.login(form);
      localStorage.setItem("accessToken", res.data.access_token);
      onSetAccessToken(res.data.access_token);
      // window.location.reload();
      console.log(res.data);
      navigate("/");
    } catch (error) {
      toast.error("Username or Password is incorrect. Please try again.");
      console.log(error);
    }
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);
    return !!result.error;
  };

  return (
    <Grid
      container
      justifyContent="center"
      component="form"
      marginTop={4}
      onSubmit={handleSubmit}
    >
      <Grid item xs={10} sm={10} md={6} lg={4} xl={4} mt={15}>
        <Card>
          <CardHeader title="LOGIN" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  error={!!errors.username}
                  helperText={errors.username}
                  value={form.username}
                  onChange={handleChange}
                  label="Username"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isFormInvalid()}
            >
              Login
            </Button>
          </CardActions>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            mb={1}
          >
            <Grid item xs={12}>
              <FormLabel>Don't have an account? </FormLabel>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  Swal.fire("Registration currently under maintenance");
                }}
              >
                Register Here
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

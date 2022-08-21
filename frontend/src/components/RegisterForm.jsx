import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, LinearProgress } from "@mui/material";
import { TextField } from "formik-mui";
import { useStoreActions } from "easy-peasy";


const RegisterForm = ({ onSubmitForm }) => {
  const setError = useStoreActions(state => state.error.setError)


return (
  <Formik
    initialValues={{
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      verify: ""
    }}
    validate={(values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = "Required";
      }
      if (!values.lastName) {
        errors.lastName = "Required";
      }
      if (!values.lastName) {
        errors.email = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (!values.verify) {
        errors.password2 = "Required";
      }
      if (!values.verify === values.password) {
        errors.password2 = "Passwords do not match";
      }

      return errors;
    }}
    onSubmit={async (values, { setSubmitting }) => {
      await onSubmitForm(values)
      setSubmitting(false);
    }}
  >
    {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (
      <Form>
        <Box margin={1}>
          <Field
            sx={{ maxWidth: "400px" }}
            component={TextField}
            name="firstName"
            type="emailtext"
            label="First Name"
            helperText=""
          />
        </Box>
        <Box margin={1}>
          <Field
            sx={{ maxWidth: "400px" }}
            component={TextField}
            name="lastName"
            type="emailtext"
            label="Last Name"
            helperText=""
          />
        </Box>

        <Box margin={1}>
          <Field
            sx={{ maxWidth: "400px" }}
            component={TextField}
            name="email"
            type="email"
            label="Email"
            helperText=""
          />
        </Box>
        <Box margin={1}>
          <Field
            sx={{ maxWidth: "400px" }}
            component={TextField}
            type="password"
            label="Password"
            name="password"
            helperText=""
          />
        </Box>
        <Box margin={1}>
          <Field
            sx={{ maxWidth: "400px" }}
            component={TextField}
            type="password"
            label="Verify Password"
            name="verify"
            helperText=""
          />
        </Box>

        {isSubmitting && <LinearProgress />}

        <Box margin={2}>
          <Button
            sx={{ margin: 1 }}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
          >
            Sign Up
          </Button>
          <Button
            sx={{ margin: 1 }}
            variant="outlined"
            color="primary"
            disabled={isSubmitting}
            onClick={() => {
              setError('')
              resetForm();
            }}
          >
            Reset
          </Button>
        </Box>
      </Form>
    )}
  </Formik >
)}

export default RegisterForm;

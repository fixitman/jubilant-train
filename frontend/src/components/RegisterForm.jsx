import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, LinearProgress } from "@mui/material";
import { TextField } from "formik-mui";


const RegisterForm = ({ onSubmitForm }) => (
  <Formik
    initialValues={{
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: ""
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
      if (!values.password2) {
        errors.password2 = "Required";
      }
      if (!values.password2 === values.password) {
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
          sx={{ width: "400px" }}
          component={TextField}
          name="firstName"
          type="emailtext"
          label="First Name"
          helperText=""          
        />
      </Box>
      <Box margin={1}>
        <Field
          sx={{ width: "400px" }}
          component={TextField}
          name="lastName"
          type="emailtext"
          label="Last Name"
          helperText=""          
        />
      </Box>
      
      <Box margin={1}>
        <Field
          sx={{ width: "400px" }}
          component={TextField}
          name="email"
          type="email"
          label="Email"
          helperText=""          
        />
      </Box>
      <Box margin={1}>
        <Field
          sx={{ width: "400px" }}
          component={TextField}
          type="password"
          label="Password"
          name="password"
          helperText=""          
        />
      </Box>
      <Box margin={1}>
        <Field
          sx={{ width: "400px" }}
          component={TextField}
          type="password"
          label="Verify Password"
          name="password2"
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
          onClick={submitForm}
        >
          Login
        </Button>
        <Button
          sx={{ margin: 1 }}
          variant="contained"
          color="secondary"
          disabled={isSubmitting}
          onClick={() => {
            resetForm();
          }}
        >
          Reset
        </Button>
      </Box>
    </Form>
  )}
  </Formik >
);

export default RegisterForm;
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, LinearProgress } from "@mui/material";
import { TextField } from "formik-mui";
import { EmailOutlined, Lock } from "@mui/icons-material";

const LoginForm = ({ onSubmitForm }) => (
  <Formik
    initialValues={{
      email: "",
      password: ""
    }}
    validate={(values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
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
          name="email"
          type="email"
          label="Email"
          helperText=""
          InputProps={{
            startAdornment: <EmailOutlined />
          }}
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
          InputProps={{
            startAdornment: <Lock />
          }}
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

export default LoginForm;

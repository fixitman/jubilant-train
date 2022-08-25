import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, LinearProgress } from "@mui/material";
import { TextField } from "formik-mui";
import { EmailOutlined, Lock } from "@mui/icons-material";
import { useStoreActions } from "easy-peasy";


const LoginForm = ({ onSubmitForm }) => {
  const setError = useStoreActions(state => state.error.setError)
 

  return (
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
          <Box margin={2} >
            <Field
              sx={{ width: "100%" }}
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
          <Box margin={2} >
            <Field
              sx={{ width: "100%", mt: 2 }}
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

          <Box margin={2} mt={4}>
            <Button
              //sx={{ margin: 1 }}
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              type="submit"
            >
              Login
            </Button>
            <Button
              sx={{ ml: 2 }}
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
  )
};

export default LoginForm;

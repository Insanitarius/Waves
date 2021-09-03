import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../../utils/loader";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { errorHelper } from "../../utils/tools";
import { userRegister, userSignIn } from "../../store/actions/user.actions";

const AuthForm = (props) => {
  const notifications = useSelector((state) => state.notifications);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry the email is required")
        .email("Invalid email"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    if (props.formType) {
      dispatch(userRegister(values));
    } else {
      dispatch(userSignIn(values));
    }
  };

  useEffect(() => {
    setLoading(false);
    if (notifications && notifications.success) {
      props.history.push("/dashboard");
    }
  }, [notifications, props.history]);

  return (
    <>
      <div className="auth_container">
        {loading ? (
          <Loader />
        ) : (
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="email"
                label="Enter your email"
                variant="outlined"
                {...formik.getFieldProps("email")}
                {...errorHelper(formik, "email")}
              />
            </div>
            <div className="form-group mt-3 mb-2">
              <TextField
                style={{ width: "100%" }}
                name="password"
                label="Enter your password"
                variant="outlined"
                type="password"
                {...formik.getFieldProps("password")}
                {...errorHelper(formik, "password")}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="medium"
            >
              {props.formType ? "Register" : "Login"}
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default AuthForm;

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../../../utils/tools";

import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { updateSiteVars } from "../../../../store/actions/site.actions";

function SiteVars() {
  const site = useSelector((state) => state.site);
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: site.vars.address,
      hours: site.vars.hours,
      email: site.vars.email,
      phone: site.vars.phone,
    },
    validationSchema: Yup.object({
      address: Yup.string()
        .min(5, "Address should be at least 5 characters long ")
        .max(100, "Character limit for address is 100")
        .required("Store address is required"),
      hours: Yup.string().required("Working hours is required"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Contact email is required"),
      phone: Yup.string()
        .max(15, "Max 15 digit phone number is allowed")
        .required("Contact number is required"),
    }),
    onSubmit: (values) => {
      dispatch(
        updateSiteVars({
          _id: site.vars._id,
          ...values,
        })
      );
    },
  });
  return (
    <>
      <form className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="address"
            label="Enter the store address"
            variant="outlined"
            {...formik.getFieldProps("address")}
            {...errorHelper(formik, "address")}
          />
        </div>
        <div className="form-group mt-4">
          <TextField
            style={{ width: "100%" }}
            name="phone"
            label="Enter the store phone number"
            variant="outlined"
            {...formik.getFieldProps("phone")}
            {...errorHelper(formik, "phone")}
          />
        </div>
        <div className="form-group mt-4">
          <TextField
            style={{ width: "100%" }}
            name="hours"
            label="Enter the working hours"
            variant="outlined"
            {...formik.getFieldProps("hours")}
            {...errorHelper(formik, "hours")}
          />
        </div>
        <div className="form-group mt-4">
          <TextField
            style={{ width: "100%" }}
            name="email"
            label="Enter the contact email"
            variant="outlined"
            {...formik.getFieldProps("email")}
            {...errorHelper(formik, "email")}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mt-3"
        >
          Update Site
        </Button>
      </form>
    </>
  );
}

export default SiteVars;

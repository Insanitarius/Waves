import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../utils/tools";

import { TextField } from "@material-ui/core";

const SearchBar = (props) => {
  const formik = useFormik({
    initialValues: { keywords: "" },
    validationSchema: Yup.object({
      keywords: Yup.string()
        .min(3, "Please enter at least 3 characters")
        .max(200, "200 characters limit exceeded"),
    }),
    onSubmit: (values, { resetForm }) => {
      props.handleKeywords(values.keywords.trim())
      resetForm();
    },
  });
  return (
    <div className="container">
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <TextField
          style={{ width: "100%" }}
          name="keywords"
          label="Enter your search"
          variant="outlined"
          {...formik.getFieldProps("keywords")}
          {...errorHelper(formik, "keywords")}
        />
      </form>
    </div>
  );
}

export default SearchBar;

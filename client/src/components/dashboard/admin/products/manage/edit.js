import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import {
  updateProduct,
  productById,
} from "../../../../../store/actions/product.actions";
import { clearProductById } from "../../../../../store/actions";
import { getAllBrands } from "../../../../../store/actions/brands.actions";
import DashboardLayout from "../../../../../hoc/dashboardLayout";
import { errorHelper } from "../../../../../utils/tools";
import Loader from "../../../../../utils/loader";
import { validation, formValues, getValuesToEdit } from "./formValues";
import UploadImage from "./uploadImage";
import ImageViewer from "./imageViewer";

import {
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

const EditProduct = (props) => {
  const [values, setValues] = useState(formValues);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const notifications = useSelector((state) => state.notifications);
  const brands = useSelector((state) => state.brands);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: validation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(updateProduct(values, props.match.params.id));
  };

  const handleImageUrl = (image) => {
    const imageArray = formik.values.images;
    imageArray.push(image.url);
    formik.setFieldValue("images", imageArray);
  };

  const deleteImage = (index) => {
    const imageArray = formik.values.images;
    imageArray.splice(index, 1);
    formik.setFieldValue("images", imageArray);
  };

  useEffect(() => {
    if (notifications && (notifications.success || notifications.error)) {
      setLoading(false);
    }
  }, [notifications]);

  useEffect(() => {
    const param = props.match.params.id;
    dispatch(getAllBrands());
    setLoading(true);
    if (param) {
      dispatch(productById(param));
    }
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if (products && products.byId) {
      setValues(getValuesToEdit(products.byId));
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    return () => {
      dispatch(clearProductById());
    };
  }, [dispatch]);

  return (
    <DashboardLayout title="Edit Product">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ImageViewer
            formik={formik}
            deleteImage={(index) => deleteImage(index)}
          />
          <UploadImage imageUrl={(image) => handleImageUrl(image)} />
          <Divider className="mt-3 mb-3" />
          <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
            <div className="form-group mt-2">
              <TextField
                style={{ width: "100%" }}
                name="model"
                label="Enter a model"
                variant="outlined"
                {...formik.getFieldProps("model")}
                {...errorHelper(formik, "model")}
              />
            </div>

            <div className="form-group mt-3">
              <TextField
                style={{ width: "100%" }}
                name="frets"
                type="number"
                label="Enter the amount of frets"
                variant="outlined"
                {...formik.getFieldProps("frets")}
                {...errorHelper(formik, "frets")}
              />
            </div>

            <div className="form-group mt-3">
              <TextField
                style={{ width: "100%" }}
                name="woodtype"
                label="Enter the woodtype"
                variant="outlined"
                {...formik.getFieldProps("woodtype")}
                {...errorHelper(formik, "woodtype")}
              />
            </div>

            <div className="form-group mt-3">
              <FormControl variant="outlined">
                <h5>Select a brand</h5>
                <Select
                  name="brand"
                  {...formik.getFieldProps("brand")}
                  error={
                    formik.errors.brand && formik.touched.brand ? true : false
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {brands && brands.all
                    ? brands.all.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {formik.errors.brand && formik.touched.brand ? (
                  <FormHelperText error={true}>
                    {formik.errors.brand}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>

            <div className="form-group mt-3">
              <TextField
                style={{ width: "100%" }}
                name="description"
                label="Enter a description"
                variant="outlined"
                {...formik.getFieldProps("description")}
                {...errorHelper(formik, "description")}
                multiline
                rows={4}
              />
            </div>

            <div className="form-group mt-3">
              <TextField
                style={{ width: "100%" }}
                name="price"
                type="number"
                label="Enter the price"
                variant="outlined"
                {...formik.getFieldProps("price")}
                {...errorHelper(formik, "price")}
              />
            </div>

            <Divider className="mt-3 mb-3" />
            <div className="form-group mt-3">
              <TextField
                style={{ width: "100%" }}
                name="available"
                type="number"
                label="How many are there in stock?"
                variant="outlined"
                {...formik.getFieldProps("available")}
                {...errorHelper(formik, "available")}
              />
            </div>

            <Divider className="mt-3 mb-3" />

            <div className="form-group mt-3">
              <FormControl variant="outlined">
                <h5>Do we offer free shipping?</h5>
                <Select
                  name="shipping"
                  {...formik.getFieldProps("shipping")}
                  error={
                    formik.errors.shipping && formik.touched.shipping
                      ? true
                      : false
                  }
                >
                  <MenuItem value={true}> Yes</MenuItem>
                  <MenuItem value={false}> Nope</MenuItem>
                </Select>
                {formik.errors.shipping && formik.touched.shipping ? (
                  <FormHelperText error={true}>
                    {formik.errors.shipping}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
            <Divider className="mt-3 mb-3" />

            <Button variant="contained" color="primary" type="submit">
              Edit product
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default EditProduct;

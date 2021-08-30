import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../../hoc/dashboardLayout";
import {
  productsByPaginate,
  removeProduct,
} from "../../../../store/actions/product.actions";
import ProductsTable from "./productsTable";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../../../utils/tools";
import { TextField, Grid, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CachedIcon from "@material-ui/icons/Cached";
import CircularProgress from "@material-ui/core/CircularProgress";

const defaultValues = {
  keywords: "",
  brand: [],
  min: 0,
  max: 5000,
  frets: [],
  page: 1,
};

const AdminProducts = (props) => {
  const [removeModal, setRemoveModal] = useState(false);
  const [resetIcon, setResetIcon] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [itemToRemoveName, setItemToRemoveName] = useState("");
  const products = useSelector((state) => state.products);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [searchValues, setSearchValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );
  const formik = useFormik({
    initialValues: { keywords: "" },
    validationSchema: Yup.object({
      keywords: Yup.string()
        // .required("Please enter something")
        .min(3, "Min 3 characters required to search")
        .max(20, "Your search is too long"),
    }),
    onSubmit: (values) => {
      setSearchValues({ keywords: values.keywords.trim(), page: 1 });
    },
  });

  const goToPage = (page) => {
    setSearchValues({ page: page });
  };

  const goToEdit = (id) => {
    props.history.push(`/dashboard/admin/edit_product/${id}`);
  };

  const handleClose = () => {
    setRemoveModal(false);
    setItemToRemove(null);
    setItemToRemoveName("");
  };

  const handleItemToRemove = (id, model) => {
    setItemToRemove(id);
    setItemToRemoveName(model);
    setRemoveModal(true);
  };

  const handleRemove = () => {
    dispatch(removeProduct(itemToRemove));
  };

  const resetSearch = () => {
    setSearchValues(defaultValues);
    formik.resetForm();
  };

  useEffect(() => {
    dispatch(productsByPaginate(searchValues));
  }, [dispatch, searchValues]);

  useEffect(() => {
    handleClose();
    if (notifications && notifications.success) {
      dispatch(productsByPaginate(searchValues));
    }
  }, [dispatch, notifications, searchValues]);

  return (
    <DashboardLayout title="Products">
      <div className="products_table">
        <div className="mt-3">
          <form onSubmit={formik.handleSubmit}>
            <div style={{ alignItems: "center" }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                style={{ minHeight: "5vh" }}
              >
                <Grid item xs={7}>
                  <TextField
                    style={{ width: "100%" }}
                    name="keywords"
                    label="Enter your search"
                    variant="outlined"
                    {...formik.getFieldProps("keywords")}
                    {...errorHelper(formik, "keywords")}
                  />
                </Grid>
                <Grid item xs>
                  {resetIcon ? (
                    <CircularProgress
                      className="mb-2"
                      size="40px"
                      color="secondary"
                      style={{
                        marginLeft: "5px",
                      }}
                    />
                  ) : (
                    <CachedIcon
                      className="mb-2"
                      style={{
                        marginLeft: "5px",
                        cursor: "pointer",
                        fontSize: "40px",
                      }}
                      color="secondary"
                      onClick={() => {
                        setResetIcon(true);
                        resetSearch();
                        setTimeout(() => {
                          setResetIcon(false);
                        }, 500);
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={3} justifyContent="center">
                  <LinkContainer to="/dashboard/admin/add_product">
                    <Button
                      className="mb-2"
                      variant="contained"
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      Add Product
                    </Button>
                  </LinkContainer>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
        <hr />
        <ProductsTable
          prods={products.byPaginate}
          prev={(prev) => goToPage(prev)}
          next={(next) => goToPage(next)}
          edit={(id) => goToEdit(id)}
          removeModal={removeModal}
          handleClose={() => handleClose()}
          handleItemToRemove={(id, model) => handleItemToRemove(id, model)}
          modelToBeRemoved={itemToRemoveName}
          handleRemove={() => handleRemove()}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminProducts;

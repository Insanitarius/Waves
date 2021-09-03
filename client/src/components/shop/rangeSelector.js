import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../utils/tools";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";

function RangeSelector(props) {
  const [open, setOpen] = useState(props.initState);
  const formik = useFormik({
    initialValues: { min: 0, max: 5000 },
    validationSchema: Yup.object({
      min: Yup.number().min(0, "The mininum is 0"),
      max: Yup.number().max(5000, "The mininum is 10000"),
    }),
    onSubmit: (values) => {
      props.handleRange([values.min, values.max]);
    },
  });

  const handleCollapseOpen = () => setOpen(!open);

  return (
    <div className="collapse_items_wrapper">
      <List>
        <ListItem onClick={handleCollapseOpen}>
          <ListItemText primary={props.title} className="collapse_title" />
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  name="min"
                  type="number"
                  label="Enter minimum price"
                  variant="outlined"
                  onWheel={(e) => e.target.blur()}
                  {...formik.getFieldProps("min")}
                  {...errorHelper(formik, "min")}
                />
              </div>
              <div className="mt-3">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  name="max"
                  type="number"
                  label="Enter maximum price"
                  variant="outlined"
                  onWheel={(e) => e.target.blur()}
                  {...formik.getFieldProps("max")}
                  {...errorHelper(formik, "max")}
                />
              </div>
              <Button
                type="submit"
                className="mt-2"
                variant="outlined"
                color="secondary"
                size="small"
              >
                Search
              </Button>
            </form>
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default RangeSelector;

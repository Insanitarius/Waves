import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getTokenCookie } from "../../../../../utils/tools";
import Loader from "../../../../../utils/loader";

const UploadImage = ({ imageUrl }) => {
  const [loading, setLoading] = useState(false);
  const formikImg = useFormik({
    initialValues: { pic: "" },
    validationSchema: Yup.object({
      pic: Yup.mixed().required("An image is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", values.pic);

      axios
        .post(`/api/products/upload`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${getTokenCookie()}`,
          },
        })
        .then((response) => {
          //get the response
          imageUrl(response.data);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Form onSubmit={formikImg.handleSubmit}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  type="file"
                  onChange={(event) => {
                    formikImg.setFieldValue("pic", event.target.files[0]);
                  }}
                />
                <Button type="submit" variant="secondary" size="sm">
                  <AddPhotoAlternateIcon
                    style={{
                      fontSize: "24px",
                      marginBottom: "4px",
                      marginRight: "2px",
                    }}
                  />
                  Add Image
                </Button>
              </InputGroup>
              {formikImg.errors.pic && formikImg.touched.pic ? (
                <p
                  className="mt-2"
                  style={{
                    marginLeft: "12px",
                    fontSize: "15px",
                    color: "red",
                    fontWeight: "lighter",
                    fontFamily: "Roboto",
                  }}
                >
                  {formikImg.errors.pic}
                </p>
              ) : null}
            </Form.Group>
          </Form>
        </div>
      )}
    </>
  );
};

export default UploadImage;

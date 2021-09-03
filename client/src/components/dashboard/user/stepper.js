import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { errorHelper } from "../../../utils/tools";
import Loader from "../../../utils/loader";

import { Modal } from "react-bootstrap";
import { TextField, Button, Stepper, Step, StepLabel } from "@material-ui/core";
import { userChangeEmail } from "../../../store/actions/user.actions";

const EmailStepper = ({ users }) => {
  const [loading, setLoading] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Enter old email", "Enter new email", "Are you sure ?"];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { email: "", newemail: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("This is required")
        .email("This is not a valid email")
        .test("match", "Please verify your old email", (email) => {
          return email === users.data.email;
        }),
      newemail: Yup.string()
        .required("This is required")
        .email("This is not a valid email")
        .test("match", "Please enter a new email", (newemail) => {
          return newemail !== users.data.email;
        }),
    }),
    onSubmit: (values) => {
      setLoading(true);
      dispatch(userChangeEmail(values));
    },
  });

  const closeModal = () => setEmailModal(false);
  const openModal = () => setEmailModal(true);

  const handleNext = () => {
    setActiveStep((prevActiveState) => prevActiveState + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveState) => prevActiveState - 1);
  };

  const nextBtn = () => (
    <Button
      className="mt-3"
      variant="contained"
      color="primary"
      onClick={handleNext}
    >
      Next
    </Button>
  );

  const backBtn = () => (
    <Button
      className="mt-3 mr-2"
      style={{ marginRight: "6px" }}
      variant="contained"
      onClick={handleBack}
    >
      Back
    </Button>
  );

  useEffect(() => {
    if (notifications && notifications.success) {
      closeModal();
    }
    setLoading(false);
  }, [notifications]);

  return (
    <div>
      <form className="mt-3 article_form" style={{ maxWidth: "250px" }}>
        <div className="form-group mt-4 mb-2">
          <TextField
            style={{ width: "100%" }}
            name="emailStatic"
            variant="outlined"
            value={users.data.email}
            disabled
          />
        </div>
        <Button variant="contained" color="primary" onClick={openModal}>
          Change email?
        </Button>
      </form>
      <Modal size="lg" centered show={emailModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Email</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form className="stepper_form" onSubmit={formik.handleSubmit}>
            {activeStep === 0 ? (
              <div
                className="mb-2 mt-1"
                style={{
                  textAlign: "center",
                  maxWidth: "700px",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                <div className="form-group">
                  <TextField
                    style={{ width: "100%" }}
                    name="email"
                    label="Enter your current email"
                      variant="outlined"
                    {...formik.getFieldProps("email")}
                    {...errorHelper(formik, "email")}
                  />
                  {formik.values.email && !formik.errors.email
                    ? nextBtn()
                    : null}
                </div>
              </div>
            ) : null}
            {activeStep === 1 ? (
              <div
                className="mb-2 mt-1"
                style={{
                  textAlign: "center",
                  maxWidth: "700px",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                <div className="form-group">
                  <TextField
                    style={{ width: "100%" }}
                    name="newemail"
                    label="Enter your new email"
                      variant="outlined"
                    {...formik.getFieldProps("newemail")}
                    {...errorHelper(formik, "newemail")}
                  />
                  {backBtn()}
                  {formik.values.newemail && !formik.errors.newemail
                    ? nextBtn()
                    : null}
                </div>
              </div>
            ) : null}
            {activeStep === 2 ? (
              <div
                className="mb-2 mt-1"
                style={{
                  textAlign: "center",
                  maxWidth: "700px",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                <div className="form-group">
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      {backBtn()}
                      <Button
                        className="mt-3"
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        Update
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </form>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default EmailStepper;

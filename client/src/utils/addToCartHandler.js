import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { resendVerification } from "../store/actions/user.actions";

const AddToCartHandler = ({ modal, handleClose, errorType }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal show={modal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {errorType === "auth"
              ? "Please register/login!"
              : "Please verify your email!"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorType === "auth" ? (
            <div>Sorry, you need to register/sign in to continue.</div>
          ) : (
            <div>Sorry, you need to verify your email to continue.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {errorType === "auth" ? (
            <LinkContainer to="/sign_in">
              <Button variant="primary">Register/SignIn</Button>
            </LinkContainer>
          ) : (
            <LinkContainer to="/dashboard">
              <Button
                variant="primary"
                onClick={() => dispatch(resendVerification())}
              >
                Resend verification
              </Button>
            </LinkContainer>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToCartHandler;
